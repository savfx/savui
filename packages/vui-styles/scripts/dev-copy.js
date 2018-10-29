const fs = require('fs')
const path = require('path')
const fse = require('fs-extra')

let list = [
  ['vue/dist/vue.js', 'static/vendor/vue/vue.js'],
  ['vue-router/dist/vue-router.js', 'static/vendor/vue-router/vue-router.js'],
]

let res = [
  ['./dist/fonts/fontawesome-webfont.eot', 'static/assets/fonts/fontawesome-webfont.eot'],
  ['./dist/fonts/fontawesome-webfont.svg', 'static/assets/fonts/fontawesome-webfont.svg'],
  ['./dist/fonts/fontawesome-webfont.ttf', 'static/assets/fonts/fontawesome-webfont.ttf'],
  ['./dist/fonts/fontawesome-webfont.woff', 'static/assets/fonts/fontawesome-webfont.woff'],
  ['./dist/fonts/fontawesome-webfont.woff2', 'static/assets/fonts/fontawesome-webfont.woff2'],
  ['./dist/fonts/FontAwesome.otf', 'static/assets/fonts/FontAwesome.otf'],
  ['./dist/fonts/photon-entypo.eot', 'static/assets/fonts/photon-entypo.eot'],
  ['./dist/fonts/photon-entypo.svg', 'static/assets/fonts/photon-entypo.svg'],
  ['./dist/fonts/photon-entypo.ttf', 'static/assets/fonts/photon-entypo.ttf'],
  ['./dist/fonts/photon-entypo.woff', 'static/assets/fonts/photon-entypo.woff'],
]

list.forEach(it => {
  let [src, dist] = it
  fse.outputFile(dist, fs.readFileSync(require.resolve(src)) , err => {
    if (err) return console.error(err)
    console.log(`${src} => ${dist}`)
  })
})

res.forEach(it => {
  let [src, dist] = it
  fse.outputFile(dist, fs.readFileSync(path.resolve(src)) , err => {
    if (err) return console.error(err)
    console.log(`${src} => ${dist}`)
  })
})
