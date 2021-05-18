/* eslint-disable react/prop-types */
/* eslint-disable object-curly-newline */
import React, { useEffect } from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import Image from 'material-ui-image';
import { connect } from 'react-redux';
import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';
import Tag from '../components/Tag';
import recipeActions from '../redux/actions/actionRecipe';

const { fetchRecipeById } = recipeActions;

const useStyles = makeStyles(() => ({
  root: {
    color: '#333',
    height: '100%',
  },
  recipe: {
    height: '100%',
    lineHeight: 1.7,
    color: '#444',
    whiteSpace: 'pre-wrap',
    fontSize: '1.1rem',
    display: 'block',
    textAlign: 'left',
  },
  title: {
    color: '#333',
    textAlign: 'center',
    marginRight: '4rem',
    textTransform: 'uppercase',
  },
}));

const Recipe = (props) => {
  const classes = useStyles();
  // eslint-disable-next-line no-shadow
  const { recipe, fetchRecipeById, match } = props;
  const { id } = match.params;
  const { name, category, area, imgLink, instructions, tags } = recipe;

  useEffect(() => {
    fetchRecipeById(id);
  }, []);

  const renderTags = () => (
    <>
      <Tag sm type="category">
        {category}
      </Tag>
      <Tag sm type="area">
        {area}
      </Tag>
      {tags.map((tag) => (
        <Tag sm type="tag">
          {tag}
        </Tag>
      ))}
    </>
  );

  // const renderIngredients = () => (
  //   <>
  //   </>
  // );

  return (
    <>
      <Grid
        container
        alignItems="space-around"
        align="center"
        justify="space-around"
        item
        className={classes.root}
        spacing={0}
      >
        <Grid xs={12} />
        <Grid xs={12}>
          <Typography variant="h3" className={classes.title}>
            {name}
          </Typography>
        </Grid>
        <Grid xs={12}>{renderTags()}</Grid>
        {/* ----------------------------------------------------------------------- */}
        <Grid sm={1} />
        <Grid item sm={3} xs={0}>
          <Image aspectRatio={16 / 9} src={imgLink} />
        </Grid>
        <Grid xs={8}>{renderTags()}</Grid>
        {/* ----------------------------------------------------------------------- */}
        <Grid item sm={1} xs={0} />
        <Grid item sm={8} xs={12}>
          <span
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(instructions),
            }}
            className={classes.recipe}
          />
        </Grid>
        <Grid item sm={3} xs={0} />
      </Grid>
    </>
  );
};

Recipe.propTypes = {
  recipe: PropTypes.shape().isRequired,
  fetchRecipeById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  recipe: state.recipe,
});

export default connect(mapStateToProps, { fetchRecipeById })(Recipe);
