import { Box, IconButton, ListItem, ListItemText, Menu, Typography, Badge, List, ListItemAvatar, Avatar } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import {
  getNotifications,
  notificationRead
} from '../../../store/actions/notificationActions';
import NotificationsIcon from '@material-ui/icons/Notifications'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react'
import { makeStyles, styled } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuDropBox: {
    width: 600, marginTop: 10
  },
  notifyBlockUnread: {
    backgroundColor: 'rgba(206,226,241, 0.3)',
    borderRadius: 15
  },
  notifyBlockRead: {
    backgroundColor: 'white'
  }
}))

const AvatarStyled = styled(Avatar)({
  height: 48,
  width: 48,
  marginRight: 10
})

const TypoNameUnreadStyled = styled(Typography)({
  color: '#00000',
  fontWeight: 600
})

const TypoNameReadStyled = styled(Typography)({
  color: '#b3bcc3',
  fontWeight: 600
})

const TypoTimeStyled = styled(Typography)({
  color: '#b3bcc3',
  float: 'right'
})

const BoxStyled = styled(Box)({
  borderBottom: '1px solid #e0e0e0',
  padding: '10px 20px'
})

const TypoPopHeadStyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.contrastText,
  fontSize: 18,
  fontWeight: '600'
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  padding: '0 !important',
  textDecoration: 'none',
  fontWeight: '600'
}))

const TypoNotiUnreadStyled = styled(Typography)(({ theme }) => ({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  color: theme.palette.text.secondary
}))

const TypoNotiReadStyled = styled(Typography)(({ theme }) => ({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  color: '#67696d'
}))

