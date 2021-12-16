import * as actionTypes from './actionTypes';
import Axios from '../../helper/axios';

export const isLoading = () => {
  return {
    type: actionTypes.ACISLOADING,
  };
};

export const Success = (response) => {
  return response;
};

export const Fail = (error) => {
  return {
    type: actionTypes.ACERROR,
    error: error,
  };
};
export const SuccessMessage = (message) => {

  return {
    type: actionTypes.SUCCESS_MESSAGE_ACCOUNT_SETTING,
    success_message: message,
  };
};
export const notificationSetting = (data) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading());
      const response = await Axios().post('/users/updateNotificationStatus', data);

      if (response.data.status === '1') {
        const record = response.data.data;
        const userData = JSON.parse(localStorage.getItem('userData'));
        userData.notification_status = data.notification_status;
        localStorage.setItem('userData', JSON.stringify(userData));


        dispatch(
          Success({
            type: actionTypes.CHANGENOTIFICATIONSETTING,
            payload: record,
          })
        );

        dispatch(SuccessMessage(response.data.message));

      } else {
        dispatch(Fail(response.data.message));
      }
    } catch (error) {
      dispatch(Fail(error.message));
    }
    finally{
      dispatch(SuccessMessage(null));
      dispatch(Fail(null));
    }
  };
};

export const makeDefaultCategory = (data) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading());
      const response = await Axios().post('/users/updatedefaultcategory', data);

      if (response.data.status === '1') {
        const record = response.data.data;
        dispatch(
          Success({
            type: actionTypes.MAKEDEFAULTCATEGORY,
            payload: record,
          })
        );
        

        let tempUserData = JSON.parse(localStorage.getItem('userData'));
        
        const {
          user_id,
          business_code,
          country_name,
          device_token,
          notification_status,
          notification_chat_status,
          notification_post_status,
          notification_msg_center_status,
          profile_image,
          first_name,
          last_name,
          sc_bessi_name,
          address,
          post_code,
          email,
          mobile_no,
          account_type,
        } = tempUserData;

        const default_category = data.default_category;

        const userData = {
          user_id,
          business_code,
          country_name,
          device_token,
          notification_status,
          notification_chat_status,
          notification_post_status,
          notification_msg_center_status,
          profile_image,
          first_name,
          last_name,
          sc_bessi_name,
          address,
          post_code,
          email,
          mobile_no,
          account_type,
          default_category
        }
        console.log('userData',userData)

        localStorage.setItem('userData', JSON.stringify(userData));
        dispatch(SuccessMessage(response.data.message));

      } else {
        dispatch(Fail(response.data.message));
      }
    } catch (error) {
      dispatch(Fail(error.message));
    }finally{
      dispatch(SuccessMessage(null));
      dispatch(Fail(null));
    }
  };
};

export const changePassword = (data, history) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading());
      const response = await Axios().post('/users/updatePassword', data);
      if (response.data.status === '1') {
        const record = response.data.data;
        await dispatch(
          Success({
            type: actionTypes.CHANGEPASSWORD,
            payload: record,
          })
        );

        dispatch(SuccessMessage(response.data.message));
        await localStorage.clear();
        history.push('/login');
      } else {
        dispatch(Fail(response.data.message));
      }
    } catch (error) {
      dispatch(Fail(error.message));
    }finally{
      dispatch(SuccessMessage(null));
      dispatch(Fail(null));
    }
  };
};

