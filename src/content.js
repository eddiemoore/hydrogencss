const { getClassName } = require('./classname')

const generateContent = prop => {
  const content = prop.terms.map(value => {
    const className = getClassName(value.name)
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

module.exports.generateContent = generateContent
