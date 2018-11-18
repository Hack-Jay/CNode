import React from 'react'
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List';
import CircularProgress from '@material-ui/core/CircularProgress';

import { AppState, TopicStore } from '../../store/store'
import Container from '../components/container'
import TopicItem from './list-item'

@inject((stores) => {
  return {
    topicStore: stores.topicStore,
    appState: stores.appState,
    user: stores.appState.user,
  }
}) @observer
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
    this.props.topicStore.fetchTopics()
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
    const { topics, syncing } = this.props.topicStore
    console.log('topicList', topics, syncing)

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
        <List>
          {
            topics.map(topic => (
              <TopicItem
                key={topic.id}
                onClick={this.listItemClick}
                topic={topic}
              />
            ))
          }
        </List>
        {
          syncing ? (
            <div style={{ display: 'flex', justifyContent: 'space-around', padding: '40px 0' }}>
              <CircularProgress />
            </div>
          ) : null
        }
      </Container>
    )
  }
}

TopicList.wrappedComponent.proTypes = {
  topicStore: PropTypes.instanceOf(TopicStore).isRequired,
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState),
}
