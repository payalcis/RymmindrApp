import React, { useState, useEffect, useMemo } from 'react';
import { makeStyles, styled, withStyles } from '@material-ui/core/styles';
import { Link, Route, BrowserRouter as Router, Switch, useHistory } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  AppBar,
  Tabs,
  Tab,
  Box,
  Button,
  Divider,
  InputAdornment,
  TextField,
  IconButton,
  Hidden,
  FormControlLabel,
  MenuItem,
  Menu,
  Badge,
  CardMedia,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {
  Print,
  FiberManualRecord,
  Close,
  Comment,
  Delete,
  Edit,
  Search,
  ArrowBack,
  Attachment,
  Headset,
  Image,
  Videocam,
  Description,
  Message,
  MoreVert,
  ThumbUp,
  Check,
  Update,
} from '@material-ui/icons';
import {
  getCategories,
  getMessageDetails,
  getMessageContactsDetail,
  deleteMessage,
  messageDetailClear,
} from '../../store/actions/messageCenterAction';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Comments from '../../container/Comments/Comments';
import ResponsiveDialog from './Modal/MessageModalDelete';
import RymindrOriginal from '../../assets/images/rymindr_original.png';
import parse from 'html-react-parser';
import moment from 'moment';
import axios from 'axios';
//import Pusher from 'pusher-js';
import io from 'socket.io-client';
import { set } from 'date-fns/esm';
import { getBusinessUsers } from '../../store/actions/rymidr';
const imagePath = 'https://rymindrapi.com/RymindrApi/public/attachment';

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
    maxHeight: 1000,
    overflow: 'auto',
  },
  rightPanel: {
    [theme.breakpoints.up('md')]: {
      display: 'block !important',
    },
  },
  iconAttach: {
    color: theme.palette.primary.dark,
    background: theme.palette.primary.light,
    height: 32,
    width: 32,
    borderRadius: 16,
    padding: 5,
    float: 'left',
    marginTop: -5,
    marginRight: '10px',
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

const AvatarStyled = styled(Avatar)({
  height: 'auto',
  width: 25,
  '& img': {
    height: 'auto',
  },
});

const ListItemStyled = styled(ListItem)(({ theme }) => ({
  borderRadius: 8,
}));

const TabsStyles = styled(Tabs)(({ theme }) => ({
  borderBottom: '1px solid #ccc',
  '& span': {
    justifyContent: 'center',
  },
}));

const TypoTimeStyled = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.primary.main,
  fontWeight: 'bold',
}));

const TypoStatusStyled = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.secondary.contrastText,
  width: 60,
  textAlign: 'right',
  fontWeight: '600',
}));

const TypoStatusStyledRead = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: '#44b700',
  width: 60,
  textAlign: 'right',
  fontWeight: '600',
}));

const TypoTitleStyled = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.secondary.contrastText,
  marginBottom: 10,
}));

const DialogTitleStyled = styled(DialogTitle)({
  borderBottom: '1px solid #e0e0e0',
  padding: '10px 24px',
});

const TypoPopHeadStyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.contrastText,
  fontSize: 18,
  fontWeight: '600',
}));

const TypoContentStyled = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  color: theme.palette.text.primary,
}));

const AvatarShareStyled = styled(Avatar)({
  height: 50,
  width: 50,
});

const BoxStyled = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
});

const TypoHeadStyled = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  color: theme.palette.primary.main,
  textTransform: 'uppercase',
  fontWeight: 'bold',
}));

const TypoHeadOwerWriteStyled = styled(Typography)(({ theme }) => ({
  fontSize: 42,
  color: theme.palette.primary.main,
  backgroundColor: 'pink',
  textTransform: 'uppercase',
  fontWeight: 'bold',
}));

const TypoHeadInnerStyled = styled(TypoHeadStyled)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const TypoListSubtext = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.secondary.contrastText,
}));

const SearchFieldStyled = styled(TextField)(({ theme }) => ({
  padding: 20,
  paddingLeft: 0,
  paddingRight: 0,
}));

const ListStyled = styled(List)(({ theme }) => ({
  paddingLeft: 20,
}));

const TypoStyled = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  color: theme.palette.text.primary,
  marginTop: 10,
  marginBottom: 10,
  marginRight: 10,
  cursor: 'pointer',
}));

const GridStyled = styled(Grid)({
  padding: '15px 15px 15px 30px',
});

const AvatarComntStyled = styled(Avatar)({
  height: 42,
  width: 42,
  marginRight: 20,
});

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

