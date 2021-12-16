import * as actionTypes from './actionTypes';
import Axios from '../../helper/axios';
import axios from 'axios';


//BOOKING ACTIONS
//export const BOOK_ISLOADING = 'BOOK_ISLOADING';
//export const BOOK_ERROR = 'BOOK_ERROR';
//export const BOOK_GROUPLIST = 'BOOK_GROUPLIST';
//export const BOOK_BUSINESSUSERS = 'BOOK_BUSINESSUSERS';
//export const BOOK_CREATERYMINDR = 'BOOK_CREATERYMINDR';
//BOOKING ACTIONS

export const SuccessTerm =(success) =>{
  return {
     type: actionTypes.TERM_SUCESS,
     success:success
  }
}
export const SuccessHoliday =(success) =>{
  return {
     type: actionTypes.Holiday_SUCESS,
     success:success
  }
}



export const isLoading = () => {
  return {
    type: actionTypes.TERM_ISLOADING,
  };
};

export const Success = (response) => {
  return response;
};

export const SuccessMessage = (message) => {
  return {
    type: actionTypes.SUCCESS_TERM_HOLIDAY,
    success_message: message,
  };
};

export const Fail = (error) => {
  return {
    type: actionTypes.TERM_ERROR,
    error: error,
  };
};



export const updateTerm = (data, unmatch, history, sendAttachment,user_Id) => {

 return async (dispatch) => {

    try {
      dispatch(isLoading());
      const { user_id, business_code, first_name, last_name } = JSON.parse(localStorage.getItem('userData'));

      const dataTosend = { ...data };
      const qiscuss='';
      const response = await Axios().post('bookevent/updateterm', dataTosend);
      if (response.data.status === '1') {
        const rymindr_id = response.data.data.id;

        if (unmatch) {
         // const sendInvitation = await Axios().post('users/inviteForRymindr', inviteTorymidr);
        }
        dispatch(
          Success({
            type: actionTypes.TERM_UPDATERYMINDR,
            payload: response.data.data,
          })
        );
        dispatch(SuccessTerm(response.data.message));
        dispatch(getUpcommingTerm(user_Id));
        history.push('/term-dates-holidays');
      } else {
        dispatch(Fail(response.data.message));
      }
    } catch (error) {
      dispatch(Fail(error.message));
    }


  };
}

export const createTerm = (data, unmatch, history, sendAttachment) => {
  return async (dispatch) => {

    try {
      dispatch(isLoading());
      const { user_id, business_code, first_name, last_name } = JSON.parse(localStorage.getItem('userData'));

      const dataTosend = { ...data };
      const qiscuss='';
      const response = await Axios().post('bookevent/createterm', dataTosend);

      if (response.data.status === '1') {
        const rymindr_id = response.data.data.id;

        if (unmatch) {
         // const sendInvitation = await Axios().post('users/inviteForRymindr', inviteTorymidr);
        }

        dispatch(
          Success({
            type: actionTypes.TERM_CREATERYMINDR,
            payload: response.data.data,
          })
        );
         dispatch(SuccessHoliday(response.data.message));
         dispatch(getUpcommingTerm(user_id));
        history.push('/term-dates-holidays');
      } else {
        dispatch(Fail(response.data.message));
      }
    } catch (error) {
      dispatch(Fail(error.message));
    }


  };
};

export const getUpcommingTerm = (data) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading());
      const response = await Axios().post('bookevent/termlist', data);
      if (response.data.status === '1') {
        dispatch(
          Success({
            type: actionTypes.TERM_LIST,
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


export const delete_term = (data) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading());
      const response = await Axios().post('bookevent/deleteterm', data);
       // alert(response.data.status);
      if (response.data.status === '1') {

        await dispatch(getUpcommingTerm({ user_id: data.user_id }));

        dispatch(
          Success({
            type: actionTypes.TERM_DELETE,
            payload: response.data.data,
          })
        );

        dispatch(SuccessMessage('Term has been deleted successfully.'));
      } else {
        dispatch(Fail(response.data.message));
      }
    } catch (error) {
      dispatch(Fail(error.message));
    }
  };
};







/*
export const inviteAndAddMobile = (data) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading());

      const response = await Axios().post('users/inviteAndAddMobile', data);

      if (response.data.status === '1') {
        dispatch(
          Success({
            type: actionTypes.INVITEANDADDMOBILE,
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

export const getUpcommingRymindrs = (data) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading());

      const response = await Axios().post('users/getUpcommingRymindr', data);

      if (response.data.status === '1') {
        const record = response.data.data;
        let upcomingry = [];
        record.forEach((item) => {
          upcomingry.push(item.remindr);
        });

        var merged = [].concat.apply([], upcomingry);

        console.log('upcoming', upcomingry, merged);
        if (record.length > 0) {
          const reqData = {
            user_id: data.user_id,
            rymindr_id: merged[0].rymindr_id,
          };
          await dispatch(getRymidrDetails(reqData));
        } else {
          dispatch(
            Success({
              type: actionTypes.GETRYMINDRDETAILS,
              payload: null,
            })
          );
        }

        dispatch(
          Success({
            type: actionTypes.GETUPCOMMINGRYMINDR,
            payload: { record, upcomingList: merged.length > 0 ? merged : [] },
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

export const getRymidrDetails = (data) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading());

      const response = await Axios().post('users/getRymindrDetail', data);

      if (response.data.status === '1') {
        dispatch(
          Success({
            type: actionTypes.GETRYMINDRDETAILS,
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

export const delete_rymindr = (data) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading());
      const qiscus_id = data.qiscus_id;
      delete data.qiscus_id;

      const response = await Axios().post('users/deleteRymindr', data);
      if (response.data.status === '1') {
        // const qicsusconfig = { headers: { QISCUS_SDK_SECRET: '434e6d04f43c59a9d96666bddcb5c3e0' } };
        // let dataToSendQicusRemove = {
        //   emails: data.user_id.split(','),
        //   room_id: qiscus_id,
        // };

        // await axios.post(
        //   'https://rymindr-fmgafzuj8sxps.qiscus.com/api/v2/rest/remove_room_participants',
        //   dataToSendQicusRemove,
        //   qicsusconfig
        // );
        await dispatch(getUpcommingRymindrs({ user_id: data.user_id }));

        dispatch(
          Success({
            type: actionTypes.DELETERYMINDR,
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

export const rymindr_action = (data) => {
  return async (dispatch) => {
    try {
      const dataTosend = {
        rymindr_id: '18105',
        status: 2,
        user_id: '2892',
        friend_id: '2891',
        user_name: 'Demolive1 ',
        recr_rymindr_id: '18103',
      };

      dispatch(isLoading());

      const response = await Axios().post('users/acceptRequestRymindr', data);
      if (response.data.status === '1') {
        dispatch(
          Success({
            type: actionTypes.RYMINDRACTION,
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
*/
