import { Attachment, CropOriginal, EmojiEmotions, DoneAll, Send, MoreVert, Close, Edit } from '@material-ui/icons';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  TextField,
  Typography,
  Menu,
  DialogContent,
  MenuItem,
  CardMedia
} from '@material-ui/core';
import RymindrOriginal from '../../assets/images/rymindr_original.png';
import PersonIcon from '@material-ui/icons/Person';
import GetAppIcon from '@material-ui/icons/GetApp';
import { makeStyles, styled } from '@material-ui/core/styles';
import CircularSpinner from '../../component/CircularSpinner';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import GroupDialog from './Modal';
import { connect } from 'react-redux';
import { getUserAndGroupList } from '../../store/actions/LiveChatActions';
import EmojiWindow from './EmojiWindow';
import clsx from 'clsx';
import Axios from '../../helper/axios';
import axios from 'axios';
import FileBase64 from 'react-file-base64';

// For firebase chat purpose
import firebase from 'firebase';
// import firebaseConfig from '../../firebase-chat-config';
// firebase.initializeApp(firebaseConfig);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  icon: {
    width: 150,
    marginBottom: 40,
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
  fontSize: 14,
  fontWeight: 'bold',
}));

const TypoMobileStyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 18,
  //   fontWeight: 'bold'
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

const DialogTitleStyled = styled(DialogTitle)({
  borderBottom: '1px solid #e0e0e0',
  padding: '10px 24px',
});
const TypoPopHeadStyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.contrastText,
  fontSize: 18,
  fontWeight: '600',
}));

