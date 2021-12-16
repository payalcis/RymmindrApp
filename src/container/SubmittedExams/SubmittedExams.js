import { makeStyles, styled, withStyles } from '@material-ui/core/styles';

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

import { Send, Drafts, Close, ArrowBack ,Delete, Edit, ViewAgenda } from '@material-ui/icons';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

import { getSubmittedFormsList } from '../../store/actions/formBuilder';
import { Link, useHistory, useParams, useLocation } from 'react-router-dom';
import React, { useEffect, useMemo, useState } from 'react';
import { ReactFormBuilder, ElementStore, ReactFormGenerator } from 'react-form-builder2';
//import 'react-form-builder2/dist/app.css';
import { connect, useDispatch } from 'react-redux';
import CircularSpinner from '../../component/CircularSpinner/index';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import ConfirmationDialogRaw from '../Bookings/EventBooking/Modal';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Tabmenu from '../Bookings/EventBooking/Modal/Memberlist';
import { MyDocument } from './MyDocument';
import clsx from 'clsx';
import moment from 'moment';

import * as variables from '../../../src/variables';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={'simple-tabpanel-${index}'}
      aria-labelledby={'simple-tab-${index}'}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    position: 'relative',
    height: 100 + '%',
  },

  paper2: {
    padding: theme.spacing(2),

    color: theme.palette.text.secondary,
    position: 'relative',
    height: 100 + '%',
  },

  rightPanel: {
    [theme.breakpoints.up('md')]: {
      display: 'block !important',
    },
  },
  icon: {
    width: 150,
    marginBottom: 40,
  },
  content: {
    textAlign: 'center',
    textAlign: '-webkit-center',
    paddingTop: '15%',
    height: '80vh',
  },
}));

const TypoHeadStyled = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  color: theme.palette.primary.main,
  textTransform: 'uppercase',
  fontWeight: 'bold',
}));

const DialogTitleStyled = styled(DialogTitle)({
  borderBottom: '1px solid #e0e0e0',
  padding: '10px 24px',
  marginBottom: 20,
});

const TypoPopHeadStyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.contrastText,
  fontSize: 18,
  fontWeight: '600',
}));

const TabsStyles = styled(Tabs)(({ theme }) => ({
  borderBottom: '1px solid #ccc',
  '& span': {
    justifyContent: 'center',
  },
}));

const ButtonWarn = styled(Button)(({ theme }) => ({
  background: theme.palette.warning.main,
  color: theme.palette.warning.contrastText,
  marginRight: 5,
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  background: '#FFA502',
}));

const GridStyled = styled(Grid)(({ theme }) => ({
  // paddingLeft: '10rem',
  // paddingRight: '10rem',
  [theme.breakpoints.down('md')]: {
    paddingLeft: '8rem',
    paddingRight: '8rem',
  },

  [theme.breakpoints.down('sm')]: {
    paddingLeft: '2rem',
  },
}));

const TypoListSubtext = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.secondary.contrastText,
}));

const AvatarShareStyled = styled(Avatar)({
  height: 50,
  width: 50,
});

const BoxStyled = styled(Box)({
  display: 'flex',
  '&>span': { marginRight: 10 },
});

