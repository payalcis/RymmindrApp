import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@material-ui/core';
import React, { useMemo, useState } from 'react';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { makeStyles, styled } from '@material-ui/core/styles';
import CircularSpinner from '../../component/CircularSpinner';
import PropTypes from 'prop-types';
import { changePassword } from '../../store/actions/accountsettingAction';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { withSnackbar } from 'notistack';
import generator from "generate-password";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));
const TypoStyled = styled(Typography)(({ theme }) => ({
  fontSize: 17,
  color: theme.palette.text.primary,
  fontWeight: '600',
  paddingTop: 20,
  paddingBottom: 50,
}));

const formFields = {
  user_id: '2892',
  current_password: '',
  password: '',
  password_confirmation: '',
};

const showPassword = {
  current_password: false,
  password: false,
  password_confirmation: false,
};

const ChangePassword = (props) => {
  const history = useHistory();
  const { user_id } = JSON.parse(localStorage.getItem('userData'));
  const { changePassword, enqueueSnackbar, error, loading,success_message } = props;
  const classes = useStyles();
  const [values, setValues] = useState(formFields);
  const [validatevalues, setValidateValues] = useState(formFields);
  const [showvalue, setShowValues] = useState(showPassword);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setValidateValues({ ...validatevalues, [prop]: '' });
  };

  const handleClickShowPassword = (prop) => {
    setShowValues({ ...showvalue, [prop]: !showvalue[prop] });
  };

  const generatePassword = () => {
    const pwd = generator.generate({
      length: 12,
      lowercase: true,
      uppercase: true,
      numbers: true,
      symbols: false
    });
    const FormValue= {...values}
    FormValue.password=pwd;
    FormValue.password_confirmation=pwd
    setValues(FormValue)
  }

  const formValidation = () => {
    let error = false;
    let formvalid = { ...validatevalues };
    let formvalue = { ...values };
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;

    if (!formvalue.current_password) {
      error = true;
      formvalid.current_password = 'This field is required.';
    }

    if (!formvalue.password) {
      error = true;
      formvalid.password = 'This field is required.';
    }
    else if (!(formvalue.password).match(upperCaseLetters)) {
      error = true;
      formvalid.password = 'Password must contain an upper case letter!';
    }
    else if (!(formvalue.password).match(numbers)) {
      error = true;
      formvalid.password = 'Password must contain a digit!';
    }
    else if ((formvalue.password).length < 8) {
      error = true;
      formvalid.password = 'Password must contain 8 or more characters!';
    }

    if (!formvalue.password_confirmation) {
      error = true;
      formvalid.password_confirmation = 'This field is required.';
    }

    if (formvalue.password_confirmation !== formvalue.password) {
      error = true;
      formvalid.password_confirmation = 'Password and confirm password should be same.';
    }

    setValidateValues(formvalid);
    return error;
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValidation()) return false;
    const sendReq = { ...values };
    sendReq.user_id = user_id;
    changePassword(sendReq, history);
  };

  useMemo(() => {
    error && enqueueSnackbar(error, { variant: 'error' });
  }, [error]);
  useMemo(() => {
    
    success_message && enqueueSnackbar(success_message, { variant: 'success' });
  }, [success_message]);
  return (
    <div style={{ paddingLeft: 25, paddingRight: 25 }}>
      <TypoStyled>Change Password</TypoStyled>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={5}>
          <Grid item xs={5}>
            <FormControl
              className={clsx(classes.margin, classes.textField)}
              variant="outlined"
              fullWidth
              error={!!validatevalues.current_password}
            >
              <InputLabel htmlFor="outlined-adornment-password">Current Password</InputLabel>
              <OutlinedInput
                type={showvalue.current_password ? 'text' : 'password'}
                value={values.current_password}
                onChange={handleChange('current_password')}
                name="current_password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleClickShowPassword('current_password')}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showvalue.current_password ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={125}
              />
              <FormHelperText>{validatevalues.current_password}</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={5} className="mt-20">
          <Grid item xs={5}>
            <FormControl
              className={clsx(classes.margin, classes.textField)}
              variant="outlined"
              fullWidth
              error={!!validatevalues.password}
            >
              <InputLabel htmlFor="new-pass">New Password</InputLabel>
              <OutlinedInput
                id="new-pass"
                type={showvalue.password ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleClickShowPassword('password')}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showvalue.password ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={105}
              />
              <FormHelperText>{validatevalues.password}</FormHelperText>
            </FormControl>
          <Box flexDirection="row" style={{ textAlign: 'left', cursor: 'pointer',color: '	#484848', marginLeft: '15px', marginTop: '15px', fontSize : '17px' }} onClick ={generatePassword}>
              Suggest Password
            </Box>
          </Grid>
          <Grid item xs={5}>
            <FormControl
              className={clsx(classes.margin, classes.textField)}
              variant="outlined"
              fullWidth
              error={!!validatevalues.password_confirmation}
            >
              <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
              <OutlinedInput
                type={showvalue.password_confirmation ? 'text' : 'password'}
                value={values.password_confirmation}
                onChange={handleChange('password_confirmation')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleClickShowPassword('password_confirmation')}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showvalue.password_confirmation ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={125}
              />
              <FormHelperText>{validatevalues.password_confirmation}</FormHelperText>
            </FormControl>
            
            <Box style={{ textAlign: 'right', marginTop: 50 }}>
              <Button variant="contained" color="primary" type="submit" disabled={loading}>
                {loading && <CircularSpinner />}
                update password
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

const mapStateToProps = ({ account }) => {
  return {
    loading: account.loading,
    error: account.error,
    success_message: account.success_message

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changePassword: (data, history) => dispatch(changePassword(data, history)),
  };
};

ChangePassword.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  changePassword: PropTypes.func.isRequired,
  success_message: PropTypes.any.isRequired,

};
export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(ChangePassword));
