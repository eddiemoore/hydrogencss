const fs = require('fs')
const path = require('path')
const css = require('css')

const src = path.join(__dirname, 'src')

fs.readdir(src, (err, items) => {
  items.forEach(item => {
    const source = path.join(src, item)
    const content = fs.readFileSync(source, 'utf8')
    const ast = css.parse(content, { source })
    const dir = item.split('.')[0]
    // Make the sub dir
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }

    // Write the main file including all selectors
    fs.writeFileSync(
      path.join(__dirname, item),
      content
    )

    // Go through each declaration and write each selector into own file
    ast.stylesheet.rules.forEach(rule => {
      const selector = rule.selectors[0]
      const c = `${selector}{${rule.declarations.map(dec => (
          `${dec.property}:${dec.value};`
        )).join('')}}`

      fs.writeFileSync(
        path.join(__dirname, dir, `${selector.substring(1)}.css`),
        c
      )
    })
  })
})
