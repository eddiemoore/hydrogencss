const fs = require('fs')
const path = require('path')
const parse = require('css-tree/lib/lexer/grammar/parse')
const data = require('css-tree/data')

const generateContent = prop => {
  const content = prop.terms.map(value => {
    const className = !Number.isNaN(parseInt(value.name, 10)) ? `n${value.name}` : value.name
    return {
      name: value.name,
      content: `.${className}{${prop.name}:${value.name};}`
    }
  })
  return {
    name: prop.name,
    content
  }
}

const createDirectory = name => {
  if (!fs.existsSync(name)) {
    fs.mkdirSync(name)
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

const createDocs = prop => {
  const content = `# ${prop.name}\n\n` +
  `https://developer.mozilla.org/en-US/docs/Web/CSS/${prop.name}\n\n` +
  prop.content
    .concat()
    .sort((a, b) => {
      if (a.name < b.name) return -1
      if (a.name > b.name) return 1
      return 0
    })
    .map(value => {
      const className = !Number.isNaN(parseInt(value.name, 10)) ? `n${value.name}` : value.name
      return `## ${value.name}
\`\`\`css
.selector {
  composes: ${className} from 'hydrogencss/${prop.name}.css'
}
\`\`\`

or:
\`\`\`css
.selector {
  composes: ${className} from 'hydrogencss/${prop.name}/${value.name}.css'
}
\`\`\`

`}).join('')

  fs.writeFileSync(
    path.join(__dirname, 'docs', `${prop.name}.md`),
    content
  )
}

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
