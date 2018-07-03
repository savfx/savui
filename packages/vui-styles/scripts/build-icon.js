const path = require('path')
const {resolveIcon} = require('./icon.js')
const {mkdirAsync} = require('./file.js')

let plugins = ['photon', 'font-awesome']

Promise.all([
  mkdirAsync(path.join(__dirname, '../dist/icons')),
  mkdirAsync(path.join(__dirname, '../dist/fonts')),
]).then(() => {
  return Promise.all(plugins.map((name) => {
    let config = resolveIcon(name)
    return Promise.all([
      config.updateIcons(),
      config.copyFonts(),
    ])
  }))
}).then(() => {
  console.log('Done', plugins.join())
}).catch((err) => {
  console.error(err)
  process.exit(1)
})
