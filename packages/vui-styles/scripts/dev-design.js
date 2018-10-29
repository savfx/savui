import babel from 'rollup-plugin-babel'
import vue from 'rollup-plugin-vue'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import re from 'rollup-plugin-re'
import json from 'rollup-plugin-json'

export default [{
  input: 'design/design.js',
  output: [
    {format: 'iife', file: 'static/assets/js/design.js'},
  ],
  external: [
    'vue',
    'vue-router',
  ],
  plugins: createPlugins()
}]

function createPlugins () {
  return [
    re({
      defines: {
        IS_REMOVE: true,
      },
      replaces: {
        "process.env.NODE_ENV": `"${process.env.NODE_ENV || ''}"`
      }
    }),
    json(),
    vue({
      css: true
    }),
    babel({
      babelrc: false,
      plugins: [
        ['transform-object-rest-spread', { 'useBuiltIns': true }]
      ]
    }),
    resolve({
      module: true
    }),
    commonjs({
      include: [
        'node_modules/**',
        process.env.ENTRYMODULE + '/**',
      ]
    })
  ]  
}
