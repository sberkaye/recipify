import React from 'react';
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
import Tag from './Tag';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
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
});

const FoodCard = (props) => {
  const classes = useStyles(props);

  return (
    <Card className={classes.root} elevation={2}>
      <CardHeader title="Tuna Nicoise" />
      <CardMedia
        className={classes.media}
        image="https://www.themealdb.com/images/media/meals/yypwwq1511304979.jpg"
        title="Paella dish"
      />
      <CardContent>
        <Tag type="category">Seafood</Tag>
        <Tag type="region">French</Tag>
      </CardContent>
      <CardActions disableSpacing>
        <Link to="/recipe/1">
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

const mapStateToProps = (state) => ({
  loggedIn: state.auth.loggedIn,
});

export default connect(mapStateToProps)(FoodCard);
