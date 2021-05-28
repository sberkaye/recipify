import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const Transition = forwardRef((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Slide direction="up" ref={ref} {...props} />
));

const SignupModal = (props) => {
  const { open, handleOpen } = props;
  const theme = useTheme();
  // will be true when the screen size is equal to or lower than 'sm'
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="lg"
        fullWidth
        fullScreen={fullScreen}
        onClose={() => {
          handleOpen(false);
        }}
        aria-labelledby="signup-dialog-slide-title"
        aria-describedby="signup-dialog-slide-description"
      >
        <DialogTitle id="signup-dialog-slide-title">
          Sign Up to Recipify
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="signup-dialog-slide-description">
            Save your favorite recipes, share them with your friends and much
            more!
          </DialogContentText>
        </DialogContent>
        <Grid container direction="column" align="center">
          <Grid item sm={12}>
            <TextField autoFocus id="name" label="Email Address" type="email" />
          </Grid>
          <Grid item>
            <TextField id="name" label="Password" type="password" />
          </Grid>
        </Grid>
        <DialogActions>
          <Button
            onClick={() => {
              handleOpen(false);
            }}
            color="primary"
          >
            Disagree
          </Button>
          <Button
            onClick={() => {
              handleOpen(false);
            }}
            color="primary"
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

SignupModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
};

export default SignupModal;
