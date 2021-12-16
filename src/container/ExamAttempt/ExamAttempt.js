import * as actions from '../../store/actions/index';

import { Attachment, Replay, Send, Headset, Videocam, Description } from '@material-ui/icons';
import {
  Box,
  Button,
  FormControl,
  Dialog,
  DialogActions ,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  ListItem,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link, Redirect, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme, styled } from '@material-ui/core/styles'
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { getFormBuilderList } from '../../store/actions/formBuilder';
import { ReactFormBuilder, ElementStore, ReactFormGenerator } from 'react-form-builder2';
import * as variables from '../../../src/variables';
import axios from 'axios';

const GridStyled = styled(Grid)({
  height: '100vh',
});

const PaperStyled = styled(Paper)({
  width: 1000,
  textAlign: 'center',
  padding: 40,
  borderRadius: 10,
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

const TypoHeadStyledError = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  color: 'red',
  fontWeight: 'bold',
  textAlign: 'center',
}));

const TypoHeadStyled = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  color: theme.palette.primary.main,
  fontWeight: 'bold',
  textAlign: 'center',
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  background: '#FFA502',
}));
const FormFields = { email: '', password: '' };
const ExamAttempt = (props) => {
  const { getFormBuilderList, enqueueSnackbar } = props;
  const [showForm, setShowForm] = useState([]);

  const [isSubmitted, setIsSubmitted] = useState('');
  const theme = useTheme()
  const [openDelete , setOpenDelete] = useState(false);
  const [getError, setError] = useState('');
  const { exam_id, note_id, token } = useParams();
  const [profImage, setProfImage] = useState('');
  const [userDetail, setUserDetail] = useState({});
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))


  const _onSubmit = (data, flag) => {
    let sendData = { form_data: JSON.stringify(data), exam_id: exam_id, notification_id: note_id, flag: flag };
    if (flag == 2) {
      sendData = { form_data: '', exam_id: exam_id, notification_id: note_id, flag: flag };
    }

    const Axios = () => {
      return axios.create({
        baseURL: 'https://rymindr.com/RymindrApi/api/',
        headers: {
          Accept: 'application/vnd.app.v5+json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
    };

    const response = Axios().post('/user/exam-form', sendData);
    //const response = Axios().post('/user/exam-form', { });
    response
      .then(function (result) {
        console.log('result====', result);
        if (result.data.status == 1) {
          enqueueSnackbar(result.data.message, { variant: 'success' });
          setIsSubmitted(result.data.message);
        } else {
          enqueueSnackbar(result.data.message, { variant: 'error' });
        }
      })
      .catch(function (error) {
        enqueueSnackbar('Something went wrong', { variant: 'error' });
      });
  };

  let _decline = () => {
    console.log('sdfsfdsf');
  };

  useEffect(() => {
    console.log('exam_id====', exam_id);
    console.log('token====', token);

    const Axios = () => {
      return axios.create({
        baseURL: 'https://rymindr.com/RymindrApi/api/',
        headers: {
          Accept: 'application/vnd.app.v5+json',
          Authorization: 'Bearer ' + token,
        },
      });
    };

    const response = Axios().post('/user/authenticate', { exam_id: exam_id });
    response
      .then(function (result) {
        console.log('result.data========', result.data);
        if (result.data.status == 1) {
          let getForm = JSON.parse(result.data.data[0].builder_data).task_data;
          setShowForm(getForm);
          setProfImage(result.data.data[0].user.profile_image);
          setUserDetail({ ...result.data.data[0].user });
          console.log('getForm====', getForm);
        } else {
          setError(result.data.message);
          enqueueSnackbar(result.data.message, { variant: 'error' });
        }
      })
      .catch(function (error) {
        enqueueSnackbar('Something went wrong', { variant: 'error' });
        setError('Something went wrong');
        console.log('err--',error)
      });
  }, [exam_id, token]);

  return (
    <>
    <Dialog  open={openDelete}  aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title' />
        <DialogContent>
          <DialogContentText>Are you sure want to decline ?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonStyled autoFocus  onClick={()=> setOpenDelete(false)}>
            Cancel
          </ButtonStyled>
          <Button  color='primary' 
          autoFocus 
          onClick={
            () => {
              setOpenDelete(false)
              _onSubmit(null, 2)
            }} >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    <GridStyled container justify="center" alignItems="center" className="loginBg">
      <PaperStyled>
        {/* <img style={{ width: 130 }} src={require('../../assets/images/login_logo.png')} /> */}
        {userDetail && !isSubmitted? (
          <>
            {profImage ? (
              <img style={{ width: 65, borderRadius: '50%' ,height : 65 , marginRight : '5px'}} src={profImage} />
            ) : (
              <img style={{ width: 65 ,  marginRight : '5px' }} src={require('../../assets/images/admin.png')} />
            )}
            <TypoHeadStyled variant="h1" style={{ marginTop: '15px', fontSize: '30px' , marginLeft : '5px'}}>
              {userDetail.first_name} &nbsp;{userDetail.last_name}
            </TypoHeadStyled>
          </>
        ) : null}
      
          <img src={require('../../assets/images/footer_logo.png')} style={{ height: '30px' , marginRight : '3px'}} />


        {/* <TypoStyled variant="h6">LOGIN</TypoStyled> */}
        {/* <IconButton
          aria-label='account of current user'
          aria-controls='primry-search-account-menu'
          aria-haspopup='true'
          color='inherit'
        >
          <AccountCircle style={{width: '130px'}}/>
        </IconButton> */}

        <ListItem alignItems="flex-start">
          <Grid item xs={12}>
            {!isSubmitted ? (
              showForm && showForm.length > 0 ? (
                <>
                  <Grid item xs={12} className="form_preview">
                    <ReactFormGenerator
                      answer_data={{}}
                      //action_name="Save"
                      form_action="/"
                      form_method="POST"
                      variables={variables}
                      data={showForm}
                      // hide_actions={true}
                      submitButton={
                        <button 
                        type={'submit'}
                        className={'btn btn-primary'}
                        style={{
                          float: 'right' ,
                          marginTop:'30px' ,
                          fontSize: '0.9375rem',
                          padding: '8px 22px' ,
                          fontWeight:'bold' ,
                          position: 'relative',
                          // left:'11rem'
                          }}>
                          Submit
                        </button>
                      }
                      on_change={() => {
                        console.log('onPost');
                      }}
                      //onSubmit={_onSubmit}
                      onSubmit={(data) => {
                        console.log('data--',data)
                        _onSubmit(data, 1);
                      }}
                    />
                    <button
                      type={'submit'}
                      className={'btn'}
                      style={{
                        float: 'left',
                        background: 'rgb(255, 165, 2)',
                        color: '#fff',
                        padding: '8px 21px',
                        fontSize: '0.9375rem',
                        fontWeight:'bold' ,
                        position : 'absolute',
                        bottom : '14px',
                        left : '12px'
                      }}
                      onClick={() => {
                        setOpenDelete(true)
                      }}
                    >
                      Decline
                    </button>
                  </Grid>
                  {/* <Grid item xs={7}>
                    <Box display="flex" justifyContent="flex-end">
                      <ButtonStyled
                        //onClick={handleToSubmit}
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<Send />}
                      >
                        decline
                      </ButtonStyled>
                    </Box>
                  </Grid> */}
                </>
              ) : (
                <>
                  <TypoHeadStyledError variant="h4">{getError}</TypoHeadStyledError>
                </>
              )
            ) : (
              <TypoHeadStyled variant="h4">{isSubmitted}</TypoHeadStyled>
            )}
          </Grid>
        </ListItem>
      </PaperStyled>
    </GridStyled>
    </>
  );
};

const mapStateToProps = (state) => {
  console.log('state-', state);
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

ExamAttempt.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(ExamAttempt));
