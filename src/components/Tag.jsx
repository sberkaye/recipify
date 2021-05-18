import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: (props) => ({
    color: '#fff',
    borderRadius: '3rem',
    display: 'inline-block',
    width: props.sm ? '8rem' : '10rem',
    textAlign: 'center',
    margin: '0.7rem',
  }),
  category: {
    backgroundColor: theme.palette.tertiary.main,
  },
  area: {
    backgroundColor: theme.palette.secondary.main,
  },
  tag: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const Tag = (props) => {
  const classes = useStyles(props);
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
