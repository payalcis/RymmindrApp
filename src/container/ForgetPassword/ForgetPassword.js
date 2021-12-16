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
import { Link, Redirect ,useHistory} from 'react-router-dom';
import React, { useEffect,useMemo, useState } from 'react';
import CircularSpinner from '../../component/CircularSpinner/index';
import PropTypes from 'prop-types';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { connect } from 'react-redux';
import { styled } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import { requestOtp } from '../../store/actions/auth';

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

const FormFields = { email: '', password: '' };
const ForgetPassword = (props) => {
  const { enqueueSnackbar, error } = props;
  const history = useHistory();

  useEffect(() => {
    error && enqueueSnackbar(error, { variant: 'error' });
  }, [error]);
  useMemo(() => {
    error && enqueueSnackbar(error, { variant: 'error' });
  }, [error]);
  const [values, setValues] = useState({
    email: '',
    
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
    console.log(formvalues)
    if (!formvalues.email) {
      error = true;
      formerr.email = 'Email is required!';
      setFormvalidation(formerr);
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formvalues.email)) {
      error = true;
      formerr.email = 'Invalid email address';
      setFormvalidation(formerr);
    }

   
    return error;
  };

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    if (handlevalidation()) return false;
    const data = {
        email:formvalues.email,
      }
    props.onAuth(data, history);
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
        {/* <img style={{width: 130}} src={require('../../assets/images/login_logo.png')} /> */}
        <TypoStyled variant="h6">FORGET PASSWORD</TypoStyled>
        
        <Typography style={{marginBottom: 40, display: "inline-block", fontWeight: '500', fontSize: '14px'}} component="span">Please enter your registered email</Typography>
        
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
          <Box my={4}>
            <LinkStyled style={{fontSize: 14, fontWeight: '500'}} to="/login">Return to Login Again?</LinkStyled>
          </Box>

          <Box>
            <Button type="submit" variant="contained" color="primary" size="large">
              {props.loading && <CircularSpinner />}
              REQUEST CODE
            </Button>
          </Box>
        </form>
        <Box flexDirection="row" mt={4}>
          <Typography style={{fontSize: 14, fontWeight: '500'}} component="span">Don’t have an account? </Typography>
          <LinkStyled style={{fontSize: 14, fontWeight: '500'}} to="/register">Create Account</LinkStyled>
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
    onAuth: (email, history) => dispatch(requestOtp(email, history)),
  };
};

ForgetPassword.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  onAuth: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(ForgetPassword));