const ButtonPlain = styled(Button)(({ theme }) => ({
  color: '#98a5af',
  fontSize: 12,
  textTransform: 'capitalize',
  background: 'none',
  boxShadow: 'none',
}));
const BoxColorStyled = styled(Box)({
  background: '#f0f6fb',
  fontSize: 12,
  padding: '10px 15px',
  borderRadius: 15,
  minWidth: 160,
  justifyContent: 'space-between',
});
const ListStyled = styled(List)(({ theme }) => ({
  paddingLeft: 20,
}));
function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}
const SubmittedExams = (props) => {
  const { user_id, business_code, first_name, last_name, default_category } = JSON.parse(
    localStorage.getItem('userData')
  );
  const {
    error,
    groups,
    businessusers,
    //matched_contact,
    loading,
    success_message2,
    enqueueSnackbar,
    getSubmittedFormsList,
    submittedformsdata,
  } = props;
  const history = useHistory();
  const classes = useStyles();
  const forceUpdate = useForceUpdate();
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [toErr, settoErr] = useState('');
  const [formErr, setFormErr] = useState('');
  const [subErr, setSubErr] = useState('');
  const [checkOnSelectAllGroup, setcheckOnSelectAllGroup] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState([]);
  const [checked, setChecked] = useState([]);
  const [memberchecked, setMemberchecked] = useState([]);
  const [group_members, setGroup_members] = useState([]);
  const [checkOnSelectAllMembers, setcheckOnSelectAllMembers] = useState(false);
  const [groupname_membersname, setGroupname_membersname] = useState([]);

  const [showForm, setShowForm] = useState({});
  const [builderData, setBuilderData] = useState({});
  const [subject, setSubject] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [examTitle, setExamTitle] = useState('');
  const { exam_id } = useParams();
  const [getFormData, setFormData] = useState(null);
  const [isPDF, setIsPDF] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsPDF(true);
    }, 1000);
    getSubmittedFormsList({ user_id, exam_id: exam_id });
  }, [getSubmittedFormsList]);

  // useEffect(() => {
  //   setFormData(null);
  //   let mounted = true;
  //   setTimeout(function () {
  //     if (mounted) {
  //       if (submittedformsdata && submittedformsdata.length > 0) {
  //         setFormData(submittedformsdata);
  //         setExamTitle(submittedformsdata[0].title);
  //         setSelectedItem(submittedformsdata[0].id);
  //         // let getForm = JSON.parse(submittedformsdata[0].builder_data).task_data;
  //         // let form_data = JSON.parse(submittedformsdata[0].form_data);
  //         let getForm = null;
  //         if (submittedformsdata[0].builder_data) {
  //           getForm = JSON.parse(submittedformsdata[0].builder_data).task_data;
  //         }
  //         let form_data = null;
  //         if (submittedformsdata[0].form_data) {
  //           form_data = JSON.parse(submittedformsdata[0].form_data);
  //         }

  //         setShowForm({
  //           data: getForm,
  //           title: submittedformsdata[0].title,
  //           form_data: form_data,
  //           id: submittedformsdata[0].id,
  //           user_id: submittedformsdata[0].user_id,
  //           first_name: submittedformsdata[0].first_name,
  //           last_name: submittedformsdata[0].last_name,
  //           mobile_no: submittedformsdata[0].mobile_no,
  //           is_delete: submittedformsdata[0].is_delete,
  //         });
  //       } else {
  //         setExamTitle('');
  //       }
  //     }
  //   }, 0);
  //   return function cleanup() {
  //     mounted = false;
  //   };
  // }, [submittedformsdata]);

  useEffect(() => {
    console.log('submittedformsdatasubmittedformsdatasubmittedformsdata=', submittedformsdata);
    //setFormData(null);
    let mounted = true;
    // setTimeout(function () {
    //   if (mounted) {
    if (submittedformsdata && submittedformsdata.length > 0) {
      setFormData(submittedformsdata);
      setExamTitle(submittedformsdata[0].title);
      setSelectedItem(submittedformsdata[0].id);
      // let getForm = JSON.parse(submittedformsdata[0].builder_data).task_data;
      // let form_data = JSON.parse(submittedformsdata[0].form_data);
      let getForm = null;
      if (submittedformsdata[0].builder_data) {
        getForm = JSON.parse(submittedformsdata[0].builder_data).task_data;
      }
      let form_data = null;
      if (submittedformsdata[0].form_data) {
        form_data = JSON.parse(submittedformsdata[0].form_data);
      }

      setShowForm({
        data: getForm,
        title: submittedformsdata[0].title,
        form_data: form_data,
        id: submittedformsdata[0].id,
        user_id: submittedformsdata[0].user_id,
        first_name: submittedformsdata[0].first_name,
        last_name: submittedformsdata[0].last_name,
        mobile_no: submittedformsdata[0].mobile_no,
        is_delete: submittedformsdata[0].is_delete,
      });
    } else {
      setFormData([]);
      setExamTitle('');
      setSelectedItem('');
    }
    //   }
    // }, 0);
    // return function cleanup() {
    //   mounted = false;
    // };
  }, [submittedformsdata]);

  useMemo(() => {
    if (success_message2) {
      success_message2 && enqueueSnackbar(success_message2, { variant: 'success' });
      history.push('');
      handleCloseModal();
    }
  }, [success_message2]);

  useMemo(() => {
    error && enqueueSnackbar(error, { variant: 'error' });
  }, [error]);

  const handleInputChange = (id) => {
    setSelectedItem(id);

    console.log('id====', id);
    let result = getFormData.filter((a) => a.id == id);
    console.log('result=======', result);
    if (result.length > 0) {
      let getForm = null;
      if (result[0].builder_data) {
        getForm = JSON.parse(result[0].builder_data).task_data;
      }

      let form_data = null;
      if (result[0].form_data) {
        form_data = JSON.parse(result[0].form_data);
      }

      console.log('handleInputChange=======', form_data);
      setShowForm({
        data: getForm,
        title: result[0].title,
        form_data: form_data,
        id: id,
        user_id: result[0].user_id,
        first_name: result[0].first_name,
        last_name: result[0].last_name,
        mobile_no: result[0].mobile_no,
        is_delete: result[0].is_delete,
      });
    }
  };

  const EventBookList =
    getFormData !== null && getFormData.length > 0 ? (
      getFormData.map((item, index) => (
        <>
          <Hidden smDown implementation="css">
            <ListItem button selected={item.id == selectedItem} onClick={(event) => handleInputChange(item.id)}>
              <ListItemText
                primary={
                  <>
                    <div class="text-container">
                      {item.first_name} {item.last_name} ({item.mobile_no})
                    </div>
                    <b>{item.is_delete == 1 ? 'Declined' : 'Submitted'}</b>
                  </>
                }
                secondary={<TypoListSubtext>{`${moment(item.created_at).format('DD-MMMM-YYYY')}`}</TypoListSubtext>}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </Hidden>
        </>
      ))
    ) : (
      <List>No Submitted Exams Found.</List>
    );

  const handlesearch = (e) => {
    const searchStr = e.target.value;
    if (searchStr.length > 1) {
      //const filteredList = submittedformsdata.filter((obj) => obj.title.toLowerCase().includes(searchStr.toLowerCase()));

      const filteredList = submittedformsdata.filter(
        (obj) =>
          obj.first_name.toLowerCase().includes(searchStr.toLowerCase()) ||
          obj.last_name.toLowerCase().includes(searchStr.toLowerCase()) ||
          obj.mobile_no.toLowerCase().includes(searchStr.toLowerCase()) ||
          (obj.first_name + ' ' + obj.last_name).toLowerCase().includes(searchStr.toLowerCase())
      );

      setFormData(filteredList);
    } else {
      setFormData(submittedformsdata);
    }
  };

  let downloadfun = () => {
    window.print();
  };

  return (
    <>
      <Grid className="main-wrap-head" container style={{ marginBottom: 20 }} alignItems="center">
        <Grid item xs={5}>
          <Box display="flex" alignItems="center">
            <IconButton
              color='inherit'
              onClick={() => history.goBack()}
            >
              <ArrowBack />
            </IconButton>
            <TypoHeadStyled variant="h4">{examTitle}</TypoHeadStyled>
          </Box>
        </Grid>
      </Grid>

      <Grid className="main-wrap-body upcmgRym-cont-wrap" container alignItems="stretch">
        <Grid item xs={12} md={4} className="pr-25 leftSide-cont">
          <Paper className={clsx(classes.paper, 'sideBar-scroll')}>

            {getFormData !== null && getFormData.length > 0 ? (
              <Box display="flex" justifyContent="center">
                <Button
                  variant="outlined"
                  color="primary"
                  className="mr-10"
                  onClick={() => {
                    window.open(`/#/download-exam-attempt-inone/${exam_id}`, '_blank');
                  }}
                >
                  Download All in one PDF
                </Button>
              </Box>
            ) : null}
            <hr />

            <div class="form-group has-search">
              <span class="fa fa-search form-control-feedback"></span>
              <input type="text" class="form-control" onKeyUp={handlesearch} placeholder="Search Contacts" />
            </div>
            {/* <List style={{ maxHeight: 650 }}>{EventBookList}</List> */}
            {/* <List>{getFormData != undefined ? EventBookList : loading && <CircularSpinner />}</List> */}
            <List>{getFormData != null ? EventBookList : loading && <CircularSpinner />}</List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8} className={clsx(classes.rightPanel, 'rightSide-cont')}>
          <Paper className={classes.paper2}>
            {getFormData !== null && getFormData.length > 0 ? (
              <GridStyled container id="left" style={{padding:'0px'}}>
                <Grid xs={6}>
                  <BoxStyled alignItems="left">
                    <Typography alignItems="left">
                      <Box fontWeight="fontWeightBold" m={3}>
                        {` ${showForm.first_name} ${showForm.last_name} ( ${showForm.mobile_no} )`}
                      </Box>
                    </Typography>
                  </BoxStyled>
                </Grid>
                <Grid xs={6}>
                  <Box display="flex" justifyContent="flex-end">

                    {
                      getFormData !== null && getFormData.length > 0 ?
                        (
                          showForm.is_delete == 0 ?
                            <Button
                              variant="outlined"
                              color="primary"
                              className="mr-10"
                              onClick={() => {
                                window.open(`/#/download-exam-attempt/${exam_id}/${showForm.user_id}`, '_blank');
                              }
                              }>
                              Download PDF
                            </Button> :

                            <Button
                              variant="outlined"
                              className="mr-10"
                              style={{ color: 'red' }}
                              disabled={true}>
                              DECLINED
                            </Button>
                        )
                        : null
                    }

                  </Box>
                </Grid>
              </GridStyled>
            ) : null}
            <ListStyled>
              <ListItem alignItems="flex-start">
                {getFormData !== null && getFormData.length > 0 ? (
                  <Grid item xs={12}>
                    {showForm.is_delete == 0 ? (
                      showForm.data && showForm.data.length > 0 ? (
                        <ReactFormGenerator
                          hide_actions={true}
                          form_action="/"
                          form_method="POST"
                          variables={variables}
                          data={showForm.data}
                          answer_data={showForm.form_data}
                        />
                      ) : null
                    ) : submittedformsdata !== null && submittedformsdata.length > 0 ? (
                      <Typography alignItems="left">
                        <Box fontWeight="fontWeightBold" m={3}>
                          Declined to attempt
                        </Box>
                      </Typography>
                    ) : null}
                  </Grid>
                ) : null}
              </ListItem>
            </ListStyled>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.rymidr.loading,
    error: state.rymidr.error,
    groups: state.rymidr.groups,

    success_message2: state.formBuilder.success_message2,
    submittedformsdata: state.formBuilder.submittedformsdata,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSubmittedFormsList: (data) => dispatch(getSubmittedFormsList(data)),
  };
};

SubmittedExams.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  groups: PropTypes.array.isRequired,
  getSubmittedFormsList: PropTypes.func.isRequired,
  success_message2: PropTypes.any.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  submittedformsdata: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(SubmittedExams));
