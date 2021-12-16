import * as actionTypes from './actionTypes';
import Axios from '../../helper/axios';
import axios from 'axios';

export const isLoading = () => {
  return {
    type: actionTypes.ISLOADING,
  };
};

export const Success = (response) => {
  return response;
};

export const Fail = (error) => {
  return {
    type: actionTypes.ERROR,
    error: error,
  };
};

export const getContent = (data) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading());
      const { user_id, business_code, first_name, last_name } = JSON.parse(localStorage.getItem('userData'));
      const dataTosend = { ...data };
      const response = await Axios().post('users/getContent', dataTosend);     
      if (response.data.status === '1') {
        //console.log('responsee=action', response);
        dispatch(
          Success({
            type: actionTypes.GETRESOURCECONTENT,
            payload: response.data.data,
          })
        );
      } else {
        dispatch(Fail(response.data.message));
      }
    } catch (error) {
      // dispatch(Fail(error.message));
    }
  }
};