export const updateProfile = (data) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading());
      const response = await Axios().post('/users/update_profile', data);
      if (response.data.status === '1') {
        const record = response.data.data;
        const {
          user_id,
          business_code,
          country_name,
          device_token,
          notification_status,
          notification_chat_status,
          notification_post_status,
          notification_msg_center_status,
          profile_image,
          first_name,
          // last_name,
          sc_bessi_name,
          address,
          post_code,
          email,
          mobile_no,
          account_type,
          first_login,
          default_category
        } = response.data.data;

        const userData = {
          user_id,
          business_code,
          country_name,
          device_token,
          notification_status,
          notification_chat_status,
          notification_post_status,
          notification_msg_center_status,
          profile_image,
          first_name,
          // last_name,
          sc_bessi_name,
          address,
          post_code,
          email,
          mobile_no,
          account_type,
          first_login,
          default_category
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        dispatch(
          Success({
            type: actionTypes.UPDATEPROFILE,
            payload: record,
          })
        );
        dispatch(SuccessMessage(response.data.message));

      } else {
        dispatch(Fail(response.data.message));
      }
    } catch (error) {
      dispatch(Fail(error.message));
    }finally{
      dispatch(SuccessMessage(null));
      dispatch(Fail(null));
    }
  };
};

export const deleteUserAccount = (data) => {

  let resp = {
    status: false
  };

  return async (dispatch) => {
    try {
      dispatch(isLoading());
      const response = await Axios().post('/users/deleteDesktopAccount', data);
      if (response.data.status === '1') {
        const record = response.data.data;
        dispatch(
          Success({
            type: actionTypes.DELETEUSERACCOUNT,
            payload: record,
          })
        );

        dispatch(SuccessMessage(response.data.message));
        resp.status = true;

      } else {
        dispatch(Fail(response.data.message));
      }
    } catch (error) {
      dispatch(Fail(error.message));
    } finally {
      dispatch(SuccessMessage(null));
      dispatch(Fail(null));
    }

    return resp;
  };
};

export const sendOtpcode = (data) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading());
      const response = await Axios().post('/users/requestOneTimePassword', data);
      if (response.data.status === '1') {
        const record = response.data.data;
        await dispatch(
          Success({
            type: actionTypes.SENDOTP,
            payload: record,
          })
        );
        dispatch(SuccessMessage(response.data.message));
      } else {
        dispatch(Fail(response.data.message));
      }
    } catch (error) {
      dispatch(Fail(error.message));
    }finally{
      dispatch(SuccessMessage(null));
      dispatch(Fail(null));
    }
  };
};

export const verifyOtp = (data) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading());
      const response = await Axios().post('users/verify', data);
      if (response.data.status === '1') {
        const record = response.data.data;
        await dispatch(
          Success({
            type: actionTypes.VERIFYOTP,
            payload: record,
          })
        );
        dispatch(SuccessMessage(response.data.message));
      } else {
        dispatch(Fail(response.data.message));
      }
    } catch (error) {
      dispatch(Fail(error.message));
    }finally{
      dispatch(SuccessMessage(null));
      dispatch(Fail(null));
    }
  };
};

export const resetData = () => {
  return async (dispatch) => {
    try {
      dispatch(
        Success({
          type: actionTypes.RESETDATA,
          payload: '',
        })
      );
    } catch (error) {
      dispatch(Fail(error.message));
    }
  };
};

export const getUserDetails = (data) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading());
      const response = await Axios().post('/users/user_detail', data);
      // console.warn('response123123', response.data.data);
      if (response.data.status === '1') {
        // console.warn('hello if');
        const record = response.data.data;
        await dispatch(
          Success({
            type: actionTypes.GETUSERDETAILS,
            payload: record,
          })
        );
      } else {
        dispatch(Fail(response.data.message));
      }
    } catch (error) {
      dispatch(Fail(error.message));
    }
    finally{

      dispatch(Fail(null));
    }
  };
};

export const genrateQrCode = (data) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading());
      const response = await Axios().post('/getQRUserCode', data);
      if (response.data.status === '1') {
        dispatch(getUserDetails(data));
        dispatch(SuccessMessage(response.data.message));
      } else {
        dispatch(Fail(response.data.message));
      }
    } catch (error) {
      dispatch(Fail(error.message));
    }
    finally{
      dispatch(SuccessMessage(null));
      dispatch(Fail(null));
    }
  };
};
