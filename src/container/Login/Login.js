import * as actions from '../../store/actions/index';
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import React, { useEffect,useMemo, useState } from 'react';
import CircularSpinner from '../../component/CircularSpinner/index';
import PropTypes from 'prop-types';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { connect } from 'react-redux';
import { styled } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import { authFail } from '../../store/actions/auth';

const GridStyled = styled(Grid)({
  height: '100%',
});

const PaperStyled = styled(Paper)({
  width: 377,
  textAlign: 'center',
  padding: 30,
});

const TypoStyled = styled(Typography)(() => ({
  fontSize: 24,
  marginTop: 20,
  marginBottom: 30,
  fontWeight: 'bold',
}));

const LinkStyled = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
}));

const FormFields = { email: '', password: '' };
const Login = (props) => {
  const { enqueueSnackbar, error , Fail} = props;

  // useEffect(() => {
  //   error && enqueueSnackbar(error, { variant: 'error' });
  // }, [error]);
  useEffect(() => {
    let mounted = true
    setTimeout(function(){
      if(mounted){
        error && enqueueSnackbar(error, { variant: 'error' })
      }
    },0)
    setTimeout(function(){
      Fail(null)
    },1000)
    return function cleanup() {
      mounted = false
    }
  }, [error])
  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
  });

  const [formvalues, setFormvalues] = useState(FormFields);
  const [formvalidation, setFormvalidation] = useState(FormFields);

  const handleChange = (e) => {
    const form = { ...formvalues };
    const formerr = { ...formvalidation };
    form[e.target.name] = e.target.value;
    formerr[e.target.name] = '';
    setFormvalues(form);
    setFormvalidation(FormFields);
  };

  const handlevalidation = () => {
    let error = false;
    const formerr = { ...formvalidation };
    
    if (!formvalues.email) {
      error = true;
      formerr.email = 'Email is required!';
      setFormvalidation(formerr);
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formvalues.email)) {
      error = true;
      formerr.email = 'Invalid email address';
      setFormvalidation(formerr);
    }

    if (!formvalues.password) {
      error = true;
      formerr.password = 'Password is required!';
      setFormvalidation(formerr);
    }
    return error;
  };
  
  const loginSubmitHandler = (e) => {
    e.preventDefault();
    if (handlevalidation()) return false;
    props.onAuth(formvalues.email, formvalues.password);
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  const userId = localStorage.getItem('token');
  let authRedirect = null;
  if (userId) {
    authRedirect = <Redirect to="/dashboard" />;
  }
  
  return (
    <GridStyled container justify="center" alignItems="center" className="loginBg">
      {authRedirect}
      <PaperStyled>
        <img style={{width: 130}} src={require('../../assets/images/login_logo.png')} />
        <TypoStyled variant="h6">LOGIN</TypoStyled>

        <form onSubmit={loginSubmitHandler} validate="true">
          <TextField
            
            error={!!formvalidation.email}
            helperText={formvalidation.email}
            id="email"
            label="Email"
            name="email"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            value={formvalues.email}
            margin="normal"
          />
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              fullWidth
              error={!!formvalidation.password}
              label="Password"
              name="password"
              variant="Outlined"
              onChange={handleChange}
              value={formvalues.password}
              autoComplete="current-password"
              helpertext={formvalidation.password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          <Box my={4}>
            <LinkStyled style={{fontSize: 14, fontWeight: '500'}} to="/forget-password">Forgot Password?</LinkStyled>
          </Box>

          <Box>
            <Button type="submit" variant="contained" color="primary" size="large">
              {props.loginLoading && <CircularSpinner />}
              Login
            </Button>
          </Box>
        </form>
        <Box  flexDirection="row" mt={4}>
          <Typography style={{fontSize: 14, fontWeight: '500'}} component="span">Don’t have an account? </Typography>
          <LinkStyled style={{fontSize: 14, fontWeight: '500'}} to="/register">Create Account</LinkStyled>
        </Box>
      </PaperStyled>
    </GridStyled>
  );
};
const mapStateToProps = (state) => {
  return {
    loginLoading: state.auth.loginLoading,
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password)),
    Fail: (err) => dispatch (authFail(err))
  };
};

Login.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  loginLoading: PropTypes.bool.isRequired,
  onAuth: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Login));
