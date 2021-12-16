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
import { Link, Redirect,useParams ,useHistory} from 'react-router-dom';
import React, { useEffect,useMemo, useState } from 'react';
import CircularSpinner from '../../component/CircularSpinner/index';
import PropTypes from 'prop-types';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { connect } from 'react-redux';
import { styled } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import { email_verify } from '../../store/actions/auth';

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
const Authenticate = (props) => {
  const { enqueueSnackbar, error } = props;
  const {getemail,getotp} = useParams();
  useEffect(() => {
    error && enqueueSnackbar(error, { variant: 'error' });
  }, [error]);
  useMemo(() => {
    error && enqueueSnackbar(error, { variant: 'error' });
  }, [error]);
  useEffect(() => {
    const data = {
      email:getemail,
      otp:getotp
    }
    props.onAuth(data, history);
  }, [getemail,getotp]);

  
  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
  });

  const [formvalues, setFormvalues] = useState(FormFields);
  const [formvalidation, setFormvalidation] = useState(FormFields);

 
  const history = useHistory();


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
        <TypoStyled variant="h6">Authenticate</TypoStyled>

        
            {/* <Button onClick={loginSubmitHandler} variant="contained" color="primary" size="large">
              {props.loading && <CircularSpinner />}
              Confirm 
            </Button> */}
          
        
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
    onAuth: (email, history) => dispatch(email_verify(email,history)),
  };
};

Authenticate.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  onAuth: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Authenticate));
