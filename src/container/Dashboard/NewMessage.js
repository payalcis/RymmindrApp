import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core';

import { makeStyles, styled } from '@material-ui/core/styles';
import EventIcon from '@material-ui/icons/Event';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ScheduleIcon from '@material-ui/icons/Schedule';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

// For firebase chat purpose
import firebase from 'firebase';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const CardPaperStyled = styled(Card)(({ theme }) => ({
  height: '100%',
}));

const TypoHeadingStyled = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  color: theme.palette.primary.main,
  textTransform: 'uppercase',
  fontWeight: 700,
}));
const AvatarStyled = styled(Avatar)({
  height: 55,
  width: 55,
  marginRight: 10,
});

const TypoNameStyled = styled(Typography)({
  color: '#b3bcc3',
  fontWeight: 600,
});

const TypoTimeStyled = styled(Typography)({
  color: '#b3bcc3',
  float: 'right',
});

const NewMessage = (props) => {
  const history = useHistory();
  const classes = useStyles();

  const { user_id, business_code } = JSON.parse(localStorage.getItem('userData'));

/* ---------- Chat related code starts ---------- */

var messageRef = firebase.database().ref();
useEffect(() => {
  listenMessages();

  // Clear the rendered chat messages when component is unmounted and mounted again
  // return () =>
  // {
  //     messageRef.off();
  // }
}, []);

const [msgNotifications, updateMsgNotifications] = useState([]);
const [unreadMsgNotifications, updateUnreadMsgNotifications] = useState([]);

const listenMessages = () => {
    messageRef.on('value', function() {
        let unreadMessages = [];
        
        messageRef.orderByChild("created_at").on("child_added", snapshot => {

            let msgNodes = snapshot.val();
            let message = Object.values(msgNodes);
            if(message.length > 0) {
              for(let i=0; i<message.length; i++)
              {
                  // Only unread messages will be shown here
                  if( message[i]['message_read_'+user_id] === false )
                  {
                      unreadMessages.push(message[i]);
                  }
              }
              if(unreadMessages.length > 0 ) {

                console.log('unreadMessages====',unreadMessages);
                updateMsgNotifications(unreadMessages);
              }
            }
        });
    });
}

// Arrange them in order
msgNotifications.sort((a, b) => (a.created_at < b.created_at) ? 1 : -1);
let notification = msgNotifications.slice(0, 5);

const limitStringCharacters = (txtString) => {
    let length = 80;

    let trimmedString = '';
    if( txtString.length > length )
    {
        trimmedString = txtString.substring(0, length);
        trimmedString = trimmedString.substring(0, trimmedString.lastIndexOf(" ") + 1) + " ...";
    }
    else
    {
        trimmedString = txtString.substring(0, length);
    }

    return trimmedString;
}

const convertFrom24To12Format = (time24) => {
    const [sHours, minutes] = time24.match(/([0-9]{1,2}):([0-9]{2})/).slice(1);
    const period = +sHours < 12 ? 'AM' : 'PM';
    const hours = +sHours % 12 || 12;

    return `${hours}:${minutes} ${period}`;
  }

/* ---------- Chat related code ends ---------- */

setTimeout(
  () => {
    //console.log('msgNotifications=',msgNotifications);
    updateUnreadMsgNotifications(msgNotifications)
  
  },
  2000
);

  return (
    <CardPaperStyled>
      <CardHeader
        title={
          unreadMsgNotifications.length > 0 ?
            <><TypoHeadingStyled component="span">New Message</TypoHeadingStyled>
            <span style={{backgroundColor: '#FF8A00', padding: 8, paddingTop: 3, paddingBottom: 3, borderRadius: 30, fontSize: 11, color: 'white', marginLeft: 10}}>{unreadMsgNotifications.length + ' New'}</span></>
          :
            <TypoHeadingStyled component="span">New Message</TypoHeadingStyled>
        }
        action={<Button onClick={() => history.push('/live-chat')}>View all</Button>}
        className="cardHeader"
      />
      <CardContent>
        <List className={classes.root}>
            {
                ( unreadMsgNotifications.length > 0 )
                ?
                    unreadMsgNotifications.map((msg, index) => {


                      function convertTZ(date, tzString) {
                        return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
                    }
                    let dateShow;
                    let msgCreatedAt = convertTZ(new Date(parseInt(msg.created_at)),"Europe/London");
                    let getDate =  new Date (msgCreatedAt).toDateString()
                    // Current Uk Date
                    let currentDate = convertTZ(new Date(),"Europe/London").getDate()
                    // messageCreated Uk Date
                    let msgCreatedDate = msgCreatedAt.getDate()

                    // Full Date
                    if (msgCreatedDate == currentDate){
                      dateShow = 'Today';
                    }
                    else if ((currentDate-1) == msgCreatedDate){
                      dateShow = 'Yesterday';
                    }
                    else {
                      dateShow = getDate;
                    }

                    let getOnlyTime = new Date(msgCreatedAt).toLocaleTimeString()
                    console.log('getDate--',getDate)
                        // let msgCreatedAt = new Date(parseInt(msg.created_at)).toUTCString();
                        // msgCreatedAt = msgCreatedAt.split(' ');

                        return (
                            <ListItem alignItems="flex-start" key={index}>
                                <ListItemAvatar>
                                <AvatarStyled alt={msg.sender_name} src={msg.sender_image} />
                                </ListItemAvatar>
                                <ListItemText
                                primary={
                                    <>
                                    <Box width="100%">
                                        <TypoNameStyled variant="body2" component="span">
                                            {msg.sender_name}
                                        </TypoNameStyled>
                                        <TypoTimeStyled variant="caption">{ dateShow } at {convertFrom24To12Format(getOnlyTime)}</TypoTimeStyled>
                                    </Box>
                                    </>
                                }
                                secondary={
                                    <Typography  className='mess-multi-line-ellipsis' variant="body1">
                                        {
                                            ( msg.message_type == 'text' )
                                            ?
                                                limitStringCharacters(msg.message)
                                            :
                                                'One file received'
                                        }
                                    </Typography>
                                }
                                />
                            </ListItem>
                        )
                    })
                :
                <ListItem alignItems="flex-start">
                    <Typography variant="body1">
                        No new unread messages.
                    </Typography>
                </ListItem>
            }
        </List>
      </CardContent>
    </CardPaperStyled>
  );
};

NewMessage.propTypes = {
  data: PropTypes.any.isRequired,
};

export default NewMessage;
