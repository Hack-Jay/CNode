import React from 'react'
// import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { withStyles } from '@material-ui/core/styles';

// import Avatar from '@material-ui/core/Avatar';
import ProTypes from 'prop-types'
import HomeIcon from '@material-ui/icons/Home';

import { topicPrimaryStyle, topicSecondStyle } from './style'


const Primary = ({ classes, topic }) => (
  <div className={classes.root}>
    <span className={classes.tab}>{topic.tab}</span>
    <span className={classes.title}>{topic.title}</span>
  </div>
)

const Secondary = ({ classes, topic }) => (
  <div className={classes.root}>
    <span className={classes.userName}>{topic.userName}</span>
    <span className={classes.count}>
      <span className={classes.accentColor}>{topic.reply_count}</span>
      <span>/</span>
      <span>{topic.visit_count}</span>
    </span>
    <span>
      创建时间：
      {topic.create_at}
    </span>
  </div>
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
      <HomeIcon />
      {/* <Avatar src={topic.image} /> */}
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