function ChatWindow(props) {
  const fileBrowse = useRef(null);
  const imageBrowse = useRef(null);

  const classes = useStyles();

  // Get all the properties
  const { error, success, initChatDetail, loading, chatroom } = props;

  // To show file browse
  const showFileBrowse = () => {
    fileBrowse.current.click();
  };
  // To show file browse
  const showImageBrowse = () => {
    imageBrowse.current.click();
  };

  // To upload the selected image
  const handleImageSelect = async (event) => {
    event.stopPropagation();
    event.preventDefault();
    var file = event.target.files[0];

    // let formData = new FormData();
    // formData.append("file", file);
    // formData.append("is_chat", 1);

    // await axios({
    //     method: 'post',
    //     url: 'https://rymindr.com/RymindrApi/api/notifications',
    //     data: formData,
    //     headers: {'Content-Type': 'multipart/form-data' }
    // })
    // .then(function (response) {
    //     sendMessage(response.data.data.files[0], response.data.data.extensions[0]);
    // });

    const getBase64 = (file, cb) => {
      //, cb
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        cb(reader.result);
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    };

    getBase64(file, async (result) => {
      const fileInfo = {
        name: file.name,
        type: file.type,
        size: Math.round(file.size / 1000) + ' kB',
        base64: result,
        file: file,
      };

      let tempResult = result.replace('data:video/mp4;base64,', '');

      let tempData = {
        file: tempResult,
        is_chat: 1,
        user_id: user_id,
      };

      let newFile = await Axios().post('https://rymindr.com/RymindrApi/api/notifications', tempData);

      if (newFile.status == 200) {
        let ext = newFile.data.substring(newFile.data.lastIndexOf('.') + 1);
        sendMessage(newFile.data, ext);
      }
    });

    imageBrowse.current.value = '';
  };

  // To upload the selected file
  const handleFileSelect = async (event) => {
    // event.stopPropagation();
    // event.preventDefault();
    var file = event.target.files[0];
    console.log('event-',event.target.files[0])

    const getBase64 = (file, cb) => {
      //, cb
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        cb(reader.result);
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    };

    getBase64(file, async (result) => {
      const ext = file.name.split('.')[1].toLowerCase()
      const fileInfo = {
        name: file.name,
        type: file.type,
        size: Math.round(file.size / 1000) + ' kB',
        base64: result,
        file: file,
      };
      let tempResult = result

      let tempData = {
        file: tempResult,
        is_chat: 1,
        user_id: user_id,
        ext
      };
      let newFile = await Axios().post('https://rymindr.com/RymindrApi/api/notifications', tempData);
      
      if (newFile.status == 200) {
        let ext = newFile.data.substring(newFile.data.lastIndexOf('.') + 1);
        // let fileName = newFile.data.substring(0,newFile.data.lastIndexOf('.') + 1) + ext;
        console.log('tempData-',newFile.data)
        sendMessage(newFile.data, ext);
      }
      // sendMessage(newFile, ext);
      // await axios({
      //     method: 'post',
      //     url: 'https://rymindr.com/RymindrApi/api/notifications',
      //     data: tempData,
      //     headers: {'Content-Type': 'multipart/form-data' }
      // })
      // .then(function (response) {
      //     if(response.data.length > 0) {
      //         sendMessage(response.data.data.files[0], response.data.data.extensions[0]);
      //     }
      // });
    });

    fileBrowse.current.value = '';
  };

  /* ---------- Chat related code starts ---------- */

  var messageRef = firebase.database().ref();

  useEffect(() => {
    listenMessages();

    // Clear the rendered chat messages when component is unmounted and mounted again
    return () => {
      if (chatroom !== null) {
        messageRef.child(chatroom).off();
        updateReceivedMessages([]);
      }
    };
  }, [chatroom]);
  const [receivedMessages, updateReceivedMessages] = useState([]);
  const listenMessages = () => {
    if (chatroom !== null) {
      messageRef
      .child(chatroom)
        // .limitToLast(10)
        .on('value', (message) => {
          if (message.val() !== null) {
            // let list = Object.values(message.val());
            // updateReceivedMessages(list);

            let messages = message.val();
            let msgList = [];
            let dayThingArr = [];
            for (let nodeId in messages) {
              // To update the read status of message
              if (messages[nodeId]['message_read_' + user_id] === false) {
                firebase
                .database()
                  .ref(chatroom)
                  .child(nodeId)
                  .update({ ['message_read_' + user_id]: true });
                }
                
                // Adding nodeid in object
                let msgObj = { ...messages[nodeId], ...{ nodeId: nodeId } };
              msgList.push(msgObj);
            }
            
            msgList.sort(function (a, b) {
              return new Date(a.created_at) - new Date(b.created_at);
            });

            msgList.map((m) => {
              let _createdAt = new Date(parseInt(m.created_at)).toUTCString();
              _createdAt = _createdAt.split(' ');
              let formatted = _createdAt[0] + ' ' + _createdAt[1] + ' ' + _createdAt[2];
              
              var inputDate = new Date(m.created_at);
              
              var todaysDate = new Date();

              if (inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
                formatted = 'Today';
              }
              
              if (dayThingArr.includes(formatted)) {
                m.dayThing = '';
              } else {
                dayThingArr.push(formatted);
                m.dayThing = formatted;
              }
            });
            console.log('msgList====', msgList);
            updateReceivedMessages(msgList);
            setTimeout(() => {
              var objDiv = document.getElementById('chatBoxCont');
              objDiv.scrollTop = objDiv.scrollHeight;
            }, 0);
          } else {
            // Remove the existing messages
            updateReceivedMessages([]);
          }
        });
    }
  };
  
  const { user_id, first_name, profile_image, sc_bessi_name } = JSON.parse(localStorage.getItem('userData'));
  const [chatMessage, handleChatMessage] = useState('');

  const handleMessageSend = () => {
    if (chatMessage !== '') {
      if (isEditMsg === true) {
        if (initChatDetail.chatType === 'individual') {
          let chatNode = '';
          let userId = user_id;
          if (initChatDetail.chatParticipant.user_id > userId) {
            chatNode = `chatroom_individual_${userId}_${initChatDetail.chatParticipant.user_id}/${msgNodeId}`;
          } else {
            chatNode = `chatroom_individual_${initChatDetail.chatParticipant.user_id}_${userId}/${msgNodeId}`;
          }
          
          // Remove the node from firebase
          firebase.database().ref(chatNode).update({ message: chatMessage, is_edited: true });
        } else {
          let chatNode = `chatroom_group_${initChatDetail.chatParticipant.group_id}/${msgNodeId}`;
          
          // Remove the node from firebase
          firebase.database().ref(chatNode).update({ message: chatMessage, is_edited: true });
        }
        
        handleChatMessage('');
        updateIsEditMsg(false);
        updateMsgAttributes({ message: null, messageType: null });
      } else {
        sendMessage(chatMessage);
      }
    }
  };
  
  const handleMessageFormSubmit = (event) => {
    event.preventDefault();
    
    if (chatMessage !== '') {
      if (isEditMsg === true) {
        if (initChatDetail.chatType === 'individual') {
          let chatNode = '';
          let userId = user_id;
          if (initChatDetail.chatParticipant.user_id > userId) {
            chatNode = `chatroom_individual_${userId}_${initChatDetail.chatParticipant.user_id}/${msgNodeId}`;
          } else {
            chatNode = `chatroom_individual_${initChatDetail.chatParticipant.user_id}_${userId}/${msgNodeId}`;
          }

          // Remove the node from firebase
          firebase.database().ref(chatNode).update({ message: chatMessage, is_edited: true });
        } else {
          let chatNode = `chatroom_group_${initChatDetail.chatParticipant.group_id}/${msgNodeId}`;

          // Remove the node from firebase
          firebase.database().ref(chatNode).update({ message: chatMessage, is_edited: true });
        }

        handleChatMessage('');
        updateIsEditMsg(false);
        updateMsgAttributes({ message: null, messageType: null });
      } else {
        sendMessage(chatMessage);
      }
    }
  };
  
  const sendMessage = async (message, messageType = 'text') => {
    console.log('first_name======', first_name);
    
    let msg = {};
    if (initChatDetail.chatType === 'individual') {
      msg = {
        sender_id: user_id,
        sender_name: first_name ? first_name : sc_bessi_name,
        sender_image: profile_image,
        receiver_id: initChatDetail.chatParticipant.user_id,
        // receiver_name: initChatDetail.chatParticipant.first_name? initChatDetail.chatParticipant.first_name: initChatDetail.chatParticipant.sc_bessi_name,
        receiver_name:
        initChatDetail.chatParticipant.first_name && initChatDetail.chatParticipant.last_name
        ? initChatDetail.chatParticipant.first_name && initChatDetail.chatParticipant.last_name
            : initChatDetail.chatParticipant.sc_bessi_name,
            receiver_image: initChatDetail.chatParticipant.profile_image,
        message: message,
        message_type: messageType,
        ['message_read_' + initChatDetail.chatParticipant.user_id]: false,
        created_at: firebase.database.ServerValue.TIMESTAMP,
        is_edited: false,
      };
      // Send push notification to receiver.
      let data = {
        sender_id: user_id,
        receiver_id: initChatDetail.chatParticipant.user_id,
        message: messageType == 'text' ? message : 'Attachment',
      };
    } else {
      // Get the group members id's and merge it with msg object
      let groupMembers = initChatDetail.chatParticipant.group_members;
      groupMembers = groupMembers.length > 0 ? groupMembers.split(',') : [];
      let msgReadByMembers = {};
      if (groupMembers.length > 0) {
        for (let i = 0; i < groupMembers.length; i++) {
          msgReadByMembers = { ...msgReadByMembers, ...{ ['message_read_' + groupMembers[i]]: false } };
        }
      }
      
      msg = {
        sender_id: user_id,
        sender_name: first_name,
        sender_image: profile_image,
        message: message,
        message_type: messageType,
        created_at: firebase.database.ServerValue.TIMESTAMP,
        is_edited: false,
        ...msgReadByMembers,
      };
    }
    
    let messageRef = firebase.database().ref();
    messageRef.child(chatroom).push(msg);
    
    firebase
    .database()
      .ref('/chatroom_individual_delete_' + initChatDetail.chatParticipant.user_id + '_' + user_id)
      .on('value', (snapshot) => {
        if (snapshot && snapshot.val() && snapshot.val().show == false) {
          firebase
          .database()
            .ref('/chatroom_individual_delete_' + initChatDetail.chatParticipant.user_id + '_' + user_id)
            .update({ show: true, time: snapshot.val().time });
          }
        });
        
    firebase
    .database()
      .ref('/chatroom_individual_delete_' + user_id + '_' + initChatDetail.chatParticipant.user_id)
      .update({ show: true, time: firebase.database.ServerValue.TIMESTAMP });
      
    // Send push notification to receiver.
    await Axios().post('notifications', {
      sender_id: user_id,
      receiver_id: initChatDetail.chatParticipant.user_id,
      message: messageType == 'text' ? message : 'Attachment',
      isFromWeb: 1,
    });
    
    // await Axios().post('notifications/trigger_push_notification', {
    //     'sender_id': user_id, 'receiver_id': initChatDetail.chatParticipant.user_id, 'message': messageType == 'text' ? message : 'Attachment'
    // })
    
    handleChatMessage('');
  };

  const [showMsgReadDetails, updateShowMsgReadDetails] = useState(false);
  const [msgReadDetails, updateMsgReadDetails] = useState([]);
  const handleMsgReadDetails = (msgReadByMembersList) => {
    updateMsgReadDetails(msgReadByMembersList);
    updateShowMsgReadDetails(!showMsgReadDetails);
    
    setTimeout(() => {
      var objDiv = document.getElementById('chatBoxCont');
      objDiv.scrollTop = objDiv.scrollHeight;
    }, 6000);
  };
  
  /* ---------- Chat related code ends ---------- */
  
  const convertFrom24To12Format = (time24) => {
    //console.log('time24===',time24)

    if (time24) {
      const [sHours, minutes] = time24.match(/([0-9]{1,2}):([0-9]{2})/).slice(1);
      const period = +sHours < 12 ? 'AM' : 'PM';
      const hours = +sHours % 12 || 12;
      return `${hours}:${minutes} ${period}`;
    }
  };
  
  // To toogle emoji window
  const [showEmoji, toggleShowEmoji] = useState(false);
  
  const handleEmojiClick = (emoji) => {
    let msg = chatMessage;
    handleChatMessage(msg + emoji);
  };

  const [showGroupMember, handleGroupMember] = useState(false);
  
  // To download resource
  const handleDownloadResource = async (url) => {
    console.log('message-center===', url);
    window.open(url, '_blank');
    //return false;
    // const form = document.createElement('form');
    // const btn = document.createElement('button');
    // form.appendChild(btn);
    // form.action = url;
    // form.method = 'get';
    // document.body.appendChild(form);
    // btn.click();
    // document.body.removeChild(form);
    //   const image = await fetch(url)
    // const imageBlog = await image.blob()
    // const imageURL = URL.createObjectURL(imageBlog)
    // console.log('message-imageURL===', imageURL);
    // return false;
    // const link = document.createElement('a')
    // link.href = imageURL
    // link.download = 'dfgdfgdfg.pdf'
    // document.body.appendChild(link)
    // link.click()
    // document.body.removeChild(link)
  };
  
  const [openImage, setOpenImage] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState('');
  
  const handleClickImageOpen = (file) => {
    setOpenImage(true);
    setSelectedImage(file);
  };
  
  const handleCloseImageModal = () => {
    setOpenImage(false);
  };
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [msgNodeId, updateMsgNodeId] = useState('');
  const [msgAttributes, updateMsgAttributes] = useState({ message: null, messageType: null });
  const handleMenuClick = (event, nodeId, message, messageType) => {
    setAnchorEl(event.currentTarget);
    
    updateMsgNodeId(nodeId);
    updateMsgAttributes({ message: message, messageType: messageType });
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleDeleteChatMsg = () => {
    if (initChatDetail.chatType === 'individual') {
      let chatNode = '';
      let userId = user_id;
      if (initChatDetail.chatParticipant.user_id > userId) {
        chatNode = `chatroom_individual_${userId}_${initChatDetail.chatParticipant.user_id}/${msgNodeId}`;
      } else {
        chatNode = `chatroom_individual_${initChatDetail.chatParticipant.user_id}_${userId}/${msgNodeId}`;
      }
      
      // Remove the node from firebase
      firebase.database().ref(chatNode).remove();
    } else {
      let chatNode = `chatroom_group_${initChatDetail.chatParticipant.group_id}/${msgNodeId}`;
      
      // Remove the node from firebase
      firebase.database().ref(chatNode).remove();
    }
    
    setAnchorEl(null);
    
    // Reset the edit attribute for same message
    handleChatMessage('');
    updateIsEditMsg(false);
    updateMsgAttributes({ message: null, messageType: null });
  };

  const [isEditMsg, updateIsEditMsg] = useState(false);
  const handleEditChatMsg = () => {
    handleChatMessage(msgAttributes.message);
    updateIsEditMsg(true);
    setAnchorEl(null);
  };
  
  const handleCancelUpdateMsg = () => {
    handleChatMessage('');
    updateIsEditMsg(false);
  };
  
  const date = new Date();
  const formattedDate = date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  
  const that = this;
  
  console.log('receivedMessages--',receivedMessages)
  console.log('chatroom--',chatroom)
  return (
    <>
    { chatroom ?
      <Grid item xs={12} md={8} className={clsx(classes.rightPanel, 'rightSide-cont')}>



        <Dialog
          open={openImage}
          onClose={handleCloseImageModal}
          aria-labelledby="form-dialog-title"
          maxWidth="xl"
          >
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
              <img src={`${selectedImage}`} style={{maxWidth: '1327px' , maxHeight : '766px'}}
              // style={{ maxWidth: '-webkit-fill-available' }} 
              />{' '}
            </center>
          </DialogContent>
        </Dialog>
        <PaperStyled>
          <GridHeaderStyled container alignItems="center" spacing={0}>
            <Grid item xs={12}>
              <Box display="flex" style={{ margin: 10, marginLeft: 0 }}>
                {initChatDetail.hasOwnProperty('chatType') ? (
                  initChatDetail.chatType === 'individual' ? (
                    <AvatarShareStyled alt="profile picture" src={initChatDetail.chatParticipant.profile_image} />
                  ) : (
                    <AvatarShareStyled alt="group icon" src={initChatDetail.chatParticipant.group_icon} />
                  )
                ) : (
                  // <AvatarShareStyled alt="profile picture" src={require('../../assets/images/profile.jpeg')} />
                  null
                )}
                <Box>
                  <TypoNameStyled onClick={() => handleGroupMember(!showGroupMember)}>
                    {initChatDetail.hasOwnProperty('chatType')
                      ? initChatDetail.chatType === 'individual'
                        ? initChatDetail.chatParticipant.first_name + ' ' + initChatDetail.chatParticipant.last_name
                        : initChatDetail.chatParticipant.group_name
                      : null}
                  </TypoNameStyled>
                  <TypoMobileStyled onClick={() => handleGroupMember(!showGroupMember)}>
                    {initChatDetail.hasOwnProperty('chatType')
                      ? initChatDetail.chatType === 'individual'
                        ? initChatDetail.chatParticipant.mobile_no
                        : null
                      : null}
                  </TypoMobileStyled>
                  {/* <TypoStatusStyled>Status</TypoStatusStyled> */}
                  {initChatDetail.hasOwnProperty('chatType') ? (
                    <Dialog
                      onClose={() => handleGroupMember(!showGroupMember)}
                      aria-labelledby="simple-dialog-title"
                      open={showGroupMember}
                    >
                      <DialogTitle id="simple-dialog-title">
                        {initChatDetail.chatType === 'individual'
                          ? initChatDetail.chatParticipant.first_name + ' ' + initChatDetail.chatParticipant.last_name
                          : initChatDetail.chatParticipant.group_name}
                      </DialogTitle>
                      <List>
                        {initChatDetail.chatType === 'group' ? (
                          initChatDetail.chatParticipant.group_member_list.map((member, memberIndex) => (
                            <ListItem button key={memberIndex}>
                              <ListItemAvatar>
                                <Avatar className={member.profile_image}>
                                  <PersonIcon />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText primary={member.first_name} />
                            </ListItem>
                          ))
                        ) : (
                          <ListItem button>
                            <ListItemAvatar>
                              <Avatar className={initChatDetail.chatParticipant.profile_image}>
                                <PersonIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={initChatDetail.chatParticipant.first_name} />
                          </ListItem>
                        )}
                      </List>
                    </Dialog>
                  ) : null}

                  {/* Message read details */}
                  {initChatDetail.hasOwnProperty('chatType') ? (
                    <Dialog
                      onClose={() => updateShowMsgReadDetails(!showMsgReadDetails)}
                      aria-labelledby="simple-dialog-title"
                      open={showMsgReadDetails}
                    >
                      <DialogTitle id="simple-dialog-title">Details</DialogTitle>
                      <List>
                        {initChatDetail.chatType === 'group' ? (
                          initChatDetail.chatParticipant.group_member_list.map((member, memberIndex) => {
                            return member.user_id !== user_id ? (
                              <ListItem button key={memberIndex}>
                                <ListItemAvatar>
                                  <Avatar className={member.profile_image}>
                                    <PersonIcon />
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={member.first_name} />
                                <DoneAllStyled
                                  className={`${msgReadDetails.includes(member.user_id) ? 'active' : ''}`}
                                />
                              </ListItem>
                            ) : null;
                          })
                        ) : (
                          <ListItem button>
                            <ListItemAvatar>
                              <Avatar className={initChatDetail.chatParticipant.profile_image}>
                                <PersonIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={initChatDetail.chatParticipant.first_name} />
                          </ListItem>
                        )}
                      </List>
                    </Dialog>
                  ) : null}
                </Box>
              </Box>
            </Grid>
          </GridHeaderStyled>

          <Grid item xs={12} className="chatBoxCont" id="chatBoxCont">
            {loading ? (
              <CircularSpinner />
            ) : (
              <ul className="chatList">
                {/* For chat message delete */}
                <Menu
                  id="simple-menu"
                  className="chat-act-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  {
                    // Edit option will be for text message only
                    msgAttributes.messageType === null || msgAttributes.messageType === 'text' ? (
                      <MenuItem onClick={handleEditChatMsg}>Edit</MenuItem>
                    ) : null
                  }
                  <MenuItem onClick={handleDeleteChatMsg}>Delete</MenuItem>
                </Menu>

                {initChatDetail.hasOwnProperty('chatType') && initChatDetail.chatType === 'individual' ? (
                  receivedMessages && receivedMessages.length > 0 ? (
                    receivedMessages.map((receivedMessage, receivedMessageIndex) => {
                      function convertTZ(date, tzString) {
                        return new Date(
                          (typeof date === 'string' ? new Date(date) : date).toLocaleString('en-US', {
                            timeZone: tzString,
                          })
                        );
                      }

                      let msgCreatedAt = convertTZ(new Date(parseInt(receivedMessage.created_at)), 'Europe/London');
                      //let msgCreatedAt = new Date(parseInt(receivedMessage.created_at)).toUTCString();
                      let getOnlyTime = new Date(msgCreatedAt).toLocaleTimeString();

                      let d =  convertTZ(new Date(msgCreatedAt), 'Europe/London');
                      d.setDate(d.getDate() + 29);
                      d.setHours(d.getHours() + 4);
                      d.setMinutes( d.getMinutes() + 30 );
                      let expiredTimeStamp=d
                      let currentTimeStamp=convertTZ(new Date(), 'Europe/London')
                      let flag=false;
                      if (expiredTimeStamp <= currentTimeStamp){
                        flag=true
                        console.log('open--')
                      }


                      console.log('fullDate-',expiredTimeStamp ,'\n',currentTimeStamp)
                      console.log('receivedMessage-=',receivedMessage)
                      return receivedMessage.receiver_id == user_id ? (
                        <>
                          {receivedMessage.dayThing ? (
                            <li>
                              <BoxDateStyled alignSelf="center">
                                <Typography variant="caption" component="p">
                                  {receivedMessage.dayThing}
                                </Typography>
                              </BoxDateStyled>
                            </li>
                          ) : null}
                          <li key={receivedMessageIndex}>
                            <Box display="flex" style={{ margin: 10, marginLeft: 0 }}>
                              <AvatarChatStyled alt="profile picture" src={receivedMessage.sender_image} />
                              <Box>
                                <Typography variant="caption" component="p">
                                  {receivedMessage.sender_name}, {convertFrom24To12Format(getOnlyTime)}
                                </Typography>
                                {console.log('receivedMessage--',receivedMessage)}

                                <ChatBoxStyled>
                                  {
                                    // For text message
                                    receivedMessage.message_type === 'text' ? (
                                      <Typography>{receivedMessage.message}</Typography>
                                    ) : // For images
                                      receivedMessage.message_type === 'jpg' ||
                                        receivedMessage.message_type === 'jpeg' ||
                                        receivedMessage.message_type === 'png' ? (
                                           <>
                                          { flag ?
                                        <Typography>
                                          <img
                                            style={{ height: 50, width: 50  }}
                                            src={ require('../../assets/images/file-extensions-icon/image.png')}
                                            alt="image"
                                            
                                          />
                                          <GetAppIcon style={{opacity : '0.5' }}  />
                                          </Typography>
                                          :
                                          <Typography>
                                          <img
                                            style={{ maxWidth: '145px' , maxHeight: '100px' ,cursor: 'pointer'  }}
                                            src={receivedMessage.message }
                                            alt="image"
                                            onClick={() => handleClickImageOpen(receivedMessage.message)} 
                                          />
                                          
                                          </Typography>
                                          }
                                          </>
                                      ) : // For csv files
                                        receivedMessage.message_type === 'csv' ? (
                                          <Typography>
                                            <img
                                              src={require('../../assets/images/file-extensions-icon/csv.png')}
                                              style={{ height: 50, width: 50 }}
                                              alt="txt-file-icon"
                                            />
                                            {flag ?
                                                <GetAppIcon style={{opacity : '0.5' }}  />
                                                :
                                                <GetAppIcon style={{cursor:'pointer' }} onClick={() => handleDownloadResource(receivedMessage.message)} />
                                                }
                                          </Typography>
                                        ) : // For pdf files
                                          receivedMessage.message_type === 'pdf' ? (
                                            <Typography>
                                              <img
                                                src={require('../../assets/images/file-extensions-icon/pdf.png')}
                                                style={{ height: 50, width: 50 }}
                                                alt="txt-file-icon"
                                              />
                                              {flag ?
                                                <GetAppIcon style={{opacity : '0.5' }}  />
                                                :
                                                <GetAppIcon style={{cursor:'pointer' }} onClick={() => handleDownloadResource(receivedMessage.message)} />
                                                }
                                            </Typography>
                                          ) : // For txt files
                                            receivedMessage.message_type === 'txt' ? (
                                              <Typography>
                                                <img
                                                  src={require('../../assets/images/file-extensions-icon/txt.png')}
                                                  style={{ height: 50, width: 50 }}
                                                  alt="txt-file-icon"
                                                />
                                                {flag ?
                                                <GetAppIcon style={{opacity : '0.5' }}  />
                                                :
                                                <GetAppIcon style={{cursor:'pointer' }} onClick={() => handleDownloadResource(receivedMessage.message)} />
                                                }
                                              </Typography>
                                            ) : // For doc or docx file
                                              receivedMessage.message_type === 'doc' ||
                                                receivedMessage.message_type === 'docx' ? (
                                                <Typography>
                                                  <img
                                                    src={require('../../assets/images/file-extensions-icon/doc.png')}
                                                    style={{ height: 50, width: 50 }}
                                                    alt="txt-file-icon"
                                                  />
                                                  {flag ?
                                                  <GetAppIcon style={{opacity : '0.5' }}  />
                                                  :
                                                  <GetAppIcon style={{cursor:'pointer' }} onClick={() => handleDownloadResource(receivedMessage.message)} />
                                                  }
                                                </Typography>
                                              ) : // For ppt or pptx file
                                                receivedMessage.message_type === 'ppt' ||
                                                  receivedMessage.message_type === 'pptx' ? (
                                                  <Typography>
                                                    <img
                                                      src={require('../../assets/images/file-extensions-icon/ppt.png')}
                                                      style={{ height: 50, width: 50 }}
                                                      alt="txt-file-icon"
                                                    />
                                                    {flag ?
                                                    <GetAppIcon style={{opacity : '0.5' }}  />
                                                    :
                                                    <GetAppIcon style={{cursor:'pointer' }} onClick={() => handleDownloadResource(receivedMessage.message)} />
                                              }
                                                  </Typography>
                                                ) : // For xls or xlsx file
                                                  receivedMessage.message_type === 'xls' ||
                                                    receivedMessage.message_type === 'xlsx' ? (
                                                    <Typography>
                                                      <img
                                                        src={require('../../assets/images/file-extensions-icon/xls.png')}
                                                        style={{ height: 50, width: 50 }}
                                                        alt="txt-file-icon"
                                                      />
                                                      {flag ?
                                                      <GetAppIcon style={{opacity : '0.5' }}  />
                                                      :
                                                      <GetAppIcon style={{cursor:'pointer' }} onClick={() => handleDownloadResource(receivedMessage.message)} />
                                                      }
                                                    </Typography>

                                                ) : // For video file
                                                  receivedMessage.message_type === 'mp4' ||
                                                    receivedMessage.message_type === '3gp' ||
                                                    receivedMessage.message_type === 'ogg' ||
                                                    receivedMessage.message_type === 'avi' ||
                                                    receivedMessage.message_type === 'mov' 
                                                     ? (
                                                       <>
                                                    <Typography>
                                                      {console.log('flag-',flag)}
                                                      
                                                      <img
                                                        src={require('../../assets/images/file-extensions-icon/mp4.png')}
                                                        style={{ height: 50, width: 50 }}
                                                        alt="txt-file-icon"
                                                      />
                                                        {flag ?
                                                        <GetAppIcon style={{opacity : '0.5' }}  />
                                                        :
                                                        <GetAppIcon style={{cursor:'pointer' }} onClick={() => handleDownloadResource(receivedMessage.message)} />
                                                        }
                                                      </Typography>
                                                      </>
                                                  ) : 
                                                  (
                                                    <Typography>
                                                    <img
                                                      src={require('../../assets/images/file-extensions-icon/file.png')}
                                                      style={{ height: 50, width: 50 }}
                                                      alt="file-icon"
                                                      />
                                                      {flag ?
                                                      <GetAppIcon style={{opacity : '0.5' }}  />
                                                      :
                                                      <GetAppIcon style={{cursor:'pointer' }} onClick={() => handleDownloadResource(receivedMessage.message)} />
                                                      }                                                    
                                                      </Typography>
                                                )
                                  }
                                </ChatBoxStyled>
                              </Box>
                            </Box>
                            {flag  && receivedMessage.message_type != 'text' ?
                             <Typography variant="body2" style={{ margin: 10, marginRight: 0 , textAlign: 'left' , paddingLeft: '2rem'}}> This file is no longer available</Typography>
                            // <p  style={{ margin: 10, marginRight: 0 , textAlign: 'end', paddingRight : '5.4rem' }}>The file is No Longer Available</p>
                            :
                            null
                            }
                          </li>
                        </>
                      ) : (
                        <>
                          {receivedMessage.dayThing ? (
                            <li>
                              <BoxDateStyled alignSelf="center">
                                <Typography variant="caption" component="p">
                                  {receivedMessage.dayThing}
                                </Typography>
                              </BoxDateStyled>
                            </li>
                          ) : null}
                          <li key={receivedMessageIndex}>
                            <Box display="flex" justifyContent="flex-end" style={{ margin: 10, marginRight: 0 }}>
                              <Box justifyContent="flex-end">
                                <Typography variant="caption" component="p" align="right">
                                  {convertFrom24To12Format(getOnlyTime) + ' '}

                                  {
                                    // Message edited icon
                                    receivedMessage.is_edited === true ? <Edit style={{ fontSize: 12 }} /> : null
                                  }

                                  <DoneAllStyled
                                    className={`${receivedMessage['message_read_' + receivedMessage['receiver_id']] ? 'active' : ''
                                      }`}
                                      />
                                </Typography>
                                {/* {receivedMessage.message_type} */}
                                {console.log('receivedMessage==',receivedMessage)}
                                <ChatBoxRightStyled>
                                  {
                                    // For text message
                                    receivedMessage.message_type === 'text' ? (
                                      <Typography>{receivedMessage.message}</Typography>
                                    ) : // For images
                                      receivedMessage.message_type === 'jpg' ||
                                        receivedMessage.message_type === 'jpeg' ||
                                        receivedMessage.message_type === 'png' ? (
                                          <>
                                          { flag ?
                                        <Typography>
                                          <img
                                            style={{ height: 50, width: 50  }}
                                            src={ require('../../assets/images/file-extensions-icon/image.png')}
                                            alt="image"
                                            
                                          />
                                          <GetAppIcon style={{opacity : '0.5' }}  />
                                          </Typography>
                                          :
                                          <Typography>
                                          <img
                                            style={{  maxWidth: '140px' , maxHeight: '100px' ,cursor: 'pointer' }}
                                            src={receivedMessage.message }
                                            alt="image"
                                            onClick={() => handleClickImageOpen(receivedMessage.message)}
                                          />
                                          
                                          </Typography>
                                          }
                                          </>
                                      ) : // For csv files
                                        receivedMessage.message_type === 'csv' ? (
                                          <Typography>
                                            <img
                                              src={require('../../assets/images/file-extensions-icon/csv.png')}
                                              style={{ height: 50, width: 50 }}
                                              alt="txt-file-icon"
                                            />
                                            {flag ?
                                            <GetAppIcon style={{opacity : '0.5' }}  />
                                            :
                                            <GetAppIcon style={{cursor:'pointer' }} onClick={() => handleDownloadResource(receivedMessage.message)} />
                                            }
                                          </Typography>
                                        ) : // For pdf files
                                          receivedMessage.message_type === 'pdf' ? (
                                            <Typography>
                                              <img
                                                src={require('../../assets/images/file-extensions-icon/pdf.png')}
                                                style={{ height: 50, width: 50 }}
                                                alt="txt-file-icon"
                                              />
                                              {flag ?
                                              <GetAppIcon style={{opacity : '0.5' }}  />
                                              :
                                              <GetAppIcon style={{cursor:'pointer' }} onClick={() => handleDownloadResource(receivedMessage.message)} />
                                              }
                                            </Typography>
                                          ) : // For txt files
                                            receivedMessage.message_type === 'txt' ? (
                                              <Typography>
                                                <img
                                                  src={require('../../assets/images/file-extensions-icon/txt.png')}
                                                  style={{ height: 50, width: 50 }}
                                                  alt="txt-file-icon"
                                                />
                                                {flag ?
                                                <GetAppIcon style={{opacity : '0.5' }}  />
                                                :
                                                <GetAppIcon style={{cursor:'pointer' }} onClick={() => handleDownloadResource(receivedMessage.message)} />
                                                }
                                              </Typography>
                                            ) : // For doc or docx file
                                              receivedMessage.message_type === 'doc' ||
                                                receivedMessage.message_type === 'docx' ? (
                                                <Typography>
                                                  <img
                                                    src={require('../../assets/images/file-extensions-icon/doc.png')}
                                                    style={{ height: 50, width: 50 }}
                                                    alt="txt-file-icon"
                                                  />
                                                  {flag ?
                                                  <GetAppIcon style={{opacity : '0.5' }}  />
                                                  :
                                                  <GetAppIcon style={{cursor:'pointer' }} onClick={() => handleDownloadResource(receivedMessage.message)} />
                                                  }
                                                </Typography>
                                              ) : // For ppt or pptx file
                                                receivedMessage.message_type === 'ppt' ||
                                                  receivedMessage.message_type === 'pptx' ? (
                                                  <Typography>
                                                    <img
                                                      src={require('../../assets/images/file-extensions-icon/ppt.png')}
                                                      style={{ height: 50, width: 50 }}
                                                      alt="txt-file-icon"
                                                    />
                                                    {flag ?
                                                        <GetAppIcon style={{opacity : '0.5' }}  />
                                                        :
                                                        <GetAppIcon style={{cursor:'pointer' }} onClick={() => handleDownloadResource(receivedMessage.message)} />
                                                        }
                                                  </Typography>
                                                ) : // For xls or xlsx file
                                                  receivedMessage.message_type === 'xls' ||
                                                    receivedMessage.message_type === 'xlsx' ? (
                                                    <Typography>
                                                      <img
                                                        src={require('../../assets/images/file-extensions-icon/xls.png')}
                                                        style={{ height: 50, width: 50 }}
                                                        alt="txt-file-icon"
                                                      />
                                                      {flag ?
                                                        <GetAppIcon style={{opacity : '0.5' }}  />
                                                        :
                                                        <GetAppIcon style={{cursor:'pointer' }} onClick={() => handleDownloadResource(receivedMessage.message)} />
                                                        }
                                                    </Typography>

                                                    ) : // For video file
                                                    receivedMessage.message_type === 'mp4' ||
                                                      receivedMessage.message_type === '3gp' ||
                                                      receivedMessage.message_type === 'ogg' ||
                                                      receivedMessage.message_type === 'avi' ||
                                                      receivedMessage.message_type === 'mov' 
                                                       ? (
                                                         <>
                                                      <Typography>
                                                       { console.log('flag=',flag)}
                                                        <img
                                                          src={require('../../assets/images/file-extensions-icon/mp4.png')}
                                                          style={{ height: 50, width: 50 }}
                                                          alt="txt-file-icon"
                                                        />
                                                        {flag ?
                                                        <GetAppIcon style={{opacity : '0.5' }}  />
                                                        :
                                                        <GetAppIcon style={{cursor:'pointer' }} onClick={() => handleDownloadResource(receivedMessage.message)} />
                                                        }
                                                        </Typography>
                                                      
                                                      </>
                                                    ) : (
                                                      <Typography>
                                                      <img
                                                        src={require('../../assets/images/file-extensions-icon/file.png')}
                                                        style={{ height: 50, width: 50 }}
                                                        alt="file-icon"
                                                        />
                                                        {flag ?
                                                        <GetAppIcon style={{opacity : '0.5' }}  />
                                                        :
                                                        <GetAppIcon style={{cursor:'pointer' }} onClick={() => handleDownloadResource(receivedMessage.message)} />
                                                        }                                                    
                                                        </Typography>
                                                  )
                                                }
                              
                                </ChatBoxRightStyled>
                              </Box>
                              <AvatarChatRightStyled alt="profile picture" src={receivedMessage.sender_image} />

                              <IconButton edge="end">
                                <MoreVert
                                  onClick={(event) =>
                                    handleMenuClick(
                                      event,
                                      receivedMessage.nodeId,
                                      receivedMessage.message,
                                      receivedMessage.message_type
                                      )
                                    }
                                    />
                              </IconButton>
                            </Box>
                            {flag  && receivedMessage.message_type != 'text' ?
                             <Typography variant="body2" style={{ margin: 10, marginRight: 0 , textAlign: 'end' , paddingRight : '3px'}}> This file is no longer available</Typography>
                            // <p  style={{ margin: 10, marginRight: 0 , textAlign: 'end', paddingRight : '5.4rem' }}>The file is No Longer Available</p>
                            :
                            null
                            }
                          </li>
                        </>
                      );
                    })
                  ) : (
                    <li>
                      <BoxDateStyled alignSelf="center">
                        <Typography variant="caption" component="p">
                          {formattedDate}
                        </Typography>
                      </BoxDateStyled>
                    </li>
                  )
                ) : receivedMessages && receivedMessages.length > 0 ? (
                  receivedMessages.map((receivedMessage, receivedMessageIndex) => {
                    function convertTZ(date, tzString) {
                      return new Date(
                        (typeof date === 'string' ? new Date(date) : date).toLocaleString('en-US', {
                          timeZone: tzString,
                        })
                      );
                    }

                    let msgCreatedAt = convertTZ(new Date(parseInt(receivedMessage.created_at)), 'Europe/London');
                    //let msgCreatedAt = new Date(parseInt(receivedMessage.created_at)).toUTCString();
                    let getOnlyTime = new Date(msgCreatedAt).toLocaleTimeString();

                    // let msgCreatedAt = new Date(parseInt(receivedMessage.created_at)).toUTCString();
                    // msgCreatedAt = msgCreatedAt.split(' ');

                    let groupMembers = [];
                    let msgReadByMembers = [];
                    let msgReadByMembersList = [];
                    if (initChatDetail.hasOwnProperty('chatType')) {
                      groupMembers = initChatDetail.chatParticipant.group_members;
                      groupMembers = groupMembers.split(',');

                      if (groupMembers.length > 0) {
                        for (let i = 0; i < groupMembers.length; i++) {
                          msgReadByMembers.push(receivedMessage['message_read_' + groupMembers[i]]);

                          if (receivedMessage['message_read_' + groupMembers[i]]) {
                            msgReadByMembersList.push(groupMembers[i]);
                          }
                        }
                      }
                    }
                    
                    return receivedMessage.sender_id === user_id ? (
                      <li key={receivedMessageIndex}>
                        <Box display="flex" justifyContent="flex-end" style={{ margin: 10, marginRight: 0 }}>
                          <Box justifyContent="flex-end">
                            <Typography variant="caption" component="p" align="right">
                              {convertFrom24To12Format(getOnlyTime) + ' '}
                              {
                                // Message edited icon
                                receivedMessage.is_edited === true ? <Edit style={{ fontSize: 12 }} /> : null
                              }

                              <DoneAllStyled
                                onClick={() => handleMsgReadDetails(msgReadByMembersList)}
                                className={`${msgReadByMembers.includes(false) ? '' : 'active'}`}
                              />
                            </Typography>
                            <ChatBoxRightStyled>
                              {
                                // For text message
                                receivedMessage.message_type === 'text' ? (
                                  <Typography>{receivedMessage.message}</Typography>
                                ) : // For images
                                  receivedMessage.message_type === 'jpg' ||
                                    receivedMessage.message_type === 'jpeg' ||
                                    receivedMessage.message_type === 'png' ? (
                                    <Typography>
                                      <img
                                        style={{ height: 100, width: 100 }}
                                        src={receivedMessage.message}
                                        alt="image"
                                      />
                                    </Typography>
                                  ) : // For csv files
                                    receivedMessage.message_type === 'csv' ? (
                                      <Typography>
                                        <img
                                          src={require('../../assets/images/file-extensions-icon/csv.png')}
                                          style={{ height: 50, width: 50 }}
                                          alt="txt-file-icon"
                                        />
                                        <GetAppIcon onClick={() => handleDownloadResource(receivedMessage.message)} />
                                      </Typography>
                                    ) : // For pdf files
                                      receivedMessage.message_type === 'pdf' ? (
                                        <Typography>
                                          <img
                                            src={require('../../assets/images/file-extensions-icon/pdf.png')}
                                            style={{ height: 50, width: 50 }}
                                            alt="txt-file-icon"
                                          />
                                          <GetAppIcon onClick={() => handleDownloadResource(receivedMessage.message)} />
                                        </Typography>
                                      ) : // For txt files
                                        receivedMessage.message_type === 'txt' ? (
                                          <Typography>
                                            <img
                                              src={require('../../assets/images/file-extensions-icon/txt.png')}
                                              style={{ height: 50, width: 50 }}
                                              alt="txt-file-icon"
                                            />
                                            <GetAppIcon onClick={() => handleDownloadResource(receivedMessage.message)} />
                                          </Typography>
                                        ) : // For doc or docx file
                                          receivedMessage.message_type === 'doc' || receivedMessage.message_type === 'docx' ? (
                                            <Typography>
                                              <img
                                                src={require('../../assets/images/file-extensions-icon/doc.png')}
                                                style={{ height: 50, width: 50 }}
                                                alt="txt-file-icon"
                                              />
                                              <GetAppIcon onClick={() => handleDownloadResource(receivedMessage.message)} />
                                            </Typography>
                                          ) : // For ppt or pptx file
                                            receivedMessage.message_type === 'ppt' || receivedMessage.message_type === 'pptx' ? (
                                              <Typography>
                                                <img
                                                  src={require('../../assets/images/file-extensions-icon/ppt.png')}
                                                  style={{ height: 50, width: 50 }}
                                                  alt="txt-file-icon"
                                                />
                                                <GetAppIcon onClick={() => handleDownloadResource(receivedMessage.message)} />
                                              </Typography>
                                            ) : // For xls or xlsx file
                                              receivedMessage.message_type === 'xls' || receivedMessage.message_type === 'xlsx' ? (
                                                <Typography>
                                                  <img
                                                    src={require('../../assets/images/file-extensions-icon/xls.png')}
                                                    style={{ height: 50, width: 50 }}
                                                    alt="txt-file-icon"
                                                  />
                                                  <GetAppIcon onClick={() => handleDownloadResource(receivedMessage.message)} />
                                                </Typography>
                                              ) : null
                              }
                            </ChatBoxRightStyled>
                          </Box>
                          <AvatarChatRightStyled alt="profile picture" src={receivedMessage.sender_image} />

                          <IconButton edge="end" aria-label="delete">
                            <MoreVert
                              onClick={(event) =>
                                handleMenuClick(
                                  event,
                                  receivedMessage.nodeId,
                                  receivedMessage.message,
                                  receivedMessage.message_type
                                )
                              }
                            />
                          </IconButton>
                        </Box>
                      </li>
                    ) : (
                      <li key={receivedMessageIndex}>
                        <Box display="flex" style={{ margin: 10, marginLeft: 0 }}>
                          <AvatarChatStyled alt="profile picture" src={receivedMessage.sender_image} />
                          <Box>
                            <Typography variant="caption" component="p">
                              {receivedMessage.sender_name}, {convertFrom24To12Format(getOnlyTime)}
                            </Typography>
                            <ChatBoxStyled>
                              {
                                // For text message
                                receivedMessage.message_type === 'text' ? (
                                  <Typography>{receivedMessage.message}</Typography>
                                ) : // For images
                                  receivedMessage.message_type === 'jpg' ||
                                    receivedMessage.message_type === 'jpeg' ||
                                    receivedMessage.message_type === 'png' ? (
                                    <Typography>
                                      <img
                                        style={{ height: 100, width: 100 }}
                                        src={receivedMessage.message}
                                        alt="image"
                                      />
                                    </Typography>
                                  ) : // For csv files
                                    receivedMessage.message_type === 'csv' ? (
                                      <Typography>
                                        <img
                                          src={require('../../assets/images/file-extensions-icon/csv.png')}
                                          style={{ height: 50, width: 50 }}
                                          alt="txt-file-icon"
                                        />
                                        <GetAppIcon onClick={() => handleDownloadResource(receivedMessage.message)} />
                                      </Typography>
                                    ) : // For pdf files
                                      receivedMessage.message_type === 'pdf' ? (
                                        <Typography>
                                          <img
                                            src={require('../../assets/images/file-extensions-icon/pdf.png')}
                                            style={{ height: 50, width: 50 }}
                                            alt="txt-file-icon"
                                          />
                                          <GetAppIcon onClick={() => handleDownloadResource(receivedMessage.message)} />
                                        </Typography>
                                      ) : // For txt files
                                        receivedMessage.message_type === 'txt' ? (
                                          <Typography>
                                            <img
                                              src={require('../../assets/images/file-extensions-icon/txt.png')}
                                              style={{ height: 50, width: 50 }}
                                              alt="txt-file-icon"
                                            />
                                            <GetAppIcon onClick={() => handleDownloadResource(receivedMessage.message)} />
                                          </Typography>
                                        ) : // For doc or docx file
                                          receivedMessage.message_type === 'doc' || receivedMessage.message_type === 'docx' ? (
                                            <Typography>
                                              <img
                                                src={require('../../assets/images/file-extensions-icon/doc.png')}
                                                style={{ height: 50, width: 50 }}
                                                alt="txt-file-icon"
                                              />
                                              <GetAppIcon onClick={() => handleDownloadResource(receivedMessage.message)} />
                                            </Typography>
                                          ) : // For ppt or pptx file
                                            receivedMessage.message_type === 'ppt' || receivedMessage.message_type === 'pptx' ? (
                                              <Typography>
                                                <img
                                                  src={require('../../assets/images/file-extensions-icon/ppt.png')}
                                                  style={{ height: 50, width: 50 }}
                                                  alt="txt-file-icon"
                                                />
                                                <GetAppIcon onClick={() => handleDownloadResource(receivedMessage.message)} />
                                              </Typography>
                                            ) : // For xls or xlsx file
                                              receivedMessage.message_type === 'xls' || receivedMessage.message_type === 'xlsx' ? (
                                                <Typography>
                                                  <img
                                                    src={require('../../assets/images/file-extensions-icon/xls.png')}
                                                    style={{ height: 50, width: 50 }}
                                                    alt="txt-file-icon"
                                                  />
                                                  <GetAppIcon onClick={() => handleDownloadResource(receivedMessage.message)} />
                                                </Typography>
                                              ) : null
                              }
                            </ChatBoxStyled>
                          </Box>
                        </Box>
                      </li>
                    );
                  })
                ) : (
                  <li>
                    <BoxDateStyled alignSelf="center">
                      <Typography variant="caption" component="p">
                        {formattedDate}
                      </Typography>
                    </BoxDateStyled>
                  </li>
                )}
              </ul>
            )}
          </Grid>

          <GridFooterStyled item xs={12}>
            <form className="chat-inp-form" onSubmit={handleMessageFormSubmit}>
              <Box className="emoji-list">{showEmoji && <EmojiWindow handleEmojiClick={handleEmojiClick} />}</Box>
              <Box display="flex" justify="space-between">
                <IconButton edge="end" aria-label="Emoji" onClick={() => toggleShowEmoji(!showEmoji)} className="mr-10">
                  <EmojiEmotions />
                </IconButton>
                <InputBase
                  className="inputChat"
                  value={chatMessage}
                  onChange={(e) => handleChatMessage(e.target.value)}
                  placeholder="Write Message"
                  inputProps={{ 'aria-label': 'naked' }}
                />
                <Box>
                  <input type="file" ref={fileBrowse} style={{ display: 'none' }} onChange={handleFileSelect} />
                  <IconButton edge="end" aria-label="Attchment" className="mr-10">
                    <Attachment onClick={showFileBrowse} />
                  </IconButton>
                  <input type="file" ref={imageBrowse} style={{ display: 'none' }} onChange={handleImageSelect} />
                  <IconButton edge="end" aria-label="Image" className="mr-20">
                    <CropOriginal onClick={showImageBrowse} />
                  </IconButton>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleMessageSend}
                    endIcon={<Send />}
                  >
                    Send
                  </Button>
                  {isEditMsg ? (
                    <Button type="button" variant="contained" color="primary" onClick={handleCancelUpdateMsg}>
                      <Close />
                    </Button>
                  ) : null}
                </Box>
              </Box>
            </form>
          </GridFooterStyled>
        </PaperStyled>
      </Grid>
      :
      <Grid item xs={12} md={8} className={clsx(classes.rightPanel, 'rightSide-cont')}>
          <Paper className={clsx(classes.paper2, 'sideBar-scroll')}>
          <Box className={classes.content} style={{ marginTop: '10rem' }}>
          <CardMedia
            className={classes.icon}
            image={RymindrOriginal}
            title="Message Center"
            component="img"
            style={{margin: 'auto', paddingBottom : '2rem'}}
          />
          <Typography className={classes.commingSoonDesc} style={{textAlign : 'center'}}>
            No record Found
          </Typography>
        </Box>
        </Paper>
        </Grid>
        }
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.liveChatReducer.loading,
    error: state.liveChatReducer.error,
    success: state.liveChatReducer.success,
    chatroom: state.liveChatReducer.chatroom,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatWindow);