const StyledReadBadge = withStyles((theme) => ({
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

const StyledUnreadBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#1773bf',
    color: '#1773bf',
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

const TextFieldStyled = styled(TextField)(({ theme }) => ({
  paddingTop: 20,
  textAlign: 'left',
}));

const TextComntFieldStyled = styled(TextField)({
  width: 100 + '%',
  height: 100,
});

const TypoCmntName = styled(Typography)({
  color: '#757575',
  fontWeight: 'bold',
  fontSize: 12,
  '& span': {
    fontWeight: 'normal',
    marginLeft: 20,
  },
});
const TypoCmntTxt = styled(Typography)({
  color: '#3d3d3d',
  fontSize: 14,
});
const ButtonStyled = styled(Button)({
  color: '#757575',
  fontSize: 12,
});

const ButtonPlain = styled(Button)(({ theme }) => ({
  color: '#98a5af',
  fontSize: 12,
  textTransform: 'capitalize',
  background: 'none',
  boxShadow: 'none',
}));

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function LiveFeed(props) {
  const history = useHistory();

  const [value, setValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const {
    error,
    all_categories,
    message_details,
    message_contact_detail,
    deleteMessage,
    success_message,
    enqueueSnackbar,
    messageDetailClear,
    businessusers,
    getBusinessUsers,
    ...other
  } = props;

  const currencies = [
    {
      value: 'all',
      label: 'all',
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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const [openImage, setOpenImage] = React.useState(false);
  const [users_list, setUserList] = useState([]);
  const [groups_list, setGroupList] = useState([]);

  const [selectedImage, setSelectedImage] = React.useState('');

  const handleClickImageOpen = (file) => {
    setOpenImage(true);
    setSelectedImage(file);
  };

  const handleCloseImageModal = () => {
    setOpenImage(false);
  };

  const [currency, setCurrency] = useState('all');

  const [showPanel, setShowPanel] = useState(true);

  const [showParticularMessage, setShowParticularMessage] = useState([]);

  const [ContactList, setContactList] = useState([]);

  const [open1, setOpen1] = useState(false);
  useEffect(() => {
    console.log('businessusers--', businessusers);
    let contactList = businessusers;
    setContactList(contactList);
  }, [businessusers]);

  const handleShowDetail = (id) => {
    setShowPanel(false);
    // alert('show'+id);
    const found_particular_message = message_details.find((element) => element.id == id);
    if (found_particular_message) {
      setShowParticularMessage(found_particular_message);
      setSelectedItem(id);
    }
  };
console.log('showParticularMessage',showParticularMessage)
  const handleShowDetailRight = (id) => {
    // alert('show'+id);
    const found_particular_message = message_details.find((element) => element.id == id);
    if (found_particular_message) {
      console.log('found_particular_message22==-------------===', found_particular_message);
      setShowParticularMessage(found_particular_message);
      setSelectedItem(id);
      setUserList(found_particular_message.member)
      setGroupList(found_particular_message.group)
      console.log('user-li',users_list)
      // if (found_particular_message.member.length==0 || found_particular_message.group.length==0){
      //   props.getMessageDetails({ user_id });
      // }
    }
  };

  const handleCreateMessage = () => {
    if (ContactList.length > 0) {
      history.push('/direct-message');
      messageDetailClear();
    } else {
      setOpen1(true);
    }
  };

  const handleCancel = () => {
    setOpen1(false);
  };

  useEffect(() => {
    let mounted = true;
    setTimeout(function () {
      if (mounted) {
        success_message && enqueueSnackbar(success_message, { variant: 'success' });
      }
    }, 1000);
    return function cleanup() {
      mounted = false;
    };
  }, [success_message]);

  useEffect(() => {
    let mounted = true;
    setTimeout(function () {
      if (mounted) {
        error && enqueueSnackbar(error, { variant: 'error' });
      }
    }, 0);
    return function cleanup() {
      mounted = false;
    };
  }, [error]);

  // console.log('showParticularMessage', showParticularMessage)

  const openEditPage = (id) => {
    if (id) {
      history.push('/direct-message/' + id);
    } else {
      alert('Please select any Message to Edit');
    }
  };

  const handleHideDetail = () => {
    setShowPanel(true);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenDelete(false);
  };

  const [selectedItem, setSelectedItem] = useState('');

  const classes = useStyles();

  const [messageDetail, setMessageDetail] = useState([]);

  const [messageContactDetail, setMessageContactDetail] = useState(message_contact_detail);

  const [openDelete, setOpenDelete] = useState(false);

  const { user_id, business_code, first_name, last_name } = JSON.parse(localStorage.getItem('userData'));

  useEffect(() => {
    const dataToSend = { user_id };
    props.getcategories(dataToSend);
    props.getMessageDetails({ user_id });
    const dataTosend = {
      user_id,
      business_code,
    };
    getBusinessUsers(dataTosend);
  }, []);

  const showMessageDetailsOnInit = () => {
    if (message_details.length > 0) {
      handleShowDetailRight(message_details[0].id);
      setSelectedItem(message_details[0].id);
    }
  };
  useEffect(()=>{
    if (showParticularMessage != null  && showParticularMessage.member){
      setUserList(showParticularMessage.member)
    }
    console.log('usersss',users_list)
  },[showParticularMessage])

  useEffect(() => {
    console.log('selectedItem====', selectedItem);
    if (selectedItem) {
      props.getMessageContactsDetail({ user_id: user_id, message_id: selectedItem });
    }
    console.log('showParticularMessage-',showParticularMessage)
    let mounted = true;
    var sock = io('https://app.rymindr.com:8081');
    sock.on('message-status:App\\Events\\MessageStatus', function (data) {
      if (mounted) {
        console.log('Socket runningngngngngngngngngngngngngngngngngngngngngngng=', data);
        if (data.postId == selectedItem) {
          console.log('postId====', selectedItem);
          props.getMessageContactsDetail({ user_id: user_id, message_id: selectedItem });
        }
      }
    });
    
    return function cleanup() {
      mounted = false;
    };
  }, [selectedItem]);

  // useEffect(() => {
  //   if(selectedItem){
  //     props.getMessageContactsDetail({ 'user_id':user_id,'message_id':selectedItem });
  //   }
  //   var pusher = new Pusher('b5678cf7a65e2065a151', {
  //     cluster: 'eu',
  //     encrypted: true,
  //   });
  //   var channel = pusher.subscribe('message-status');
  //   channel.bind('my-event', (data) => {
  //     console.log('datadatadatadata=',data);
  //     if(data.post_id==selectedItem){
  //       props.getMessageContactsDetail({ 'user_id':user_id,'message_id':selectedItem });
  //     }
  //   });
  // }, [selectedItem])

  useEffect(() => {
    // console.log('message_contact_detail====',message_contact_detail);
    // console.log('selectedItem22====',selectedItem);
    if (message_contact_detail.post_id == selectedItem) {
      let objIndex = message_details.findIndex((element) => element.id == selectedItem);
      if (objIndex >= 0) {
        message_details[objIndex].member = message_contact_detail.members;
        //console.log('updated====',message_details);
        if (message_details.length > 0) {
          handleShowDetailRight(selectedItem);
          setSelectedItem(selectedItem);
        }
      }
    }
  }, [message_contact_detail]);
  useEffect(() => {
    setMessageDetail(message_details);
    // To show the first message details initially
    showMessageDetailsOnInit();
  }, [message_details]);
console.log('message_details',message_details)
  const handleChange = (event) => {
    setCurrency(event.target.value);
    if (event.target.value == 'all') {
      setMessageDetail(message_details);
    } else {
      const found_messages = message_details.filter((element) => element.category == event.target.value);
      if (found_messages) {
        setMessageDetail(found_messages);
      } else {
        setMessageDetail([{ subject: 'No Message Found' }]);
      }
    }
  };

  const handleOnChange = (event) => {
    const searchStr = event.target.value;
    const messages = [...messageDetail];
    // console.log('messages', messages);
    if (searchStr == '') {
      setMessageDetail(message_details);
    } else {
      // Filter them
      const filteredMessages = messages.filter(
        (obj) =>
          obj.subject.toLowerCase().includes(searchStr.toLowerCase()) ||
          obj.day.toLowerCase().includes(searchStr.toLowerCase()) ||
          obj.created_at.toLowerCase().includes(searchStr.toLowerCase())
      );
      setMessageDetail(filteredMessages);
    }
  };

  const [deleteMsgId, setDeleteMsgId] = useState(null);

  const handleDelete = (id) => {
    if (id != undefined) {
      setDeleteMsgId(id);
      setOpenDelete(true);
    }
  };

  const deleteMsg = (delete_id) => {
    // alert(delete_id);
    deleteMessage(deleteMsgId, user_id).then(() => {
      setOpenDelete(false);
      // window.location.reload();
      // console.log('before delete_messg',messageDetail);
      const getIndex = messageDetail.findIndex((element) => element.id == delete_id);
      messageDetail.splice(getIndex, 1);
      setMessageDetail(messageDetail);
      console.log('messageDetail-',messageDetail)
      // console.log('after delete_messg',messageDetail);
      if (message_details.length > 0) {
        handleShowDetailRight(message_details[0].id);
      } else {
        setShowParticularMessage([]);
      }
    });
  };

  const cat_name = '';

  const mainArray = messageDetail || message_details; // messagesList;

  const Rymindrlist = mainArray.map((item, key) => (
    <>
      {console.log('itemmm-', selectedItem ? selectedItem === item.id : messageDetail.id === item.id)}
      <Hidden mdUp implementation="css">
        <ListItemStyled
          button
          onClick={() => handleShowDetail(item.id)}
          key={key}
          selected={selectedItem ? selectedItem === item.id : messageDetail.id === item.id}
        >
          <ListItemAvatar>
            <AvatarShareStyled alt="semy Sharp" src={item.category_image} />
          </ListItemAvatar>
          <ListItemText
            primary={item.subject}
            secondary={
              <TypoListSubtext>
                {item.day} {item.created_at}
              </TypoListSubtext>
            }
          />
        </ListItemStyled>
        <Divider variant="inset" component="li" />
      </Hidden>

      <Hidden smDown implementation="css">
        <ListItemStyled
          button
          onClick={() => handleShowDetailRight(item.id)}
          key={key}
          selected={selectedItem ? selectedItem === item.id : messageDetail.id === item.id}
        >
          <ListItemAvatar>
            <AvatarShareStyled alt="semy Sharp" src={item.category_image} />
          </ListItemAvatar>
          <ListItemText
            primary={item.subject}
            secondary={
              <TypoListSubtext>
                {item.day} {item.created_at}
              </TypoListSubtext>
            }
          />
        </ListItemStyled>
        <Divider variant="inset" component="li" />
      </Hidden>
    </>
  ));

  let total_group_count = 0;
  let total_member_count = 0;
  let total_count = 0;
  total_group_count = showParticularMessage.group_count ? showParticularMessage.group_count : 0;
  total_member_count = showParticularMessage.member ? showParticularMessage.member.length : 0;
  total_count = total_group_count + total_member_count;

  return (
    <>
      <Grid className="main-wrap-head" container style={{ marginBottom: 20 }} alignItems="center">
        <ResponsiveDialog
          open={openDelete}
          handleClose={handleClose}
          deleteMsg={() => deleteMsg(showParticularMessage.id)}
        />
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
        <Grid item xs={7}>
          <Box display="flex" alignItems="center">
            {showPanel ? null : (
              <Hidden mdUp implementation="css">
                <IconButton color="inherit" onClick={handleHideDetail}>
                  <ArrowBack />
                </IconButton>
              </Hidden>
            )}
            <TypoHeadStyled variant="h4">
              Message <TypoHeadInnerStyled component="span">Center</TypoHeadInnerStyled>
            </TypoHeadStyled>
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {
                handleCreateMessage();
              }}
            >
              CREATE NEW MESSAGE
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Grid className="main-wrap-body msg-cont-wrap" container alignItems="stretch">
        {showPanel ? (
          <Grid item xs={12} md={4} className="pr-25 sidebar-list leftSide-cont">
            <Paper className={classes.paper}>
              <TextFieldStyled
                select
                value={currency}
                fullWidth
                size="small"
                onChange={handleChange}
                variant="outlined"
              >
                <MenuItem key="all" value="all" style={{ paddingLeft: '2rem' }}>
                  All
                </MenuItem>
                {all_categories.map((option) => {
                  return (
                    <MenuItem key={option.id} value={option.category_name}>
                      <img src={option.category_image} style={{ width: '13%', marginRight: '1.5rem' }} />{' '}
                      {option.category_name}
                    </MenuItem>
                  );
                })}
              </TextFieldStyled>

              <SearchFieldStyled
                id="input-with-icon-textfield"
                variant="outlined"
                fullWidth
                size="small"
                onKeyUp={handleOnChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
              <List>
                {Rymindrlist.length > 0 ? (
                  Rymindrlist
                ) : (
                  <Typography className={classes.commingSoonDesc}>No records Found</Typography>
                )}
              </List>
            </Paper>
          </Grid>
        ) : (
          ''
        )}

        <Grid
          item
          xs={12}
          md={8}
          className={clsx(classes.rightPanel, 'rightSide-cont')}
          style={{ display: showPanel ? 'none' : 'block' }}
        >
          <Paper className={classes.paper}>
            {showParticularMessage.subject ? (
              <>
                <GridStyled container alignItems="center">
                  <Grid xs={6}>
                    <BoxStyled alignItems="center">
                      <AvatarShareStyled alt="semy Sharp" className="mr-0" src={showParticularMessage.category_image} />
                      <Typography noWrap>
                        <Box fontWeight="fontWeightBold" m={1}>
                          {showParticularMessage.subject ? showParticularMessage.subject : 'No Subject'} |{' '}
                          {showParticularMessage.category ? showParticularMessage.category : 'No Category'}
                        </Box>
                      </Typography>
                    </BoxStyled>
                  </Grid>
                  <Grid xs={6}>
                    <Box display="flex" justifyContent="flex-end">
                      <ButtonPlain
                        disableRipple
                        startIcon={<Edit style={{ color: '#1872c0' }} />}
                        onClick={() => openEditPage(showParticularMessage.id)}
                      >
                        Edit
                      </ButtonPlain>
                      <ButtonPlain
                        disableRipple
                        onClick={() => handleDelete(showParticularMessage.id)}
                        startIcon={<Delete style={{ color: '#ec4d4b' }} />}
                      >
                        Delete
                      </ButtonPlain>
                    </Box>
                  </Grid>
                </GridStyled>

                <ListStyled>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <AvatarStyled
                        alt="semy Sharp"
                        variant="square"
                        src={require('../../assets/images/calendar_icon.png')}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={<TypoTitleStyled>Date & Time</TypoTitleStyled>}
                      secondary={
                        <TypoContentStyled>
                          {showParticularMessage.day} {showParticularMessage.created_at}
                        </TypoContentStyled>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <AvatarStyled alt="semy Sharp" variant="square" src={require('../../assets/images/email.png')} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={<TypoTitleStyled>Message</TypoTitleStyled>}
                      secondary={<Typography>{parse(showParticularMessage.message)}</Typography>}
                    />
                  </ListItem>

                  {showParticularMessage.linked_to_rymindr == 1 && showParticularMessage.rymindr_title ? (
                    <>
                      <Divider variant="inset" component="li" />
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <AvatarStyled
                            alt="semy Sharp"
                            variant="square"
                            src={require('../../assets/images/rymindr.png')}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={<TypoTitleStyled>Linked Rymindr</TypoTitleStyled>}
                          secondary={
                            // <Typography>{showParticularMessage.linked_to_rymindr == 1 && showParticularMessage.rymindr_title
                            //   ? showParticularMessage.rymindr_title.map((title, index) => {
                            //     console.warn('showParticularMessage222', showParticularMessage);
                            //     return (<p>{index + 1}. {parse(title.note)}</p>)
                            //   })
                            //   : 'Not linked to any Rymindr'}
                            // </Typography>
                            <Typography>
                              {showParticularMessage.linked_to_rymindr == 1 && showParticularMessage.rymindrList
                                ? showParticularMessage.rymindrList.map((data, index) => {
                                    console.warn('showParticularMessage222', showParticularMessage);
                                    return (
                                      <>
                                        <ListItemStyled button onClick={() => console.warn('hello click')} key={index}>
                                          <ListItemAvatar>
                                            <AvatarShareStyled alt="semy Sharp" src={data.category_image} />
                                          </ListItemAvatar>
                                          <ListItemText
                                            primary={parse(data.note)}
                                            secondary={
                                              <TypoListSubtext>{`${moment(data.rymindr_date).format(
                                                'dddd DD MMMM YYYY'
                                              )}  | ${moment(data.rymindr_date + ' ' + data.rymindr_time).format(
                                                'LT'
                                              )}`}</TypoListSubtext>
                                            }
                                          />
                                        </ListItemStyled>
                                        <Divider variant="inset" component="li" />
                                      </>
                                    );
                                  })
                                : 'Not linked to any Rymindr'}
                            </Typography>
                          }
                        />
                      </ListItem>
                    </>
                  ) : (
                    ''
                  )}

                  {showParticularMessage.attachment != '' ? (
                    <>
                      <Divider variant="inset" component="li" />
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <AvatarStyled
                            alt="semy Sharp"
                            variant="square"
                            src={require('../../assets/images/attach.png')}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={<TypoTitleStyled>Attachment</TypoTitleStyled>}
                          secondary={
                            <Box display="flex" alignItems="center">
                              {showParticularMessage.attachment
                                ? showParticularMessage.attachment.map((file, index) => {
                                    //const extension_arr = file.attachment.split('.')
                                    const extension_arr = file.attachment_object.split('.');
                                    // const extension = extension_arr[1];
                                    const temp_extension = extension_arr[1].split('"');
                                    const extension = temp_extension[0];
                                    const imagePath = 'https://rymindrapi.com/RymindrApi/public/attachment';
                                    const docFile = file.attachment_object;
                                    const docFileName = docFile.name;
                                    console.warn(
                                      'file.attachment123',
                                      file.attachment,
                                      extension,
                                      docFile,
                                      temp_extension[0] === 'png'
                                    );

                                    if (
                                      extension == 'jpeg' ||
                                      extension == 'jpg' ||
                                      extension == 'png' ||
                                      extension == 'gif'
                                    ) { 
                                      console.log('hello attachment if');
                                      return (
                                        // <TypoStyled variant='subtitle1' component='p' key={index}>
                                        //   <img src={`${file.attachment}`} className={classes.iconAttach} onClick={() => handleClickImageOpen(file.attachment)} />{docFile}
                                        // </TypoStyled>
                                        <TypoStyled variant="subtitle1" component="p" key={index}>
                                          <img
                                            src={`${file.attachment}`}
                                            className={classes.iconAttach}
                                            onClick={() => handleClickImageOpen(file.attachment)}
                                          />
                                          Image
                                        </TypoStyled>
                                      );
                                    } else if (extension == 'mp3') {
                                      return (
                                        // <TypoStyled variant='subtitle1' component='p' key={index}>
                                        //   <a style={{ textDecoration: 'none', color: 'black' }} href={`${file.attachment}`} target='_blank'>
                                        //     <Headset className={classes.iconAttach} />{docFile}
                                        //   </a>
                                        // </TypoStyled>
                                        <TypoStyled variant="subtitle1" component="p" key={index}>
                                          <a
                                            style={{ textDecoration: 'none', color: 'black' }}
                                            href={`${file.attachment}`}
                                            target="_blank"
                                          >
                                            <Headset className={classes.iconAttach} />
                                            Video
                                          </a>
                                        </TypoStyled>
                                      );
                                    } else if (extension == 'mp4') {
                                      return (
                                        // <TypoStyled variant='subtitle1' component='p' key={index}>
                                        //   <a style={{ textDecoration: 'none', color: 'black' }} href={`${file.attachment}`} target='_blank'>
                                        //     <Videocam className={classes.iconAttach} /> {docFile}
                                        //   </a>
                                        // </TypoStyled>
                                        <TypoStyled variant="subtitle1" component="p" key={index}>
                                          <a
                                            style={{ textDecoration: 'none', color: 'black' }}
                                            href={`${file.attachment}`}
                                            target="_blank"
                                          >
                                            <Videocam className={classes.iconAttach} /> Audio
                                          </a>
                                        </TypoStyled>
                                      );
                                    } else if (extension == 'doc' || extension == 'docx' || extension == 'pdf') {
                                      return (
                                        // <TypoStyled variant='subtitle1' component='p' key={index}>
                                        //   <a style={{ textDecoration: 'none', color: 'black' }} href={`${file.attachment}`} target='_blank'>
                                        //     <Description className={classes.iconAttach} /> {docFile}
                                        //   </a>
                                        // </TypoStyled>
                                        <TypoStyled variant="subtitle1" component="p" key={index}>
                                          <a
                                            style={{ textDecoration: 'none', color: 'black' }}
                                            href={`${file.attachment}`}
                                            target="_blank"
                                          >
                                            <Description className={classes.iconAttach} />
                                            Document
                                          </a>
                                        </TypoStyled>
                                      );
                                    } else {
                                      return (
                                        <TypoStyled variant="subtitle1" component="p" key={index}>
                                          <a
                                            style={{ textDecoration: 'none', color: 'black' }}
                                            href={`${file.attachment}`}
                                            target="_blank"
                                          >
                                            <Description className={classes.iconAttach} />
                                            Document
                                          </a>
                                        </TypoStyled>
                                      );
                                    }
                                  })
                                : 'No Attachments'}
                            </Box>
                          }
                        />
                      </ListItem>
                    </>
                  ) : (
                    ''
                  )}

                  {/* STATUS */}
                  <Divider variant="inset" component="li" />

                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <AvatarStyled
                        alt="semy Sharp"
                        variant="square"
                        src={require('../../assets/images/user_icon.png')}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={<TypoTitleStyled>Contacts</TypoTitleStyled>}
                      secondary={
                        <Box display="flex" justifyContent="space-between">
                          <BoxStyled>
                            {groups_list.map((group_item, group_key) => {
                                return (
                                  <>
                                  {group_key >= 5 ? false :
                                  <Box mr={2} mb={2}>
                                    {/* <StyledBadge
                                  overlap='circle'
                                  anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right'
                                  }}
                                  variant='dot'
                                > */}
                                    <AvatarShareStyled
                                      alt="semy Sharp"
                                      src={group_item.group_icon}
                                      title={group_item.group_name}
                                    />
                                    {/* </StyledBadge> */}
                                  </Box>
                              }
                                </>);
                              })}
                              {console.log('users_list',users_list)}
                            {
                              users_list != undefined && users_list.map((member_item ,id) => {
                                const first_name = member_item.first_name ? member_item.first_name : '';
                                const last_name = member_item.last_name ? member_item.last_name : '';
                                const name = first_name + ' ' + last_name;
                                return (
                                  <>
                                  {groups_list.length >=5 && id>=5 || id >= 10 ? false :
                                  <Box mr={2} mb={2}>
                                    {console.log('member_item-',member_item)}
                                    {member_item.is_read == 1 ? (
                                      <StyledReadBadge
                                        overlap="circle"
                                        anchorOrigin={{
                                          vertical: 'bottom',
                                          horizontal: 'right',
                                        }}
                                        // variant='dot'
                                        badgeContent={<Check style={{ color: 'white', fontSize: 10 }} />}
                                      >
                                        <AvatarShareStyled
                                          alt="semy Sharp"
                                          src={member_item.profile_image}
                                          title={name}
                                        />
                                      </StyledReadBadge>
                                    ) : (
                                      <StyledUnreadBadge
                                        overlap="circle"
                                        anchorOrigin={{
                                          vertical: 'bottom',
                                          horizontal: 'right',
                                        }}
                                        // variant='dot'
                                        badgeContent={<Update style={{ color: 'white', fontSize: 10 }} />}
                                      >
                                        <AvatarShareStyled
                                          alt="semy Sharp"
                                          src={member_item.profile_image}
                                          title={name}
                                        />
                                      </StyledUnreadBadge>
                                    )}
                                  </Box>
                              }
                              </>
                                );
                                
                              })}
                              <Box style={{fontSize: 18 , color: '#1abaff', padding: '10px 2px 0px 15px'}} onClick={handleClickOpen}>
                                  {(users_list.length + groups_list.length)>=10
                                    ? ('+ ' + ((users_list.length + groups_list.length)- 10))
                                    : ''}
                                </Box>
                          </BoxStyled>

                          <Box>
                            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                              Status
                            </Button>
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                  {/* STATUS */}

                  <Divider variant="inset" component="li" />
                  <Comments
                    type="message"
                    postId={messageDetail !== null && messageDetail.length > 0 ? showParticularMessage.id : '0'}
                    postUserId={
                      messageDetail !== null && messageDetail.length > 0 ? showParticularMessage.user_id : '0'
                    }
                  />
                  {/* postId - Current message id */}
                  {/* postUserId - Owner user id */}
                </ListStyled>
              </>
            ) : (
              <Box className={classes.content}>
                <CardMedia className={classes.icon} image={RymindrOriginal} title="Message Center" component="img" />
                <Typography className={classes.commingSoonDesc}>No record Found</Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* STATUS POPUP */}
        <Dialog open={open} onClose={handleCloseModal} aria-labelledby="form-dialog-title" maxWidth="md" fullWidth>
          <DialogTitleStyled id="form-dialog-title">
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex">
                <TypoPopHeadStyled>Message Status</TypoPopHeadStyled>

                <TypoPopHeadStyled style={{ color: '#607383' }} className="ml-20">
                  0 out of {total_count} people read
                </TypoPopHeadStyled>
              </Box>
              <IconButton color="default" onClick={handleCloseModal}>
                <Close />
              </IconButton>
            </Box>
          </DialogTitleStyled>
          <DialogContent>
            <List>
              {showParticularMessage.group &&
                showParticularMessage.group.map((group_item, group_key) => {
                  return (
                    <>
                      <ListItem className="pl-0 pr-0" alignItems="center">
                        <ListItemAvatar>
                          <AvatarShareStyled alt="semy Sharp" src={group_item.group_icon} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box display="flex" justifyContent="space-between">
                              <Typography>Group name - {group_item.group_name} </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                      {group_item.group_member &&
                        group_item.group_member.map((group_member, group_member_key) => {
                          const grp_mem_first_name = group_member.first_name ? group_member.first_name : '';
                          const grp_mem_last_name = group_member.last_name ? group_member.last_name : '';
                          const grp_mem_name = grp_mem_first_name + ' ' + grp_mem_last_name;
                          return (
                            <>
                              <List component="div" className="ml-70">
                                <ListItem className="pl-0 pr-0" alignItems="center">
                                  <ListItemAvatar>
                                    <AvatarShareStyled alt="semy Sharp" src={group_member.profile_image} />
                                  </ListItemAvatar>
                                  {/* <ListItemText
                                    primary={
                                      <Box display="flex" justifyContent="space-between">
                                        <Typography>{grp_mem_name}</Typography>
                                        <Box display="flex" justifyContent="center" alignItems="center">
                                          <FiberManualRecord style={{ color: '#ffb034', fontSize: 14 }} />
                                          <TypoStatusStyled className="ml-20 mr-20">Delivered</TypoStatusStyled>
                                        </Box>
                                      </Box>
                                    }
                                  /> */}
                                  <ListItemText
                                    primary={
                                      <Box display="flex" justifyContent="space-between">
                                        <Typography>{grp_mem_name}</Typography>
                                        {group_member.is_read == 1 ? (
                                          <Box display="flex" justifyContent="center" alignItems="center">
                                            <FiberManualRecord style={{ color: '#44b700', fontSize: 14 }} />
                                            <TypoStatusStyledRead className="ml-10 mr-20">Read</TypoStatusStyledRead>
                                          </Box>
                                        ) : (
                                          <Box display="flex" justifyContent="center" alignItems="center">
                                            <FiberManualRecord style={{ color: '#1773bf', fontSize: 14 }} />
                                            <TypoStatusStyled className="ml-10 mr-20">Unread</TypoStatusStyled>
                                          </Box>
                                        )}
                                      </Box>
                                    }
                                  />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                              </List>
                            </>
                          );
                        })}
                    </>
                  );
                })}
              {showParticularMessage.member &&
                showParticularMessage.member.map((member_item, member_key) => {
                  const first_name = member_item.first_name ? member_item.first_name : '';
                  const last_name = member_item.last_name ? member_item.last_name : '';
                  const name = first_name + ' ' + last_name;
                  return (
                    <>
                      <ListItem className="pl-0 pr-0" alignItems="center">
                        <ListItemAvatar>
                          <AvatarShareStyled alt="semy Sharp" src={member_item.profile_image} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box display="flex" justifyContent="space-between">
                              <Typography>{name}</Typography>
                              {member_item.is_read == 1 ? (
                                <Box display="flex" justifyContent="center" alignItems="center">
                                  <FiberManualRecord style={{ color: '#44b700', fontSize: 14 }} />
                                  <TypoStatusStyledRead className="ml-10 mr-20">Read</TypoStatusStyledRead>
                                </Box>
                              ) : (
                                <Box display="flex" justifyContent="center" alignItems="center">
                                  <FiberManualRecord style={{ color: '#1773bf', fontSize: 14 }} />
                                  <TypoStatusStyled className="ml-10 mr-20">Unread</TypoStatusStyled>
                                </Box>
                              )}
                            </Box>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </>
                  );
                })}
            </List>
          </DialogContent>
        </Dialog>
        {/* STATUS POPUP */}

        {/* IMAGE POPUP */}
        <Dialog open={openImage} onClose={handleCloseImageModal} aria-labelledby="form-dialog-title" maxWidth="xl">
          <DialogTitleStyled id="form-dialog-title">
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex">
                <TypoPopHeadStyled>Attachment</TypoPopHeadStyled>
              </Box>
              <IconButton color="default" onClick={handleCloseImageModal}>
                <Close />
              </IconButton>
            </Box>
          </DialogTitleStyled>
          <DialogContent>
            <center>
              <img
                src={`${selectedImage}`}
                // style={{ maxWidth:'-webkit-fill-available' }}
              />{' '}
            </center>
          </DialogContent>
        </Dialog>
        {/* IMAGE POPUP */}
      </Grid>
    </>
  );
}

LiveFeed.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  success_message: PropTypes.any.isRequired,
};
const mapStateToProps = (state) => {
  return {
    error: state.messageCenterReducer.error,
    all_categories: state.messageCenterReducer.categories,
    message_details: state.messageCenterReducer.messageDetail,
    message_contact_detail: state.messageCenterReducer.messageContactDetail,
    success_message: state.messageCenterReducer.success_message,
    businessusers: state.rymidr.businessusers,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getBusinessUsers: (data) => dispatch(getBusinessUsers(data)),
    getcategories: (data) => dispatch(getCategories(data)),
    getMessageDetails: (data) => dispatch(getMessageDetails(data)),
    getMessageContactsDetail: (data) => dispatch(getMessageContactsDetail(data)),
    deleteMessage: (data, user_id) => dispatch(deleteMessage(data, user_id)),
    messageDetailClear: () => dispatch(messageDetailClear()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(LiveFeed));
