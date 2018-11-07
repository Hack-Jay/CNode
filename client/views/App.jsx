import React from 'react'
import {
  Link,
} from 'react-router-dom'
import Routes from '../config/router'

export default class App extends React.Component {
  componentDidMount() {
    // dosooething...
  }

  render() {
    return [
      <div key="banner">
        <Link to="/">Home</Link>
        <br />
        <Link to="/detail">Detail</Link>
      </div>,
      <Routes key="routes" />,
    ]
  }
}
