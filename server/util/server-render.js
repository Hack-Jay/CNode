const ejs = require('ejs')
const serial = require('serialize-javascript')
const asyncBootstrap = require('react-async-bootstrapper').default
const ReactDomServer = require('react-dom/server')
const Helmet = require('react-helmet').default

const getStoreState = (store) => {
  return Object.keys(store).reduce((result, storeName) => {
    // class mobx.toJson()
    result[storeName] = store[storeName].toJson()
    return result
  }, {})
}

module.exports = (bundle, template, req, res) => {
  return new Promise((resolve, reject) => {
    const createStoreMap = bundle.createStoreMap
    const serverBundle = bundle.default

    const routerContext = {}
    console.log('createStoreMap', createStoreMap)
    const stores = createStoreMap()
    // 打包后的serverEntry是一个函数
    const app = serverBundle(stores, routerContext, req.url)

    asyncBootstrap(app).then(() => {
      if (routerContext.url) {
        res.status(302).setHeader('Location', routerContext.url)
        res.end()
        return
      }
      const helmet = Helmet.rewind()
      const state = getStoreState(stores)
      const content = ReactDomServer.renderToString(app)

      const html = ejs.render(template, {
        appString: content,
        initialState: serial(state),
        title: helmet.title.toString(),
        meta: helmet.meta.toString(),
        style: helmet.style.toString(),
        link: helmet.link.toString(),
      })
      res.send(html)
      resolve()
    }).catch(reject)
  })
}
