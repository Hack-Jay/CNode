import React from 'react'
import {
  Route,
  Redirect,
} from 'react-router-dom'
import TopicList from '../views/topic-list'
// import TopicDetail from '../views/topic-detail'

export default () => [
  <Route path="/" render={() => <Redirect to="/index" />} exact key="first" />,
  <Route path="/index" component={TopicList} key="index" />,
  // <Route path="/detail/:id" component={TopicDetail} key="detail" />,
]
