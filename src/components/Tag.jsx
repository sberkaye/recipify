import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    color: '#fff',
    borderRadius: '3rem',
    width: '10rem',
    textAlign: 'center',
    margin: '0.7rem',
  },
  category: {
    backgroundColor: theme.palette.tertiary.main,
  },
  region: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const Tag = (props) => {
  const classes = useStyles();
  const { children, type } = props;
  return (
    <Typography className={clsx(classes.root, classes[type])}>
      {children}
    </Typography>
  );
};

Tag.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default Tag;
