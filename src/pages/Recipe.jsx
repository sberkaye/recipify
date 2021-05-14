import React from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    color: '#333',
    padding: theme.spacing(10),
    height: '100%',
  },
  recipe: {
    height: '100%',
  },
}));

const Recipe = () => {
  const classes = useStyles();

  return (
    <>
      <Grid container item className={classes.root}>
        <Grid item sm={2} xs={0} />
        <Grid item sm={8} xs={12} spacing={4}>
          <Typography variant="body1" className={classes.recipe}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam rem
            corrupti qui neque optio nobis cumque ratione maiores sapiente
            assumenda officia incidunt, animi eos cum asperiores expedita iste
            velit, quis soluta laboriosam inventore hic exercitationem nulla
            facere? Fugit illo a ipsa qui ab, nihil, perspiciatis, animi aperiam
            incidunt voluptates soluta! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Maiores molestiae atque quibusdam facere quaerat,
            aut pariatur maxime, blanditiis ex voluptas ipsum, voluptate ratione
            voluptatum esse quam eveniet nesciunt repudiandae ut. Minima libero
            modi quam recusandae, deserunt neque nostrum officiis in vitae
            quisquam porro? Nostrum accusamus sapiente in, maxime modi, debitis,
            sint a officia corporis libero nihil delectus. Molestias aspernatur,
            incidunt voluptas sapiente quos adipisci iusto culpa atque libero
            exercitationem perspiciatis mollitia nemo corrupti eos unde possimus
            deleniti ex, placeat excepturi reprehenderit. Laborum repellendus
            eligendi voluptates voluptatibus, dolor, architecto odit est vero
            debitis enim consectetur! Deleniti ex ad nam rem mollitia.
          </Typography>
        </Grid>
        <Grid item sm={2} xs={0} />
      </Grid>
    </>
  );
};

export default Recipe;
