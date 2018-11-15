import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader' //eslint-disable-line
import { Provider } from 'mobx-react'
import { BrowserRouter } from 'react-router-dom'
import {
  MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import { lightBlue, pink } from 'material-ui/colors'

import App from './views/App'
import AppState from './store/app.state'

const initialState = window.__INITIAL__STATE__ || {} // eslint-disable-line
const root = document.getElementById('root')

const createApp = (Comp) => {
  class Main extends React.Component {
    componentDidMount() {
      const jssStyles = document.getElementById('jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    render() {
      return <Comp />
    }
  }
  return Main
}

const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    accept: pink,
    type: 'light',
  },
})

const render = (Comp) => {
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate
  renderMethod(
    <AppContainer>
      <Provider appState={new AppState(initialState.appState)}>
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>
            <Comp />
          </MuiThemeProvider>
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root,
  )
}
render(createApp(App))

if (module.hot) {
  module.hot.accept('./views/App', () => {
    const NextApp = require('./views/App').default
    render(createApp(NextApp))
  })
}
