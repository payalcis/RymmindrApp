import React, { useEffect, useMemo, useState } from 'react';
import { makeStyles, styled } from '@material-ui/core/styles'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, TextField, InputAdornment, Divider, Box, IconButton, Menu, MenuItem } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { Search, Comment, Edit, Delete, MoreVert } from '@material-ui/icons'
import { withSnackbar } from 'notistack';
import moment from 'moment';
import { getNotifications } from '../../../store/actions/notificationActions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    position: 'relative'
  }
}))

const Notifications = (props) => {

  const {
    notifications,
    getNotifications
  } = props;

  const options = ['Clear notifications', 'Notification settings'];

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }
  
  const handleClose = () => {
    setAnchorEl(null);
  };

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

  const TypoNameStyled = styled(Typography)({
    fontSize: 16,
    color: 'rgba(64, 87, 106, 0.9)',
    fontWeight: 700
  })

  const TypoTimeStyled = styled(Typography)({
    color: '#b3bcc3', float: 'right'
  })

  const PaperStyled = styled(Paper)({
    padding: '10px 15px'
  })


// const TypoNotifReadStyled = styled(Typography)(({ theme }) => ({
//   color: '#7f8f9b',
//   fontWeight: 600
// }))

// const TypoNotifUnreadStyled = styled(Typography)(({ theme }) => ({
//   color: theme.palette.text.primary,
//   fontWeight: 600
// }))

// const TypoNotiStyled = styled(Typography)(({ theme }) => ({
//   color: '#b3bcc3',
//   fontWeight: '400'
// }))

  const { user_id } = JSON.parse(localStorage.getItem('userData'));
  const Rymindrlist = notifications.map((notification) =>
    <ListItem button alignItems='flex-start'>
      <ListItemAvatar>
        <AvatarStyled alt='semy Sharp' src={notification.image} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <>
            <Box width='100%'>
              <TypoNameStyled variant='body2' component='span'>{notification.title}</TypoNameStyled>
              <TypoTimeStyled variant='caption'>{ notification.time }</TypoTimeStyled>
            </Box>
          </>
        }
        secondary={
          <Typography variant='body1'>{notification.text}</Typography>
        }
      />
    </ListItem>
  )

  useEffect(() => {
    const dataToSend = {
      user_id,
      offset: 0,
      limit: 50
    };
    getNotifications(dataToSend);
    
  }, []);
  return (
    <>
      <Grid
        container
        justify="space-between"
        display="flex"
        style={{ marginBottom: 10 }} >
        <Grid item xs={7}>
          <TypoHeadStyled variant='h4'>Your <TypoHeadInnerStyled component='span'>NOTIFICATIONS</TypoHeadInnerStyled></TypoHeadStyled>
        </Grid>
        <Grid item style={{ position: 'relative' }}>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={(event) =>
              handleClick(
                event
              )
            }
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
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        {options.map((option) => (
          <MenuItem key={option} selected={option === 'Pyxis'}>
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
    notifications:state.notification.notifications,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNotifications: (data) => dispatch(getNotifications(data)),
  };
};

Notifications.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  getNotifications: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Notifications));
