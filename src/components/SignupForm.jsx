import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import {
  makeStyles,
  FormLabel,
  Button,
  Grid,
  useTheme,
} from '@material-ui/core';
import CustomTextField from './CustomTextField';

const useStyles = makeStyles((theme) => ({
  textField: {
    boxShadow: 'none',
    border: '1px solid #ccc',
    width: '90%',
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
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
      width: '20%',
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

  if (!values.firstName) {
    errors.firstName = 'This field is required.';
  } else if (values.firstName.length > 15) {
    errors.firstName = 'Must be 15 characters or less';
  }

  if (!values.lastName) {
    errors.lastName = 'This field is required.';
  } else if (values.lastName.length > 20) {
    errors.lastName = 'Must be 20 characters or less';
  }

  if (!values.email) {
    errors.email = 'This field is required.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

const SignupForm = (props) => {
  const { closeDialog, showSnackbar } = props;
  const theme = useTheme();
  const classes = useStyles(theme);
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    validate,
    onSubmit: () => {
      closeDialog();
      showSnackbar(true);
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className={classes.form}>
        <Grid container>
          <Grid item container direction="row" alignItems="center">
            <Grid item xs={3} sm={2}>
              <FormLabel className={classes.formLabel} htmlFor="firstName">
                First Name:
              </FormLabel>
            </Grid>
            <Grid item xs={8}>
              <CustomTextField
                className={classes.textField}
                id="firstName"
                name="firstName"
                variant="outlined"
                type="text"
                autoFocus
                onChange={formik.handleChange}
                value={formik.values.firstName}
              />
            </Grid>
            <Grid xs={12} md={2}>
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className={classes.error}>{formik.errors.firstName}</div>
              ) : null}
            </Grid>
          </Grid>

          <Grid item container direction="row" alignItems="center">
            <Grid item xs={3} sm={2}>
              <FormLabel className={classes.formLabel} htmlFor="lastName">
                Last Name:
              </FormLabel>
            </Grid>
            <Grid item xs={8}>
              <CustomTextField
                className={classes.textField}
                id="lastName"
                name="lastName"
                variant="outlined"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.lastName}
              />
            </Grid>
            <Grid xs={12} md={2}>
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className={classes.error}>{formik.errors.lastName}</div>
              ) : null}
            </Grid>
          </Grid>

          <Grid item container direction="row" alignItems="center">
            <Grid item xs={3} sm={2}>
              <FormLabel className={classes.formLabel} htmlFor="email">
                Email:
              </FormLabel>
            </Grid>
            <Grid item xs={8}>
              <CustomTextField
                className={classes.textField}
                id="email"
                name="email"
                variant="outlined"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </Grid>
            <Grid xs={12} md={2}>
              {formik.touched.email && formik.errors.email ? (
                <div className={classes.error}>{formik.errors.email}</div>
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
            Signup
          </Button>
        </div>
      </form>
    </>
  );
};

SignupForm.propTypes = {
  closeDialog: PropTypes.func.isRequired,
  showSnackbar: PropTypes.func.isRequired,
};

export default SignupForm;
