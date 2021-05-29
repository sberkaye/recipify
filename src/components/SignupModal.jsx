/* eslint-disable react/jsx-props-no-spreading */
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import SignupForm from './SignupForm';

// Transition component to animate the entrance of the dialog
const Transition = forwardRef((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Slide direction="up" ref={ref} {...props} />
));

// custom styles for CustomizedDialogTitle
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

// a different implementation of DialogTitle to contain a close button
const CustomizedDialogTitle = withStyles(styles)((props) => {
  // eslint-disable-next-line object-curly-newline
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const SignupModal = (props) => {
  const { open, handleOpen, showSnackbar } = props;
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
        <CustomizedDialogTitle
          id="signup-dialog-slide-title"
          onClose={() => {
            handleOpen(false);
          }}
        >
          Sign Up to Recipify
        </CustomizedDialogTitle>
        <DialogContent>
          <DialogContentText id="signup-dialog-slide-description">
            Save your favorite recipes, share them with your friends and much
            more!
          </DialogContentText>
        </DialogContent>
        <SignupForm
          closeDialog={() => {
            handleOpen(false);
          }}
          showSnackbar={showSnackbar}
        />
      </Dialog>
    </div>
  );
};

SignupModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
  showSnackbar: PropTypes.func.isRequired,
};

export default SignupModal;
