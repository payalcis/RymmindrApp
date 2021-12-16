import * as actionTypes from './actionTypes';
import Axios from '../../helper/axios';
import firebase from 'firebase';
import { SuccessMessage } from './contactActions';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START2,
  };
};

export const authSuccess = (token, user) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    user,
  };
};

export const isLoading = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const Success = (response) => {
  return response;
};

export const Fail = (error) => {
  return {
    type: actionTypes.AUTHERROR,
    error: error,
  };
};

export const Fail2 = (error) => {
  return {
    type: actionTypes.AUTHERROR,
    error2: error,
  };
};  

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};
export const email_verify = (data, history) => {
  return (dispatch) => {
    dispatch(isLoading());
    Axios().post('auth/verify_email', data)
      .then((response) => {
        // console.log(response)

        if (response.data.status === "1") {
          dispatch(
            Success({
              type: actionTypes.EMAIL_VERIFY,
              payload: response.data,
            })
          );

          history.push('/login');

        } else {
          // console.log(response.data.message)
          dispatch(Fail(response.data.message));
        }
      })
      .catch((err) => {
        dispatch(Fail(err.message));
      });
  };
};

export const deactivate_account = (data) => {

  let resp = {
    status: false
  };

  return async (dispatch) => {

    try {
      dispatch(isLoading());
      const response = await Axios().post('auth/deactivate_account', data);
      if (response.data.status === '1') {
        await localStorage.clear();
        dispatch(SuccessMessage(response.data.message));
        resp.status = true;

      } else {
        dispatch(Fail(response.data.message));
      }
    } catch (error) {
      dispatch(Fail(error.message));
    }

  return resp;

  };
};


export const auth = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());

    let device_token = localStorage.getItem('device_token');

    var sessionToken = sessionStorage.getItem('token_de');

    console.warn('sessionToken123', sessionToken)

    const authData = {
      email: email,
      password: password,
      device_token: sessionToken,
      platform: 'Desktop',
    };

    


    Axios().post('auth/login', authData)
      .then((response) => {
        console.warn('response123', response);
        if (response.data.status === '1') {
            // Firebase login
            firebase.auth().signInWithEmailAndPassword(authData.email, authData.password);

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
            last_name,
            sc_bessi_name,
            address,
            post_code,
            email,
            mobile_no,
            account_type,
            first_login,
            default_category
          };

          localStorage.setItem('token', response.data.data.token);
          localStorage.setItem('userData', JSON.stringify(userData));
          dispatch(authSuccess(response.data.idToken, response.data.data));
        } else {
          dispatch(authFail(response.data.message));
        }
      })
      .catch((err) => {
        dispatch(authFail(err.message));
      });
  };
};

export const register = (data, history) => {
  return (dispatch) => {
    dispatch(isLoading());
    console.log("sigggg");
    Axios().post('auth/websignup', data)
      .then((response) => {
        if (response.data.status === '1') {
            // Firebase register
            firebase.auth().createUserWithEmailAndPassword(data.email, data.password);

          dispatch(
            Success({
              type: actionTypes.SIGNUP,
              payload: response.data.data,
            })
          );
          // history.push('/authenticate/'+data.email+'/'+1234);
          console.log("register");
          history.push('/mail-sent/'+data.email+"/1")
          // history.push('/login');
        } else {
          // console.log(response.data.message)
          dispatch(Fail2(response.data.message));
          //dispatch(Fail2(null));
        }
      })
      .catch((err) => {
        dispatch(Fail2(err.message));
        //dispatch(Fail2(null));
      });

  };
};
export const requestOtp = (data, history) => {
  return (dispatch) => {

    dispatch(isLoading());


    Axios().post('users/requestOneTimePassword', data)
      .then((response) => {
        // console.log(response)

        if (response.data.status === "1") {
          dispatch(
            Success({
              type: actionTypes.EMAIL_VERIFY,
              payload: response.data,
            })
          );
          // debugger
          // history.push('/login');
          console.log("testettttttt")
          history.push('/mail-sent/'+data.email+"/0")
          // history.push('/reset-password/'+data.email);
        } else {
          // console.log(response.data.message)
          dispatch(Fail(response.data.message));
        }
      })
      .catch((err) => {
        dispatch(Fail(err.message));
      });
  };
};

export const reset_password = (data, history) => {
  return (dispatch) => {

    dispatch(isLoading());
    Axios().post('users/reset_password', data)
      .then((response) => {
        // console.log(response)

        if (response.data.status === "1") {
          dispatch(
            Success({
              type: actionTypes.EMAIL_VERIFY,
              payload: response.data,
            })
          );

          history.push('/login');

        } else {
          // console.log(response.data.message)
          dispatch(Fail(response.data.message));
        }
      })
      .catch((err) => {
        dispatch(Fail(err.message));
      });
  };
};
