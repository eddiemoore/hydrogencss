const fs = require('fs')
const path = require('path')

const createDirectory = name => {
  if (!fs.existsSync(name)) {
    fs.mkdirSync(name)
  }
}

const createFiles = prop => {
  prop.content.forEach(value => {
    fs.writeFileSync(
      path.join(__dirname, '..', prop.name, `${value.name}.css`),
      value.content
    )
  })
}

const createJoinedFile = prop => {
  const content = prop.content.map(c => c.content).join('')
  fs.writeFileSync(
    path.join(__dirname, '..', `${prop.name}.css`),
    content
  )
}

module.exports = {
  createDirectory,
  createFiles,
  createJoinedFile,
}
