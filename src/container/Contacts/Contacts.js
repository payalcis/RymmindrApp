import {
  ArrowBack,
  Chat,
  Delete,
  Edit,
  GroupAdd,
  PersonAdd,
  Search,
  Send,
  Drafts,
  Email,
  Event,
  HowToReg,
} from '@material-ui/icons';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Hidden,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Paper,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CardMedia,
  Tooltip,
} from '@material-ui/core';
import PendingIcon from '@mui/icons-material/Pending';
import Fade from '@material-ui/core/Fade';
import { Link } from 'react-router-dom';
import DeleteMember from './DeleteMember';
import DeleteGroup from './DeleteGroup';
import React, { useEffect, useMemo, useState } from 'react';
import { makeStyles, styled } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import Check from '@material-ui/icons/Check';
import CircularSpinner from '../../component/CircularSpinner/index';
import Add from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getContactlist,
  getGroupMemberList,
  groupDelete,
  contactDelete,
  updateGroup,
  getRyminderList,
  addToRymindr,
  InviteUser,
  CancelInvititionRequest,
  checkGroupExistInActiveRymindrs,
  getGroupList,
  addToEvent,
  addContact,
  inviteGroup,
  getPendingList,
} from '../../store/actions/contactActions';
import { getUpcommingEventList } from '../../store/actions/booklist';
import { withSnackbar } from 'notistack';
import GroupDialog from './Modal';
import ContactDialog from './Modal/ContactDialog';
import RymindrOriginal from '../../assets/images/rymindr_original.png';

// icons
import AddToRymindrIcon from '../../assets/images/add_to_rymindr.png';
import AddToRymindrIconGrey from '../../assets/images/add_to_rymindr_grey.png';

import parse from 'html-react-parser';
import { data } from 'jquery';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    position: 'relative',
  },
  rightPanel: {
    [theme.breakpoints.up('md')]: {
      display: 'block !important',
    },
  },
  addToRymindr: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  rymindrListItemDetail: {
    marginLeft: 10,
    fontWeight: 600,
    display: 'inline',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rymindrListItemButton: {
    position: 'absolute',
    right: 0,
  },
  rymindrListItemDateTime: {
    color: 'rgb(23, 186, 255)',
  },
  rymindrListItemDateTimeDivider: {
    marginLeft: 5,
    marginRight: 5,
  },
  optionToAddToRymindrOrGroup: {
    display: 'flex',
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

const AvatarShareStyled = styled(Avatar)({
  height: 50,
  width: 50,
  // marginRight: 20,
});
const AvatarLargeStyled = styled(Avatar)({
  height: 130,
  width: 130,
  marginRight: 20,
});

const TypoHeadStyled = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  color: theme.palette.primary.main,
  textTransform: 'uppercase',
  fontWeight: 'bold',
}));

const TypoHeadInnerStyled = styled(TypoHeadStyled)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const SearchFieldStyled = styled(TextField)(({ theme }) => ({
  padding: 20,
}));

const TextFieldStyled = styled(TextField)(({ theme }) => ({
  padding: 20,
  paddingBottom: 0,
}));

const PaperStyled = styled(Paper)(({ theme }) => ({
  padding: 30,
  height: 100 + '%',
}));

const PaperLeftStyled = styled(Paper)(({ theme }) => ({
  height: 100 + '%',
}));

const TypoNameStyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 18,
  fontWeight: 500,
}));

const ListStyled = styled(List)(({ theme }) => ({
  paddingLeft: 130,
}));
const AvatarStyled = styled(Avatar)({
  height: 25,
  width: 25,
  '& img': {
    height: 'auto',
  },
});

const AvatarStyledGroup = styled(Avatar)({
  height: 45,
  width: 45,
  '& img': {
    height: 'auto',
  },
});

const AvatarStyledLogo = styled(Avatar)({
  height: 100,
  width: 180,
  '& img': {
    height: 'auto',
  },
});

const TypoPopHeadStyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.contrastText,
  fontSize: 18,
  fontWeight: '600',
}));

const DialogTitleStyled = styled(DialogTitle)({
  borderBottom: '1px solid #e0e0e0',
  padding: '10px 24px',
  marginBottom: 20,
});
const TypoTitleStyled = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.secondary.contrastText,
  marginBottom: 10,
}));

const TypoContentStyled = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  color: theme.palette.text.primary,
}));

const TypoListSubtext = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.secondary.contrastText,
}));

const TypoListType = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 700,
  marginLeft: 5,
  color: theme.palette.secondary.contrastText,
  textTransform: 'capitalize',
  alignItems: 'center',
  display: 'flex',
}));

const ButtonSuccess = styled(Button)(({ theme }) => ({
  background: theme.palette.success.main,
  color: theme.palette.success.contrastText,
}));

const ChatButton = styled(Button)(({ theme }) => ({
  // color: theme.palette.success.main,
  background: theme.palette.success.contrastText,
}));

const ButtonPrimary = styled(Button)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: theme.palette.success.contrastText,
}));

const MessageButton = styled(Button)(({ theme }) => ({
  // color: theme.palette.primary.main,
  background: theme.palette.success.contrastText,
}));

const ButtonColor = styled(Button)(({ theme }) => ({
  background: theme.palette.props.main,
  color: theme.palette.props.contrastText,
}));

const BookingButton = styled(Button)(({ theme }) => ({
  // color: theme.palette.props.main,
  background: theme.palette.props.contrastText,
}));

const ButtonWarn = styled(Button)(({ theme }) => ({
  background: theme.palette.warning.main,
  color: theme.palette.warning.contrastText,
}));

const SendRymindrButton = styled(Button)(({ theme }) => ({
  // color: theme.palette.warning.main,
  background: theme.palette.warning.contrastText,
}));

const ResendInvitationButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  background: theme.palette.warning.contrastText,
}));

const AddToGroup = styled(Button)(({ theme }) => ({
  // color: theme.palette.props.main,
  background: theme.palette.warning.contrastText,
}));

const BoxContStyled = styled(Box)(({ theme }) => ({
  paddingLeft: 150,
}));

const BoxHeadrStyled = styled(Box)(({ theme }) => ({
  borderBottom: '1px solid rgba(64, 87, 106, 0.1)',
  paddingTop: 20,
  paddingBottom: 20,
}));

const GroupListStyled = styled(ListItem)(({ theme }) => ({
  paddingLeft: 0,
}));

