var path = require('path'),
	fs = require('fs'),
	util = require('./util'),
	Stream = require("stream")
	file = require('./file.js')
	;

var configs = {
	'photon' : {
		resolve : 'photonkit/package.json',
		fonts : 'fonts',
		css : 'dist/css/photon.css',
		prefixFrom: 'icon',
		prefixTo: 'pt',
		name: 'photon',
		sassFile : 'sass/icons/_icons-photon.sass',
		jsFile : 'dist/icons/photon.js',
		htmlFile : 'demo/src/DemoPhoton.vue',
		htmlFormat : '<label title="%content"><i class="%name"></i><span>%name</span></label>',
	},
	'font-awesome' : {
		resolve : 'font-awesome/package.json',
		fonts : 'fonts',
		css : 'css/font-awesome.css',
		prefixFrom: 'fa',
		prefixTo: 'fa',
		name: 'font-awesome',
		jsFile : 'dist/icons/font-awesome.js',
		sassFile : 'sass/icons/_icons-font-awesome.sass',
		htmlFile : 'demo/src/DemoFontAwesome.vue',
		htmlFormat : '<label title="%content"><i class="%name"></i><span>%name</span></label>',
	}
}

function getConfig(config) {
	if (typeof config == 'string') {
		config = configs[config];
	}
	return config;
}

function resolveIcon (config) {
	config = getConfig(config)
	let dir = require.resolve(config.resolve)
	let stat = fs.statSync(dir)
	if (!stat.isDirectory()) {
		dir = path.dirname(dir)
	}
	let fontsDir = path.resolve(dir, config.fonts)
	let cssFile = path.resolve(dir, config.css)
	let distFonts = path.resolve(__dirname, '../dist/fonts')
	let loadCss = () => file.readFileAsync(cssFile).then((ret) => {
		ret = {content: ret.toString()}
		ret.mat = util.matchIcon(config.prefixFrom, ret.content)
		return ret
	})
	let ret = {
		updateIcons() {
			return loadCss().then((ret) => {
				let {content, mat} = ret
				let sassText =  util.replaceIcon(mat, config.prefixTo);
				sassText = '=make-icons-' + config.name + '\r\n' + sassText + '\r\n';
				return file.writeFileAsync(config.sassFile, sassText).then(() => ret)
			})
			.then(({content, mat}) => {
				let data = mat.map(it => `'${config.prefixTo}${it[0]}'`).join(',\n  ')
				data = `!(function (ref, val) { ref[0][ref[1]] = val })(typeof module != 'undefined' ? [module, 'exports'] : [this, '${config.prefixTo}'],[\n  ${data}\n])\n`
				return file.writeFileAsync(config.jsFile, data)
			})
			// .then(({content, mat}) => {
			// 	return file.readFileAsync(config.htmlFile).then((html) => {
			// 		html = util.replaceHtmlBlock(html.toString(), mat, config.prefixTo, config.htmlFormat);
			// 		return file.writeFileAsync(config.htmlFile, html)
			// 	})
			// })
		},
		copyFonts () {
			return file.mkdirAsync(distFonts).then(() => {
				return file.readdirAsync(fontsDir, true).then((ret) => {
					return Promise.all(ret.map((it) => {
						return file.copyFileAsync(it.filePath, path.resolve(distFonts, it.fileName))
					}))
				})
			})
		}
	}
	return ret
}

exports.resolveIcon = resolveIcon;
