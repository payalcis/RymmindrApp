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

import { createForm, getFormBuilderList, getTemplatesList } from '../../store/actions/formBuilder';

import { getBusinessUsers, getGroups, inviteAndAddMobile } from '../../store/actions/rymidr';

import { Link, useHistory, useParams, useLocation, Redirect } from 'react-router-dom';
import React, { useEffect, useMemo, useState } from 'react';
import { ReactFormBuilder, ElementStore, ReactFormGenerator } from 'react-form-builder2';
import 'react-form-builder2/dist/app.css';

//import '../../assets/style/FormBuilder.css';
import { connect, useDispatch } from 'react-redux';
import CircularSpinner from '../../component/CircularSpinner/index';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import ConfirmationDialogRaw from '../Bookings/EventBooking/Modal';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Tabmenu from '../Bookings/EventBooking/Modal/Memberlist';
import clsx from 'clsx';

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

const FormBuilders = (props) => {
  const { user_id, business_code, first_name, last_name, default_category } = JSON.parse(
    localStorage.getItem('userData')
  );
  const {
    error,
    getGroups,
    groups,
    businessusers,
    getBusinessUsers,
    createForm,
    //matched_contact,
    loading,
    success_message2,
    enqueueSnackbar,
    getFormBuilderList,
    formlistdata,
    getTemplatesList,
    formlistdata2,
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
  const [showForm, setShowForm] = useState({});
  const { member_id, group_id, get_name, id } = useParams();
  const [selectedItem, setSelectedItem] = useState('');
  const [builderData, setBuilderData] = useState({});
  const [showBuilder, setShowBuilder] = useState(true);
  // const [selectedTemplate, setSelectedTemplate] = useState({});
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const [subject, setSubject] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleClickOpen3 = () => {
    setOpen3(true);
  };
  const handleCloseModal3 = () => {
    setOpen3(false);
  };

  const onPost = (data) => {
    setBuilderData(data);
  };

  useEffect(() => {
    if (formlistdata && formlistdata.length > 0) {
      setSelectedItem(formlistdata[0].id);
      let getForm = JSON.parse(formlistdata[0].builder_data).task_data;
      setShowForm({data:getForm,title:formlistdata[0].title});
    }
  }, [formlistdata]);

  // useEffect(() => {
  //   // let mounted = true
  //   // setTimeout(function(){
  //   //   if(mounted){
  //   //     ElementStore.dispatch('load',selectedTemplate);
  //   //   }
  //   // },0)
  //   // return function cleanup() {
  //   //     mounted = false
  //   // }

  //   //ElementStore.dispatch('load',selectedTemplate);
  //   ElementStore.dispatch(onLoad(selectedTemplate, { loadUrl: '' }));
  // }, [selectedTemplate]);

  const onLoad = (id) => {
    console.log('id===', id);
    if (!id) {
      let valueData2 = new Promise((resolve, reject) => {
        resolve([]);
      });
      valueData2.then((da) => {
        console.log('=====', da);
        setShowBuilder(true);
      });
      return valueData2;
    }
    if (formlistdata2 && formlistdata2.length > 0) {
      let formData = [];
      let result = formlistdata2.filter((a) => a.id == id);
      if (result.length > 0) {
        formData = JSON.parse(result[0].builder_data).task_data;
        let valueData = new Promise((resolve, reject) => {
          resolve(formData);
        });
        valueData.then(() => {
          setShowBuilder(true);
        });
        return valueData;
      }
    }
  };

  const handleToopen = () => {
    setOpen2(true);
  };

  const handleClose = (newValue) => {
    setOpen2(newValue);
    const membername = [];
    const groupname = [];
    if (groups.length > 0) {
      groups.forEach((element) => {
        const checkvalue = checked.indexOf(element.group_id);
        if (checkvalue !== -1) {
          groupname.push(element.group_name);
        } else if (element.group_id == group_id) {
          groupname.push(element.group_name);
        }
      });
    }

    if (businessusers.length > 0) {
      businessusers.forEach((element) => {
        const checkvalue = memberchecked.indexOf(element.user_id);
        if (checkvalue !== -1) {
          if (element.user_id == user_id) {
            //membername.push('You')
          } else {
            membername.push(
              element.first_name !== '' ? `${element.first_name} ${element.last_name}` : element.mobile_no
            );
          }
        } else if (element.user_id == member_id) {
          if (element.user_id == user_id) {
            //membername.push('You')
          } else {
            membername.push(
              element.first_name !== '' ? `${element.first_name} ${element.last_name}` : element.mobile_no
            );
          }
        }

        settoErr('');
      });

      if (membername == '') {
        //membername.push('You')
      }

      setGroupname_membersname(groupname.concat(membername));
      if (checked.length == 0 && memberchecked.length == 0) {
        setGroupname_membersname([]);
      }
      const dataToSend = {
        mobile_no: phoneNumber.join(),
      };
      if (phoneNumber.length > 0) {
        inviteAndAddMobile(dataToSend);
      }

      if (newValue) {
        // setValue(newValue);
      }
    }
  };

  const handleGroupToggle = (value) => {
    setcheckOnSelectAllGroup(false);
    const groupMembers = value.group_member_list;
    const currentIndex = checked.indexOf(value.group_id);
    const newChecked = [...checked];
    const selectedmember = [...group_members];

    if (currentIndex === -1) {
      newChecked.push(value.group_id);
      groupMembers.forEach((element) => {
        selectedmember.push(element.user_id);
      });
    } else {
      newChecked.splice(currentIndex, 1);
      groupMembers.forEach((element) => {
        const remomeitem = selectedmember.indexOf(element.user_id);
        selectedmember.splice(remomeitem, 1);
      });
    }
    setChecked(newChecked);
    setGroup_members(selectedmember);
  };
  const handleMemberToggle = (value) => {
    const currentIndex = memberchecked.indexOf(value.user_id);
    const newChecked = [...memberchecked];
    if (group_id != '0') {
      newChecked.push(group_id);
    }
    if (member_id != '0') {
      newChecked.push(member_id);
    }

    if (currentIndex === -1) {
      newChecked.push(value.user_id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    const removeLoginUser = newChecked.indexOf(user_id.toString());
    const removeUndefinedIndex = newChecked.indexOf(undefined);

    if (removeLoginUser > -1) {
      newChecked.splice(removeLoginUser, 1);
    }
    if (removeUndefinedIndex > -1) {
      for (var i = 0; i < newChecked.length; i++) {
        if (newChecked[i] == undefined) {
          newChecked.splice(newChecked.indexOf(undefined), 1);
          i--;
        }
      }
      if (newChecked.length < 1) {
        newChecked.push(user_id);
        var temp = [];
        //temp.push('You')
      }
    }

    setMemberchecked(newChecked);
    setGroupname_membersname(temp);

    const groupname = [];
    const membername = [];

    if (value == 0) {
      businessusers.forEach((element) => {
        membername.push(element.first_name !== '' ? `${element.first_name} ${element.last_name}` : element.mobile_no);

        newChecked.push(element.user_id);
      });
      setcheckOnSelectAllMembers(true);
      setMemberchecked(newChecked);
    } else if (value == 1) {
      groups.forEach((element) => {
        groupname.push(element.group_name);
        newChecked.push(element.group_id);
      });
      setcheckOnSelectAllGroup(true);
      setChecked(newChecked);
    } else if (value == 3) {
      setcheckOnSelectAllMembers(false);
      setMemberchecked([]);
    } else if (value == 4) {
      setcheckOnSelectAllGroup(false);
      setChecked([]);
    } else {
      setcheckOnSelectAllMembers(false);
    }
    setGroupname_membersname(groupname.concat(membername));
  };

  const handleToTagvalue = (value) => {
    setPhoneNumber(value);
  };

  useEffect(() => {
    getFormBuilderList({ user_id });
    // if (!loading) {
    //   SuccessEvent(false)
    // }
  }, [getFormBuilderList]);

  useEffect(() => {
    getTemplatesList({ user_id });
  }, [getTemplatesList]);

  useEffect(() => {FormBuilders
    getGroups({ user_id });
    const SendToBusiness = {
      user_id,
      business_code,
    };
    getBusinessUsers(SendToBusiness);
  }, []);

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

  const handleToSubmit = () => {
    if (validate()) return false;
    const FormFields11 = {};
    FormFields11.rymindr_to_group = checked.join();
    FormFields11.rymindr_group_members_to = [...new Set(group_members)].join();
    FormFields11.rymindr_to = memberchecked.join();
    FormFields11.title = subject;
    //FormFields11.builderData = builderData.toString();
    FormFields11.builderData = JSON.stringify(builderData);
    console.log('FormFields11=========', FormFields11);
    createForm(FormFields11, history);
    return false;
  };

  const validate = () => {
    let isError = false;
    if (groupname_membersname.length == 0) {
      isError = true;
      settoErr('Please select contacts.');
    }
    if (Object.keys(builderData).length == 0 || builderData.task_data.length == 0) {
      isError = true;
      setFormErr('Please dynamic form.');
    } else {
      setFormErr('');
    }

    if (!subject && subErr == '') {
      isError = true;
      setSubErr('Please add some subject.');
    } else {
      setSubErr('');
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

  const handleCategoryChange = (event) => {
    if (event.target.value) {
      setShowBuilder(false);
      setSelectedTemplate(event.target.value);
      ElementStore.dispatch(onLoad(event.target.value, { loadUrl: '' }));
    } else {
      setSelectedTemplate('');
      ElementStore.dispatch(onLoad('', { loadUrl: '' }));
    }
  };

  const handleInputChange = (id) => {
    setSelectedItem(id);
    let result = formlistdata.filter((a) => a.id == id);
    if (result.length > 0) {
      let getForm = JSON.parse(result[0].builder_data).task_data;
      setShowForm({data:getForm,title:result[0].title});
    }
  };

  const EventBookList =
    formlistdata !== null && formlistdata.length > 0 ? (
      formlistdata.map((item, index) => (
        <>
          {/* {item.id} */}
          <Hidden smDown implementation="css">
            <ListItem button selected={item.id == selectedItem} onClick={(event) => handleInputChange(item.id)}>
              <ListItemText
                primary={<div class="text-container">{item.title}</div>}
                secondary={<TypoListSubtext>{item.created_at}</TypoListSubtext>}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </Hidden>
        </>
      ))
    ) : (
      <List>No Form Builders created.</List>
    );

  return (
    <>
      <ConfirmationDialogRaw open={open2} onClose={handleClose} groupdata={groups} memberdata={businessusers}>
        <Tabmenu
          groupdata={groups}
          memberdata={businessusers}
          handleToggles={handleGroupToggle}
          checked={checked}
          handleMemberToggle={handleMemberToggle}
          memberchecked={memberchecked}
          handleToTagvalue={handleToTagvalue}
        />
      </ConfirmationDialogRaw>

      <Grid className="main-wrap-head" container style={{ marginBottom: 20 }} alignItems="center">
        <Grid item xs={5}>
          <Box display="flex" alignItems="center">
            <TypoHeadStyled variant="h4">Form builders</TypoHeadStyled>
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
              onClick={() => history.push('/form-templates')}
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
              onClick={handleClickOpen}
            >
              Create New Form
            </Button>
          </Box>
        </Grid>

        <Dialog open={open3} onClose={handleCloseModal3} aria-labelledby="form-dialog-title" maxWidth="lg" fullWidth>
          <DialogTitleStyled id="form-dialog-title">
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <TypoPopHeadStyled>Preview Form Builder</TypoPopHeadStyled>
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
                    action_name="Save"
                    form_action="/"
                    form_method="POST"
                    variables={variables}
                    data={builderData.task_data}
                    onSubmit={() => {
                      console.log('onSubmit');
                    }}
                  />
                ) : null}
              </Grid>
            </GridStyled>
          </DialogContent>
        </Dialog>

        <Dialog open={open} onClose={handleCloseModal} aria-labelledby="form-dialog-title" maxWidth="xl" fullWidth>
          <DialogTitleStyled id="form-dialog-title">
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <TypoPopHeadStyled>Form Builder</TypoPopHeadStyled>
              <IconButton color="default" onClick={handleCloseModal}>
                <Close />
              </IconButton>
            </Box>
          </DialogTitleStyled>

          <DialogContent>
            <GridStyled container className="article-content" spacing={5}>
              <Grid item xs={4}>
                <TextField
                  select
                  label="Select Template"
                  name="template"
                  value={id}
                  fullWidth
                  onChange={handleCategoryChange}
                  variant="outlined"
                >
                  {/* <MenuItem key={0} value="">
                    Select Template
                  </MenuItem> */}
                  {formlistdata2 && formlistdata2.length > 0
                    ? formlistdata2.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.title}
                        </MenuItem>
                      ))
                    : null}
                </TextField>
              </Grid>

              <Grid item xs={8}>
                <Autocomplete
                  multiple
                  limitTags={1}
                  id="tags-filled"
                  filterSelectedOptions={false}
                  options={groupname_membersname}
                  freeSolo
                  value={groupname_membersname}
                  freeSolo
                  onChange={(event, newValue) => {
                    alert('here');
                    if (newValue.length) {
                      const newVal = newValue.toString();
                      const getArray = newVal.split(',');

                      const user_id_arr = [];
                      const group_id_arr = [];
                      for (let i = 0; i < getArray.length; i++) {
                        const getNewList = businessusers.find(
                          (ele) => ele.first_name + ' ' + ele.last_name == getArray[i]
                        );

                        if (getNewList) {
                          if (getNewList == undefined) {
                          } else {
                            user_id_arr.push(getNewList.user_id);
                            setcheckOnSelectAllMembers(false);
                          }

                          break;
                        } else {
                          // FOR GROUPS
                          const getNewGroupList = groups.find((ele) => ele.group_name == getArray[i]);
                          if (getNewGroupList == undefined) {
                          } else {
                            group_id_arr.push(getNewGroupList.group_id);
                            setcheckOnSelectAllGroup(false);
                            break;
                          }
                        }
                      }
                      setGroupname_membersname(newValue);

                      if (user_id_arr.length) {
                        const data = user_id_arr[0];
                        const index = memberchecked.indexOf(data);
                        if (index > -1) {
                          memberchecked.splice(index, 1);
                        }
                        // newChecked.push(group_id);
                      } else if (group_id_arr.length) {
                        const data = group_id_arr[0];
                        const index = checked.indexOf(data);
                        if (index > -1) {
                          checked.splice(index, 1);
                        }
                      }
                      setMemberchecked(memberchecked);
                      setChecked(checked);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="To"
                      onChange={handleToopen}
                      onClick={handleToopen}
                      error={!!toErr}
                      helperText={toErr}
                    />
                  )}
                />
              </Grid>
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
                {showBuilder && <ReactFormBuilder onPost={onPost} onLoad={() => onLoad(selectedTemplate)} />}
                {/* <ReactFormBuilder onPost={onPost} onLoad={() => onLoad(selectedTemplate)} /> */}
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
                    disabled={loading}
                  >
                    {loading && <CircularSpinner />}
                    Submit Form
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
                      Preview Form
                    </ButtonWarn>
                  ) : null}
                </Box>
              </Grid>
            </GridStyled>
          </DialogContent>
        </Dialog>
      </Grid>

      <Grid className="main-wrap-body upcmgRym-cont-wrap" container alignItems="stretch">
        <Grid item xs={12} md={4} className="pr-25 leftSide-cont">
          <Paper className={clsx(classes.paper, 'sideBar-scroll')}>
            <List style={{ maxHeight: 650 }}>{EventBookList}</List>
          </Paper>
        </Grid>
        {/* <Grid item xs={12} md={8} className={clsx(classes.rightPanel, 'rightSide-cont')}> */}
        <Grid item xs={12} md={8} className={clsx(classes.rightPanel, "rightSide-cont")}>
          {/* <Paper className={classes.paper2}> */}
          <Paper className={clsx(classes.paper2, "sideBar-scroll")}> 
           

            <GridStyled container alignItems="center">
              <Grid xs={9}>
                <BoxStyled alignItems="left">
                  
                  <Typography alignItems="left" >
                    <Box fontWeight="fontWeightBold" m={3}>
                      {showForm.title}
                    </Box>
                  </Typography>
                </BoxStyled>
              </Grid>
              <Grid xs={3}>
                <Box display="flex" justifyContent="flex-end">
                  <Button variant="outlined" color="primary" className="mr-10">
                    Show Results
                  </Button>
                </Box>
              </Grid>
            </GridStyled>

            <ListStyled>
              <ListItem alignItems="flex-start">
                <Grid item xs={12}>
                  {showForm.data && showForm.data.length > 0 ? (
                    <ReactFormGenerator
                      answer_data={{}}
                      //action_name="Save"
                      form_action="/"
                      form_method="POST"
                      variables={variables}
                      data={showForm.data}
                      submitButton={
                        <button type={'submit'} className={'btn btn-primary'}>
                          Submit
                        </button>
                      }
                      onSubmit={() => {
                        console.log('onSubmit');
                      }}
                    />
                  ) : null}
                </Grid>
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
    businessusers: state.rymidr.businessusers,
    success_message2: state.formBuilder.success_message2,
    formlistdata: state.formBuilder.formlistdata,
    formlistdata2: state.formBuilder.formlistdata2,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGroups: (data) => dispatch(getGroups(data)),
    getBusinessUsers: (data) => dispatch(getBusinessUsers(data)),
    createForm: (data, history) => dispatch(createForm(data, history)),
    getFormBuilderList: (data) => dispatch(getFormBuilderList(data)),
    getTemplatesList: (data) => dispatch(getTemplatesList(data)),
  };
};

FormBuilders.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  getGroups: PropTypes.func.isRequired,
  groups: PropTypes.array.isRequired,
  businessusers: PropTypes.array.isRequired,
  getBusinessUsers: PropTypes.func.isRequired,
  getFormBuilderList: PropTypes.func.isRequired,
  success_message2: PropTypes.any.isRequired,
  createForm: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  formlistdata: PropTypes.array.isRequired,
  getTemplatesList: PropTypes.func.isRequired,
  formlistdata2: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(FormBuilders));
