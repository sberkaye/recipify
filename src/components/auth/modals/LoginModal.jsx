import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import LoginForm from '../forms/LoginForm';
import CustomizedDialogTitle from './CustomizedDialogTitle';

// Transition component to animate the entrance of the dialog
const Transition = forwardRef((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Slide direction="up" ref={ref} {...props} />
));

const LoginModal = (props) => {
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
        aria-labelledby="login-dialog-slide-title"
        aria-describedby="login-dialog-slide-description"
      >
        <CustomizedDialogTitle
          id="login-dialog-slide-title"
          onClose={() => {
            handleOpen(false);
          }}
        >
          Sign Up to Recipify
        </CustomizedDialogTitle>
        <DialogContent>
          <DialogContentText id="login-dialog-slide-description">
            Login to have hundreds of recipes at your fingertips!
          </DialogContentText>
        </DialogContent>
        <LoginForm
          closeDialog={() => {
            handleOpen(false);
          }}
          showSnackbar={showSnackbar}
        />
      </Dialog>
    </div>
  );
};

LoginModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
  showSnackbar: PropTypes.func.isRequired,
};

export default LoginModal;
