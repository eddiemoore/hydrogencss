const fs = require('fs')
const path = require('path')
const parse = require('css-tree/lib/lexer/grammar/parse')
const data = require('css-tree/data')
const { generateContent } = require('./src/content')
const {
  createDirectory,
  createFiles,
  createJoinedFile,
} = require('./src/files')
const { createDocs } = require('./src/docs')

if (process.argv[1].split('/').pop().includes('build')) {
  Object
    .keys(data.properties)
    .map(key => Object.assign({}, { name: key }, parse(data.properties[key])))
    .map(prop => Object.assign({}, prop, {
      terms: prop.terms.filter(term => term.type === 'Keyword')
    }))
    .filter(prop => prop.terms.length > 0)
    .map(generateContent)
    .forEach(prop => {
      createDirectory(prop.name)
      createFiles(prop)
      createJoinedFile(prop)
      // Docs
      createDirectory('docs')
      createDocs(prop)
    })
}
