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

import { Send, Drafts, Close, Delete, Edit, ViewAgenda } from '@material-ui/icons';

import { createTemplateForm, deleteTemplateData, getTemplatesList } from '../../store/actions/formBuilder';
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
import clsx from 'clsx';
import moment from 'moment';
import RymindrOriginal from '../../assets/images/rymindr_original.png';
import ResponsiveDialog from '../HistoryRymindrs/UpcomingRymindr/Modal/RymindrModalDelete';
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
  paddingLeft: '10rem',
  paddingRight: '10rem',
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
  'button :focus': {
    outline:'none !important'
  }
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

const FormTemplates = (props) => {
  const { user_id, business_code, first_name, last_name, default_category } = JSON.parse(
    localStorage.getItem('userData')
  );
  const {
    error,
    groups,
    businessusers,
    createTemplateForm,
    //matched_contact,
    loading,
    success_message2,
    enqueueSnackbar,
    getTemplatesList,
    formlistdata2,
    deleteTemplate
  } = props;
  const history = useHistory();
  const classes = useStyles();

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
  const { member_id, group_id, get_name } = useParams();
  const [showForm, setShowForm] = useState({});
  const [builderData, setBuilderData] = useState({});
  const [subject, setSubject] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [getFormData, setFormData] = useState([]);
  const [openDelete , setOpenDelete]=useState(false)
  const [ submitLoad, setSubmitLoad ]= useState(false)
  const handleClickOpen = () => {
    setOpen(true);
    setSubmitLoad(false)
  };
  const handleCloseModal = () => {
    setOpen(false);
    setBuilderData({})
    setSubject('')
    setSubErr('')
    setFormErr('')
  };

  const handleClickOpen3 = () => {
    setOpen3(true);
  };
  const handleCloseModal3 = () => {
    setOpen3(false);
  };

  const onPost = (data) => {
    setBuilderData(data);
    //console.log('onPost=========', data);
    if (builderData.task_data != undefined && builderData.task_data.length==0){
      setFormErr('Select at least one form element.')
    }
    else{
      setFormErr('')
    }
  };

  const handleToopen = () => {
    setOpen2(true);
  };

  useEffect(() => {
    getTemplatesList({ user_id });
    // if (!loading) {
    //   SuccessEvent(false)
    // }
  }, [getTemplatesList]);

  useEffect(() => {
    if (formlistdata2 && formlistdata2.length > 0) {
      setFormData(formlistdata2);
      setSelectedItem(formlistdata2[0].id);
      let getForm = JSON.parse(formlistdata2[0].builder_data).task_data;
      setShowForm({ data: getForm, title: formlistdata2[0].title , id: formlistdata2[0].id});
    }
    else{
      setFormData(formlistdata2)
      setShowForm({});
    }
  }, [formlistdata2]);

  useMemo(() => {
    if (success_message2) {
      success_message2 && enqueueSnackbar(success_message2, { variant: 'success' });
      history.push('/form-templates');
      handleCloseModal();
    }
  }, [success_message2]);

  useMemo(() => {
    error && enqueueSnackbar(error, { variant: 'error' });
  }, [error]);

  const handleToSubmit = () => {
    if (validate()) return false;
    const FormFields11 = {};
    FormFields11.title = subject;
    FormFields11.builderData = JSON.stringify(builderData);
    console.log('FormFields11=========', FormFields11);
    setSubmitLoad(true)
    createTemplateForm(FormFields11, history,user_id);
    setBuilderData({})
    setSubject('')
    return false;
  };

  const validate = () => {
    let isError = false;

    if (Object.keys(builderData).length == 0 || builderData.task_data.length == 0) {
      isError = true;
      setFormErr('Select at least one form element.');
    } else {
      setFormErr('');
    }

    if (!subject ) {
      isError = true;
      setSubErr('Please add some subject.');
    }
    return isError;
  };

  const subjectHandleinput = (e, isEditor = null) => {
    setSubject(e.target.value);
    if (!e.target.value && e.target.value == '') {
      setSubErr('Please add some subject.');
    } else {
      setSubErr('');
    }
  };

  const handleInputChange = (id) => {
    setSelectedItem(id);
    console.log('id====', id);
    let result = getFormData.filter((a) => a.id == id);
    if (result.length > 0) {
      let getForm = JSON.parse(result[0].builder_data).task_data;
      console.log('getForm====', getForm);
      setShowForm({ data: getForm, title: result[0].title , id:id});
    }
  };

  const EventBookList =
  getFormData !== null && getFormData.length > 0 ? (
    getFormData.map((item, index) => (
      <>
          <Hidden smDown implementation="css">
            <ListItem button selected={item.id == selectedItem} onClick={(event) => handleInputChange(item.id)}>
              <ListItemText
                primary={<div class="text-container">{item.title}</div>}
                secondary={<TypoListSubtext>{`${moment(item.created_at).format('DD-MMMM-YYYY')}`}</TypoListSubtext>}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </Hidden>
        </>
      ))
    ) : (
      <List>No Templates created.</List>
    );

  const handlesearch = (e) => {
    const searchStr = e.target.value;
    console.log('searchStr=====', searchStr);
    //setSearchvalue(searchStr);
    if (searchStr.length > 1) {
      const filteredList = formlistdata2.filter((obj) => obj.title.toLowerCase().includes(searchStr.toLowerCase()));
      setFormData(filteredList);
    } else {
      setFormData(formlistdata2);
    }
  };

  const handleDeleteTemplate=(id)=>{
    deleteTemplate({id,user_id})
    setOpenDelete(false)
  }

  const handleClose=()=>{
    setOpenDelete(false)
  }

  return (
    <>
      <Grid className="main-wrap-head" container style={{ marginBottom: 20 }} alignItems="center">
        <Grid item xs={5}>
          <Box display="flex" alignItems="center">
            <TypoHeadStyled variant="h4">Template builders</TypoHeadStyled>
          </Box>
        </Grid>

        <Grid item xs={7}>
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              size="large"
              className="mr-10"
              startIcon={<Drafts />}
              //onClick={() => history.push('/event-bookings')}
              onClick={handleClickOpen}
            >
              Create Template
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className="mr-10"
              startIcon={<Drafts />}
              //onClick={() => history.push('/event-bookings')}
              onClick={() => history.push('/form-builders')}
            >
              Form Builders
            </Button>
          </Box>
        </Grid>

        <Dialog open={open3} onClose={handleCloseModal3} aria-labelledby="form-dialog-title" maxWidth="lg" fullWidth>
          <DialogTitleStyled id="form-dialog-title">
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <TypoPopHeadStyled>Preview Template</TypoPopHeadStyled>
              <IconButton color="default" onClick={handleCloseModal3}>
                <Close />
              </IconButton>
            </Box>
          </DialogTitleStyled>

          <DialogContent>
            <GridStyled container className="article-content" spacing={5}>
              <Grid item xs={12}>
                {builderData && builderData.task_data ? (
                  <ReactFormGenerator
                    download_path=""
                    answer_data={{}}
                    // action_name="Save"
                    form_action="/"
                    form_method="POST"
                    variables={variables}
                    data={builderData.task_data}
                    hide_actions={true}
                    // onSubmit={() => {
                    //   console.log('onSubmit');
                    // }}
                  />
                ) : null}
              </Grid>
            </GridStyled>
          </DialogContent>
        </Dialog>

        <Dialog open={open} onClose={handleCloseModal} aria-labelledby="form-dialog-title" maxWidth="xl" fullWidth>
          <DialogTitleStyled id="form-dialog-title">
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <TypoPopHeadStyled>Templates Builder</TypoPopHeadStyled>
              <IconButton color="default" onClick={handleCloseModal}>
                <Close />
              </IconButton>
            </Box>
          </DialogTitleStyled>

          <DialogContent>
            <GridStyled container className="article-content" spacing={5}>
              <Grid item xs={8}>
                <TextField
                  label="Subject"
                  fullWidth
                  variant="outlined"
                  name="subject"
                  value={subject}
                  onChange={subjectHandleinput}
                  error={!!subErr}
                  helperText={subErr}
                  className="mb-40"
                />
              </Grid>
              <Grid item xs={12}>
                <ReactFormBuilder onPost={onPost} />
                <p className="error">{formErr}</p>
              </Grid>

              <Grid item xs={12}></Grid>

              <Grid item xs={12}>
                <Box display="flex" justifyContent="flex-end">
                  <ButtonWarn
                    onClick={handleToSubmit}
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<Send />}
                    disabled={submitLoad}
                  >
                    { submitLoad && <CircularSpinner />}
                    Create Template
                  </ButtonWarn>
                  {builderData && builderData.task_data && builderData.task_data.length > 0 ? (
                    <ButtonWarn
                      className="btn-booking"
                      onClick={handleClickOpen3}
                      variant="contained"
                      color="primary"
                      size="large"
                      startIcon={<ViewAgenda />}
                    >
                      Preview Template
                    </ButtonWarn>
                  ) : null}
                </Box>
              </Grid>
            </GridStyled>
          </DialogContent>
        </Dialog>
      </Grid>

      {/* <Grid className="main-wrap-body booking-cont-wrap" container alignItems="stretch">
        <Grid item xs={12} md={4} className="pr-25 leftSide-cont">
          <Paper className={clsx(classes.paper, 'sideBar-scroll')}>
            <List style={{ maxHeight: 650 }}>{EventBookList}</List>
          </Paper>
        </Grid>
      </Grid> */}

      <Grid className="main-wrap-body upcmgRym-cont-wrap" container alignItems="stretch">
        <Grid item xs={12} md={4} className="pr-25 leftSide-cont">
          <Paper className={clsx(classes.paper, 'sideBar-scroll')}>
            <div class="form-group has-search">
              <span class="fa fa-search form-control-feedback"></span>
              <input type="text" class="form-control" onKeyUp={handlesearch} placeholder="Search Templates" />
            </div>
            <List style={{ maxHeight: 650 }}>{EventBookList}</List>
          </Paper>
        </Grid>

        {showForm.data && showForm.data.length > 0 ? (<>
        <Grid item xs={12} md={8} className={clsx(classes.rightPanel, 'rightSide-cont')}>
          <Paper className={classes.paper2}>
            <GridStyled container alignItems="center" style={{paddingLeft: '2rem', paddingRight : '2rem'}}>
              <Grid xs={6} >
                <BoxStyled alignItems="left">
                  <Typography alignItems="left">
                    <Box fontWeight="fontWeightBold" m={1}>
                      {showForm.title}
                    </Box>
                  </Typography>
                </BoxStyled>
              </Grid>
              {/* <Grid xs={3}>
                <Box display="flex" justifyContent="flex-end">
                  <Button variant="outlined" color="primary" className="mr-10">
                    Show Results
                  </Button>
                  </Box>
                </Grid> */}
            <Grid xs={6}>
              <Box display="flex" justifyContent="flex-end">
              <ButtonPlain
                id='btn1'
                disableRipple
                onClick={()=> setOpenDelete(true)}
                startIcon={<Delete style={{ color: '#ec4d4b' }} />}
                style={{}}
                >
                Delete
              </ButtonPlain>
            </Box>
            </Grid>
                </GridStyled>
            
            <ResponsiveDialog open={openDelete} handleClose={handleClose}  deleteRymindr={()=>handleDeleteTemplate(showForm.id)} type="Template"/>

            <ListStyled>
              <ListItem alignItems="flex-start">
                <Grid item xs={12}>
                    <ReactFormGenerator
                      answer_data={{}}
                      //action_name="Save"
                      form_action="/"
                      form_method="POST"
                      variables={variables}
                      data={showForm.data}
                      hide_actions={true}
                      // submitButton={
                      //   <button type={'submit'} className={'btn btn-primary'}>
                      //     Submit
                      //   </button>
                      // }
                      // onSubmit={() => {
                      //   console.log('onSubmit');
                      // }}
                    />
                </Grid>
              </ListItem>
            </ListStyled>
          </Paper>
        </Grid>
          </>
          ) : 
          <Grid item xs={12} md={8} className={clsx(classes.rightPanel, 'rightSide-cont')}>
          <Paper className={clsx(classes.paper2, 'sideBar-scroll')}>
          <Box className={classes.content} style={{ margin: 'auto' }}>
          <CardMedia
            className={classes.icon}
            image={RymindrOriginal}
            title="Message Center"
            component="img"
          />
          <Typography className={classes.commingSoonDesc}>
            No record found.
          </Typography>
        </Box>
        </Paper>
        </Grid>
        }
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
    formlistdata2: state.formBuilder.formlistdata2,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createTemplateForm: (data, history,user_id) => dispatch(createTemplateForm(data, history,user_id)),
    getTemplatesList: (data) => dispatch(getTemplatesList(data)),
    deleteTemplate:(data)=> dispatch(deleteTemplateData(data))
  };
};

FormTemplates.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  groups: PropTypes.array.isRequired,
  getTemplatesList: PropTypes.func.isRequired,
  success_message2: PropTypes.any.isRequired,
  createTemplateForm: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  formlistdata2: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(FormTemplates));
