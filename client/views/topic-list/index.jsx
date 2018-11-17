import React from 'react'
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { AppState } from '../../store/store'
import Container from '../components/container'
import TopicItem from './list-item'

@inject('appState') @observer
export default class TopicList extends React.Component {
  constructor() {
    super()
    this.state = {
      tabIndex: 0,
    }
    this.handleChangeIndex = this.handleChangeIndex.bind(this)
    this.listItemClick = this.listItemClick.bind(this)
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

  handleChangeIndex(e, index) {
    console.log(index)
    this.setState({
      tabIndex: index,
    })
  }

  /* eslint-disable */
  listItemClick() {
  }
  /* eslint-enable */


  render() {
    const { tabIndex } = this.state
    const topic = {
      title: 'This is Title .',
      userName: 'ZZZz',
      reply_count: 20,
      visit_count: 30,
      tab: 'share',
      creat_at: 'asdaeqwqda',
    }
    return (
      <Container>
        <Helmet>
          <title>This is the topic title ... </title>
          <meta name="description" content="This is description" />
        </Helmet>
        <Tabs value={tabIndex} onChange={this.handleChangeIndex}>
          <Tab label="全部" />
          <Tab label="精华" />
          <Tab label="分享" />
          <Tab label="问答" />
          <Tab label="招聘" />
          <Tab label="客户端测试" />
        </Tabs>
        <TopicItem onClick={this.listItemClick} topic={topic} />
      </Container>
    )
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState),
}
