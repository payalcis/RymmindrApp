import {
    Grid,
    Paper,
    Typography,
  } from '@material-ui/core';
  import { Link,useParams } from 'react-router-dom';
  import React, { useEffect,useMemo, useState } from 'react';
  import CircularSpinner from '../../component/CircularSpinner/index';
  import PropTypes from 'prop-types';
  import { connect } from 'react-redux';
  import { styled } from '@material-ui/core/styles';
  import { withSnackbar } from 'notistack';
  import { deactivate_account } from '../../store/actions/auth';
  
  const GridStyled = styled(Grid)({
    height: '100vh',
  });
  
  const PaperStyled = styled(Paper)({
    width: 377,
    textAlign: 'center',
    padding: 30,
  });
  
  const TypoStyled = styled(Typography)(() => ({
    fontSize: 18,
    marginTop: 20,
    marginBottom: 30,
    fontWeight: 'bold',
  }));
  

  const AccountDeactivate = (props) => {

    const { enqueueSnackbar, error, success_message } = props;
    const {getemail,getotp} = useParams();

    const [deactivated, setDeactivated] = useState(false);

    useMemo(() => {
      error && enqueueSnackbar(error, { variant: 'error' });
    }, [error]);

    useMemo(() => {
        success_message && enqueueSnackbar(success_message, { variant: 'success' });
      }, [success_message]);

    useEffect(() => {
      async function accountDeactivate(){
        const data = {
            email:getemail,
            otp:getotp
          }
          const isDeleted = await props.accountDeactivate(data);
          if(isDeleted.status === true)
            setDeactivated(true);
      }

      accountDeactivate();
    }, [getemail,getotp]);
  
    return (
      <GridStyled container justify="center" alignItems="center" className="loginBg">
        <PaperStyled>
          <img style={{width: 130}} src={require('../../assets/images/login_logo.png')} />
          <TypoStyled variant="h6">
            {!deactivated? 
                <CircularSpinner/ >: 
                'We\'re sorry to see you leave, but we\'d love to have you back! You can recover your account by just signing back in again within 30 days from now.'}</TypoStyled>
        </PaperStyled>
      </GridStyled>
    );
  };
  
  const mapStateToProps = (state) => {
    return {
      loading: state.auth.loading,
      error: state.auth.error,
      success_message: state.auth.success_message,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        accountDeactivate: (email) => dispatch(deactivate_account(email)),
    };
  };
  
  AccountDeactivate.propTypes = {
    enqueueSnackbar: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    accountDeactivate: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
    success_message: PropTypes.any.isRequired,
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(AccountDeactivate));
  