const fs = require('fs')
const path = require('path')
const { getClassName } = require('./classname')

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
      const className = getClassName(value.name)
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
    path.join(__dirname, '..', 'docs', `${prop.name}.md`),
    content
  )
}

module.exports.createDocs = createDocs
