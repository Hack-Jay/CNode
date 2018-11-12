import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader' //eslint-disable-line
import { Provider } from 'mobx-react'
import { BrowserRouter } from 'react-router-dom'

import App from './views/App'
import AppState from './store/app.state'

const initialState = window.__INITIAL__STATE__ || {} // eslint-disable-line
const root = document.getElementById('root')

const render = (Comp) => {
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate
  renderMethod(
    <AppContainer>
      <Provider appState={new AppState(initialState.appState)}>
        <BrowserRouter>
          <Comp />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root,
  )
}
render(App)

if (module.hot) {
  module.hot.accept('./views/App', () => {
    const NextApp = require('./views/App').default
    render(NextApp)
  })
}
