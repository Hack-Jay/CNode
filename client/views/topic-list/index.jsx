import React from 'react'
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Button from '@material-ui/core/Button'
import { AppState } from '../../store/store'

@inject('appState') @observer
export default class TopicList extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    // console.log('this.porps:', this.props)
  }

  asyncBootstrap() {
    console.log('server rendering data')
    return new Promise((resolve) => {
      setTimeout(() => {
        this.props.appState.count = 3
        resolve(true)
      })
    })
  }


  handleChange(e) {
    this.props.appState.changeName(e.target.value)
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>This is the topic title ... </title>
          <meta name="description" content="This is description" />
        </Helmet>
        <Button variant="outlined" color="primary">This is topic click</Button>
        <input type="text" onChange={this.handleChange} />
        <br />
        {this.props.appState.msg}
      </div>
    )
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState),
}
