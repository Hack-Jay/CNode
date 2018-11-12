import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { Provider, useStaticRendering } from 'mobx-react'
import App from './views/App'
import { createStoreMap } from './store/store'

// 服务端不重新渲染mobx
useStaticRendering(true)

export default (stores, routerContext, url) => (
  <Provider {...stores}>
    <StaticRouter context={routerContext} location={url}>
      <App />
    </StaticRouter>
  </Provider>
)

// 打包后的服务端代码调用
export { createStoreMap }
