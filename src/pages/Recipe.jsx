/* eslint-disable react/prop-types */
/* eslint-disable object-curly-newline */
import React, { useEffect } from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import Image from 'material-ui-image';
import { connect } from 'react-redux';
import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';
import Tag from '../components/Tag';
import IngredientsTable from '../components/IngredientsTable';
import recipeActions from '../redux/actions/actionRecipe';

const { fetchRecipeById } = recipeActions;

const useStyles = makeStyles((theme) => ({
  root: {
    color: '#333',
    paddingTop: theme.spacing(6),
    maxWidth: '100%',
    marginBottom: '5%',
    flexGrow: 1,
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
    textTransform: 'uppercase',
  },
}));

const Recipe = (props) => {
  const classes = useStyles();
  // eslint-disable-next-line no-shadow
  const { recipe, fetchRecipeById, match } = props;
  const { id } = match.params;
  const {
    name,
    category,
    area,
    imgLink,
    instructions,
    tags,
    ingredients,
    measures,
  } = recipe;

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
        <Tag key={`${id}+${tag}`} sm type="tag">
          {tag}
        </Tag>
      ))}
    </>
  );

  return (
    <>
      <Grid
        container
        align="center"
        justify="space-around"
        item
        className={classes.root}
        spacing={3}
      >
        {/* ----------------------------------------------------------------------- */}
        <Grid item xs={12}>
          <Typography variant="h3" className={classes.title}>
            {name}
          </Typography>
        </Grid>
        {/* ----------------------------------------------------------------------- */}
        <Grid item xs={12}>
          {renderTags()}
        </Grid>
        {/* ----------------------------------------------------------------------- */}
        <Grid item xs={1} sm={1} />
        <Grid item xs={10} sm={3}>
          <Image src={imgLink} />
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={1} />
        <Grid item xs={10} sm={4}>
          <IngredientsTable
            rows={ingredients.map((ingredient, index) => ({
              ingredient,
              measure: measures[index],
            }))}
          />
        </Grid>
        <Grid item xs={1} sm={2} />
        {/* ----------------------------------------------------------------------- */}
        <Grid item xs={1} sm={1} />
        <Grid item xs={10} sm={9}>
          <span
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(instructions),
            }}
            className={classes.recipe}
          />
        </Grid>
        <Grid item xs={1} sm={2} />
        {/* ----------------------------------------------------------------------- */}
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
