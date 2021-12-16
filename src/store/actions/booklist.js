import * as actionTypes from './actionTypes';
import Axios from '../../helper/axios';

export const isLoading = () => {
  return {
    type: actionTypes.BOOKLIST_ISLOADING,
  };
};

export const Success = (response) => {
  return response;
};

export const Fail = (error) => {
  return {
    type: actionTypes.BOOKLIST_ERROR,
    error: error,
  };
};

export const SuccessMessage = (message) => {
  return {
    type: actionTypes.SUCCESS_MESSAGE_BOOK,
    success_message: message,
  };
};



export const getBookListDetail = (data) => {


  return async (dispatch) => {
    try {
     dispatch(isLoading());
      const response = await Axios().post('bookevent/getevent', data);

//console.log(response);

      if (response.data.status === '1') {

        dispatch(
          Success({
            type: actionTypes.BOOKLIST_DETAIL,
            payload: response.data.data,
          })
        );
      } else {
        dispatch(Fail(response.data.message));
      }
    } catch (error) {
      dispatch(Fail(error.message));
    }
  };
};




export const getUpcommingBookList = (data) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading());

      const response = await Axios().post('bookevent/events', data);

      if (response.data.status === '1') {

        dispatch(
          Success({
            type: actionTypes.BOOKLIST_LIST,
            payload: response.data.data,
          })
        );
      } else {
        dispatch(Fail(response.data.message));
      }
    } catch (error) {
      dispatch(Fail(error.message));
    }
  };
};

export const acceptStatus = (data) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading());

      const response = await Axios().post('bookevent/acceptstatus', data);

      if (response.data.status === '1') {
        console.log('response.data',response.data)
        dispatch(
          Success({
            type: actionTypes.STATUS_ACCEPT,
            payload: response.data.data,
          })
        );
      } else {
        dispatch(Fail(response.data.message));
      }
    } catch (error) {
      dispatch(Fail(error.message));
    }
  };
};

export const pendingStatus = (data) => {
  return async (dispatch) => {
    try {
      dispatch(
        Success({
          type: actionTypes.STATUS_PENDING,
          payload: {},
        })
      );
      
      const response = await Axios().post('bookevent/pendingStatus', data);
      
      if (response.data.status === '1') {
        console.log('response.data1',response.data.data)

        dispatch(
          Success({
            type: actionTypes.STATUS_PENDING,
            payload: response.data.data,
          })
        );
      } else {
        dispatch(Fail(response.data.message));
      }
    } catch (error) {
      dispatch(Fail(error.message));
    }
  };
};


export const delete_booklist = (data) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading());
      const response = await Axios().post('bookevent/delevents', data);
       // alert(response.data.status);
      if (response.data.status === '1') {

        await dispatch(getUpcommingBookList({ user_id: data.user_id }));

        dispatch(
          Success({
            type: actionTypes.BOOKLIST_DELETE,
            payload: response.data.data,
          })
        );
         dispatch(SuccessMessage('Booking has been deleted successfully.'));
      } else {
        dispatch(Fail(response.data.message));
      }
    } catch (error) {
      dispatch(Fail(error.message));
    }
  };
};

export const getUpcommingEventList = (data) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading());

      const response = await Axios().post('/events/events', data);
      let payload;
      if (response.data.status === 1) {
       payload = response.data.data;

      } else {
        payload = response.data;
      }

      dispatch(
        Success({
          type: actionTypes.EVENT_LIST,
          payload: payload,
        })
      );
    } catch (error) {
      dispatch(Fail(error.message));
    }
  };
};
