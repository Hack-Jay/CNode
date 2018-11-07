import React from 'react'
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes from 'prop-types'
import { AppState } from '../../store/app.state'

@inject('appState') @observer
export default class TopicList extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    console.log('this.porps:', this.props)
  }

  handleChange(e) {
    this.props.appState.changeName(e.target.value)
  }

  render() {
    return (
      <div>
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
