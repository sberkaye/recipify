import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import Tag from './Tag';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  header: {
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('sm')]: {
      whiteSpace: 'normal',
    },
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  loginText: (props) => ({
    display: props.loggedIn ? 'none' : 'flex',
    marginLeft: 'auto',
  }),
  actionButtons: (props) => ({
    display: props.loggedIn ? 'flex' : 'none',
    marginLeft: 'auto',
  }),
}));

const titleBreaks = {
  sm: 16,
  md: 19,
  lg: 21,
  xl: 23,
};

const FoodCard = (props) => {
  const [modifiedName, setModifiedName] = useState('');

  const classes = useStyles(props);

  const { cardDetails, size } = props;
  // eslint-disable-next-line object-curly-newline
  const { name, imgLink, category, area, id } = cardDetails;

  // if the name is too long, omit the remainder after the corresponding
  // breakpoint in titleBreaks
  useEffect(() => {
    if (size !== 'xs') {
      setModifiedName(
        name.length < titleBreaks[size]
          ? name
          : `${name.slice(0, titleBreaks[size] - 3)}...`,
      );
    } else {
      setModifiedName(name);
    }
  }, [size]);

  return (
    <Card className={classes.root} elevation={2}>
      <CardHeader className={classes.header} title={modifiedName} />
      <CardMedia className={classes.media} image={imgLink} title={name} />
      <CardContent>
        <Tag sm type="category">
          {category}
        </Tag>
        <Tag sm type="area">
          {area}
        </Tag>
      </CardContent>
      <CardActions disableSpacing>
        <Link to={`/recipe/${id}`}>
          <IconButton aria-label="show recipe" color="primary">
            <VisibilityIcon />
          </IconButton>
        </Link>
        <Box className={classes.actionButtons}>
          <IconButton aria-label="add to favorites" color="primary">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share" color="primary">
            <ShareIcon />
          </IconButton>
        </Box>
        <Typography className={classes.loginText} variant="body2">
          Login for more actions.
        </Typography>
      </CardActions>
    </Card>
  );
};

FoodCard.propTypes = {
  cardDetails: PropTypes.shape().isRequired,
  size: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  loggedIn: state.auth.loggedIn,
});

export default connect(mapStateToProps)(FoodCard);
