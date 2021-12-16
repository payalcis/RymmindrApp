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
  FormHelperText,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { Link, Redirect ,useParams ,useHistory } from 'react-router-dom';
import React, { useEffect,useMemo, useState } from 'react';
import CircularSpinner from '../../component/CircularSpinner/index';
import PropTypes from 'prop-types';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { connect } from 'react-redux';
import { styled } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import { reset_password } from '../../store/actions/auth';
import generator from "generate-password";

const GridStyled = styled(Grid)({
  height: '100vh',
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

const FormFields = { cpassword: '', password: '' };
const ResetPassword = (props) => {
  const { enqueueSnackbar, error } = props;

  useEffect(() => {
    error && enqueueSnackbar(error, { variant: 'error' });
  }, [error]);
  useMemo(() => {
    error && enqueueSnackbar(error, { variant: 'error' });
  }, [error]);
  const [values, setValues] = useState({
    cpassword: '',
    password: '',
    showPassword1: false,
    showPassword2: false,
  });

  const [formvalues, setFormvalues] = useState(FormFields);
  const [formvalidation, setFormvalidation] = useState(FormFields);
  const {getemail} = useParams();

  const generatePassword = () => {
    const pwd = generator.generate({
      length: 12,
      lowercase: true,
      uppercase: true,
      numbers: true,
      symbols: false
    });
    const FormValue= {...formvalues}
    FormValue.password=pwd;
    FormValue.cpassword=pwd
    setFormvalues(FormValue)
    // console.log('formValue-',formValue)
  }

  const history = useHistory();
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
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;

    if (!formvalues.password) {
      error = true;
      formerr.password = 'Password is required!';
      setFormvalidation(formerr);
    }
    else if (!(formvalues.password).match(upperCaseLetters)) {
      error = true;
      formerr.password = 'Password must contain an upper case letter!';
      setFormvalidation(formerr);
    }
    else if (!(formvalues.password).match(numbers)) {
      error = true;
      formerr.password = 'Password must contain a digit!';
      setFormvalidation(formerr);
    }
    else if ((formvalues.password).length < 8) {
      error = true;
      formerr.password = 'Password must contain 8 or more characters!';
      setFormvalidation(formerr);
    }

    if (!formvalues.cpassword) {
      error = true;
      formerr.cpassword = 'Confirm Password is required!';
      setFormvalidation(formerr);
    }
    if(!(formvalues.cpassword == formvalues.password)){
        error = true;
        formerr.cpassword = 'Password is required!';
        setFormvalidation(formerr);
    }
    return error;
  };

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    if (handlevalidation()) return false;

    const data ={
        email:getemail,
        password:formvalues.password,
    }

    props.onAuth(data, history);
  };

  const handleClickShowPassword1 = () => {
    setValues({ ...values, showPassword1: !values.showPassword1 });
  };
  const handleClickShowPassword2 = () => {
    setValues({ ...values, showPassword2: !values.showPassword2 });
  };
  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };
  const handleMouseDownPassword2 = (event) => {
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
        <TypoStyled variant="h6">ResetPassword</TypoStyled>

        <form onSubmit={loginSubmitHandler} validate="true">
        <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword1 ? 'text' : 'password'}
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
                    onClick={handleClickShowPassword1}
                    onMouseDown={handleMouseDownPassword1}
                    edge="end"
                  >
                    {values.showPassword1 ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          <FormHelperText style={{color: '#f44336', paddingLeft : '1rem'}}>{formvalidation.password}</FormHelperText>
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword2 ? 'text' : 'password'}
              fullWidth
              error={!!formvalidation.cpassword}
              label="Confirm Password"
              name="cpassword"
              variant="Outlined"
              onChange={handleChange}
              value={formvalues.cpassword}
              autoComplete="current-password"
              helpertext={formvalidation.cpassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword2}
                    onMouseDown={handleMouseDownPassword2}
                    edge="end"
                  >
                    {values.showPassword2 ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          <FormHelperText style={{color: '#f44336', paddingLeft : '1rem'}}>{formvalidation.cpassword}</FormHelperText>
          <Grid item  md={7} xs={12} spacing={5}>
            <Box flexDirection="row" style={{ textAlign: 'left', cursor: 'pointer',color: '	#484848', marginLeft: '15px', marginTop: '15px'  }} onClick ={generatePassword}>
             Suggest Password
            </Box>
          </Grid>
          <Box my={4}>
            <LinkStyled to="/login">Want to login?</LinkStyled>
          </Box>

          <Box>
            <Button type="submit" variant="contained" color="primary" size="large">
              {props.loading && <CircularSpinner />}
              RESET PASSWORD
            </Button>
          </Box>
        </form>
        <Box flexDirection="row" mt={4}>
          <Typography component="span">Don’t have an account? </Typography>
          <LinkStyled to="/register">Create Account</LinkStyled>
        </Box>
      </PaperStyled>
    </GridStyled>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, history) => dispatch(reset_password(email,history)),
  };
};

ResetPassword.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  onAuth: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(ResetPassword));
