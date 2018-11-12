const axios = require('axios')
const webpack = require('webpack')
const path = require('path')
const MemoryFs = require('memory-fs')
const proxy = require('http-proxy-middleware')

const serverRender = require('./server-render')

const serverConfig = require('../../build/webpack.config.server')

const getTemplate = () => {
  return new Promise((resolve,reject) => {
    axios.get('http://localhost:8888/public/server.ejs')
    .then(res => {
      resolve(res.data)
    })
    .catch(reject)
  })
}

const NativeModule = require('module')
const vm = require('vm')

const getModuleFromString = (bundle, filename) => {
  const m = { exports: {} }
  // `(function(exports, require, module, __finename, __dirname){ ...bundle code })`
  // ^
  // ||  包装成可定制的模式
  const warpper = NativeModule.wrap(bundle)
  // 执行脚本
  const script = new vm.Script(warpper, {
    filename: filename,
    displayErrors: true,
  })
  const result = script.runInThisContext()
  // 可以在当前环境下调用require('react')
  // 第一个参数m.exports是调用者, 第二个参数m.exports 对应exports， 三 require对应require, 四 m 对应module
  result.call(m.exports, m.exports, require, m)
  return m
}

const mfs = new MemoryFs
const serverCompiler = webpack(serverConfig)
serverCompiler.outputFileSystem = mfs
let serverBundle
serverCompiler.watch({}, (err, status) => {
  if(err) throw err
  status = status.toJson()
  status.errors.forEach(err => console.log(err))
  status.warnings.forEach(warn => console.log(warn))

  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  )
  const bundle = mfs.readFileSync(bundlePath, 'utf-8')
  const m = getModuleFromString(bundle, 'server.entry.js')

  serverBundle = m.exports
})

module.exports = function(app) {
  app.use('/public', proxy({
    target: 'http://localhost:8888'
  }))

  app.get('*', function(req, res, next) {
    if (!serverBundle) {
      res.send('waiting for complier , refresh later');
    }
    getTemplate().then(template => {
      return serverRender(serverBundle, template, req, res)
    }).catch(next)
  })
}
