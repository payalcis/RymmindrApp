import {
  Attachment,
  CropOriginal,
  EmojiEmotions,
  DoneAll,
  GroupAdd,
  MoreVert,
  Search,
  ArrowBack,
  PersonAdd,
} from '@material-ui/icons';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  TextField,
  Typography,
  Hidden,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { makeStyles, styled } from '@material-ui/core/styles';
import CircularSpinner from '../../component/CircularSpinner';
import React, { useState, useEffect, useMemo } from 'react';
import GroupDialog from './Modal';
import { connect } from 'react-redux';
import { getUserAndGroupList, createGroup, initChat } from '../../store/actions/LiveChatActions';
import { withSnackbar } from 'notistack';
import clsx from 'clsx';
import ChatWindow from './ChatWindow';
import { useParams, Link } from 'react-router-dom';

// For firebase chat purpose
import firebase from 'firebase';

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
  newMessage: {
    backgroundColor: 'orange',
    borderRadius: 20,
    padding: 2,
    paddingHorizontal: 6,
    color: 'white',
  },
}));

const AvatarShareStyled = styled(Avatar)({
  height: 50,
  width: 50,
  marginRight: 20,
});

const AvatarChatStyled = styled(Avatar)({
  height: 25,
  width: 25,
  marginRight: 10,
  marginTop: 24,
});

const AvatarChatRightStyled = styled(AvatarChatStyled)({
  marginRight: 0,
  marginLeft: 10,
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

const SearchFieldStyled = styled(TextField)(() => ({
  padding: 20,
}));

const PaperStyled = styled(Paper)(() => ({
  paddingRight: 30,
  paddingLeft: 30,
  height: 100 + '%',
}));

const GridHeaderStyled = styled(Grid)(() => ({
  borderBottom: '1px solid rgba(64, 87, 106, 0.1)',
}));

const GridFooterStyled = styled(Grid)(() => ({
  borderTop: '1px solid rgba(64, 87, 106, 0.1)',
  paddingTop: 10,
  paddingBottom: 10,
}));
const TypoNameStyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 18,
  fontWeight: 'bold',
}));
const TypoStatusStyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.contrastText,
  fontSize: 14,
}));

const ChatBoxStyled = styled(Box)({
  background: '#F5F5F5',
  padding: 15,
  borderRadius: 20,
  borderTopLeftRadius: 0,
  display: 'inline-block',
  marginTop: 5,
});

const ChatBoxRightStyled = styled(ChatBoxStyled)({
  background: '#D1EDFE',
  borderRadius: 20,
  borderTopRightRadius: 0,
});

const TextFieldStyled = styled(TextField)(({ theme }) => ({
  padding: 20,
  paddingBottom: 0,
}));

const ButtonColor = styled(Button)(({ theme }) => ({
  background: theme.palette.props.main,
  color: theme.palette.props.contrastText,
}));

const DoneAllStyled = styled(DoneAll)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 22,
  float: 'right',
  marginLeft: 10,
  '&.active': {
    color: theme.palette.primary.main,
  },
}));

const BoxDateStyled = styled(Box)(({ theme }) => ({
  display: 'block',
  margin: 'auto',
  width: 130,
  background: 'rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  borderRadius: 15,
  padding: '5px 10px',
  '& p': {
    color: '#212121',
    fontSize: 12,
    fontWeight: '500',
  },
}));

