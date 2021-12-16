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
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { Link, useHistory,Redirect } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import CircularSpinner from '../../component/CircularSpinner/index';
import PropTypes from 'prop-types';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { connect } from 'react-redux';
import img from '../../assets/images/login_bg.png';
import { register } from '../../store/actions/auth';
import { styled } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import generator from "generate-password";

const GridStyled = styled(Grid)({
  height: '100vh',
});

const PaperStyled = styled(Paper)({
  width: 783,
  textAlign: 'center',
  padding: 40,
  // boxShadow: 0px 3px 6px #40576A29;
  borderRadius: 10
});

const TypoStyled = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  marginTop: 20,
  fontWeight: 'bold',
  textTransform: 'uppercase',
}));

const LinkStyled = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
}));

const ButtonTypoStyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const formFields = {
  email: null,
  password: null,
  platform: 'desktop',
  account_type: '',
  address: '',
  sc_bessi_name: '',
  post_code: '',
  mobile_no: '',
  contact_person: '',
  confirm_password: ''
};

const Register = (props) => {
  const history = useHistory();
  const { enqueueSnackbar, error2, loading } = props;
  const [values, setValues] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  const [formValue, setFormValue] = useState(formFields);
  const [fromValidation, setFormValidation] = useState(formFields);
  const [accountType, setAccountType] = useState('Education');

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
  };

  const generatePassword = () => {
    const pwd = generator.generate({
      length: 12,
      lowercase: true,
      uppercase: true,
      numbers: true,
      symbols: false
    });
    const FormValue= {...formValue}
    FormValue.password=pwd;
    FormValue.confirm_password=pwd
    setFormValue(FormValue)
    console.log('formValue-',formValue)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlevalidation = () => {
    let error = false;
    // var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    // var phoneno = /((0)|((\+|00)447)){1}[0-9]{10}\b/
    const formerr = { ...fromValidation };
    if (!formValue.email) {
      error = true;
      formerr.email = 'Email is required!';
      setFormValidation(formerr);
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValue.email)) {
      error = true;
      formerr.email = 'Invalid email address';
      setFormValidation(formerr);
    }
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;
    if (!formValue.password) {
      error = true;
      formerr.password = 'Password is required!';
      setFormValidation(formerr);
    }
    else if (!(formValue.password).match(upperCaseLetters)) {
      error = true;
      formerr.password = 'Password must contain an upper case letter!';
      setFormValidation(formerr);
    }
    else if (!(formValue.password).match(numbers)) {
      error = true;
      formerr.password = 'Password must contain a digit!';
      setFormValidation(formerr);
    }
    if (!formValue.mobile_no) {
      error = true;
      formerr.mobile_no = 'Mobile no. is required!';
      setFormValidation(formerr);
    }
    else if (!((formValue.mobile_no).charAt(0) == "0")) {
      error = true;
      formerr.mobile_no = 'Invalid Mobile no.!';
      setFormValidation(formerr);
    }
    else if (isNaN(formValue.mobile_no)) {
      error = true;
      formerr.mobile_no = 'Invalid Mobile no.!';
      setFormValidation(formerr);
    }
    if(!formValue.contact_person){
      error = true;
      formerr.contact_person = 'Contact Person is required!';
      setFormValidation(formerr);
    }
    if (!formValue.confirm_password) {
      error = true;
      formerr.confirm_password = 'Confirm Password is required!';
      setFormValidation(formerr);
    } else if(formValue.password !== formValue.confirm_password){
      error = true;
      formerr.confirm_password = 'Password not matched!';
      setFormValidation(formerr);
    }

    // else if (!(formValue.mobile_no).match(phoneno)) {
    //   error = true;
    //   formerr.mobile_no = 'Invalid Mobile no.!';
    //   setFormValidation(formerr);
    // }

    // if (formValue.confirmpassord && formValue.password && formValue.confirmpassord !== formValue.password) {
    //   error = true;
    //   formerr.confirmpassord = 'password and confirm password should be same.';
    //   setFormValidation(formerr);
    // }

    if (!formValue.address) {
      error = true;
      formerr.address = 'Address is required!';
      setFormValidation(formerr);
    }
    if (!formValue.sc_bessi_name) {
      error = true;
      formerr.sc_bessi_name = 'Name is required!';
      setFormValidation(formerr);
    }
    var postcodeRegEx = /^[A-Z]{1,2}[0-9RCHNQ][0-9A-Z]?\s?[0-9][ABD-HJLNP-UW-Z]{2}$|^[A-Z]{2}-?[0-9]{4}$/;

    if (!formValue.post_code) {
      error = true;
      formerr.post_code = 'Post code is required!';
      setFormValidation(formerr);
    }
    else if (!postcodeRegEx.test((formValue.post_code).replace(/\s+/g, '').toUpperCase())) {
      error = true;
      formerr.post_code = 'Post code format is not correct!';
      setFormValidation(formerr);
    }
    return error;
  };

  const handleToChange = (e) => {
    const formvalue = { ...formValue };
    const formvalidation = { ...fromValidation };
    const fieldName = e.target.name;
    var fieldValue = '';
    formvalidation[fieldName] = '';
    if (fieldName === 'mobile_no') {
      if (formvalue[fieldName] == '') {
        fieldValue = (e.target.value).trim();
      }
      if (isNaN(e.target.value)){
        fieldValue = ''
      }
      else {
        fieldValue = e.target.value
      }
      formvalue[fieldName] = fieldValue;
      setFormValue(formvalue);
      setFormValidation(formvalidation);
    }
    else {
      if (formvalue[fieldName] == '') {
        fieldValue = (e.target.value).trim();
      }
      else {
        fieldValue = e.target.value
      }
      formvalue[fieldName] = fieldValue;
      setFormValue(formvalue);
      setFormValidation(formvalidation);
    }
  };

  const handleToSubmit = () => {
    if (handlevalidation()) return false;
    const dataTosend = { ...formValue };
    dataTosend.account_type = accountType;
    // delete dataTosend.confirmpassord;
    console.log('Data to send');
    console.log(dataTosend);
    props.noRegister(dataTosend, history);
  };

  const handleRediect = () => {
    window.location.assign('https://rymindr.com/policy/');
  };

  // useEffect(() => {
    
  //   error2 && enqueueSnackbar(error2, { variant: 'error' });
  // }, [error2]);


  useEffect(() => {
    let mounted = true
    setTimeout(function(){
      
      if(mounted){
        error2 && enqueueSnackbar(error2, { variant: 'error' })
      }
    },0)
    return function cleanup() {
        mounted = false
    }
  }, [error2])


  const userId = localStorage.getItem('token');
  let authRedirect = null;
  if (userId) {
    authRedirect = <Redirect to="/dashboard" />;
  }
  console.log(error2)
  return (
    <GridStyled container justify="center" alignItems="center" className="loginBg">
       {authRedirect}
      <PaperStyled>
        <img style={{width: 130}} src={require('../../assets/images/login_logo.png')} />
        <TypoStyled variant="h6">Create New Account</TypoStyled>
        <div className="cardBoxContainer">
          <div
            className={accountType === 'Education' ? 'cardBox active' : 'cardBox'}
            onClick={() => setAccountType('Education')}
          >
            <img src={require('../../assets/images/education.svg')} />
            <ButtonTypoStyled variant="button">Education</ButtonTypoStyled>
          </div>
          <div
            className={accountType === 'Business' ? 'cardBox active' : 'cardBox'}
            onClick={() => setAccountType('Business')}
          >
            <img src={require('../../assets/images/business.svg')} />
            <ButtonTypoStyled variant="button">Business</ButtonTypoStyled>
          </div>
        </div>
        {/* <Typography style={{letterSpacing: 1.25, fontWeight: '500', fontSize: 14, marginBottom: 40}} variant="body1" component="p">
          Sign up here if you are a {accountType === 'Business' ? 'business' : 'educational'}  establishment. For example a school, college, nursery.
        </Typography> */}

         <Typography style={{letterSpacing: 1.25, fontWeight: '500', fontSize: 14, marginBottom: 40}} variant="body1" component="p">
         {accountType === 'Business' ? 'Sign up here if you are a business establishment. For example a fast food service, service provider, Pharmacy, Hairdresser, health care provider etc.' : 'Sign up here if you are a educational establishment. For example a school, college, nursery.'}
        </Typography>

        <Grid container spacing={1}>
          <Grid item md={6} xs={12}  spacing={8}>
            <TextField
              id="schoolname"
              onChange={handleToChange}
              name="sc_bessi_name"
              value={formValue.sc_bessi_name}
              label={accountType === 'Business' ? 'Business Name' : 'School Name'}
              variant="outlined"
              fullWidth
              error={!!fromValidation.sc_bessi_name}
              helperText={fromValidation.sc_bessi_name}
              margin="normal"
            />
          </Grid>
          <Grid item  md={6} xs={12} spacing={8}>
            <TextField
              id="address"
              onChange={handleToChange}
              name="address"
              value={formValue.address}
              label="Address"
              variant="outlined"
              fullWidth
              error={!!fromValidation.address}
              helperText={fromValidation.address}
              margin="normal"
            />
          </Grid>
          <Grid item  md={6} xs={12} spacing={5}>
            <TextField
              id="postcode"
              onChange={handleToChange}
              name="post_code"
              value={formValue.post_code}
              label="Postcode"
              variant="outlined"
              fullWidth
              error={!!fromValidation.post_code}
              helperText={fromValidation.post_code}
              margin="normal"
            />
          </Grid>
          <Grid item  md={6} xs={12} spacing={5}>
            <TextField
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              fullWidth
              value={formValue.email}
              onChange={handleToChange}
              error={!!fromValidation.email}
              helperText={fromValidation.email}
              margin="normal"
            />
          </Grid>
          <Grid item  md={6} xs={12} spacing={5}>
          <TextField
              id="contact_person"
              name="contact_person"
              label="Contact Person"
              variant="outlined"
              fullWidth
              value={formValue.contact_person}
              onChange={handleToChange}
              error={!!fromValidation.contact_person}
              helperText={fromValidation.contact_person}
              margin="normal"
            />
          </Grid>
          <Grid item  md={6} xs={12} spacing={5}>
            <TextField
              id="mobile_no"
              name="mobile_no"
              label="Contact Number"
              variant="outlined"
              fullWidth
              value={formValue.mobile_no}
              onChange={handleToChange}
              error={!!fromValidation.mobile_no}
              helperText={fromValidation.mobile_no}
              margin="normal"
            /></Grid>
               <Grid item  md={6} xs={12} spacing={5}>
            <FormControl variant="outlined" error={!!fromValidation.password} fullWidth margin="normal">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                fullWidth
                name="password"
                value={formValue.password}
                onChange={handleToChange}
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
              <FormHelperText>{fromValidation.password}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12} spacing={5}>
          <FormControl variant="outlined" error={!!fromValidation.confirm_password} fullWidth margin="normal">
              <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-confirm-password"
                type={values.showConfirmPassword ? 'text' : 'password'}
                fullWidth
                name="confirm_password"
                value={formValue.confirm_password}
                onChange={handleToChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={130}
              />
              <FormHelperText>{fromValidation.confirm_password}</FormHelperText>
            </FormControl>
          </Grid>
          {/* <Grid item xs={6} spacing={5}>
            <FormControl variant="outlined" error={!!fromValidation.confirmpassord} fullWidth margin="normal">
              <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                name="confirmpassord"
                value={formValue.confirmpassord}
                onChange={handleToChange}
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
                labelWidth={135}
              />
              <FormHelperText>{fromValidation.confirmpassord}</FormHelperText>
            </FormControl>
          </Grid> */}

          <Grid item  md={7} xs={12} spacing={5}>
            <Box flexDirection="row" style={{ textAlign: 'left', cursor: 'pointer',color: '	#484848',  }} onClick ={generatePassword}>
             Suggest Password
            </Box>
          </Grid>
          <Grid item  md={7} xs={12} spacing={5}>
            <Box flexDirection="row" style={{ textAlign: 'left' }}>
              <Typography style={{fontSize: 14, fontWeight: '500'}} component="span">By clicking Create Account I agree to Rymindr </Typography>
              <LinkStyled style={{fontSize: 14, fontWeight: '500'}} onClick={() => { window.open('https://rymindr.com/policy/', '_blank'); }}>Terms & Conditions, Privacy Policy.</LinkStyled>
            </Box>
          </Grid>
          <Grid item md={5} xs={12} spacing={5} style={{ textAlign: 'right' }}>
            <Button style={{fontSize: 14, fontWeight: '500'}} onClick={handleToSubmit} variant="contained" color="primary" size="large" disabled={loading}>
              {loading && <CircularSpinner />}
              Create an Account
            </Button>
          </Grid>
        </Grid>
        <Box flexDirection="row" mt={4}>
          <Typography style={{fontSize: 14, fontWeight: '500'}} component="span">Already have an account? </Typography>
          <LinkStyled style={{fontSize: 14, fontWeight: '500'}} to="/login">Login</LinkStyled>
        </Box>
      </PaperStyled>
    </GridStyled>
  );
};
const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error2: state.auth.error2,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    noRegister: (data, history) => dispatch(register(data, history)),
  };
};

Register.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  noRegister: PropTypes.func.isRequired,
  error2: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Register));
