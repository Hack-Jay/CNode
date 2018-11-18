import React from 'react';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const style = {
  root: {
    margin: 24,
    marginTop: 80,
  },
}

const Container = ({ classes, children }) => (
  <Paper elevation={4} className={classes.root}>
    {children}
  </Paper>
)

Container.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
}

export default withStyles(style)(Container)