import * as actions from '../../store/actions/index';

import { Attachment, Replay, Send, Headset, Videocam, Description } from '@material-ui/icons';
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  ListItem,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { Link, Redirect, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { styled } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';

import { ReactFormBuilder, ElementStore, ReactFormGenerator } from 'react-form-builder2';
import * as variables from '../../../src/variables';
import axios from 'axios';
import { getFormBuilderList, getExamDetailsForContact } from '../../store/actions/formBuilder';
const GridStyled = styled(Grid)({
  height: '100vh',
});

const PaperStyled = styled(Paper)({
  width: 2000,
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

const TypoContentStyled = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  color: theme.palette.text.primary,
  fontWeight: 'bold',
}));
const FormFields = { email: '', password: '' };
const DownloadExamAttempt = (props) => {
  const { user_id, business_code, first_name, last_name, default_category } = JSON.parse(
    localStorage.getItem('userData')
  );
  const { enqueueSnackbar, formsubmitteddata, getExamDetailsForContact } = props;
  const [showForm, setShowForm] = useState({});

  const [isSubmitted, setIsSubmitted] = useState('');

  const [getError, setError] = useState('');
  const { exam_id, contact_id } = useParams();

  useEffect(() => {
    getExamDetailsForContact({ exam_id: exam_id, contact_id: contact_id });
  }, [getExamDetailsForContact]);
  useEffect(() => {
    if (formsubmitteddata) {
      let getForm = JSON.parse(formsubmitteddata.builder_data).task_data;
      let getFormSubmitted = null;
      if (formsubmitteddata.form_data) {
        getFormSubmitted = JSON.parse(formsubmitteddata.form_data);
      }

      console.log('getForm====', getForm);
      console.log('getFormSubmitted====', getFormSubmitted);
      console.log('formsubmitteddata====', formsubmitteddata);
      setShowForm({
        builder_data: getForm,
        form_data: getFormSubmitted,
        is_delete: formsubmitteddata.is_delete,
        title: formsubmitteddata.title,
        first_name:formsubmitteddata.first_name,
        last_name:formsubmitteddata.last_name,
        mobile_no:formsubmitteddata.mobile_no
      });

      setTimeout(function () {
        window.print();
      }, 1000);
      setTimeout(function(){
        window.close();
      },1000)
    }
  }, [formsubmitteddata]);
  return (
    // <GridStyled container justify="center" alignItems="center" className="loginBg">
    //   <PaperStyled>
    <>
      <ListItem alignItems="flex-start">
        <Grid item xs={12}>
          <div className="main-head-ttl">{showForm.title ? showForm.title : ''}</div>
          <TypoContentStyled>{showForm.first_name} {showForm.last_name} : {showForm.is_delete == '0' ? 'Submitted' : 'Declined'}</TypoContentStyled><br/>
          {showForm.mobile_no}
          <hr />
          {/* <img style={{ width: 130 }} src={require('../../assets/images/login_logo.png')} /> */}
          {showForm && showForm.builder_data && showForm.builder_data.length > 0 ? (
            <>
              <Grid item xs={12} className="form_preview">
                <ReactFormGenerator
                  answer_data={showForm.form_data}
                  //action_name="Save"
                  form_action="/"
                  form_method="POST"
                  variables={variables}
                  data={showForm.builder_data}
                  hide_actions={true}
                />
              </Grid>
              {/* <img style={{ width: 130 }} src={require('../../assets/images/footer_logo.png')} /> */}
            </>
          ) : null}
        </Grid>
      </ListItem>
    </>
    //   </PaperStyled>
    // </GridStyled>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.rymidr.loading,
    error: state.rymidr.error,
    success_message2: state.formBuilder.success_message2,
    formsubmitteddata: state.formBuilder.formsubmitteddata,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFormBuilderList: (data) => dispatch(getFormBuilderList(data)),
    getExamDetailsForContact: (data) => dispatch(getExamDetailsForContact(data)),
  };
};

DownloadExamAttempt.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  getFormBuilderList: PropTypes.func.isRequired,
  getExamDetailsForContact: PropTypes.func.isRequired,
  success_message2: PropTypes.any.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  formsubmitteddata: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(DownloadExamAttempt));
