import React from 'react';
import { makeStyles, Grid, IconButton } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const GH_LINK = 'https://github.com/sberkaye/recipify';
const LI_LINK = 'https://www.linkedin.com/in/berkay-ergin-218436198/';

const useStyles = makeStyles((theme) => ({
  footer: {
    alignItems: 'baseline',
    justifyContent: 'space-between',
    background: '#333',
    color: '#ddd',
    fontSize: '0.7rem',
    paddingTop: theme.spacing(1),
    lineHeight: 2,
    bottom: 0,
    minWidth: '100%',
    '& a': {
      textDecoration: 'none',
      color: '#ddd',
    },
  },
  iconContainer: {
    justifySelf: 'flex-end',
  },
  iconButton: {
    '&:hover *': {
      color: '#eee',
    },
  },
  icon: {
    color: '#ddd',
    transition: 'all 0.2s',
  },
}));

const openGitHub = () => {
  window.open(GH_LINK, '_blank');
};

const openLinkedIn = () => {
  window.open(LI_LINK, '_blank');
};

const Footer = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      xs={12}
      direction="row"
      justify="space-between"
      className={classes.footer}
    >
      <Grid item align="center" xs={12} sm={4}>
        Fav icons made by&nbsp;
        <a href="https://www.freepik.com" title="Freepik">
          Freepik
        </a>
        &nbsp; from&nbsp;
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </Grid>
      <Grid item align="center" xs={6} sm={6}>
        A Sample React project by Berkay Ergin
      </Grid>
      <Grid className={classes.iconContainer} item align="right" xs={6} sm={2}>
        <IconButton onClick={openGitHub} className={classes.iconButton}>
          <GitHubIcon className={classes.icon} />
        </IconButton>
        <IconButton onClick={openLinkedIn} className={classes.iconButton}>
          <LinkedInIcon className={classes.icon} />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Footer;
