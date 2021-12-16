import * as actions from '../../store/actions/index';

import { Attachment, Replay, Send, Headset, Videocam, Description } from '@material-ui/icons';
import {
  Box,
  Button,
  Divider,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  InputAdornment,
  TextField,
  IconButton,
  Hidden,
  MenuItem,
  Badge,
  Menu,
  Dialog,
  DialogContent,
  DialogTitle,
  AppBar,
  Tabs,
  Tab,
  CardMedia,
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
import { getFormBuilderList, getSubmittedFormsList } from '../../store/actions/formBuilder';
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
  fontSize: 20,
  color: theme.palette.text.primary,
  fontWeight: 'bold',
}));
const FormFields = { email: '', password: '' };
const DownloadExamAttemptInOne = (props) => {
  const { user_id, business_code, first_name, last_name, default_category } = JSON.parse(
    localStorage.getItem('userData')
  );
  const { enqueueSnackbar, submittedformsdata, getSubmittedFormsList } = props;
  const [showForm, setShowForm] = useState([]);

  const [isSubmitted, setIsSubmitted] = useState('');

  const [getError, setError] = useState('');
  const { exam_id, contact_id } = useParams();

  useEffect(() => {
    getSubmittedFormsList({ exam_id: exam_id });
  }, [getSubmittedFormsList]);
  useEffect(() => {
    if (submittedformsdata) {
      submittedformsdata.map(function (item) {
        let getForm = JSON.parse(item.builder_data).task_data;
        item.updatedBuilderData = getForm;

        let getFormSubmitted = null;
        if (item.form_data) {
          getFormSubmitted = JSON.parse(item.form_data);
        }
        item.updatedSubmittedData = getFormSubmitted;
        console.log('item=====', item);
      });

      console.log('submittedformsdata=====', submittedformsdata);

      setShowForm(submittedformsdata);

      setTimeout(function () {
        window.print();
      }, 1000);
      setTimeout(function () {
        window.close();
      }, 1000);
    }
  }, [submittedformsdata]);
  return (
    <>
      {/* <ListItem alignItems="flex-start"> */}
      {showForm !== null && showForm.length > 0 ? (
        <div className="main-head-ttl">{showForm[0].title ? showForm[0].title : ''}</div>
      ) : null}
      {showForm !== null && showForm.length > 0 ? (
        showForm.map((item, index) => (
          <>
            {/* <Hidden smDown implementation="css"> */}
              <ListItem>
                {item && item.updatedBuilderData && item.updatedBuilderData.length > 0 ? (
                  <>
                    {/* <Grid item xs={12} className="form_preview">
                      <ReactFormGenerator
                        answer_data={item.updatedSubmittedData}
                        //action_name="Save"
                        form_action="/"
                        form_method="POST"
                        variables={variables}
                        data={item.updatedBuilderData}
                        hide_actions={true}
                      />
                    </Grid> */}

                    <Grid item xs={12}>
                      <TypoContentStyled>
                        {item.first_name} {item.last_name} : {item.is_delete == '0' ? 'Submitted' : 'Declined'}
                      </TypoContentStyled><br/>
                        {item.mobile_no}
                      <hr />
                      {
                        item.is_delete=='0' ?
                      
                      <ReactFormGenerator
                        answer_data={item.updatedSubmittedData}
                        //action_name="Save"
                        form_action="/"
                        form_method="POST"
                        variables={variables}
                        data={item.updatedBuilderData}
                        hide_actions={true}
                      />:
                      null
                    }
                    </Grid>
                    {/* <Divider variant="inset" component="li" /> */}
                    <hr />
                  </>
                ) : null}
              </ListItem>
              <hr />
              <hr />
            {/* </Hidden> */}
          </>
        ))
      ) : (
        <List>Data Loading.</List>
      )}
      {/* <Grid item xs={12}>
          <div className="main-head-ttl">{showForm.title ? showForm.title : ''}</div>
          <TypoContentStyled>Contactname : {showForm.is_delete == '0' ? 'Submitted' : 'Declined'}</TypoContentStyled>
          <hr />
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
            </>
          ) : null}
        </Grid> */}
      {/* </ListItem> */}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.rymidr.loading,
    error: state.rymidr.error,
    success_message2: state.formBuilder.success_message2,
    submittedformsdata: state.formBuilder.submittedformsdata,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFormBuilderList: (data) => dispatch(getFormBuilderList(data)),
    getSubmittedFormsList: (data) => dispatch(getSubmittedFormsList(data)),
  };
};

DownloadExamAttemptInOne.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  getFormBuilderList: PropTypes.func.isRequired,
  getSubmittedFormsList: PropTypes.func.isRequired,
  success_message2: PropTypes.any.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  submittedformsdata: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(DownloadExamAttemptInOne));
