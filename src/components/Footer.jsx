import React from 'react';
import { makeStyles, Box, IconButton } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const GH_LINK = 'https://github.com/sberkaye/recipify';
const LI_LINK = 'https://www.linkedin.com/in/berkay-ergin-218436198/';

const useStyles = makeStyles((theme) => ({
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    background: '#333',
    color: '#ddd',
    fontSize: '0.7rem',
    lineHeight: 2,
    padding: theme.spacing(2),
    height: '3.6rem',
    bottom: 0,
    width: '100%',
    '& a': {
      textDecoration: 'none',
      color: '#ddd',
    },
  },
  iconContainer: {
    display: 'flex',
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
    <Box className={classes.footer}>
      <div>
        Fav icons made by&nbsp;
        <a href="https://www.freepik.com" title="Freepik">
          Freepik
        </a>
        &nbsp; from&nbsp;
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
      A Sample React project by Berkay Ergin
      <div className={classes.iconContainer}>
        <IconButton onClick={openGitHub} className={classes.iconButton}>
          <GitHubIcon className={classes.icon} />
        </IconButton>
        <IconButton onClick={openLinkedIn} className={classes.iconButton}>
          <LinkedInIcon className={classes.icon} />
        </IconButton>
      </div>
    </Box>
  );
};

export default Footer;
