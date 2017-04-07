const fs = require('fs')
const path = require('path')
const request = require('request')
const parse = require('css-tree/lib/lexer/grammar/parse')

const PATH = 'https://raw.githubusercontent.com/mdn/data/master/css/properties.json'

const generateContent = prop => {
  const content = prop.terms.map(term => ({
    name: term.name,
    content: `.${term.name}{${prop.name}: ${term.name};}`
  }))
  return {
    name: prop.name,
    content,
  }
}

const createDirectory = prop => {
  if (!fs.existsSync(prop.name)) {
    fs.mkdirSync(prop.name)
  }
}

const createFiles = prop => {
  prop.content.forEach(value => {
    fs.writeFileSync(
      path.join(__dirname, prop.name, `${value.name}.css`),
      value.content
    )
  })
}

const createJoinedFile = prop => {
  const content = prop.content.map(c => c.content).join('')
  fs.writeFileSync(
    path.join(__dirname, `${prop.name}.css`),
    content
  )
}

if (process.argv[1].split('/').pop().includes('build')) {
  request(PATH, (req, res) => {
    if (res.statusCode >= 400) throw Error('Failed to load properties')

    const json = JSON.parse(res.body)
    Object
      .keys(json)
      .map(key => Object.assign({}, { name: key }, parse(json[key].syntax)))
      .map(prop => Object.assign({}, prop, {
        terms: prop.terms.filter(term => term.type === 'Keyword')
      }))
      .filter(prop => prop.terms.length > 0)
      .map(generateContent)
      .forEach(prop => {
        createDirectory(prop)
        createFiles(prop)
        createJoinedFile(prop)
      })
  })
}
