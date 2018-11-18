import React from 'react'
// import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { withStyles } from '@material-ui/core/styles';
import cx from 'classnames'

import Avatar from '@material-ui/core/Avatar';
import ProTypes from 'prop-types'

import { topicPrimaryStyle, topicSecondStyle } from './style'
import { tabs } from '../../util/variable-define'

const Primary = ({ classes, topic }) => {
  const classNames = cx({
    [classes.tab]: true,
    [classes.top]: topic.top,
  })
  return (
    <span className={classes.root}>
      <span className={classNames}>{topic.top ? '置顶' : tabs[topic.tab]}</span>
      <span className={classes.title}>{topic.title}</span>
    </span>
  )
}

const Secondary = ({ classes, topic }) => (
  <span className={classes.root}>
    <span className={classes.userName}>{topic.author.loginname}</span>
    <span className={classes.count}>
      <span className={classes.accentColor}>{topic.reply_count}</span>
      <span>/</span>
      <span>{topic.visit_count}</span>
    </span>
    <span>
      创建时间：
      {topic.create_at}
    </span>
  </span>
)

Primary.proTypes = {
  topic: ProTypes.object.isRequired,
  classes: ProTypes.object.isRequired,
}

Secondary.proTypes = {
  topic: ProTypes.object.isRequired,
  classes: ProTypes.object.isRequired,
}

const StylePrimary = withStyles(topicPrimaryStyle)(Primary)
const StyleSecondary = withStyles(topicSecondStyle)(Secondary)

const TopicItem = ({ onClick, topic }) => (
  <ListItem button onClick={onClick}>
    <ListItemAvatar>
      <Avatar src={topic.author.avatar_url} />
    </ListItemAvatar>
    <ListItemText
      primary={<StylePrimary topic={topic} />}
      secondary={<StyleSecondary topic={topic} />}
    />
  </ListItem>
)

TopicItem.proTypes = {
  onClick: ProTypes.func.isRequired,
  topic: ProTypes.object.isRequired,
}

export default TopicItem