const ButtonPlain = styled(Button)(({ theme }) => ({
  color: '#98a5af',
  fontSize: 12,
  textTransform: 'capitalize',
  background: 'none',
  boxShadow: 'none',
}));

const selectSearch = [
  {
    value: 'all',
    label: 'All Contacts',
  },
  {
    value: 'contact',
    label: 'Contact',
  },
  {
    value: 'groups',
    label: 'Groups',
  },
];

const LiveChat = (props) => {
  const { user_id, business_code, first_name, last_name, sc_bessi_name } = JSON.parse(localStorage.getItem('userData'));
  const {
    booklistLoading,
    loading,
    InviteUser,
    getContactlist,
    contactlist,
    getGroupMemberList,
    contactGroupMemberlist,
    grouplist,
    usercontactlist,
    groupDelete,
    groupdeletemessage,
    contactDelete,
    success_message,
    enqueueSnackbar,
    error,
    updateGroup,
    getRyminderList,
    rymindrlist,
    addToRymindr,
    CancelInvititionRequest,
    checkGroupExistInActiveRymindrs,
    getGroupList,
    addToEvent,
    getUpcommingEventList,
    eventlistdata,
    addContact,
    location,
    inviteGroup,
    getPendingList,
    pendingList,
    pendingCount,
    acceptedCount
  } = props;
  const [showPanel, setShowPanel] = useState(true);
  const [searchvalue, setSearchvalue] = useState('');
  const [searchRymindervalue, setsearchRymindervalue] = useState('');
  const [searchGroupvalue, setsearchGroupvalue] = useState('');
  const [searchEventvalue, setsearchEventvalue] = useState('');
  const [ContactList, setContactList] = useState([]);
  const [RyminderList, setRyminderList] = useState([]);
  const [DetailView, setDetailView] = useState(null);
  const [sendDataToUpdate, setsendDataToUpdate] = useState(null);
  const [groupsDelete, setGroupDelete] = useState(null);
  const [membersDelete, setmembersDelete] = useState(null);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [openEvent, setOpenEvent] = useState(false);
  const [userID, setuserID] = useState('');
  const [openGroup, setOpenGroup] = useState(false);
  const [openMember, setopenMember] = useState(false);
  const [requestShow, setRequestShow] = useState(false);
  const [PendingList, setPendingList] = useState([]);
  const [pending, setPending] = useState(false);

  const handleMobileShowDetail = () => {
    setShowPanel(false);
  };

  const handleHideDetail = () => {
    setShowPanel(true);
  };
  const [type, settype] = useState('');
  const handleShowDetail = (id, type, pen) => {
    console.log('pen -', pending);

    settype(type);
    setRequestShow(false);
    if (type === 'groups') {
      const groupDetail = grouplist.find(({ group_id }) => group_id === id);
      setDetailView(groupDetail);
    } else {
      console.log('userDetail-', pending);
      if (pen) {
        const userDetail = pendingList.find(({ user_id }) => user_id === id);
        setDetailView(userDetail);
      } else {
        const userDetail = usercontactlist.find(({ user_id }) => user_id === id);
        setDetailView(userDetail);
      }
    }
  };

  const deleteGroup = () => {
    const data = {
      user_id,
      group_id: DetailView.group_id,
    };
    const dataTosend = {
      user_id,
      business_code,
    };
    groupDelete(data, dataTosend);
    setOpenGroup(false);
  };

  const removeId = (group_id, group_members, id) => {
    const array = group_members.split(',');
    const index = array.indexOf(id);
    array.splice(index, 1);
    group_members = array.toString();
    const data = {
      user_id,
      group_id: group_id,
      group_members: group_members,
    };
    const dataTosend = {
      user_id,
      business_code,
    };
    updateGroup(data, dataTosend);
  };
  const deleteContact = (id, buss_code) => {
    const data = {
      connected_user_id: DetailView.user_id,
      business_code: DetailView.business_code,
    };
    const dataTosend = {
      user_id,
      business_code,
    };
    contactDelete(data, dataTosend);
    setopenMember(false);
  };

  const classes = useStyles();

  const [currency, setCurrency] = React.useState('all');
  const [message, setmessage] = React.useState('');
  const [optionToAddToRymindrOrGroup, setOptionToAddToRymindrOrGroup] = useState('');

  const handleChange = (event) => {
    if (event.target.value === 'all') {
      setContactList(contactlist);
    } else {
      var res = contactlist.filter((v) => v.type === event.target.value);
      setContactList(res);
    }
    setCurrency(event.target.value);
  };

  const getgroupDetail = (id) => {
    const groupDetail = grouplist.find(({ group_id }) => group_id === id);
    const user = [];
    if (groupDetail.group_member_list.length > 0) {
      groupDetail.group_member_list.map((option) => {
        user.push(option.user_id);
      });
      user.push(userID);
      const groupMemberString = user.join();
      const data = {
        // group_icon: groupDetail.group_icon,
        group_id: groupDetail.group_id,
        group_members: groupMemberString,
        group_name: groupDetail.group_name,
        user_id,
      };
      const dataTosend = {
        user_id,
        business_code,
      };
      updateGroup(data, dataTosend);
    } else {
      user.push(userID);
      const groupMemberString = user.join();
      const data = {
        // group_icon: groupDetail.group_icon,
        group_id: groupDetail.group_id,
        group_members: groupMemberString,
        group_name: groupDetail.group_name,
        user_id,
      };
      const dataTosend = {
        user_id,
        business_code,
      };
      updateGroup(data, dataTosend);
    }
    setOpen3(false);
  };

  // Check group info wrt rymindrs.
  const getGroupInfo = async (group_id) => {
    const response = await checkGroupExistInActiveRymindrs({
      group_id,
    });

    if (response) {
      setOptionToAddToRymindrOrGroup(group_id);
    } else {
      getgroupDetail(group_id);
    }
  };

  // useEffect(() => {
  //   const dataTosend = {
  //     user_id,
  //     business_code
  //   }
  //   if (!open3) { getContactlist(dataTosend) }
  // }, [open3])

  // Get group list.
  useEffect(() => {
    getGroupList({
      user_id: user_id,
      keyword: searchGroupvalue,
    });
  }, [searchGroupvalue]);

  // Get rymindr list.

  useEffect(() => {
    const data = {
      user_id,
      keyword: searchRymindervalue,
    };

    getRyminderList(data);
  }, [searchRymindervalue]);

  useEffect(() => {
    setPendingList(pendingList);
  }, [pendingList]);

  useMemo(() => {
    if (location && location.state && location.state.connection_id) {
      handleShowDetail(location.state.connection_id.toString(), 'individual');
    } else if (contactlist != undefined && contactlist.length > 0) {
      if (pending){
        handleShowDetail(pendingList[0].user_id, 'contact' , true);
        setContactList(pendingList)
      }
      else{
        handleShowDetail(contactlist[0].id, contactlist[0].type , false);
        setContactList(contactlist);
      }
      console.log('pending2-', pending);
    } else {
      setDetailView(null);
    }
    setRyminderList(rymindrlist);
    const dataTosend = {
      business_code,
      user_id,
    };
    getPendingList(dataTosend);
    console.log('contactlist-', contactlist);
  }, [contactlist, groupdeletemessage, rymindrlist]);
  // useMemo(() => {
  //   // success_message && enqueueSnackbar(success_message, { variant: 'success' })
  // }, [success_message])

  useMemo(() => {
    error && enqueueSnackbar(error, { variant: 'error' });
  }, [error]);
  console.log('pending-', pending);
  const handlePendingList = () => {
    setPending(!pending);
    if (pending) {
      setContactList(contactlist);
      handleShowDetail(contactlist[0].id, contactlist[0].type);
    } else {
      // setPending(!pending)
      setContactList(pendingList);
      handleShowDetail(pendingList[0].user_id, 'contact', true);
    }
  };

  const handleToopen = () => {
    setsendDataToUpdate(DetailView);
    setOpen1(true);
  };
  const handleAtNewGroup = () => {
    setsendDataToUpdate(null);
    setOpen1(true);
  };
  const deleteDialogueGroup = (group_id) => {
    setGroupDelete(group_id);
    setOpenGroup(true);
  };
  const deleteDialogueContact = (user_id, business_code) => {
    setmembersDelete(user_id, business_code);
    setopenMember(true);
  };
  const handleCloseGroup = (newVal) => {
    setOpenGroup(false);
  };
  const handleCloseMember = (newVal) => {
    setopenMember(false);
  };

  const handleClose1 = (newValue) => {
    setsendDataToUpdate(null);
    setOpen1(newValue);
  };

  const handleToopen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = (newValue2) => {
    setOpen2(newValue2);
  };

  const handleToopen3 = (id) => {
    setuserID(id);
    setOpen3(true);
    getGroupList({
      user_id: user_id,
      selected_user_id: id,
      keyword: searchGroupvalue,
    });
  };

  // Get events list.
  useEffect(() => {
    if (openEvent) {
      getUpcommingEventList({
        user_id,
        searchEventvalue,
      });
    }
  }, [searchEventvalue, openEvent]);

  const handleToopenEvent = (id) => {
    setuserID(id);
    setOpenEvent(true);
  };

  const handleClose3 = (newValue3) => {
    setOpen3(false);
  };

  const handleCloseEvent = () => {
    setOpenEvent(false);
  };

  const handleToopen4 = (id) => {
    setuserID(id);
    setOpen4(true);
  };

  const handleClose4 = (newValue3) => {
    setOpen4(false);
  };

  const handlesearch = (e) => {
    let tempTxt = e.target.value.charAt(0) === '0' ? e.target.value.slice(1) : e.target.value;
    let filteredByname = null;

    setSearchvalue(e.target.value);

    if (e.target.value.length > 0) {
      if (isNaN(tempTxt)) {
        filteredByname = contactlist.filter(
          (suggestion) => suggestion.name.toLowerCase().indexOf(tempTxt.toLowerCase()) > -1
        );
      } else {
        filteredByname = contactlist.filter(
          (suggestion) => suggestion.mobile_no && suggestion.mobile_no.indexOf(tempTxt) > -1
        );
      }
    } else {
      filteredByname = contactlist.filter((suggestion) => suggestion.name);
    }

    setContactList(filteredByname);
  };

  const addContactToRymindr = (id, type) => {
    const data = {
      user_contact_id: userID,
      rymindr_id: id,
      logged_in_user: user_id,
      type: type,
    };
    const dataTosend = {
      user_id,
    };
    addToRymindr(data, dataTosend);
    setOpen4(false);
  };

  const addContactToEvent = (id, userID) => {
    addToEvent({
      user_id: userID,
      event_id: id,
      logged_in_user: user_id,
    });

    setOpenEvent(false);
  };

  const handleRyminderSearch = (e) => {
    setsearchRymindervalue(e.target.value);
    // const filteredByname = rymindrlist.filter(
    //   (suggestion) => suggestion.note.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
    // );
    // setRyminderList(filteredByname);
  };

  const handleGroupSearch = (e) => {
    setsearchGroupvalue(e.target.value);
  };

  const handleEventSearch = (e) => {
    setsearchEventvalue(e.target.value);
  };

  const handleAddMemberToGroup = (group_id) => {
    const groupDetail = grouplist.find(({ group_id }) => group_id === group_id);
    const user = [];
    if (groupDetail.group_member_list.length > 0) {
      groupDetail.group_member_list.map((option) => {
        user.push(option.user_id);
      });
      user.push(userID);
      const groupMemberString = user.join();

      const data = {
        user_id,
        group_id: group_id,
        group_members: groupMemberString,
      };
      const dataTosend = {
        user_id,
        business_code,
      };
      console.warn('hellotyyttyy', data, dataTosend);
    }

    // updateGroup(data, dataTosend)
  };

  // Re-send invitation.
  // const UserReInvite = (mobile_no) => {
  //   InviteUser({
  //     user_id,
  //     mobile_no
  //   })
  // }

  const UserReInvite = (userId) => {
    const data = {
      user_id,
      join_user_id: userId,
      business_code,
      business_name: sc_bessi_name ? sc_bessi_name : first_name + ' ' + last_name,
      group_id: '',
      isResend: true,
    };
    const dataTosend = {
      user_id,
      business_code,
    };
    addContact(data, dataTosend);
  };

  return (
    <>
      <GroupDialog open={open1} onClose={handleClose1} DetailView={sendDataToUpdate} />
      <ContactDialog open={open2} onClose={handleClose2} />
      <DeleteGroup openGroup={openGroup} handleCloseGroup={handleCloseGroup} deletGroupUserGroup={deleteGroup} />
      <DeleteMember openMember={openMember} handleCloseMember={handleCloseMember} deleteContact={deleteContact} />
      <Dialog
        fullWidth
        maxWidth="md"
        disableBackdropClick
        disableEscapeKeyDown
        aria-labelledby="confirmation-dialog-title"
        open={open3}
        onClose={handleClose3}
      >
        {console.log('GroupList--', grouplist)}
        {console.log('contactGroupMemberlist-', contactGroupMemberlist)}
        <DialogTitleStyled id="form-dialog-title">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <TypoPopHeadStyled>Groups</TypoPopHeadStyled>
            <IconButton color="default" onClick={handleClose3}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitleStyled>
        <DialogContent>
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            fullWidth
            value={searchGroupvalue}
            onChange={handleGroupSearch}
          />
          {loading && <CircularSpinner />}
          {grouplist.length > 0 && !loading ? (
            grouplist.map((option) => (
              <div key={option.group_id}>
                <ListItem button>
                  <ListItemAvatar>
                    <AvatarStyledGroup alt={option.group_name} src={option.group_icon} />
                  </ListItemAvatar>
                  <ListItemText primary={option.group_name} />
                  {
                    // (option.group_members.split(",").indexOf(userID) > -1) ?  <ButtonSuccess variant='contained' startIcon={<Check />}>Added</ButtonSuccess> : <ButtonSuccess variant='contained' onClick={() => getgroupDetail(option.group_id)} startIcon={<Add />}>Add</ButtonSuccess>

                    option.group_members ? (
                      option.group_members.split(',').indexOf(userID) > -1 ? (
                        <ButtonSuccess variant="contained" startIcon={<Check />}>
                          Added
                        </ButtonSuccess>
                      ) : (
                        <ButtonSuccess
                          variant="contained"
                          onClick={() => getgroupDetail(option.group_id)}
                          startIcon={<Add />}
                        >
                          Add
                        </ButtonSuccess>
                      )
                    ) : (
                      <ButtonSuccess
                        variant="contained"
                        onClick={() => getgroupDetail(option.group_id)}
                        startIcon={<Add />}
                      >
                        Add
                      </ButtonSuccess>
                    )
                  }
                  {optionToAddToRymindrOrGroup &&
                    optionToAddToRymindrOrGroup !== option.group_id &&
                    (option.group_members.indexOf(userID) > -1 ? (
                      <ButtonSuccess variant="contained" startIcon={<Check />}>
                        Added
                      </ButtonSuccess>
                    ) : (
                      <ButtonSuccess
                        variant="contained"
                        onClick={() => getgroupDetail(option.group_id)}
                        startIcon={<Add />}
                      >
                        Add
                      </ButtonSuccess>
                    ))}

                  {optionToAddToRymindrOrGroup && optionToAddToRymindrOrGroup === option.group_id && (
                    <Box className={classes.optionToAddToRymindrOrGroup}>
                      <h5>Would you like to add to current rymindrs to this group?</h5>
                      <Box style={{ marginLeft: 10, marginRight: 10 }}>
                        <ButtonSuccess variant="contained" onClick={() => getgroupDetail(option.group_id)}>
                          Yes
                        </ButtonSuccess>
                      </Box>
                      <Box>
                        <ButtonSuccess variant="contained">+ Group only</ButtonSuccess>
                      </Box>
                    </Box>
                  )}
                </ListItem>
              </div>
            ))
          ) : (
            <ListItem button>
              <ListItemText primary="No Groups added" />
            </ListItem>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        fullWidth
        maxWidth="md"
        disableBackdropClick
        disableEscapeKeyDown
        aria-labelledby="confirmation-dialog-title"
        open={open4}
        onClose={handleClose4}
      >
        <DialogTitleStyled id="form-dialog-title">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <TypoPopHeadStyled>Rymindr/ Term/ Holiday list</TypoPopHeadStyled>
            <IconButton color="default" onClick={handleClose4}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitleStyled>

        <DialogContent>
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            fullWidth
            value={searchRymindervalue}
            onChange={handleRyminderSearch}
          />
          {loading && <CircularSpinner />}
          {RyminderList.length > 0 ? (
            <>
              {RyminderList.map((option) =>
                option.to_users.split(',').includes(userID) ? null : (
                  <div key={option.id}>
                    <ListItem>
                      <Box display="flex">
                        <Box display="flex">
                          <Box>
                            <Avatar
                              src={
                                option.type === 'rymindr'
                                  ? option.image
                                  : require('../../assets/images/event_rymindr.png')
                              }
                            />
                          </Box>
                          <Box className={classes.rymindrListItemDetail}>
                            <Box display="flex">
                              {parse(option.message)} <TypoListType>| {option.type}</TypoListType>
                            </Box>
                            <Box display="flex" className={classes.rymindrListItemDateTime}>
                              <Box>{option.start_date}</Box>
                              <Box className={classes.rymindrListItemDateTimeDivider}>
                                {option.type === 'rymindr' ? '|' : 'To'}
                              </Box>
                              <Box>{option.type === 'rymindr' ? option.start_time : option.end_date}</Box>
                            </Box>
                          </Box>
                        </Box>
                        <Box className={classes.rymindrListItemButton}>
                          {option.to_users.split(',').includes(userID) ? (
                            <ButtonSuccess variant="contained" startIcon={<Check />}>
                              Added
                            </ButtonSuccess>
                          ) : (
                            <ButtonSuccess
                              variant="contained"
                              onClick={() => addContactToRymindr(option.id, option.type)}
                              startIcon={<Add />}
                            >
                              Add
                            </ButtonSuccess>
                          )}
                        </Box>
                      </Box>
                    </ListItem>
                  </div>
                )
              )}
            </>
          ) : (
            <ListItem button>
              <ListItemText primary="No Rymindr contacts found.!" />
            </ListItem>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        fullWidth
        maxWidth="md"
        disableBackdropClick
        disableEscapeKeyDown
        aria-labelledby="event-dialogue"
        open={openEvent}
        onClose={handleCloseEvent}
      >
        <DialogTitleStyled id="form-dialog-title">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <TypoPopHeadStyled>Events</TypoPopHeadStyled>
            <IconButton color="default" onClick={handleCloseEvent}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitleStyled>
        <DialogContent>
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            fullWidth
            value={searchEventvalue}
            onChange={handleEventSearch}
          />
          {booklistLoading && <CircularSpinner />}
          {eventlistdata && eventlistdata.length ? (
            eventlistdata.map((item) => (
              <>
                <ListItem>
                  <ListItemAvatar>
                    <AvatarShareStyled alt={item.category} src={require('../../assets/images/event_rymindr.png')} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.subject}
                    secondary={<TypoListSubtext>{item.event_date}</TypoListSubtext>}
                  />
                  {item.event_to.split(',').includes(userID) ? (
                    <ButtonSuccess variant="contained" startIcon={<Add />}>
                      Added
                    </ButtonSuccess>
                  ) : (
                    <ButtonSuccess
                      variant="contained"
                      onClick={() => addContactToEvent(item.id, userID)}
                      startIcon={<Add />}
                    >
                      Add
                    </ButtonSuccess>
                  )}
                </ListItem>

                <Divider variant="inset" component="li" style={{ listStyleType: 'none' }} />
              </>
            ))
          ) : (
            <ListItem>No event found</ListItem>
          )}
        </DialogContent>
      </Dialog>

      <Grid className="main-wrap-head" container style={{ marginBottom: 20 }} alignItems="stretch">
        <Grid item xs={4}>
          <Box display="flex" alignItems="center">
            {showPanel ? null : (
              <Hidden mdUp implementation="css">
                <IconButton color="inherit" onClick={handleHideDetail}>
                  <ArrowBack />
                </IconButton>
              </Hidden>
            )}
            {pending ? (
              <TypoHeadStyled variant="h4">
                Pending <TypoHeadInnerStyled component="span">Contacts</TypoHeadInnerStyled>
                </TypoHeadStyled>
            ) : (
              <TypoHeadStyled variant="h4">
                My <TypoHeadInnerStyled component="span">Contacts</TypoHeadInnerStyled>
              </TypoHeadStyled>
            )}
          </Box>
        </Grid>

        <Grid item xs={8}>
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              size="large"
              className="mr-10"
              startIcon={<PersonAdd />}
              onClick={handleToopen2}
            >
              Add new contact
            </Button>
            {pending ? (
              <Button
                variant="contained"
                color="primary"
                size="large"
                className="mr-10"
                startIcon={<HowToReg />}
                onClick={handlePendingList}
              >
                Accepted ( {acceptedCount} )
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                size="large"
                className="mr-10"
                startIcon={<PendingIcon />}
                onClick={handlePendingList}
              >
                Pending ( {pendingCount} )
              </Button>
            )}
            <ButtonColor
              variant="contained"
              color="primary"
              size="large"
              startIcon={<GroupAdd />}
              onClick={handleAtNewGroup}
            >
              create new group
            </ButtonColor>
          </Box>
        </Grid>
      </Grid>

      <Grid className="main-wrap-body contact-cont-wrap" container alignItems="stretch">
        {showPanel ? (
          <Grid item sm={4} xs={12} md={4} className="contact-left leftSide-cont">
            <PaperLeftStyled className="sideBar-scroll">
              <TextFieldStyled
                select
                value={currency}
                fullWidth
                size="small"
                onChange={handleChange}
                variant="outlined"
              >
                {selectSearch.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextFieldStyled>

              <SearchFieldStyled
                id="input-with-icon-textfield"
                variant="outlined"
                fullWidth
                size="small"
                placeholder="Search by name or mobile number"
                value={searchvalue}
                onChange={handlesearch}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
              <List style={{ marginRight: 16, marginLeft: 16 }}>
                <Hidden>
                  {ContactList.length > 0 ? (
                    ContactList.map((item) => {
                      return (
                        <div key={item.id}>
                          {pending ? (
                            <>
                              <ListItem button onClick={() => handleShowDetail(item.user_id, 'contact' , true)} >
                                <ListItemAvatar>
                                  <AvatarShareStyled alt="semy Sharp" src={item.imageicon} />
                                </ListItemAvatar>
                                <div>
                                  <ListItemText primary={item.first_name + ' ' + item.last_name} />
                                  <ListItemText primary={item.mobile_no} />
                                </div>
                              </ListItem>
                              <Divider variant="inset" component="li" />
                            </>
                          ) : (
                            <>
                              <ListItem button onClick={() => handleShowDetail(item.id, item.type , false)} >
                                <ListItemAvatar>
                                  <AvatarShareStyled alt="semy Sharp" src={item.imageicon} />
                                </ListItemAvatar>
                                <div>
                                  <ListItemText primary={item.name.trim() != '' ? item.name : item.mobile_no} />
                                  <ListItemText primary={item.mobile_no} />
                                </div>
                              </ListItem>
                              <Divider variant="inset" component="li" />
                            </>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <Typography className={classes.commingSoonDesc} style={{ paddingTop: '2px', textAlign: 'center' }}>
                      No records Found
                    </Typography>
                  )}
                </Hidden>
              </List>
            </PaperLeftStyled>
          </Grid>
        ) : null}

        <Grid item sm={8} xs={12} md={8} className="contact-right rightSide-cont">
          {type === 'groups' ? (
            <PaperStyled className="sideBar-scroll">
              {DetailView != null ? (
                <Grid container alignItems="center" spacing={0}>
                  <Grid item xs={8}>
                    <Box className="ListItemAvatar-icon" display="flex" alignItems="center">
                      <AvatarLargeStyled alt="semy Sharp" src={DetailView.group_icon} />
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <TypoNameStyled>{DetailView.group_name}</TypoNameStyled>
                        <p style={{ paddingTop: '2rem', marginLeft: '1rem', fontWeight: 'bold' }}>
                          {DetailView.is_private == 1 ? 'Private' : 'Public'}
                        </p>
                      </div>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box display="flex" justifyContent="flex-end">
                      <ButtonPlain
                        disableRipple
                        startIcon={<Edit style={{ color: '#1872c0' }} />}
                        onClick={handleToopen}
                      >
                        Edit
                      </ButtonPlain>
                      <ButtonPlain
                        disableRipple
                        //  onClick={() => deleteGroup(DetailView.group_id)}
                        onClick={() => deleteDialogueGroup(DetailView.group_id)}
                        startIcon={<Delete style={{ color: '#ec4d4b' }} />}
                      >
                        Delete
                      </ButtonPlain>
                    </Box>
                  </Grid>
                </Grid>
              ) : null}
              {DetailView != null ? (
                <BoxContStyled className="contact-inner-right">
                  <BoxHeadrStyled display="flex" justifyContent="space-between" alignItems="center">
                    <BookingButton onClick={() => setRequestShow(false)}>
                      Group Members ({DetailView.group_member_list ? DetailView.group_member_list.length : ''})
                    </BookingButton>
                    <Box textAlign="right">
                      {DetailView.is_private == 0 && (
                        <BookingButton
                          className="ml-10"
                          style={requestShow ? { backgroundColor: '	#E0E0E0' } : {}}
                          onClick={() => setRequestShow(!requestShow)}
                          startIcon={<PersonAdd style={{ color: 'rgb(87, 95, 207)' }} />}
                        >
                          Invitations
                        </BookingButton>
                      )}

                      {DetailView.group_member_list.length > 0 ? (
                        <>
                          <Link to={'/event-bookings/' + DetailView.group_id + '/0/' + DetailView.group_name}>
                            <BookingButton
                              className="ml-10"
                              startIcon={<Drafts style={{ color: 'rgb(87, 95, 207)' }} />}
                            >
                              Booking
                            </BookingButton>
                          </Link>

                          <Link to={'/direct-message/' + DetailView.group_id + '/0/' + DetailView.group_name}>
                            <MessageButton
                              className="ml-10"
                              startIcon={<Email style={{ color: 'rgb(23, 186, 255)' }} />}
                            >
                              Message
                            </MessageButton>
                          </Link>

                          {/* <Link to={`/live-chat/${(DetailView.hasOwnProperty('group_id')) ? DetailView.group_id : DetailView.user_id}/${(DetailView.hasOwnProperty('group_id')) ? 'group' : 'member'}`}>
                          <ChatButton className='ml-10' startIcon={<Chat style={{ color: 'rgb(46, 205, 112)' }} />}>
                            Chat
                          </ChatButton>
                        </Link> */}

                          <Link to={'/create-rymindr/' + DetailView.group_id + '/0/' + DetailView.group_name}>
                            <SendRymindrButton startIcon={<Send style={{ color: 'rgb(255, 165, 2)' }} />}>
                              Send Rymindr
                            </SendRymindrButton>
                          </Link>
                        </>
                      ) : null}
                      {console.log('DetailView-', DetailView)}
                    </Box>
                  </BoxHeadrStyled>
                  {requestShow ? (
                    <>
                      {DetailView.invited != undefined ? (
                        <List>
                          {DetailView.invited.length > 0 ? (
                            DetailView.invited.map((item) => (
                              <div key={item.id}>
                                <GroupListStyled>
                                  <ListItemAvatar>
                                    <AvatarShareStyled alt="semy Sharp" src={item.profile_image} />
                                  </ListItemAvatar>
                                  <ListItemText
                                    primary={
                                      item.first_name
                                        ? item.first_name + ' ' + item.last_name
                                        : item.group_name
                                        ? item.group_name
                                        : item.mobile_no
                                        ? item.mobile_no
                                        : ''
                                    }
                                  />
                                  <ListItemSecondaryAction>
                                    <Box textAlign="right">
                                      <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        className="mr-10"
                                        startIcon={<PersonAdd />}
                                        onClick={
                                          () =>
                                            inviteGroup({
                                              request_id: item.id,
                                              status: 1,
                                              user_id: user_id,
                                              business_code: business_code,
                                            })
                                          // console.log('accept')
                                        }
                                      >
                                        Accept
                                      </Button>
                                      <Button
                                        variant="contained"
                                        color="secondary"
                                        size="large"
                                        className="mr-10"
                                        onClick={() =>
                                          inviteGroup({
                                            request_id: item.id,
                                            status: 2,
                                            user_id: user_id,
                                            business_code: business_code,
                                          })
                                        }
                                      >
                                        Decline
                                      </Button>
                                    </Box>
                                  </ListItemSecondaryAction>
                                </GroupListStyled>
                                <Divider variant="inset" component="li" />
                              </div>
                            ))
                          ) : (
                            <>
                              <ListItem button>
                                <ListItemText textAlign="center" primary="No New Requests" />
                              </ListItem>
                              {requestShow && setRequestShow(false)}
                            </>
                          )}
                        </List>
                      ) : (
                        <ListItem style={{ marginTop: '15px' }} button>
                          <ListItemText textAlign="center" style={{ textAlign: 'center' }} primary="No New Requests" />
                        </ListItem>
                      )}
                    </>
                  ) : (
                    <>
                      {DetailView.group_member_list != undefined ? (
                        <List>
                          {DetailView.group_member_list.length > 0 ? (
                            DetailView.group_member_list.map((item) => (
                              <div key={item.id}>
                                <GroupListStyled>
                                  <ListItemAvatar>
                                    <AvatarShareStyled alt="semy Sharp" src={item.profile_image} />
                                  </ListItemAvatar>
                                  <ListItemText
                                    primary={
                                      item.first_name
                                        ? item.first_name + ' ' + item.last_name
                                        : item.group_name
                                        ? item.group_name
                                        : item.mobile_no
                                        ? item.mobile_no
                                        : ''
                                    }
                                  />
                                  <ListItemSecondaryAction>
                                    <Button
                                      color="error"
                                      onClick={() =>
                                        removeId(DetailView.group_id, DetailView.group_members, item.user_id)
                                      }
                                    >
                                      Remove
                                    </Button>
                                  </ListItemSecondaryAction>
                                </GroupListStyled>
                                <Divider variant="inset" component="li" />
                              </div>
                            ))
                          ) : (
                            <ListItem button>
                              <ListItemText primary="No members added" />
                            </ListItem>
                          )}
                        </List>
                      ) : null}
                    </>
                  )}
                </BoxContStyled>
              ) : null}
            </PaperStyled>
          ) : (
            <PaperStyled>
              {DetailView != null ? (
                <Grid container alignItems="center" spacing={0}>
                  <Grid item xs={6}>
                    <Box display="flex" alignItems="center">
                      <AvatarLargeStyled alt="semy Sharp" src={DetailView.profile_image} />
                      <TypoNameStyled>
                        {DetailView.first_name
                          ? DetailView.first_name + ' ' + DetailView.last_name
                          : DetailView.group_name
                          ? DetailView.group_name
                          : DetailView.mobile_no
                          ? DetailView.mobile_no
                          : ''}
                      </TypoNameStyled>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box display="flex" justifyContent="flex-end">
                      {DetailView.status === 3 ? (
                        <ButtonPlain
                          onClick={() => UserReInvite(DetailView.user_id)}
                          variant="contained"
                          style={{ color: 'orange', border: '1px solid orange' }}
                        >
                          {loading && <CircularSpinner />}Resend Invitation
                        </ButtonPlain>
                      ) : // <ResendInvitationButton onClick={() => UserReInvite(DetailView.mobile_no)}>Resend Invitation</ResendInvitationButton>
                      DetailView.accept_status === 0 ? (
                        <ButtonPlain
                          onClick={() =>
                            CancelInvititionRequest({
                              mobile_no: DetailView.mobile_no,
                              user_id: user_id,
                              business_code: business_code,
                            })
                          }
                          variant="contained"
                          style={{ color: 'red', border: '1px solid red' }}
                        >
                          {loading && <CircularSpinner />}Cancel Request
                        </ButtonPlain>
                      ) : (
                        <ButtonPlain
                          variant="contained"
                          disableRipple
                          style={{ color: 'rgb(46, 205, 112)', border: '1px solid rgb(46, 205, 112)', width: '32%' }}
                        >
                          Connected
                        </ButtonPlain>
                      )}
                      {/* (DetailView.accept_status === '0') ? <ButtonPlain disableRipple style={{ color: 'red' }}>The contact is sent a connection request</ButtonPlain> : <ButtonPlain disableRipple style={{ color: 'green' }}>Accepted</ButtonPlain> */}

                      {/* <ButtonPlain disableRipple onClick={() => deleteContact(DetailView.user_id, DetailView.business_code)} startIcon={<Delete style={{ color: '#ec4d4b' }} />}> */}
                      <ButtonPlain
                        disableRipple
                        // onClick={() => deleteContact(DetailView.user_id, DetailView.business_code)}
                        onClick={() => deleteDialogueContact(DetailView.user_id, DetailView.business_code)}
                        startIcon={<Delete style={{ color: '#ec4d4b' }} />}
                      >
                        Delete
                      </ButtonPlain>
                    </Box>
                  </Grid>
                </Grid>
              ) : null}
              {DetailView != null ? (
                <ListStyled>
                  <BoxHeadrStyled display="flex" justifyContent="space-between" alignItems="center">
                    <TypoNameStyled />

                    <Box display="flex">
                      {DetailView.accept_status === 0 ? (
                        <AddToGroup disabled className="mr-10" startIcon={<GroupAdd style={{ color: '#cccccc' }} />}>
                          Add to Group
                        </AddToGroup>
                      ) : (
                        <AddToGroup
                          className="mr-10"
                          onClick={() => handleToopen3(DetailView.user_id)}
                          startIcon={<GroupAdd style={{ color: '#de22c7' }} />}
                        >
                          Add to Group
                        </AddToGroup>
                      )}
                      {DetailView.accept_status === 0 ? (
                        <SendRymindrButton disabled className="mr-10">
                          <Avatar className={classes.addToRymindr} src={AddToRymindrIconGrey} />
                          Add to Rymindr
                        </SendRymindrButton>
                      ) : (
                        <SendRymindrButton className="mr-10" onClick={() => handleToopen4(DetailView.user_id)}>
                          <Avatar className={classes.addToRymindr} src={AddToRymindrIcon} />
                          Add to Rymindr
                        </SendRymindrButton>
                      )}

                      {DetailView.accept_status === 0 ? (
                        <BookingButton className="mr-10" disabled startIcon={<Drafts />}>
                          Booking
                        </BookingButton>
                      ) : (
                        <Link
                          to={
                            '/event-bookings/0/' +
                            DetailView.user_id +
                            '/' +
                            DetailView.first_name +
                            ' ' +
                            DetailView.last_name
                          }
                        >
                          <BookingButton className="mr-10" startIcon={<Drafts style={{ color: 'rgb(87, 95, 207)' }} />}>
                            Booking
                          </BookingButton>
                        </Link>
                      )}

                      {DetailView.accept_status === 0 ? (
                        <MessageButton className="mr-10" disabled startIcon={<Email />}>
                          Message
                        </MessageButton>
                      ) : (
                        <Link
                          to={
                            '/direct-message/0/' +
                            DetailView.user_id +
                            '/' +
                            DetailView.first_name +
                            ' ' +
                            DetailView.last_name
                          }
                        >
                          <MessageButton className="mr-10" startIcon={<Email style={{ color: 'rgb(23, 186, 255)' }} />}>
                            Message
                          </MessageButton>
                        </Link>
                      )}

                      {DetailView.accept_status === 0 ? (
                        <ChatButton className="mr-10" disabled startIcon={<Chat />}>
                          Chat
                        </ChatButton>
                      ) : (
                        <Link
                          to={`/live-chat/${
                            DetailView.hasOwnProperty('group_id') ? DetailView.group_id : DetailView.user_id
                          }/${DetailView.hasOwnProperty('group_id') ? 'group' : 'member'}`}
                        >
                          <ChatButton className="mr-10" startIcon={<Chat style={{ color: 'rgb(46, 205, 112)' }} />}>
                            Chat
                          </ChatButton>
                        </Link>
                      )}

                      {DetailView.accept_status === 0 ? (
                        <SendRymindrButton disabled startIcon={<Send />}>
                          Send Rymindr
                        </SendRymindrButton>
                      ) : (
                        <Link
                          to={
                            '/create-rymindr/0/' +
                            DetailView.user_id +
                            '/' +
                            DetailView.first_name +
                            ' ' +
                            DetailView.last_name
                          }
                        >
                          <SendRymindrButton startIcon={<Send style={{ color: 'rgb(255, 165, 2)' }} />}>
                            Send Rymindr
                          </SendRymindrButton>
                        </Link>
                      )}
                    </Box>
                  </BoxHeadrStyled>

                  {DetailView.accept_status === '0' ? null : (
                    <>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <AvatarStyled
                            alt="semy Sharp"
                            variant="square"
                            src={require('../../assets/images/email.png')}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={<TypoTitleStyled>Email</TypoTitleStyled>}
                          secondary={<TypoContentStyled>{DetailView.email}</TypoContentStyled>}
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </>
                  )}

                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <AvatarStyled alt="semy Sharp" variant="square" src={require('../../assets/images/phone.png')} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={<TypoTitleStyled>Phone Number</TypoTitleStyled>}
                      secondary={<TypoContentStyled>{DetailView.mobile_no}</TypoContentStyled>}
                    />
                  </ListItem>

                  <Divider variant="inset" component="li" />

                  {DetailView.accept_status === 0 ? null : (
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <AvatarStyled
                          alt="semy Sharp"
                          variant="square"
                          src={require('../../assets/images/share.png')}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={<TypoTitleStyled>Groups</TypoTitleStyled>}
                        secondary={
                          <Box display="flex">
                            {console.log('DetailView', DetailView)}
                            {DetailView.group_info && DetailView.group_info.length >= 1 ? (
                              DetailView.group_info.map((option) => (
                                <Tooltip
                                  arrow
                                  placement={'bottom'}
                                  TransitionComponent={Fade}
                                  TransitionProps={{ timeout: 600 }}
                                  title={option.group_name}
                                >
                                  <div key={option.group_id} style={{marginRight: 15}}>
                                    <AvatarShareStyled alt="semy Sharp" src={option.group_icon} />
                                  </div>
                                </Tooltip>
                              ))
                            ) : (
                              <TypoContentStyled>
                                {DetailView.first_name !== ''
                                  ? DetailView.first_name + ' ' + DetailView.last_name + ' is not in any groups.'
                                  : DetailView.mobile_no + ' is not in any groups'}
                              </TypoContentStyled>
                            )}
                          </Box>
                        }
                      />
                    </ListItem>
                  )}
{console.log('DetailView-',DetailView)}
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar />
                    <ListItemText
                      primary={
                        <Box display="flex" className="mt-20">
                          {/* (DetailView.accept_status === '0') ?
                        null :
                        <AddToGroup className="mr-10 width180" onClick={() => handleToopenEvent(DetailView.user_id)} startIcon={<Event style={{color: '#de22c7'}} />}>Add to Event</AddToGroup> */}
                          {/* {(DetailView.accept_status === '0') ?
                              <ButtonSuccess variant="contained" className="mr-10 width180" style={{ backgroundColor: 'gray' }} startIcon={<Chat />}>Message</ButtonSuccess> :
                              <Link to={"/direct-message/0/" + DetailView.user_id + "/" + DetailView.first_name + " " + DetailView.last_name}>
                                <ButtonSuccess variant="contained" className="mr-10 width180" startIcon={<Chat />}>Message</ButtonSuccess>
                              </Link>
                              } */}
                          {/* (DetailView.accept_status === '0') ?
                              <AddToGroup className="mr-10 width180" disabled startIcon={<GroupAdd />}>Add to Group</AddToGroup> :
                              <AddToGroup className="mr-10 width180" onClick={() => handleToopen3(DetailView.user_id)} startIcon={<GroupAdd />}>Add to Group</AddToGroup>}
                            {(DetailView.accept_status === '0') ?
                              <SendRymindrButton color="primary" className="mr-10 width180" disabled>
                                <Avatar className={classes.addToRymindr} src={AddToRymindrIcon} />Add to Rymindr
                              </SendRymindrButton> :
                              <SendRymindrButton color="primary" className="mr-10 width180" onClick={() => handleToopen4(DetailView.user_id)}>
                                <Avatar className={classes.addToRymindr} src={AddToRymindrIcon} />Add to Rymindr
                              </SendRymindrButton> */}
                          {/* {(DetailView.accept_status === '0') ?
                              <ButtonWarn variant="contained" className="width180" style={{ backgroundColor: 'gray' }} startIcon={<Send />}>
                                Send Rymindr
                              </ButtonWarn>
                              :
                              <Link to={"/create-rymindr/0/" + DetailView.user_id + "/" + DetailView.first_name + " " + DetailView.last_name}>
                                <ButtonWarn variant="contained" className="width180" startIcon={<Send />}>
                                  Send Rymindr
                                </ButtonWarn>
                              </Link>} */}
                        </Box>
                      }
                    />
                  </ListItem>
                </ListStyled>
              ) : (
                <Box className={classes.content}>
                  <CardMedia className={classes.icon} image={RymindrOriginal} title="Message Center" component="img" />
                  <Typography className={classes.commingSoonDesc} style={{ paddingTop: '2px' }}>
                    No record Found
                  </Typography>
                </Box>
              )}
            </PaperStyled>
          )}
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.contact.loading,
    error: state.contact.error,
    contactlist: state.contact.contactlist,
    pendingList: state.contact.pendingList,
    pendingCount: state.contact.pendingCount,
    acceptedCount: state.contact.acceptedCount,
    contactGroupMemberlist: state.contact.contactGroupMemberlist,
    grouplist: state.contact.grouplist,
    usercontactlist: state.contact.usercontactlist,
    groupdeletemessage: state.contact.groupdeletemessage,
    success_message: state.contact.success_message,
    rymindrlist: state.contact.rymindrlist,
    addmessage: state.contact.addmessage,
    booklistLoading: state.booklist.loading,
    eventlistdata: state.booklist.eventlistdata,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getContactlist: (data) => dispatch(getContactlist(data)),
    getPendingList: (data) => dispatch(getPendingList(data)),
    getGroupList: (data) => dispatch(getGroupList(data)),
    getGroupMemberList: (data) => dispatch(getGroupMemberList(data)),
    groupDelete: (data, dataTosend) => dispatch(groupDelete(data, dataTosend)),
    contactDelete: (data, dataTosend) => dispatch(contactDelete(data, dataTosend)),
    updateGroup: (data, dataTosend) => dispatch(updateGroup(data, dataTosend)),
    getRyminderList: (data) => dispatch(getRyminderList(data)),
    addToRymindr: (data, dataTosend) => dispatch(addToRymindr(data, dataTosend)),
    InviteUser: (data) => dispatch(InviteUser(data)),
    CancelInvititionRequest: (data) => dispatch(CancelInvititionRequest(data)),
    checkGroupExistInActiveRymindrs: (data) => dispatch(checkGroupExistInActiveRymindrs(data)),
    getUpcommingEventList: (data) => dispatch(getUpcommingEventList(data)),
    addToEvent: (data) => dispatch(addToEvent(data)),
    addContact: (data, dataTosend) => dispatch(addContact(data, dataTosend)),
    inviteGroup: (data) => dispatch(inviteGroup(data)),
  };
};

LiveChat.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  getContactlist: PropTypes.func.isRequired,
  groupDelete: PropTypes.func.isRequired,
  contactDelete: PropTypes.func.isRequired,
  getGroupMemberList: PropTypes.func.isRequired,
  contactlist: PropTypes.any.isRequired,
  grouplist: PropTypes.any.isRequired,
  usercontactlist: PropTypes.any.isRequired,
  groupdeletemessage: PropTypes.any.isRequired,
  success_message: PropTypes.any.isRequired,
  updateGroup: PropTypes.func.isRequired,
  getRyminderList: PropTypes.func.isRequired,
  rymindrlist: PropTypes.any.isRequired,
  addToRymindr: PropTypes.func.isRequired,
  addmessage: PropTypes.func.isRequired,
  InviteUser: PropTypes.func.isRequired,
  addContact: PropTypes.func.isRequired,
  CancelInvititionRequest: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(LiveChat));
