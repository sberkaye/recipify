// recipe HTMLs are sanitized with DOMPurify before being used, so disabling react/no-danger
/* eslint-disable react/no-danger */
/* eslint-disable operator-linebreak */
/* eslint-disable react/prop-types */
/* eslint-disable object-curly-newline */
import React, { useEffect, useState } from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import Image from 'material-ui-image';
import { connect } from 'react-redux';
import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';
import { Element, scroller } from 'react-scroll';
import Tag from '../components/Tag';
import IngredientsTable from '../components/IngredientsTable';
import recipeActions from '../redux/actions/actionRecipe';
import useScreenSize from '../hooks/useScreenSize';

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
  const [tableRef, setTableRef] = useState();
  const [screenSize, calculateSize] = useScreenSize();
  const [imageAspectRatio, setImageAspectRatio] = useState(1 / 1);
  // eslint-disable-next-line no-shadow
  const { currentRecipe, fetchRecipeById, match } = props;

  const { id } = match.params;

  const handleTableRef = (ref) => {
    setTableRef(ref.current);
  };

  useEffect(() => {
    window.addEventListener('resize', calculateSize);

    return () => {
      window.removeEventListener('resize', calculateSize);
    };
  }, []);

  useEffect(() => {
    const getData = async () => {
      await fetchRecipeById(id);
    };
    getData();
  }, []);

  useEffect(() => {
    scroller.scrollTo('title', {
      duration: 800,
      smooth: true,
    });
  });

  useEffect(() => {
    switch (screenSize) {
      case 'xs':
        setImageAspectRatio(1 / 1);
        break;
      case 'sm':
      case 'md':
        setImageAspectRatio(3 / 4);
        break;
      case 'lg':
        setImageAspectRatio(1 / 1);
        break;
      case 'xl':
        setImageAspectRatio(4 / 3);
        break;
      default:
        break;
    }
  }, [screenSize]);

  let recipe = {
    name: '',
    category: '',
    area: '',
    imgLink: '',
    instructions: '',
    tags: [],
    ingredients: [],
    measures: [],
  };

  if (currentRecipe.name) {
    recipe = currentRecipe;
  }

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

  const renderTags = () => (
    <>
      <Tag sm type="category">
        {category}
      </Tag>
      <Tag sm type="area">
        {area}
      </Tag>
      {tags &&
        tags.map((tag) => (
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
          <Element name="title">
            <Typography variant="h3" className={classes.title}>
              {name}
            </Typography>
          </Element>
        </Grid>
        {/* ----------------------------------------------------------------------- */}
        <Grid item xs={12}>
          {renderTags()}
        </Grid>
        {/* ----------------------------------------------------------------------- */}
        <Grid item xs={1} />
        <Grid item xs={10} sm={3}>
          <Image aspectRatio={imageAspectRatio} src={imgLink} />
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={1} />
        <Grid item xs={10} sm={4}>
          <IngredientsTable
            getTableRef={handleTableRef}
            rows={ingredients.map((ingredient, index) => ({
              ingredient,
              measure: measures[index],
            }))}
            ref={tableRef}
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
  currentRecipe: PropTypes.shape().isRequired,
  fetchRecipeById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentRecipe: state.recipes.currentRecipe,
});

export default connect(mapStateToProps, { fetchRecipeById })(Recipe);
