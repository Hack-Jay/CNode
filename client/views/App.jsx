import React from 'react'
import Routes from '../config/router'
import AppBar from './components/app-bar'

export default class App extends React.Component {
  componentDidMount() {
    // dosooething...
  }

  render() {
    return [
      <AppBar key="appbar" />,
      <Routes key="routes" />,
    ]
  }
}
