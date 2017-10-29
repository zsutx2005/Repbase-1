const fs = require('fs')
const path = require('path')
const ora = require('ora')
const promisify = require('util').promisify
const exists = promisify(fs.exists)
const exec = promisify(require('child_process').exec)
const log = new ora('check params...').start()
const target = process.env.npm_config_module

if (!target) return log.fail('exit. module is required.\nyou can try [npm run ex --module={module}]')

;(async() => {
  log.clear()
  log.text = 'check build...'
  const built = await exists(path.resolve(__dirname, '../dist/examples'))
  if (!built) return log.fail('exit. not found examples dir.\nyou can try [npm run build]')
  
  log.clear()
  log.succeed(`running, module: ${target}`)
  
  const { stdout } = await exec(`node ./dist/examples/index.js`)
  console.log(stdout)
})()
