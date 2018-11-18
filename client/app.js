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
import { AppState, TopicStore } from './store/store'

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

    componentDidCatch(error, info) {
      console.error(error);
      console.log(info)
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
    accent: pink,
    type: 'light',
  },
})

const appState = new AppState(initialState.appState)
const topicStore = new TopicStore(initialState.topicStore)

const render = (Comp) => {
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate
  renderMethod(
    <AppContainer>
      <Provider appState={appState} topicStore={topicStore}>
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
