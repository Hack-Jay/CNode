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
import queryString from 'query-string'

import { AppState, TopicStore } from '../../store/store'
import Container from '../components/container'
import TopicItem from './list-item'
import { tabs } from '../../util/variable-define'

@inject((stores) => {
  return {
    topicStore: stores.topicStore,
    appState: stores.appState,
    user: stores.appState.user,
  }
}) @observer
export default class TopicList extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  constructor() {
    super()
    this.handleChangeIndex = this.handleChangeIndex.bind(this)
    this.listItemClick = this.listItemClick.bind(this)
  }

  componentDidMount() {
    const tab = this.getTab()
    this.props.topicStore.fetchTopics(tab)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      this.props.topicStore.fetchTopics(this.getTab(nextProps.location.search))
    }
  }

  getTab(search) {
    search = search || this.props.location.search
    const query = queryString.parse(search)
    return query.tab || 'all'
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

  handleChangeIndex(e, value) {
    // change route here
    this.context.router.history.push({
      pathname: '/index',
      search: `?tab=${value}`,
    })
  }

  /* eslint-disable */
  listItemClick() {
  }
  /* eslint-enable */

  render() {
    const { topics, syncing } = this.props.topicStore
    const tab = this.getTab()

    return (
      <Container>
        <Helmet>
          <title>This is the topic title ... </title>
          <meta name="description" content="This is description" />
        </Helmet>
        <Tabs value={tab} onChange={this.handleChangeIndex}>
          {
            Object.keys(tabs).map(t => <Tab label={tabs[t]} key={t} value={t} />)
          }
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
  location: PropTypes.object.isRequired,
}
