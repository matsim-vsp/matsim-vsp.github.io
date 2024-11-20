<template>
  <div v-if="!publications.length">Loading publication dataset...</div>

  <div v-if="tagList.length">
    <button class="button" @click="showFilterPanel = !showFilterPanel">
      {{ niceNames || 'Filters' }}&nbsp;&nbsp;{{ showFilterPanel ? '˄' : '⌄' }}
    </button>
    <p class="edit-pubs-link"><a :href="editUrl" target="_blank">edit...</a></p>
    <div class="filter-panel" v-if="showFilterPanel">
      <div
        v-for="tag in tagList"
        :key="tag"
        class="filter-option"
        :class="{ 'is-tag-active': tag in selectedTags }"
        @click="clickTag(tag)"
      >
        {{ getTag(tag).title }}
      </div>
    </div>
  </div>

  <h2 class="tags-en" v-if="Object.keys(selectedTags).length">
    Tags: {{ Object.keys(selectedTags).join(' & ') }}
  </h2>

  <div v-for="year in years" :key="year">
    <p class="section-year">{{ year }}</p>

    <div class="paper-row" v-for="pub in getPubs({ year })" :key="pub.paper">
      <div>{{ pub.paper }}</div>
      <div class="flex1">
        <span class="paper-authors">{{ pub.authors }}</span
        ><br />
        <span class="paper-title">{{ pub.title }}</span>
      </div>
      <div>
        <a v-if="pub.link1" :href="pub.link1">Download</a>
        <br v-if="pub.link2" />
        <a v-if="pub.link2" :href="pub.link2">Download 2</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Papaparse from 'papaparse'

const SHEET_URL =
  'https://docs.google.com/spreadsheets/d/19hk-UDkdVrht70ppTa7CAW0NsOHfKqMzMbziSJD9vq4/gviz/tq?tqx=out:csv'
const EDIT_URL =
  'https://docs.google.com/spreadsheets/d/19hk-UDkdVrht70ppTa7CAW0NsOHfKqMzMbziSJD9vq4/edit'
const PAPERS_URL = SHEET_URL + '&gid=0'
const TAGS_URL = SHEET_URL + '&gid=806825792'

interface paper {
  year: string
  paper: string
  tags: string
  funds: string
  authors: string
  title: string
  link1: string
  link2: string
}

interface tag {
  title: string
  shortTag: string
  pspElement: string
}

