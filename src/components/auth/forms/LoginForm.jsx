import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import {
  makeStyles,
  FormLabel,
  Button,
  Grid,
  useTheme,
} from '@material-ui/core';
import CustomTextField from '../../CustomTextField';
import loginActions from '../../../redux/actions/actionLogin';

const { userLogin } = loginActions;

const useStyles = makeStyles((theme) => ({
  textField: {
    boxShadow: 'none',
    border: '1px solid #ccc',
    width: '90%',
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  form: {
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    marginTop: '0',
  },
  formControl: {
    display: 'flex',
    padding: theme.spacing(1),
    flexDirection: 'row',
    alignItems: 'center',
  },
  formLabel: {
    width: '12%',
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      width: '25%',
    },
  },
  error: {
    fontSize: '0.8rem',
    color: theme.palette.error.main,
    display: 'inline-block',
    textAlign: 'right',
    margin: theme.spacing(1),
  },
  submitButton: {
    color: '#fff',
  },
  cancelButton: {
    boxShadow: '0 2px 2px #bbb',
    border: `1px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    marginRight: theme.spacing(2),
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(2),
  },
  textControls: {
    display: 'flex',
    direction: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
}));

// form validation method to use in formik
const validate = (values) => {
  const errors = {};

  if (!values.userName) {
    errors.userName = 'This field is required.';
  }

  if (!values.password) {
    errors.password = 'This field is required.';
  }

  return errors;
};

const LoginForm = (props) => {
  const { closeDialog, showSnackbar } = props;
  const theme = useTheme();
  const classes = useStyles(theme);
  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '', // normally, this should be encrypted
    },
    validate,
    onSubmit: () => {
      closeDialog();
      props.userLogin();
      showSnackbar(true);
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className={classes.form}>
        <Grid container>
          <Grid item container direction="row" alignItems="center">
            <Grid item xs={3} sm={2}>
              <FormLabel className={classes.formLabel} htmlFor="userName">
                Username:
              </FormLabel>
            </Grid>
            <Grid item xs={8}>
              <CustomTextField
                className={classes.textField}
                id="userName"
                name="userName"
                variant="outlined"
                type="text"
                autoFocus
                onChange={formik.handleChange}
                value={formik.values.userName}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              {formik.touched.userName && formik.errors.userName ? (
                <div className={classes.error}>{formik.errors.userName}</div>
              ) : null}
            </Grid>
          </Grid>

          <Grid item container direction="row" alignItems="center">
            <Grid item xs={3} sm={2}>
              <FormLabel className={classes.formLabel} htmlFor="password">
                Password:
              </FormLabel>
            </Grid>
            <Grid item xs={8}>
              <CustomTextField
                className={classes.textField}
                id="password"
                name="password"
                variant="outlined"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              {formik.touched.password && formik.errors.password ? (
                <div className={classes.error}>{formik.errors.password}</div>
              ) : null}
            </Grid>
          </Grid>
        </Grid>

        <div className={classes.buttonContainer}>
          <Button className={classes.cancelButton} onClick={closeDialog}>
            Cancel
          </Button>
          <Button
            className={classes.submitButton}
            type="submit"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        </div>
      </form>
    </>
  );
};

LoginForm.propTypes = {
  closeDialog: PropTypes.func.isRequired,
  showSnackbar: PropTypes.func.isRequired,
  userLogin: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loggedIn: state.auth.loggedIn,
});

export default connect(mapStateToProps, { userLogin })(LoginForm);
