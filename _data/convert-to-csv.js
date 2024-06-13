'use strict'
const fs = require('node:fs/promises')
const YAML = require('yaml')

async function main() {
  const raw = await fs.readFile('./publications.yml', { encoding: 'utf-8'})
  const yaml = YAML.parse(raw)

  console.log(yaml)

  let csv = 'year,paper,authors,tags,funds,title,link1,link2\n'

  const years = Object.keys(yaml)

  for (let year of years) {
      const papers = yaml[year]
      for (let p of papers) {
        csv += `${year},"${p.paper}","${p.author}","${p.tags || ''}",,"${p.title}",${p.link || ''},${p.link2 || ''}\n`
      }

  }

  fs.writeFile('publications.csv', csv)
}

main()
