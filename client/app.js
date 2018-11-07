import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader' //eslint-disable-line
import App from './App.jsx'

const root = document.getElementById('root')

const render = (Comp) => {
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate
  renderMethod(
    <AppContainer>
      <Comp />
    </AppContainer>,
    root
  )
}
render(App)

if (module.hot) {
  module.hot.accept('./App.jsx', () => {
    const NextApp = require('./App.jsx').default
    render(NextApp)
  })
}
