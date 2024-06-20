<template>
<div v-if="!years.length">Loading publication dataset...</div>

<div v-if="tagList.length">
  <button class="button" @click="showFilterPanel = !showFilterPanel">
      {{selectedTag || 'Filters'}}&nbsp;&nbsp;{{ showFilterPanel ? '˄' : '⌄' }}
  </button>
  <p class="edit-pubs-link"><a :href="editUrl" target="_blank">edit...</a></p>
  <div class="filter-panel" v-if="showFilterPanel">
    <div class="filter-option" v-for="tag in tagList" :key="tag" @click="clickTag(tag)">
      {{ getTag(tag).title }}
    </div>
  </div>

</div>

<div v-for="year in years" :key="year">
  <p class="section-year" >{{ year }}</p>

  <div class="paper-row" v-for="pub in getPubs({year})" :key="pub.paper">
    <div>{{ pub.paper }}</div>
    <div class="flex1">
      <span class="paper-authors">{{ pub.authors }}</span><br/>
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
import Papaparse  from 'papaparse'

const SHEET_URL = "https://docs.google.com/spreadsheets/d/19hk-UDkdVrht70ppTa7CAW0NsOHfKqMzMbziSJD9vq4/gviz/tq?tqx=out:csv"
const EDIT_URL = "https://docs.google.com/spreadsheets/d/19hk-UDkdVrht70ppTa7CAW0NsOHfKqMzMbziSJD9vq4/edit"
const PAPERS_URL = SHEET_URL + '&gid=0'
const TAGS_URL = SHEET_URL + '&gid=806825792'

interface paper {
  year: string,
  paper: string,
  tags: string,
  funds: string,
  authors: string,
  title: string,
  link1: string,
  link2: string,
}

interface tag {
  title: string,
  shortTag: string,
  pspElement: string,
}

export default defineComponent({
  data() {
    return {
      editUrl: EDIT_URL,
      isLoaded: false,
      message: 'Hello Vue!',
      publications: [] as paper[],
      filteredPublications: [] as paper[],
      tags: {} as {[id: string]: tag},
      tagList: [] as any[],
      years: [] as any[],
      selectedTag: '',
      showFilterPanel: false
    }
  },

  async mounted() {
    await this.loadPublications()

    this.filteredPublications = this.publications
    const years = new Set()
    for (const paper of this.filteredPublications) if (paper.year) years.add(paper.year)
    this.years = [...years.keys()].sort().reverse()

    await this.$nextTick()

    await this.loadTags()
  },

  methods: {
    clickTag(tagId: string) {
      this.selectedTag = tagId

      if (tagId == 'All Papers') {
        this.filteredPublications = this.publications
      } else {
        this.filteredPublications = this.publications.filter(p => p.tags.indexOf(tagId) > -1)
      }

      const years = new Set()
      for (const paper of this.filteredPublications) if (paper.year) years.add(paper.year)
      this.years = [...years.keys()].sort().reverse()
    },

    getTag(tagId: string) {
      const tag = this.tags[tagId]
      return tag || {title: tagId, shortName: tagId, pspElement: ''}
    },

    getPubs(filters: any) {
      const filterKeys = Object.keys(filters) as any[]
      const papers = this.filteredPublications.filter(p => {
        //@ts-ignore
        for (const filterKey of filterKeys) if (p[filterKey] !== filters[filterKey])  return false
        return true
      })
      papers.sort((a,b) => a.paper < b.paper ? 1 : -11) // reverse sort
      return papers
    },

    async loadTags() {
      const response = await fetch(TAGS_URL)
      const text = await response.text()
      const csv = Papaparse.parse(text, {
        header: false,
        skipEmptyLines: true,
        dynamicTyping: false,
      })

      if (!csv.data) return

      const tags = {} as {[id:string]: tag} //
      for (const row of csv.data.slice(1)) { // skip header
        const cols = ['title','shortTag','pspElement']
        const element = {} as any
        //@ts-ignore
        for (let i=0; i < cols.length; i++) element[cols[i]] = row[i].trim()
        if (element.shortTag) tags[element.shortTag] = element
      }

      // update tagList to be sorted nicely with fancy names
      this.tagList.sort((a,b) => {
        const nameA = tags[a] ? tags[a]['title'] : a
        const nameB = tags[b] ? tags[b]['title'] : b
        return nameA.toLocaleLowerCase() < nameB.toLocaleLowerCase() ? -1 : 1
      })
      this.tagList = ['All Papers', ...this.tagList]
      this.tags = tags
    },

    async loadPublications() {
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
        const cols = ['year','paper','tags','funds','authors','title','link1','link2']
        const element = {} as any
        //@ts-ignore
        for (let i=0; i < cols.length; i++) element[cols[i]] = row[i]
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
    }
  }
})

</script>
<style scoped>
.paper-row {
  display: flex;
  flex-direction: row;
}

.flex1 {
  flex: 1;
}

</style>