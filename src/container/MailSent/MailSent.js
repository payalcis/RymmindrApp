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
    Container
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

  const ContainerStyled = styled(Container)({
    // width: 377,
    textAlign: 'center',
    padding: 30,
  });

  const TypoStyled = styled(Typography)(() => ({
    fontSize: 32,
    marginTop: 15 ,
    marginBottom: 0,
    fontWeight: '300',
  }));

  const LinkStyled = styled(Link)(({ theme }) => ({
    color: theme.palette.primary.main,
    textDecoration: 'none',
  }));

  const FormFields = { email: '', password: '' };
  const MailSent = (props) => {
    console.log("Rtessssss", props);
    const { enqueueSnackbar, error } = props;
    const {getemail,getotp, isRegister} = useParams();
    useEffect(() => {
      error && enqueueSnackbar(error, { variant: 'error' });
    }, [error]);
    useMemo(() => {
      error && enqueueSnackbar(error, { variant: 'error' });
    }, [error]);



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
         <ContainerStyled container justify="center" alignItems="center" >
        {authRedirect}
              {
                isRegister == 1 ?
                  <div>
                    <div><img src={require('../../assets/images/sent.svg')} /></div>
                    <TypoStyled variant="h6">Verification Mail has been sent to your mail</TypoStyled>
                    <TypoStyled variant="h6">Please check {getemail}</TypoStyled>
                        {/* <Button onClick={loginSubmitHandler} variant="contained" color="primary" size="large">
                          {props.loading && <CircularSpinner />}
                          Confirm
                        </Button> */}
                  </div>
                :
                <div>
                  <div><img src={require('../../assets/images/sent.svg')} /></div>
                  <TypoStyled style={{marginTop: 47}} variant="h6">We have sent and reset password link to your email</TypoStyled>
                  <TypoStyled style={{color: '#17BAFF'}} variant="h6">Please check {getemail}</TypoStyled>
                </div>
              }
      </ContainerStyled>

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

  MailSent.propTypes = {
    enqueueSnackbar: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    onAuth: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
  };

  export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(MailSent));