const Notifications = (props) => {

  const history = useHistory();
  const { user_id } = JSON.parse(localStorage.getItem('userData'));

  const {
    getNotifications,
    notificationRead,
    notifications
  } = props;

  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const badge = () => {
    var count = 0;
    // console.warn('notifications3333', notifications)
    notifications.map((item) => {
      if(item.status == 0) count++;
    })

    return count;
  }

  const updateNotifications = () => {
    const dataToSend = {
      user_id,
      offset: 0,
      limit: 20
    }
    getNotifications(dataToSend);
  }

  // const handleRead = (notificationId, url, rymindr_date, rymindr_time) => {
    const handleNotification = (notification) => {
    setAnchorEl(null);
      console.log('notification===',notification);
      console.log('notifications === ',notifications);

      
    let tempURL = (notification.url) ? (notification.url).split('/') : '';
    
    if(new Date(notification.rymindr_date + ' ' + notification.rymindr_time) < new Date()) {

      // console.log('tempURL22===',tempURL);
      // return false;
      handleRead(
        notification.id,
        '/history-rymindrs',
        notification.notification_type,
        notification.post_id
       )
    }
    else {
      // handleRead(
      //   notification.id,
      //   tempURL[1],
      //   notification.notification_type,
      //   notification.post_id,
      //   notification.recr_post_id
      //  )
      if(notification.notification_type == 'booking' || notification.notification_type == "booking_comment") {
        console.log('notification--',notification)
        handleRead(
          notification.id,
          tempURL[1],
          notification.notification_type,
          notification.post_id,
          notification.recr_post_id,
          null
        )
      }
      else if(notification.notification_type == 'connention_request') {
        handleRead(
          notification.id,
          tempURL[1],
          notification.notification_type,
          null, null,
          notification.user_id
        )
      } else if(notification.notification_type == "request_for_quick_rymindr") {
        handleRead(
          notification.id,
          tempURL[1],
          notification.notification_type,
          notification.post_id
         )
      } 
      else if(notification.notification_type == 'group_info') {
        handleRead(
          notification.id,
          tempURL[1],
          notification.notification_type,
          notification.post_id
         )
      }
      else if(notification.notification_type == 'accepted_quick_rymindr') {
        handleRead(
          notification.id,
          tempURL[1],
          notification.notification_type,
          null, null,
          notification.user_id
        )
      }
      else if(notification.notification_type == 'declined_quick_rymindr') {
        handleRead(
          notification.id,
          'contacts',
          notification.notification_type,
          null, null,
          notification.user_id
        )
      }
      else if (notification.notification_type == 'exam_form'){
        handleRead(
          notification.id,
          notification.url,
          notification.notification_type,
          notification.post_id,
          notification.recr_post_id,
          null
        )
      }
    }
    // if(url !== null) {console.log(url);
    //   history.push(url);
    // }
    // const dataToSend = {
    //   user_id,
    //   notification_id: notificationId
    // }
    // notificationRead(dataToSend);
  }

  const handleRead = (notificationId, url, notification_type, post_id, recr_post_id, connection_id) => {
    
    // if(notification_type == 'booking' || notification_type == "booking_comment") {
    //   history.push({
    //     pathname: '/bookings',
    //     state: { post_id: post_id, recr_post_id: recr_post_id }
    // })
    // }

    
    if(notification_type == 'booking' || notification_type == "booking_comment") {
      history.push({
        pathname: '/bookings',
        state: { post_id: post_id, recr_post_id: recr_post_id }
      })
    }
    else if(notification_type == 'connention_request') {
      history.push({
        pathname: '/contacts',
        state: { connection_id: connection_id }
      })
    } else if(notification_type == 'accepted_quick_rymindr') {
      history.push({
        pathname: '/contacts',
        state: { connection_id: connection_id }
      })
    }
    else if(notification_type == 'exam_form'){
      history.push({
        pathname: url,
        state:{post_id: post_id, recr_post_id: recr_post_id }
      })
    }
    else {
      //if (url) history.push(url)
      if(url){
        history.push({
          pathname: url,
          state: { post_id: post_id }
        })
      }
    }
    const dataToSend = {
      user_id,
      notification_id: notificationId
    }
    notificationRead(dataToSend)
  }

  useEffect(() => {
      updateNotifications();
      const interval = setInterval(() => updateNotifications(), 15000);
      return () => {
        clearInterval(interval);
      };
  }, [])

  // console.warn('notifications123', notifications)

  return (
    <div className={classes.root}>

      <IconButton className='mt-5' aria-label='Show notifications' color='primary' onClick={handleMenu}>
        <Badge badgeContent={badge()} color='error'>
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu
        id='menu-appbar'
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        className={classes.Menu}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={open}
        onClose={handleClose}
      >
        <div className={classes.menuDropBox}>
          <BoxStyled display='flex' justifyContent='space-between'>
            <TypoPopHeadStyled>Notifications</TypoPopHeadStyled>
            <LinkStyled to='/notification' onClick={handleClose}>See All</LinkStyled>
          </BoxStyled>
          <List className={classes.root}>
            {notifications.map((notification, index) => {
              return <ListItem
                button
                alignItems='flex-start'
                onClick={() =>
                  handleNotification(
                    notification
                    // notification.id,
                    // notification.url,
                    // notification.rymindr_date,
                    // notification.rymindr_time
                  )}
                className={(notification.status == 0)? classes.notifyBlockUnread : classes.notifyBlockRead}
                >
              <ListItemAvatar>
                <AvatarStyled alt={notification.title} src={notification.image} />
              </ListItemAvatar>
              <ListItemText
                noWrap
                primary={
                  <Box width='100%'>
                    {
                    // (notification.status == 0)?
                    <TypoNameUnreadStyled variant='body2' component='span'>{notification.title}</TypoNameUnreadStyled>
                    // :
                    // <TypoNameReadStyled variant='body2' component='span'>{notification.title}</TypoNameReadStyled>
                    }
                    <TypoTimeStyled variant='caption'>{notification.time}</TypoTimeStyled>
                  </Box>
                }
                secondary={
                  // (notification.status == 0)?
                  <TypoNotiUnreadStyled variant='body1'>{notification.text}</TypoNotiUnreadStyled>
                  // :
                  // <TypoNotiReadStyled variant='body1'>{notification.text}</TypoNotiReadStyled>
                }
              />
            </ListItem>
            })
            }
            {notifications.length == 0 && <ListItem><ListItemText noWrap><Box width='100%'><TypoNotiUnreadStyled variant='body2' component='span'>Great! You're all up to date. No notifications.</TypoNotiUnreadStyled></Box></ListItemText></ListItem>}
          </List>
        </div>
      </Menu>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notification.notifications
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getNotifications: (data) => dispatch(getNotifications(data)),
    notificationRead: (data) => dispatch(notificationRead(data))
  }
};

Notifications.propTypes = {
  getNotifications: PropTypes.func.isRequired,
  notificationRead: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