function LiveChat(props) {
  const classes = useStyles();
  const [showPanel, setShowPanel] = useState(true);

  const handleShowDetail = () => {
    setShowPanel(false);
  };

  const handleHideDetail = () => {
    setShowPanel(true);
  };
  
  const filterOptions = [
    {
      value: 'all',
      label: 'All Contacts',
    },
    {
      value: 'contact',
      label: 'Contact',
    }  
  ];
  
  const [open, setOpen] = useState(false);
  const [msgNotifications, updateMsgNotifications] = useState({});
  const [initChatDetails, updateInitChatDetails] = useState({});
  const handleToopen = () => {
    setOpen(true);
  };
  
  const handleClose = (newValue) => {
    setOpen(newValue);
  };

  // Get all the properties
  const { contacts, enqueueSnackbar, error, success, loading } = props;

  useMemo(() => {
    error && enqueueSnackbar(error, { variant: 'error' });
  }, [error]);

  useMemo(() => {
    success && enqueueSnackbar(success, { variant: 'success' });
  }, [success]);

  // Query params
  let { chat_id, chat_type } = useParams();

  const { user_id, business_code } = JSON.parse(localStorage.getItem('userData'));

  const [contactList, updateContactList] = useState([]);
  useEffect(() => {
    const dataTosend = {
      user_id,
      business_code,
    };
    props.getUserAndGroupList(dataTosend);
    updateContactList(contacts)
  }, []);

  useEffect(() => {
    updateContactList(contacts);
    // If query params are available, then initiate the chat for these params
    if (chat_id !== undefined && chat_type !== undefined) {
      console.log('enterr')
      if (contacts.length > 0) {
        let chatDetails = [];
        if (chat_type == 'group') {
          chatDetails = contacts.filter((contact) => contact.contact_type == chat_type && contact.group_id == chat_id);
        } else {
          chatDetails = contacts.filter(
            (contact) => contact.contact_type == 'individual' && contact.user_id == chat_id
            );
        }
        console.log('chat--',chatDetails)
        if (chatDetails.length > 0) {
          // Initiate the chat for the given query params
          const dataTosend = {
            userId: user_id,
            chatType: chatDetails[0].contact_type,
            chatParticipant: chatDetails[0],
          };
          props.initChat(dataTosend).then(() => {
            updateInitChatDetails({ chatParticipant: chatDetails[0], chatType: chatDetails[0].contact_type });
          });
        } else {
          window.alert('Invalid parameters');
          window.location.href = '#/live-chat';
        }
      }
    } else {
      console.log('msgg',Object.keys(msgNotifications))
      if (contacts.length > 0 && msgNotifications.length >0){
      }
      if (contacts.length > 0) {
        // Initiate the chat for first contact in the contact list
        const dataTosend = {
          userId: user_id,
          chatType: contacts[0].contact_type,
          chatParticipant: contacts[0],
        };
        props.initChat(dataTosend).then(() => {
          updateInitChatDetails({ chatParticipant: contacts[0], chatType: contacts[0].contact_type });
        });
      }
    }
  }, [contacts]);


  const [filters, setFilter] = React.useState('all');
  const handleFilterChange = (event) => {
    const filter = event.target.value;
    setFilter(filter);

    let list = [...contacts];
    if (filter === 'contact') {
      const users = list.filter((user) => user.contact_type === 'individual');
      updateContactList(users);
    } else if (filter === 'groups') {
      const groups = list.filter((user) => user.contact_type === 'group');
      updateContactList(groups);
    } else {
      updateContactList(list);
    }
  };

  const handleOnChange = (event) => {
    const searchStr = event.target.value;

    let tempStr = searchStr.charAt(0) === '0' ? searchStr.slice(1) : searchStr;

    let list = [...contacts];

    if (tempStr == '') {
      console.log('list====', list);
      updateContactList(list);
    } else {
      // Filter them
      if (filters === 'contact') {
        const users = list.filter((user) => user.contact_type === 'individual');
        let filteredList = null;

        if (isNaN(tempStr)) {
          //filteredList = users.filter(obj => (obj.first_name.toLowerCase().includes(tempStr.toLowerCase())) || (obj.last_name.toLowerCase().includes(tempStr.toLowerCase())))
          let splitedName = tempStr.split(' ');
          if (splitedName.length > 1) {
            filteredList = users.filter(
              (obj) =>
                (obj.first_name.toLowerCase().includes(splitedName[0].toLowerCase()) &&
                  obj.last_name.toLowerCase().includes(splitedName[1].toLowerCase())) ||
                (obj.first_name.toLowerCase().includes(splitedName[1].toLowerCase()) &&
                  obj.last_name.toLowerCase().includes(splitedName[0].toLowerCase()))
            );
          } else {
            filteredList = users.filter(
              (obj) =>
                obj.first_name.toLowerCase().includes(tempStr.toLowerCase()) ||
                obj.last_name.toLowerCase().includes(tempStr.toLowerCase())
            );
          }
        } else {
          filteredList = users.filter((obj) => obj.mobile_no.includes(tempStr));
        }

        updateContactList(filteredList);
      } else if (filters === 'groups') {
        const groups = list.filter((user) => user.contact_type === 'group');
        const filteredList = groups.filter((obj) => obj.group_name.toLowerCase().includes(tempStr.toLowerCase()));

        updateContactList(filteredList);
      } else {
        const users = list.filter((user) => user.contact_type === 'individual');
        let filteredUserList = null;
        if (isNaN(tempStr)) {
          let splitedName = tempStr.split(' ');
          if (splitedName.length > 1) {

            if (splitedName.length > 2) {
              filteredUserList = users.filter(
                (obj) =>
                  (obj.first_name.toLowerCase().includes(splitedName[0].toLowerCase()) &&
                    obj.last_name.toLowerCase().includes(splitedName[2].toLowerCase())) ||
                  (obj.first_name.toLowerCase().includes(splitedName[2].toLowerCase()) &&
                    obj.last_name.toLowerCase().includes(splitedName[0].toLowerCase()))
              );
            } else {
              filteredUserList = users.filter(
                (obj) =>
                  (obj.first_name.toLowerCase().includes(splitedName[0].toLowerCase()) &&
                    obj.last_name.toLowerCase().includes(splitedName[1].toLowerCase())) ||
                  (obj.first_name.toLowerCase().includes(splitedName[1].toLowerCase()) &&
                    obj.last_name.toLowerCase().includes(splitedName[0].toLowerCase()))  ||
                    (obj.first_name.toLowerCase().includes(splitedName[0].toLowerCase()) &&
                      obj.first_name.toLowerCase().includes(splitedName[1].toLowerCase()))
              );
            }

            


          } else {
            filteredUserList = users.filter(
              (obj) =>
                obj.first_name.toLowerCase().includes(tempStr.toLowerCase()) ||
                obj.last_name.toLowerCase().includes(tempStr.toLowerCase())
            );
          }
        } else {
          filteredUserList = users.filter((obj) => obj.mobile_no.includes(tempStr));
        }

        let groups = list.filter((user) => user.contact_type === 'group');

        const filteredGroupList = groups.filter((obj) => obj.group_name.toLowerCase().includes(tempStr.toLowerCase()));

        updateContactList([...filteredUserList], [...filteredGroupList]);
      }
    }
  };

  const [groupCreated, updateGroupCreated] = useState(false);
  useEffect(() => {
    if (groupCreated === true) {
      const dataTosend = {
        user_id,
        business_code,
      };
      props.getUserAndGroupList(dataTosend);
    }

    updateGroupCreated(false);
  }, [groupCreated]);
  const handleSaveGroupDetails = async (dataToSend) => {
    props.createGroup(dataToSend).then(() => {
      // Close the modal
      setOpen(false);

      updateGroupCreated(true);
    });
  };

  const handleShowChatWindow = (chatParticipant, chatType) => {
    // chatType = individual or group

    // Check if the user is in the group members or not. If not, show them an error message
    if (chatType === 'group') {
      let groupMembers = chatParticipant.group_members;
      groupMembers = groupMembers.split(',');

      if (!groupMembers.includes(user_id.toString())) {
        enqueueSnackbar('You are not authorized to enter in this group', { variant: 'error' });
        return false;
      }
    }

    const dataTosend = {
      userId: user_id,
      chatType: chatType,
      chatParticipant: chatParticipant,
    };

    props.initChat(dataTosend).then(() => {
      updateInitChatDetails({ chatParticipant: chatParticipant, chatType: chatType });
    });
    console.log('dataTosend',dataTosend)
  };

  /* ---------- Chat related code starts ---------- */

  var messageRef = firebase.database().ref();
  useEffect(() => {
    listenMessages();
    console.log('initChatDetails=====', initChatDetails);
    // Clear the rendered chat messages when component is unmounted and mounted again
    return () => {
      messageRef.off();
    };
  }, [initChatDetails]);
  console.log('initChatDetails',initChatDetails)
console.log('contacts',contacts)
  const [grpMsgNotifications, updategGrpMsgNotifications] = useState({});
  const listenMessages = () => {
    messageRef.on('value', function (snapshot) {
      const snapshots = snapshot.val();

      let unreadMessages = {};
      if (snapshots !== null) {
        for (const chatRoom in snapshots) {
          const chatRoomDetails = chatRoom.split('_');
          
          if (chatRoomDetails[1] === 'individual') {
            const msgNodes = Object.values(snapshots[chatRoom]);

            if (msgNodes.length > 0) {
              let unreadMessageCount = 0;
              for (const nodeId in msgNodes) {
                if (msgNodes[nodeId].receiver_id === user_id && msgNodes[nodeId]['message_read_' + user_id] === false) {
                  unreadMessageCount++;

                  unreadMessages = { ...unreadMessages, ...{ [msgNodes[nodeId].sender_id]: unreadMessageCount } };
                } else {
                  // remove the key when the message is read
                  delete unreadMessages[msgNodes[nodeId].sender_id];
                }
              }
            }

            updateMsgNotifications(unreadMessages);
          } else {
            const msgNodes = Object.values(snapshots[chatRoom]);
            if (msgNodes.length > 0) {
              let unreadMessageCount = 0;
              for (const nodeId in msgNodes) {
                if (msgNodes[nodeId]['message_read_' + user_id] === false) {
                  unreadMessageCount++;

                  unreadMessages = { ...unreadMessages, ...{ [chatRoomDetails[2]]: unreadMessageCount } };
                }
              }
            } else {
              // remove the key when the message is read
              delete unreadMessages[chatRoomDetails[2]];
            }

            updategGrpMsgNotifications(unreadMessages);
          }
        }
      }
    });
  };

  /* ---------- Chat related code ends ---------- */

  // To show contact on top when some message comes
  if (Object.keys(msgNotifications).length > 0) {
    const userIds = Object.keys(msgNotifications);
    if (contactList.length > 0) {
      for (let i = 0; i < userIds.length; i++) {
        const userIndex = contactList.findIndex((contact) => contact.user_id === userIds[i]);

        if (userIndex >= 0) {
          const deletedUser = contactList.splice(userIndex, 1);
          contactList.unshift(...deletedUser);
          const participant =contactList.filter((user)=> user.user_id==userIds[0])
          const Type=participant[0].contact_type;
          const dataTosend = {
            userId: user_id,
            chatType: Type,
            chatParticipant: participant[0],
          };
          
          props.initChat(dataTosend).then(() => {
            console.log('dataTosend',dataTosend)
            updateInitChatDetails({ chatParticipant: participant[0], chatType: Type });
          });
          
        }
      }
    }
  }

  // To show group on top when some message comes
  if (Object.keys(grpMsgNotifications).length > 0) {
    const groupIds = Object.keys(grpMsgNotifications);
    if (contactList.length > 0) {
      for (let i = 0; i < groupIds.length; i++) {
        const groupIndex = contactList.findIndex((group) => group.group_id === groupIds[i]);

        if (groupIndex >= 0) {
          const deletedGroup = contactList.splice(groupIndex, 1);
          contactList.unshift(...deletedGroup);

          const participants =contactList.filter((group)=> group.group_id==groupIds[0])
          const Type=participants[0].contact_type;
          const dataTosend = {
            userId: user_id,
            chatType: Type,
            chatParticipant: participants[0],
          };
          
          props.initChat(dataTosend).then(() => {
            console.log('dataTosend',dataTosend)
            updateInitChatDetails({ chatParticipant: participants[0], chatType: Type });
          });
          
        }
      }
    }
  }

  // For chat menu option
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [deleteChatContact, updateDeleteChatContact] = useState({});
  const handleMenuClick = (event, contactDetails) => {
    setAnchorEl(event.currentTarget);
    updateDeleteChatContact(contactDetails);
  };

  const handleDeleteChat = () => {
    setAnchorEl(null);

    if (deleteChatContact.contact_type === 'individual') {
      let chatNode = '';
      let userId = user_id;
      if (deleteChatContact.user_id > userId) {
        chatNode = `chatroom_individual_${userId}_${deleteChatContact.user_id}`;
      } else {
        chatNode = `chatroom_individual_${deleteChatContact.user_id}_${userId}`;
      }

      // Remove the node from firebase
      firebase.database().ref(chatNode).remove();
    } else {
      const chatNode = 'chatroom_group_' + deleteChatContact.group_id;

      // Remove the node from firebase
      firebase.database().ref(chatNode).remove();
    }
  };
  return (
    <>
      <GroupDialog open={open} onClose={handleClose} handleSaveGroupDetails={handleSaveGroupDetails} />

      <Grid container className="main-wrap-head" style={{ marginBottom: 20 }} alignItems="center">
        <Grid item xs={7}>
          <Box display="flex" alignItems="center">
            {showPanel ? null : (
              <Hidden mdUp implementation="css">
                <IconButton color="inherit" onClick={handleHideDetail}>
                  <ArrowBack />
                </IconButton>
              </Hidden>
            )}
            {console.log('initChatDetails--', initChatDetails)}
            <TypoHeadStyled variant="h4">
              Live <TypoHeadInnerStyled component="span">Chat</TypoHeadInnerStyled>
            </TypoHeadStyled>
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box display="flex" justifyContent="flex-end">
            <Link
              to={
                initChatDetails.chatType == 'individual'
                  ? '/create-rymindr/0/' +
                    initChatDetails.chatParticipant.user_id +
                    '/' +
                    initChatDetails.chatParticipant.first_name +
                    ' ' +
                    initChatDetails.chatParticipant.last_name
                  : initChatDetails.chatType == 'group'
                  ? '/create-rymindr/' +
                    initChatDetails.chatParticipant.group_id +
                    '/0/' +
                    initChatDetails.chatParticipant.group_name
                  : ''
              }
            >
              <Button variant="contained" color="primary" size="large" className="mr-10" startIcon={<PersonAdd />}>
                Add new rymindr
              </Button>
            </Link>

            {/* <ButtonColor variant='contained' color='primary' size='large' startIcon={<GroupAdd />} onClick={handleToopen}>
              create new group
            </ButtonColor> */}
          </Box>
        </Grid>
      </Grid>

      <Grid className="main-wrap-body liveChat-cont-wrap" container alignItems="stretch">
        <Grid item xs={12} md={4} className="pr-25 leftSide-cont">
          <Paper className="chat-list-box">
            <TextFieldStyled
              select
              value={filters}
              fullWidth
              size="small"
              variant="outlined"
              autoComplete="off"
              onChange={handleFilterChange}
            >
              {filterOptions.map((option) => (
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
              onKeyUp={handleOnChange}
              autoComplete="off"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            
            <List className="chat-user-list">
              {loading && <CircularSpinner />}

              {/* <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleDeleteChat}
                >
                    <MenuItem onClick={handleDeleteChat}>Clear Chat</MenuItem>
                </Menu> */}
                {console.log('contactList',contactList)}
                {console.log('msgNotifications',msgNotifications)}
              {contactList && contactList.length > 0
                ? contactList.map(
                    (contact, contactIndex) =>
                      contact.contact_type === 'individual' ? (
                        <React.Fragment key={contactIndex}>
                          <Hidden mdUp implementation="css">
                            <ListItem button onClick={() => handleShowChatWindow(contact, 'individual')}>
                              <ListItemAvatar>
                                <AvatarShareStyled alt="profile picture" src={contact.profile_image} />
                              </ListItemAvatar>
                              <ListItemText primary={contact.first_name + ' ' + contact.last_name} />
                              <ListItemSecondaryAction className={classes.newMessage}>
                                {msgNotifications.hasOwnProperty(contact.user_id)
                                  ? msgNotifications[contact.user_id] + ' New msg received'
                                  : null}
                                <IconButton edge="end" aria-label="delete">
                                  <MoreVert onClick={(event) => handleMenuClick(event, contact)} />
                                </IconButton>
                              </ListItemSecondaryAction>
                            </ListItem>
                            <Divider variant="inset" component="li" />
                          </Hidden>

                          <Hidden smDown implementation="css">
                            <ListItem button onClick={() => handleShowChatWindow(contact, 'individual')}>
                              <ListItemAvatar>
                                <AvatarShareStyled alt="profile picture" src={contact.profile_image} />
                              </ListItemAvatar>
                              <ListItemText
                                primary={
                                  contact.first_name !== ''
                                    ? contact.first_name + ' ' + contact.last_name
                                    : contact.mobile_no
                                }
                              />
                              <ListItemSecondaryAction>
                                {
                                  // className={classes.newMessage}
                                  msgNotifications.hasOwnProperty(contact.user_id) ? (
                                    <span
                                      style={{
                                        backgroundColor: '#FF8A00',
                                        borderRadius: 20,
                                        padding: 3,
                                        paddingLeft: 7,
                                        paddingRight: 7,
                                        fontSize: 12,
                                        color: 'white',
                                      }}
                                    >
                                      {msgNotifications[contact.user_id] + ' New msg received'}
                                    </span>
                                  ) : null
                                }
                                {/* <IconButton edge='end' aria-label='delete'>
                                    <MoreVert onClick={(event) => handleMenuClick(event, contact)} />
                                </IconButton> */}
                              </ListItemSecondaryAction>
                            </ListItem>
                            <Divider variant="inset" component="li" />
                          </Hidden>
                        </React.Fragment>
                      ) : null
                    // <React.Fragment key={contactIndex}>
                    //   <Hidden mdUp implementation='css'>
                    //     <ListItem button onClick={() => handleShowChatWindow(contact, 'group')}>
                    //       <ListItemAvatar>
                    //         <AvatarShareStyled alt='profile picture' src={contact.profile_image} />
                    //       </ListItemAvatar>
                    //       <ListItemText primary={contact.group_name} />
                    //       {
                    //         grpMsgNotifications.hasOwnProperty(contact.group_id) ? grpMsgNotifications[contact.group_id] + ' New msg received' : null
                    //       }
                    //       <ListItemSecondaryAction>
                    //         {/* <IconButton edge='end' aria-label='delete'>
                    //               <MoreVert onClick={(event) => handleMenuClick(event, contact)} />
                    //               </IconButton> */}
                    //       </ListItemSecondaryAction>
                    //     </ListItem>
                    //     <Divider variant='inset' component='li' />
                    //   </Hidden>

                    //   <Hidden smDown implementation='css'>
                    //   <ListItem button onClick={() => handleShowChatWindow(contact, 'group')}>
                    //     <ListItemAvatar>
                    //       <AvatarShareStyled alt='profile picture' src={contact.group_icon} />
                    //     </ListItemAvatar>
                    //     <ListItemText primary={contact.group_name} />
                    //     {
                    //       grpMsgNotifications.hasOwnProperty(contact.group_id) ? grpMsgNotifications[contact.group_id] + ' New msg received' : null
                    //     }
                    //     <ListItemSecondaryAction>
                    //       {/* <IconButton edge='end' aria-label='delete'>
                    //             <MoreVert onClick={(event) => handleMenuClick(event, contact)} />
                    //             </IconButton> */}
                    //     </ListItemSecondaryAction>
                    //   </ListItem>
                    //   <Divider variant='inset' component='li' />
                    // </Hidden>
                    // </React.Fragment>
                  )
                : 
                <Typography className={classes.commingSoonDesc} style={{textAlign: 'center'}}>
                   No records Found
                </Typography>
                }
            </List>
          </Paper>
        </Grid>

        {/* Chat window */}
        {console.log('initChatDetail--',initChatDetails)}
        <ChatWindow initChatDetail={initChatDetails} loading={loading} />
      </Grid>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.liveChatReducer.loading,
    error: state.liveChatReducer.error,
    success: state.liveChatReducer.success,
    contacts: state.liveChatReducer.contacts,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUserAndGroupList: (data) => dispatch(getUserAndGroupList(data)),
    createGroup: (data) => dispatch(createGroup(data)),
    initChat: (data) => dispatch(initChat(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(LiveChat));
