import { makeStyles, styled, withStyles } from '@material-ui/core/styles';

import RymindrOriginal from '../../assets/images/rymindr_original.png';
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
import CheckIcon from '@mui/icons-material/Check';
import { green } from '@mui/material/colors';
import CloseIcon from '@material-ui/icons/Close';
// import CheckIcon from '@material-ui/icons/Check';
import ResponsiveDialog from '../HistoryRymindrs/UpcomingRymindr/Modal/RymindrModalDelete';
import { Send, Drafts, Delete, Close, FiberManualRecord, Check, ViewAgenda, Update } from '@material-ui/icons';

import {
  createForm,
  deleteFormData,
  formStatus,
  getFormBuilderList,
  getTemplatesList,
} from '../../store/actions/formBuilder';

import { getBusinessUsers, getGroups, inviteAndAddMobile } from '../../store/actions/rymidr';

import { Link, useHistory, useParams, useLocation, Redirect } from 'react-router-dom';
import React, { useEffect, useMemo, useState } from 'react';
import { ReactFormBuilder } from 'react-form-builder2';
import { ElementStore } from 'react-form-builder2';
import { ReactFormGenerator } from 'react-form-builder2';

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

  icon2: {
    width: 150,
    marginBottom: 40,
  },
  content2: {
    textAlign: 'center',
    textAlign: '-webkit-center',
    padding: '5%',
    background: '#d2edfe',
  },
  contentArea2: {
    height: '10vh',
    borderRadius: 15,
  },
  notifyMeButton2: {
    background: theme.palette.warning.main,
    color: theme.palette.warning.contrastText,
    width: 200,
    cursor: 'auto',
    '&:hover': {
      backgroundColor: theme.palette.warning.main,
    },
  },
  commingSoonDesc3: {
    marginBottom: 10,
    fontSize: 25,
    fontWeight: 'bold',
  },
  commingSoonDesc2: {
    marginBottom: 15,
    fontSize: 20,
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
const TypoStatusStyled = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.secondary.contrastText,
  width: 60,
  textAlign: 'right',
  fontWeight: '600',
}));
const TypoStatusStyledAccept = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: '#44b700',
  width: 60,
  textAlign: 'right',
  fontWeight: '600',
}));
const TypoStatusStyledReject = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: '#FF0000',
  width: 60,
  textAlign: 'right',
  fontWeight: '600',
}));
const ButtonWarn = styled(Button)(({ theme }) => ({
  background: theme.palette.warning.main,
  color: theme.palette.warning.contrastText,
  marginRight: 5,
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  background: '#FFA502',
}));

const ButtonPlain = styled(Button)(({ theme }) => ({
  color: '#98a5af',
  fontSize: 12,
  textTransform: 'capitalize',
  background: 'none',
  boxShadow: 'none',
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

const AvatarStyled = styled(Avatar)({
  height: 25,
  width: 25,
  '& img': {
    height: 'auto',
  },
});
const TypoTitleStyled = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.secondary.contrastText,
}));

