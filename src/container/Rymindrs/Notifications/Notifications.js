import React, { useEffect, useMemo, useState } from 'react'
import { makeStyles, styled } from '@material-ui/core/styles'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
, useHistory } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Box, IconButton, Menu, MenuItem } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { MoreVert } from '@material-ui/icons'
import { withSnackbar } from 'notistack';
import {
  getNotifications,
  notificationRead,
  notificationClear
} from '../../../store/actions/notificationActions';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    position: 'relative'
  },
  notifyBlockUnread: {
    backgroundColor: 'rgba(206,226,241, 0.3)',
    borderRadius: 15
  },
  notifyBlockRead: {
    backgroundColor: 'white'
  }
}))

const Notifications = (props) => {
  const history = useHistory()

  const {
    notifications,
    getNotifications,
    notificationRead,
    notificationClear,
    enqueueSnackbar,
    success_message
  } = props

  const options = ['Clear notifications', 'Notification settings']

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  };

  useMemo(() => {
    if(success_message && success_message.message){
      success_message && enqueueSnackbar(success_message.message, { variant: 'success' });
      getNotifications()
    }
  }, [success_message]);

  const classes = useStyles()
  const AvatarStyled = styled(Avatar)({
    height: 55, width: 55, marginRight: 10
  })

  const TypoHeadStyled = styled(Typography)(({ theme }) => ({
    fontSize: 24,
    color: theme.palette.primary.main,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginBottom: 10
  }))

  const TypoHeadInnerStyled = styled(TypoHeadStyled)(({ theme }) => ({
    color: theme.palette.text.primary
  }))

  const TypoNameUnreadStyled = styled(Typography)({
    color: '#00000',
    fontWeight: 600
  })

  const TypoNameReadStyled = styled(Typography)({
    color: '#b3bcc3',
    fontWeight: 600
  })

  const TypoTimeStyled = styled(Typography)({
    color: '#b3bcc3', float: 'right'
  })

  const TypoHeadingStyled = styled(Typography)(({ theme }) => ({
    fontSize: 14,
    color: theme.palette.primary,
    // textTransform: 'uppercase',
    fontWeight: 400,
  }));

  const PaperStyled = styled(Paper)({
    padding: '10px 15px'
  })

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
  console.log('notifications--',notifications)
  const { user_id } = JSON.parse(localStorage.getItem('userData'))
  const Rymindrlist = notifications.length > 0 ?
  (notifications.map((notification) =>
    <ListItem
      button
      className={(notification.status == 0)? classes.notifyBlockUnread : classes.notifyBlockRead}
      alignItems='flex-start'
      onClick={() =>{
        let tempURL = (notification.url) ? (notification.url).split('/') : '';
        if(new Date(notification.rymindr_date + ' ' + notification.rymindr_time) < new Date()) {
         handleRead(
           notification.id,
           '/history-rymindrs',
           notification.notification_type,
           notification.post_id
          )
        }
        else if(notification.notification_type == "group_info" ) {
            handleRead(
              notification.id,
              tempURL[1],
              notification.notification_type,
              notification.post_id,
              notification.recr_post_id,
              null
            )
          }
        else {
          if(notification.notification_type == 'booking' || notification.notification_type == "booking_comment") {
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
          }
        }
      }}
    >
      <ListItemAvatar>
        <AvatarStyled alt='semy Sharp' src={notification.image} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <>
            <Box width='100%'>
              {
                // (notification.status == 0) ?
                <TypoNameUnreadStyled variant='body2' component='span'>{notification.title}</TypoNameUnreadStyled>
              // :<TypoNameReadStyled variant='body2' component='span'>{notification.title}</TypoNameReadStyled>
              }
              <TypoTimeStyled variant='caption'>{notification.time}</TypoTimeStyled>
            </Box>
          </>
        }
        secondary={
          // (notification.status == 0) ?
            <TypoNotiUnreadStyled variant='body1'>{notification.text}</TypoNotiUnreadStyled>
          // :<TypoNotiReadStyled variant='body1'>{notification.text}</TypoNotiReadStyled>
        }
      />
    </ListItem>
  )) :
    <TypoNotiUnreadStyled component="span">Great! You're all up to date. No notifications.</TypoNotiUnreadStyled>

  const handleRead = (notificationId, url, notification_type, post_id, recr_post_id, connection_id) => {
console.log('notification_type--',notification_type)
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
    }
  
    else {
      if (url) history.push(url)
    }
    const dataToSend = {
      user_id,
      notification_id: notificationId
    }
    notificationRead(dataToSend)
  }

  const handleClickOption = (option) => {
    if(option == 'Clear notifications') {
        notificationClear(user_id)
    }
    else if(option == 'Notification settings') {
      history.push('/account-settings/notifications')
    }
  }

  return (
    <>
      <Grid
        container
        justify='space-between'
        display='flex'
        style={{ marginBottom: 10 }}>
        <Grid item xs={7}>
          <TypoHeadStyled variant='h4'>Your <TypoHeadInnerStyled component='span'>NOTIFICATIONS</TypoHeadInnerStyled></TypoHeadStyled>
        </Grid>
        <Grid item style={{ position: 'relative' }}>
          <IconButton
            aria-label='more'
            aria-controls='long-menu'
            aria-haspopup='true'
            onClick={(event) =>
              handleClick(
                event
            )}
          >
            <MoreVert />
          </IconButton>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <PaperStyled>
            <List>
              {Rymindrlist}
            </List>
          </PaperStyled>
        </Grid>
      </Grid>
      <Menu
        id='long-menu'
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        {options.map((option) => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={() => handleClickOption(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    loading: state.notification.loading,
    error: state.notification.error,
    success_message: state.notification.success_message,
    notifications: state.notification.notifications
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNotifications: (data) => dispatch(getNotifications(data)),
    notificationRead: (data) => dispatch(notificationRead(data)),
    notificationClear: (user_id) => dispatch(notificationClear(user_id))
  }
};

Notifications.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  success_message: PropTypes.any.isRequired,
  getNotifications: PropTypes.func.isRequired,
  notificationRead: PropTypes.func.isRequired,
  notificationClear: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Notifications))
