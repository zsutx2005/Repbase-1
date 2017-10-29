const path = require('path')
const fs = require('fs')
const lintConfig = require('../tslint.json')
const promisify = require('util').promisify
const readDir = promisify(fs.readdir)
const isDebug = process.env.DEBUG || false


module.exports = (async() => {
  const entries = await readDir(path.join(__dirname, '../examples'))
  const exampleEntryName = fileName => `examples/${fileName.split('.ts')[0]}`
  const entriesMap = entries.reduce((pre, next) => Object.assign({},
    pre, { [exampleEntryName(next)]: path.resolve(__dirname, `../examples/${next}`) }), {})
  
  return {
    entry: Object.assign({
      repbase: path.join(__dirname, '../src/index.ts'),
    }, entriesMap),
    
  
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: '[name].js',
    },
  
    devtool: isDebug ? 'source-map' : '',
  
    target: 'node',
  
    resolve: {
      extensions: [ '.ts', '.js'],
      modules: [
        path.join(__dirname, '/node_modules'),
      ],
    },
  
    module: {
      loaders: [
        {
          test: /\.ts/,
          enforce: 'pre',
          exclude: /node_modules/,
          loader: 'tslint-loader',
          options: {
            configuration: lintConfig,
          },
        },
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
  }
})()

