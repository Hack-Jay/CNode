import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { Provider, useStaticRendering } from 'mobx-react'
import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
} from '@material-ui/core/styles';
import App from './views/App'

import { createStoreMap } from './store/store'

// 服务端不重新渲染mobx
useStaticRendering(true)

export default
(stores, routerContext, sheetsRegistry, theme, generateClassName, sheetsManager, url) => (
  <Provider {...stores}>
    <StaticRouter context={routerContext} location={url}>
      <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
          <App />
        </MuiThemeProvider>
      </JssProvider>
    </StaticRouter>
  </Provider>
)

// 打包后的服务端代码调用
export { createStoreMap }
