import { Box, Switch, Typography } from '@material-ui/core';
import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { notificationSetting } from '../../store/actions/accountsettingAction';
import { styled } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';

const TypoStyled = styled(Typography)(({ theme }) => ({
  fontSize: 17,
  color: theme.palette.text.primary,
  fontWeight: '600',
  marginRight: 50,
  width: 250
}));

const Notifications = (props) => {
  const { notification_status, notification_chat_status, notification_post_status, notification_msg_center_status, user_id } = JSON.parse(localStorage.getItem('userData'));
  const { NotificationSetting, enqueueSnackbar, error, loading, success_message, sucess } = props;
  // const [notificationState, setNotificationState] = useState(!!notification_status);
  const [chatNotificationState, setchatNotificationState] = useState(notification_chat_status);
  const [postNotificationState, setpostNotificationState] = useState(notification_post_status);
  const [messagecenterNotificationState, setMessagecenterNotificationState] = useState(notification_msg_center_status);

  const handleChange = (event, notification_type) => {
    if(notification_type === 'notification_chat_status') setchatNotificationState(event.target.checked);
    if(notification_type === 'notification_post_status') setpostNotificationState(event.target.checked);
    if(notification_type === 'notification_msg_center_status') setMessagecenterNotificationState(event.target.checked);
    const dataTosend = { user_id, notification_type, notification_status: event.target.checked };
    NotificationSetting(dataTosend);
  };

  // useEffect(() => {
  //   console.log('change state');
  // }, [chatNotificationState]);

  useMemo(() => {
    error && enqueueSnackbar(error, { variant: 'error' });
    
  }, [error]);
  useMemo(() => {
    sucess && enqueueSnackbar(sucess, { variant: 'sucess' });
    
  }, [sucess]);

  useMemo(() => {
    
    success_message && enqueueSnackbar(success_message, { variant: 'success' });
  }, [success_message]);
  
  
  return (
    <div style={{ paddingLeft: 25, paddingRight: 25 }}>
      <Box display="flex" alignItems="center" className="mt-10">
        <TypoStyled>Chat notifications</TypoStyled>
        <Switch
          checked={chatNotificationState}
          onChange = { (event) => handleChange(
            event,
            'notification_chat_status'
          ) }
          color="primary"
          name="checkedA"
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
      </Box>
      <Box display="flex" alignItems="center" className="mt-10">
        <TypoStyled>Posts and comments</TypoStyled>
        <Switch
          checked={postNotificationState}
          onChange = { (event) => handleChange(
            event,
            'notification_post_status'
          ) }
          color="primary"
          name="checkedA"
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
      </Box>
      <Box display="flex" alignItems="center" className="mt-10">
        <TypoStyled>Message center notifications</TypoStyled>
        <Switch
          checked={messagecenterNotificationState}
          onChange = { (event) => handleChange(
            event,
            'notification_msg_center_status'
          ) }
          color="primary"
          name="checkedA"
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
      </Box>
    </div>
  );
};

const mapStateToProps = ({ account }) => {
  return {
    loading: account.loading,
    error: account.error,
    sucess:account.error,
    success_message: account.success_message

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    NotificationSetting: (data) => dispatch(notificationSetting(data)),
  };
};

Notifications.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  NotificationSetting: PropTypes.func.isRequired,
  success_message: PropTypes.any.isRequired,
  sucess:PropTypes.string.isRequired,

};
export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Notifications));