export default defineComponent({
  data() {
    return {
      editUrl: EDIT_URL,
      publications: [] as paper[],
      filteredPublications: [] as paper[],
      tags: {} as { [id: string]: tag },
      tagList: [] as any[],
      years: [] as any[],
      // selectedTag: '',
      selectedTags: {} as any,
      showFilterPanel: false,
    }
  },

  computed: {
    niceNames() {
      return Object.keys(this.selectedTags)
        .map(t => this.getTag(t).title)
        .join(', ')
    },
  },

  // CODE STARTS RUNNING HERE: ----------------------
  async mounted() {
    // Parse query terms from URL
    this.getURLTags()

    // publications list is always the full set; filtered is filtered.
    await this.loadPublicationsFromGoogleSheets()

    // Build reverse-sorted list of all years
    const years = new Set()
    for (const paper of this.filteredPublications) if (paper.year) years.add(paper.year)
    this.years = [...years.keys()].sort().reverse()

    // Second fetch for tags because Gsheets API only returns one at a time)
    await this.$nextTick()
    await this.loadTagsFromGoogleSheets()

    // Now we have the papers, the tags, and the URL settings. Filter!
    this.filterPublicationsBasedOnTags()
  },

  methods: {
    // get set of tags from the URL in form "vsp.berlin?tags=covidsim,drt"
    getURLTags() {
      const query = new URLSearchParams(document.location.search)
      const tagsText = query.get('tags') || ''
      if (tagsText) {
        const tags = tagsText.split(',')
        for (const tag of tags) this.selectedTags[tag.trim()] = true
      }
    },

    async loadTagsFromGoogleSheets() {
      const response = await fetch(TAGS_URL)
      const text = await response.text()
      const csv = Papaparse.parse(text, {
        header: false,
        skipEmptyLines: true,
        dynamicTyping: false,
      })

      if (!csv.data) return

      const tags = {} as { [id: string]: tag }

      for (const row of csv.data.slice(1)) {
        // skip header
        const cols = ['title', 'shortTag', 'pspElement']
        const element = {} as any
        //@ts-ignore
        for (let i = 0; i < cols.length; i++) element[cols[i]] = row[i].trim()
        if (element.shortTag) tags[element.shortTag] = element
      }

      // update tagList to be sorted nicely with fancy names
      this.tagList.sort((a, b) => {
        const nameA = tags[a] ? tags[a]['title'] : a
        const nameB = tags[b] ? tags[b]['title'] : b
        return nameA.toLocaleLowerCase() < nameB.toLocaleLowerCase() ? -1 : 1
      })
      this.tagList = ['All Papers', ...this.tagList]
      this.tags = tags
    },

    async loadPublicationsFromGoogleSheets() {
      const response = await fetch(PAPERS_URL)
      const text = await response.text()

      const csv = Papaparse.parse(text, {
        header: false,
        skipEmptyLines: true,
        dynamicTyping: false,
      })

      if (!csv.data) return

      const tagSet = new Set()

      const rows = [] as any[]
      for (const row of csv.data.slice(1)) {
        const cols = ['year', 'paper', 'tags', 'funds', 'authors', 'title', 'link1', 'link2']
        const element = {} as any
        //@ts-ignore
        for (let i = 0; i < cols.length; i++) element[cols[i]] = row[i]
        rows.push(element)
        // also note all tags
        if (element.tags) {
          const tags = element.tags.split(',')
          for (const tag of tags) if (tag) tagSet.add(tag.trim())
        }
      }
      const tags = [...tagSet.keys()].sort()
      this.publications = rows
      this.tagList = tags
    },

    filterPublicationsBasedOnTags() {
      const activeTags = Object.keys(this.selectedTags)
      if (activeTags.length == 0) {
        // Show everything
        this.filteredPublications = this.publications
      } else {
        // Activate the filter
        this.filteredPublications = this.publications.filter(p => {
          for (const tag of activeTags) {
            if (p.tags.indexOf(tag) > -1) return true
          }
          return false
        })
      }

      // Only list years with papers
      const years = new Set()
      for (const paper of this.filteredPublications) if (paper.year) years.add(paper.year)
      this.years = [...years.keys()].sort().reverse()

      // Update URL params
      const tags = Object.keys(this.selectedTags)
      if (tags.length) {
        const url = new URL(window.location.href)
        const query = Object.keys(this.selectedTags).join(',')
        url.searchParams.set('tags', query)
        // force commas
        const text = url.toString().replaceAll('%2C', ',')
        window.history.replaceState(null, '', text)
      } else {
        const url = new URL(window.location.href)
        url.searchParams.delete('tags')
        window.history.replaceState(null, '', url)
      }
    },

    clickTag(tagId: string) {
      console.log('toggle', tagId)
      if (tagId in this.selectedTags) {
        delete this.selectedTags[tagId]
      } else {
        this.selectedTags[tagId] = true
      }

      if (tagId == 'All Papers' || Object.keys(this.selectedTags).length == 0) {
        this.selectedTags = {}
      }

      this.filterPublicationsBasedOnTags()
    },

    getTag(tagId: string) {
      const tag = this.tags[tagId]
      return tag || { title: tagId, shortName: tagId, pspElement: '' }
    },

    getPubs(filters: any) {
      const filterKeys = Object.keys(filters) as any[]
      const papers = this.filteredPublications.filter(p => {
        //@ts-ignore
        for (const filterKey of filterKeys) if (p[filterKey] !== filters[filterKey]) return false
        return true
      })
      papers.sort((a, b) => (a.paper < b.paper ? 1 : -11)) // reverse sort
      return papers
    },
  },
})
</script>
<style scoped>
@import 'style.css';

.is-tag-active {
  background-color: #6273e6;
  color: white;
}

.is-tag-active:hover {
  background-color: #929de7;
}

.paper-row {
  display: flex;
  flex-direction: row;
}

.flex1 {
  flex: 1;
}
</style>