const StyledBadgePending = withStyles((theme) => ({
  badge: {
    backgroundColor: '#1773bf',
    color: '#1773bf',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    padding: 0,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);
const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);
const StyledBadgeReject = withStyles((theme) => ({
  badge: {
    backgroundColor: '#e50214',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

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
    deleteFormDatafn,
    loading,
    success_message2,
    formDeleted,
    enqueueSnackbar,
    getFormBuilderList,
    formlistdata,
    getTemplatesList,
    formlistdata2,
    formStatus,
    formStatusList,
    ...other
  } = props;
  const history = useHistory();

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = useState(false);
  const [openContact, setOpenContact] = React.useState(false);
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
  const [ContactList, setContactList] = useState([]);
  const [checkOnSelectAllMembers, setcheckOnSelectAllMembers] = useState(false);
  const [groupname_membersname, setGroupname_membersname] = useState([]);
  const [showForm, setShowForm] = useState({});
  const { member_id, group_id, get_name, id } = useParams();
  const [selectedItem, setSelectedItem] = useState('');
  const [builderData, setBuilderData] = useState({});
  const [showBuilder, setShowBuilder] = useState(true);
  const [getFormData, setFormData] = useState(null);
  // const [selectedTemplate, setSelectedTemplate] = useState({});
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const { param, paramType } = useParams();
  const [users_list, setUserList] = useState([]);
  const [showPanel, setShowPanel] = useState(true);
  const [subject, setSubject] = useState('');
  const [searchvalue, setSearchvalue] = useState('');
  const [openDelete, setOpenDelete] = useState(false);
  const [statusList, setStatusList] = useState([]);
  const [remainingLength , setRemainingLength] = useState([])
  const [total , setTotal] = useState([])
  var pageNumber = 1;
  const handleClickOpen = () => {
    if (ContactList.length > 0) {
      setOpen(true);
    } else {
      setOpen1(true);
    }
  };

  const handleClose1 = () => {
    setOpenDelete(false);
  };

  const handleContactsClickOpen = () => {
    setOpenContact(true);

    if (showForm) {
      setTimeout(() => {
        let Ele = document.querySelector('#scrollElement');
        console.log('Ele-', Ele);
        if (Ele) {
          var position = Ele.scrollTop;
          Ele.addEventListener('scroll', () => {
            if (Ele.offsetHeight + Ele.scrollTop >= Ele.scrollHeight) {
              console.log('posi bottom');
              pageNumber = pageNumber + 1;

              const dataTosend = {
                form_id: showForm.id,
                page: pageNumber,
              };
              formStatus(dataTosend);
              console.log('Page-', pageNumber);
            }
          });
          // Ele.setAttribute('onscroll', 'fetchMoreData');
        }
      }, 1000);
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
    setBuilderData({});
    setSubject('');
    setGroupname_membersname([]);
    setSelectedTemplate('');
    setChecked([]);
    setGroup_members([]);
    setMemberchecked([]);
    setSubErr('');
    settoErr('');
    setFormErr('');
  };

  const handleClickOpen3 = () => {
    setOpen3(true);
  };
  const handleCloseModal3 = () => {
    setOpen3(false);
  };
  console.log('statusList', statusList);
  console.log('formStatusList', formStatusList);
  console.log('id--', showForm.id);
  const handleCloseContactModal = () => {
    setOpenContact(false);
    setTimeout(() => {
      setStatusList([]);
    }, 200);
    pageNumber = 1;
    const dataToSend = {
      form_id: showForm.id,
      page: pageNumber,
    };
    formStatus(dataToSend);
    console.log('calling3');
  };

  // const SearchFieldStyled = styled(TextField)(({ theme }) => ({
  //   paddingTop: 10,
  //   paddingBottom: 10,
  // }));

  const SearchFieldStyled = styled(TextField)(({ theme }) => ({
    padding: 20,
  }));
  const onPost = (data) => {
    console.log('data====', data);
    setBuilderData(data);
    if (builderData.task_data != undefined && builderData.task_data.length == 0) {
      setFormErr('Select at least one form element.');
    } else {
      setFormErr('');
    }
  };

  useEffect(() => {
    if (formlistdata && formlistdata.length > 0) {
      setStatusList([]);
      console.log('clll-');
      setFormData(formlistdata);
      setSelectedItem(formlistdata[0].id);
      setUserList(formlistdata[0].shared_with);
      setRemainingLength([formlistdata[0].remaining_count])
      let getForm = JSON.parse(formlistdata[0].builder_data).task_data;
      let percentage = '0 %';
      let outOf = '';
      let txtColor = 'black';
      let showFormBtn = false;
      let isShareable = false;
      if (formlistdata[0].shared_with && formlistdata[0].shared_with.length > 0) {
        let totalContacts = formlistdata[0].shared_with.length;
        let getSubmitted = formlistdata[0].shared_with.filter((a) => a.status == 1).length;
        outOf = `${getSubmitted} out of ${totalContacts} forms submitted`;
        let per = (getSubmitted * 100) / totalContacts;
        percentage = `${per.toFixed()} %`;

        if (totalContacts > 0) {
          isShareable = true;
        }
        if (getSubmitted > 0) {
          showFormBtn = true;
        }
        if (per.toFixed() == 100) {
          txtColor = '#44b700';
        }
      }
      setShowForm({
        data: getForm,
        title: formlistdata[0].title,
        outOf: outOf,
        percentage: percentage,
        showFormBtn,
        id: formlistdata[0].id,
        txtColor,
        isShareable,
      });
      var Data = {
        form_id: formlistdata[0].id,
        page: 1,
      };

      formStatus(Data);
    } else {
      setFormData(formlistdata);
      setSelectedItem('');
      setShowForm({});
    }
  }, [formlistdata, formDeleted]);

  useEffect(() => {
    const contactList = businessusers;
    setContactList(contactList);
    console.log('contactList---', contactList);
  }, [businessusers]);

  useEffect(() => {
    if (formStatusList.data != undefined) {
      console.log('formStatusList', formStatusList);
      setStatusList([...statusList, ...formStatusList.data]);
      setTotal([formStatusList.total])
    }
  }, [formStatusList]);
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
        setShowBuilder(true);
      });
      return valueData2;
    }
    if (formlistdata2 && formlistdata2.length > 0) {
      let formData = [];
      let result = formlistdata2.filter((a) => a.id == id);
      if (result.length > 0) {
        setBuilderData(JSON.parse(result[0].builder_data));
        // console.log('resultresult=====', JSON.parse(result[0].builder_data));
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

  const handleCancel = () => {
    setOpen1(false);
  };

  const handleClose = (newValue) => {
    console.log('newValue1', newValue);
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
    console.log('groupname_membersname', groupname_membersname);
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

  useEffect(() => {
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
      history.push('/form-builders');
      handleCloseModal();
    }
  }, [success_message2]);

  useMemo(() => {
    error && enqueueSnackbar(error, { variant: 'error' });
  }, [error]);

  const handleAllMembersToggle = (value) => {
    const newChecked = [...value];
    setMemberchecked(newChecked);
  };

  const handleAllGroupMembersToggle = (value) => {
    const newChecked = [...value];
    setChecked(newChecked);
  };
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
    createForm(FormFields11, history, user_id);
    setBuilderData({});
    setSubject('');
    setSelectedTemplate('');
    setMemberchecked([]);
    setGroup_members([]);
    setGroupname_membersname([]);
    return false;
  };

  const handleDeleteForm = (id) => {
    deleteFormDatafn({ id, user_id });
    setOpenDelete(false);
  };

  const validate = () => {
    let isError = false;
    if (groupname_membersname.length == 0) {
      isError = true;
      settoErr('Please select contacts.');
    }
    if (Object.keys(builderData).length == 0 || builderData.task_data.length == 0) {
      isError = true;
      setFormErr('Select at least one form element.');
    } else {
      setFormErr('');
    }

    if (!subject) {
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
      setShowBuilder(false);
      setSelectedTemplate('');
      setBuilderData({});
      ElementStore.dispatch(onLoad('', { loadUrl: '' }));
    }
  };

  const handleInputChange = (id) => {
    setSelectedItem(id);
    setStatusList([]);
    let result = getFormData.filter((a) => a.id == id);
    console.log('resultresultresultresultresult=======', result);
    if (result.length > 0) {
      let getForm = JSON.parse(result[0].builder_data).task_data;
      setUserList(result[0].shared_with);
      setRemainingLength([result[0].remaining_count])
      let percentage = '0 %';
      let showFormBtn = false;
      let txtColor = 'black';
      let outOf = '';
      let isShareable = false;
      if (result[0].shared_with && result[0].shared_with.length > 0) {
        let totalContacts = result[0].shared_with.length;
        let getSubmitted = result[0].shared_with.filter((a) => a.status == 1).length;
        outOf = `${getSubmitted} out of ${totalContacts} forms submitted`;
        let per = (getSubmitted * 100) / totalContacts;
        percentage = `${per.toFixed()} %`;
        if (totalContacts > 0) {
          isShareable = true;
        }
        if (getSubmitted > 0) {
          showFormBtn = true;
        }
        if (per.toFixed() == 100) {
          txtColor = '#44b700';
        }
      }
      setShowForm({
        data: getForm,
        title: result[0].title,
        outOf: outOf,
        percentage: percentage,
        showFormBtn,
        id,
        txtColor,
        isShareable,
      });
      pageNumber = 1;
      const dataToSend = {
        form_id: id,
        page: pageNumber,
      };
      formStatus(dataToSend);
    }
  };
  let Tick = false;
  const getPercentage = (item) => {
    let percentage = '0 % forms Submitted';
    let outOf = '';
    if (item.shared_with && item.shared_with.length > 0) {
      let totalContacts = item.shared_with.length;
      let getSubmitted = item.shared_with.filter((a) => a.status == 1).length;
      if (totalContacts / getSubmitted == 1) {
        Tick = true;
      } else {
        Tick = false;
      }
      outOf = `${getSubmitted} out of ${totalContacts} forms submitted`;
    }
    return outOf;
  };
  const EventBookList =
    getFormData !== null && getFormData.length > 0 ? (
      getFormData.map((item, index) => (
        <>
          <Hidden smDown implementation="css">
            <ListItem button selected={item.id == selectedItem} onClick={(event) => handleInputChange(item.id)}>
              <ListItemText
                primary={
                  <div class="row">
                    <div class="col-6">
                      <div class="text-container">{item.title}</div>
                    </div>
                    <div class="col-4">
                      <div class="">
                        <b>{getPercentage(item)}</b>
                      </div>
                    </div>
                    <div class="col-2">
                      {Tick ? <CheckIcon sx={{ color: green['A700'] }} fontSize="large" /> : null}
                    </div>
                  </div>
                }
                secondary={<TypoListSubtext>{`${moment(item.created_at).format('DD-MMMM-YYYY')}`}</TypoListSubtext>}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </Hidden>
        </>
      ))
    ) : (
      <List>No Form Builders created.</List>
    );

  const handlesearch = (e) => {
    const searchStr = e.target.value;
    console.log('searchStr=====', searchStr);
    //setSearchvalue(searchStr);
    if (searchStr.length > 1) {
      const filteredList = formlistdata.filter((obj) => obj.title.toLowerCase().includes(searchStr.toLowerCase()));

      //setFormData(formlistdata.data);
      setFormData(filteredList);
    } else {
      setFormData(formlistdata);
    }
  };
  const [width, setWidth] = React.useState(0);
  const [width1, setWidth1] = React.useState(0);
  const measuredRef = React.useCallback((node) => {
    if (node !== null) {
      setWidth(node.getBoundingClientRect().width);
    }
  }, []);
  const measuredRef1 = React.useCallback((node) => {
    if (node !== null) {
      setWidth1(node.getBoundingClientRect().width);
    }
  }, []);
  return (
    <>
      <ConfirmationDialogRaw open={open2} onClose={handleClose} groupdata={groups} memberdata={businessusers}>
        <Tabmenu
          groupdata={groups}
          memberdata={businessusers}
          handleToggles={handleGroupToggle}
          checked={checked}
          handleMemberToggle={handleMemberToggle}
          handleAllMembersToggle={handleAllMembersToggle}
          handleAllGroupMembersToggle={handleAllGroupMembersToggle}
          memberchecked={memberchecked}
          handleToTagvalue={handleToTagvalue}
        />
      </ConfirmationDialogRaw>
      {console.log('memberchecked', memberchecked)}
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
                    hide_actions={true}
                  />
                ) : null}
              </Grid>
              {console.log('builderData.task_data', builderData.task_data)}{' '}
            </GridStyled>
          </DialogContent>
        </Dialog>

        <Dialog
          fullWidth
          maxWidth="md"
          disableBackdropClick
          disableEscapeKeyDown
          aria-labelledby="confirmation-dialog-title"
          open={open1}
          {...other}
        >
          <Box display="flex" justifyContent="end" alignItems="center" style={{ margin: '1rem' }}>
            <IconButton color="default" onClick={handleCancel}>
              <CloseIcon />
            </IconButton>
          </Box>
          <DialogContent style={{ margin: '2rem 6rem 2rem 6rem', textAlign: 'center' }}>
            <h6 style={{ letterSpacing: '0.4px', paddingLeft: '1rem' }}>
              You'll need to have at least 1 contact to enable this feature.
            </h6>
          </DialogContent>
          <Box display="flex" justifyContent="center" style={{ marginBottom: '5rem' }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {
                history.push('/contacts');
              }}
            >
              Add Contacts
            </Button>
          </Box>
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
                  {console.log('formlistdata2', formlistdata2)}
                  {formlistdata2 && formlistdata2.length > 0
                    ? formlistdata2.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.title}
                        </MenuItem>
                      ))
                    : null}
                  <MenuItem key={0} value={''}>
                    Select Template
                  </MenuItem>
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
                    console.log('newValue++', newValue);
                    const newVal = newValue.toString();
                    const getArray = newVal.split(',');

                    const user_id_arr = [];
                    const group_id_arr = [];
                    for (let i = 0; i < getArray.length; i++) {
                      const getNewList = businessusers.find(
                        (ele) => ele.first_name + ' ' + ele.last_name == getArray[i]
                      );
                      console.log('getArray', getArray);
                      console.log('getNewList', getNewList);

                      if (getNewList) {
                        if (getNewList == undefined) {
                        } else {
                          user_id_arr.push(getNewList.user_id);
                          setcheckOnSelectAllMembers(false);
                        }

                        // break;
                      } else {
                        // FOR GROUPS
                        const getNewGroupList = groups.find((ele) => ele.group_name == getArray[i]);
                        console.log('getNewGroupList', getNewGroupList);
                        console.log('groups', groups);
                        console.log('getArray', getArray);
                        if (getNewGroupList == undefined) {
                        } else {
                          group_id_arr.push(getNewGroupList.group_id);
                          setcheckOnSelectAllGroup(false);
                        }
                      }
                      console.log('user_id_arr', user_id_arr);
                      console.log('group_id_arr', group_id_arr);
                    }
                    setGroupname_membersname(newValue);

                    // console.log('user_id_arr',user_id_arr)
                    // const data1 = user_id_arr[0];
                    // const index1 = memberchecked.indexOf(data1);
                    // if (index1 > -1) {
                    //   memberchecked.splice(index1, 1);
                    // }
                    // // newChecked.push(group_id);
                    // const data2 = group_id_arr[0];
                    // const index2 = checked.indexOf(data2);
                    // if (index2 > -1) {
                    //   checked.splice(index2, 1);
                    // }
                    setMemberchecked(user_id_arr);
                    setChecked(group_id_arr);
                    console.log('newValue', newValue);
                    console.log('memberchecked', memberchecked);
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
                {showBuilder && (
                  <ReactFormBuilder
                    onPost={onPost}
                    // toolbarItems={items}
                    onLoad={() => onLoad(selectedTemplate)}
                    error={!!formErr}
                    helperText={formErr}
                  />
                )}
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
                    Create Form
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

        {/* STATUS POPUP */}
        <Dialog open={openContact} onClose={handleCloseContactModal} maxWidth="md" fullWidth>
          <DialogTitleStyled id="form-dialog-title">
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex">
                <TypoPopHeadStyled>Form submission Status</TypoPopHeadStyled>

                <TypoPopHeadStyled style={{ color: '#607383' }} className="ml-20">
                  {total.length> 0 ? total[0] : '0'} people in Form
                </TypoPopHeadStyled>
              </Box>
              <IconButton color="default" onClick={handleCloseContactModal}>
                <Close />
              </IconButton>
            </Box>
          </DialogTitleStyled>
          <DialogContent id="scrollElement">
            <List>
              {statusList && statusList.length > 0
                ? statusList.map((element) => (
                    <ListItem alignItems="center">
                      <ListItemAvatar>
                        <AvatarShareStyled alt="semy Sharp" src={element.profile_image} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box display="flex" justifyContent="space-between">
                            <Typography>{element.first_name + ' ' + element.last_name}</Typography>
                            <Box display="flex" justifyContent="center" alignItems="center">
                              {element.status == 0 ? (
                                <>
                                  <FiberManualRecord style={{ color: '#1773bf', fontSize: 14 }} />
                                  <TypoStatusStyled className="ml-20 mr-20">Pending</TypoStatusStyled>
                                </>
                              ) : element.status == 1 ? (
                                <>
                                  <FiberManualRecord style={{ color: '#44b700', fontSize: 14 }} />
                                  <TypoStatusStyledAccept className="ml-20 mr-20">Submitted</TypoStatusStyledAccept>
                                </>
                              ) : (
                                <>
                                  <FiberManualRecord style={{ color: '#FF0000', fontSize: 14 }} />
                                  <TypoStatusStyledReject className="ml-20 mr-20">Declined</TypoStatusStyledReject>
                                </>
                              )}
                            </Box>
                          </Box>
                        }
                      />
                    </ListItem>
                    // <Divider variant="inset" component="li" />
                  ))
                : null}
            </List>
          </DialogContent>
        </Dialog>
        {/* STATUS POPUP */}
      </Grid>

      <Grid className="main-wrap-body upcmgRym-cont-wrap" container alignItems="stretch">
        <Grid item xs={12} md={4} className="pr-25 leftSide-cont">
          <Paper className={clsx(classes.paper, 'sideBar-scroll')}>
            <div class="form-group has-search">
              <span class="fa fa-search form-control-feedback"></span>
              <input type="text" class="form-control" onKeyUp={handlesearch} placeholder="Search Form Builders" />
            </div>
            {getFormData != null && getFormData.length > 0 ? (
              <List>{getFormData != null ? EventBookList : loading && <CircularSpinner />}</List>
            ) : (
              <Typography className={classes.commingSoonDesc} style={{ paddingTop: '2px' }}>
                No records Found
              </Typography>
            )}
            {/* <List>{loading && <CircularSpinner />}</List>
            <List>{EventBookList}</List> */}
          </Paper>
        </Grid>
        {/* <Grid item xs={12} md={8} className={clsx(classes.rightPanel, 'rightSide-cont')}> */}
        <Grid item xs={12} md={8} className={clsx(classes.rightPanel, 'rightSide-cont')}>
          <Paper className={clsx(classes.paper2, 'sideBar-scroll')}>
            <ListStyled>
              <Paper className={classes.contentArea2}>
                {showForm.data ? (
                  <Box className={classes.content2}>
                    <Box display="flex" justifyContent="flex-end">
                      <ButtonPlain
                        disableRipple
                        onClick={() => setOpenDelete(true)}
                        startIcon={<Delete style={{ color: '#ec4d4b' }} />}
                      >
                        Delete
                      </ButtonPlain>
                    </Box>
                    <ResponsiveDialog
                      open={openDelete}
                      handleClose={handleClose1}
                      deleteRymindr={() => handleDeleteForm(showForm.id)}
                      type="Form"
                    />
                    {console.log('showForm-', showForm)}
                    <TypoHeadStyled variant="h5">{showForm.title}</TypoHeadStyled>
                    <Typography className={classes.commingSoonDesc3} style={{ color: showForm.txtColor }}>
                      {showForm.percentage}
                    </Typography>
                    <Typography className={classes.commingSoonDesc2}>{showForm.outOf}</Typography>
                    {showForm.showFormBtn ? (
                      <Button
                        variant="outlined"
                        color="primary"
                        className="mr-10"
                        onClick={() => history.push(`/submitted-exams/${selectedItem}`)}
                      >
                        Completed Forms
                      </Button>
                    ) : null}
                    <Button variant="outlined" color="primary" className="mr-10" onClick={handleContactsClickOpen}>
                      Status
                    </Button>
                  </Box>
                ) : null}
              </Paper>

              {getFormData && getFormData.length > 0 ? (
                <Box display="flex">
                  <Divider variant="inset" component="li" />
                  {showForm.isShareable ? (
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <AvatarStyled
                          alt="semy Sharp"
                          variant="square"
                          src={require('../../assets/images/share.png')}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={<TypoTitleStyled>Shared with</TypoTitleStyled>}
                        secondary={
                          <Box className="share-avatar-box" display="flex" justifyContent="space-between">
                            <BoxStyled className={('share-avatar-box-inner', classes.overFlowHide)}>
                              {users_list && users_list.length > 0
                                ? users_list.map((record) =>
                                    record.status == 0 ? (
                                      <StyledBadgePending
                                        ref={measuredRef1}
                                        overlap="circle"
                                        anchorOrigin={{
                                          vertical: 'bottom',
                                          horizontal: 'right',
                                        }}
                                        // variant='dot'
                                        badgeContent={<Update style={{ color: 'white', fontSize: 10 }} />}
                                      >
                                        <AvatarShareStyled
                                          key={record.user_id}
                                          alt="semy Sharp"
                                          src={record.profile_image}
                                        />
                                      </StyledBadgePending>
                                    ) : record.status == 1 ? (
                                      <StyledBadge
                                        overlap="circle"
                                        anchorOrigin={{
                                          vertical: 'bottom',
                                          horizontal: 'right',
                                        }}
                                        // variant='dot'
                                        badgeContent={<Check style={{ color: 'white', fontSize: 10 }} />}
                                      >
                                        <AvatarShareStyled
                                          key={record.user_id}
                                          alt="semy Sharp"
                                          src={record.profile_image}
                                        />
                                      </StyledBadge>
                                    ) : (
                                      <StyledBadgeReject
                                        overlap="circle"
                                        anchorOrigin={{
                                          vertical: 'bottom',
                                          horizontal: 'right',
                                        }}
                                        // variant='dot'
                                        badgeContent={<Close style={{ color: 'white', fontSize: 10 }} />}
                                      >
                                        <AvatarShareStyled
                                          key={record.user_id}
                                          alt="semy Sharp"
                                          src={record.profile_image}
                                        />
                                      </StyledBadgeReject>
                                    )
                                  )
                                : null}
                                <Box
                                  style={{ fontSize: 18, color: '#1abaff', padding: '10px 2px 0px 15px' , cursor : 'pointer'}}
                                  onClick={handleContactsClickOpen}
                                >
                                  {remainingLength.length > 0 && remainingLength[0] > 0 ? '+ ' + remainingLength[0] : ''}
                                </Box>
                            </BoxStyled>

                            {/* {users_list && users_list.lenght > 0 ? (
                              <Box style={{ position: 'relative' }}>
                                <Box className="more-section" onClick={handleContactsClickOpen}>
                                  {Math.round(width) > users_list.length * 50
                                    ? ''
                                    : '+' + (users_list.length - Math.round(width / 50))}
                                </Box>
                                <Box>
                                  <Button variant="outlined" color="primary" onClick={handleContactsClickOpen}>
                                    {' '}
                                    Status{' '}
                                  </Button>
                                </Box>
                              </Box>
                            ) : null} */}
                            
                          </Box>
                        }
                      />
                    </ListItem>
                  ) : null}
                </Box>
              ) : (
                <Box className={classes.content} style={{ margin: 'auto' }}>
                  <CardMedia className={classes.icon} image={RymindrOriginal} title="Message Center" component="img" />
                  <Typography className={classes.commingSoonDesc}>No record Found</Typography>
                </Box>
              )}

              {showForm.data && showForm.data.length > 0 ? (
                <ListItem alignItems="flex-start">
                  <Divider variant="inset" component="li" />
                  <Grid
                    ref={measuredRef}
                    item
                    xs={12}
                    md={8}
                    className={clsx(classes.rightPanel, 'rightSide-cont')}
                    style={{ display: showPanel ? 'none' : 'block' }}
                  >
                    <ReactFormGenerator
                      answer_data={{}}
                      form_action="/"
                      form_method="POST"
                      variables={variables}
                      data={showForm.data}
                      hide_actions={true}
                    />
                  </Grid>
                </ListItem>
              ) : null}
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
    formDeleted: state.formBuilder.formDeleted,
    formStatusList: state.formBuilder.formStatusList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGroups: (data) => dispatch(getGroups(data)),
    getBusinessUsers: (data) => dispatch(getBusinessUsers(data)),
    createForm: (data, history, user_id) => dispatch(createForm(data, history, user_id)),
    getFormBuilderList: (data) => dispatch(getFormBuilderList(data)),
    getTemplatesList: (data) => dispatch(getTemplatesList(data)),
    deleteFormDatafn: (data) => dispatch(deleteFormData(data)),
    formStatus: (data) => dispatch(formStatus(data)),
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
