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

export const SuccessEvent = (success) => {
  return {
    type: actionTypes.BOOK_SUCESS,
    success: success,
  };
};

export const isLoading = () => {
  return {
    type: actionTypes.BOOK_ISLOADING,
  };
};

export const Success = (response) => {
  return response;
};

export const Fail = (error) => {
  return {
    type: actionTypes.BOOK_ERROR,
    error: error,
  };
};

export const getCategories = (data) => {
  return (dispatch) => {
    //dispatch(isLoading());
    Axios()
      .post('users/getCategoryList', data)
      .then((response) => {
        if (response.data.status === '1') {
          dispatch(
            Success({
              type: actionTypes.GETCATEGORY,
              payload: response.data.data,
            })
          );
          //get subcategories
          const dataTosend = {
            user_id: data.user_id,
            category_id: response.data.default_cat,
          };
          dispatch(getSubCategories(dataTosend));
        } else {
          dispatch(Fail(response.data.message));
        }
      })
      .catch((err) => {
        dispatch(Fail(err.message));
      });
  };
};
export const getSubCategories = (data) => {
  return (dispatch) => {
    // dispatch(isLoading());
    Axios()
      .post('users/getCategoryList', data)
      .then((response) => {
        if (response.data.status === '1') {
          dispatch(
            Success({
              type: actionTypes.SUBCATEGORY,
              payload: response.data.data,
            })
          );
        } else {
          dispatch(Fail(response.data.message));
        }
      })
      .catch((err) => {
        dispatch(Fail(err.message));
      });
  };
};

export const getGroups = (data) => {
  return (dispatch) => {
    //dispatch(isLoading());
    Axios()
      .post('users/getGroupList', data)
      .then((response) => {
        console.log('getGroupsgetGroups', response.data);
        if (response.data.status === '1') {
          dispatch(
            Success({
              type: actionTypes.BOOK_GROUPLIST,
              payload: response.data.data,
            })
          );
        } else {
          // dispatch(Fail(response.data.message));
        }
      })
      .catch((err) => {
        dispatch(Fail(err.message));
      });
  };
};

export const getBusinessUsers = (data) => {
  return (dispatch) => {
    // dispatch(isLoading());
    Axios()
      .post('users/businessUserList', data)
      .then((response) => {
        if (response.data.status === '1') {
          dispatch(
            Success({
              type: actionTypes.BOOK_BUSINESSUSERS,
              payload: response.data.data,
            })
          );
        } else {
          dispatch(Fail(response.data.message));
        }
      })
      .catch((err) => {
        dispatch(Fail(err.message));
      });
  };
};

export const getCategory = (data) => {
  return (dispatch) => {
    // dispatch(isLoading());
    Axios()
      .post('user/bookingCategories', data)
      .then((response) => {
        if (response.data.status === '1') {
          dispatch(
            Success({
              type: actionTypes.BOOK_CATEGORY,
              payload: response.data,
            })
          );
        } else {
          dispatch(Fail(response.data.message));
        }
      })
      .catch((err) => {
        dispatch(Fail(err.message));
      });
  };
};

export const updateEventbook = (data, unmatch, history, sendAttachment, deleteAttachment) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading());
      const { user_id, business_code, first_name, last_name } = JSON.parse(localStorage.getItem('userData'));

      const dataTosend = { ...data };
      const qiscuss = '';
      const response = await Axios().post('bookevent/updateevent', dataTosend);

      if (response.data.status == '1') {
        const delAttachment = deleteAttachment;
        console.log('data.id', data.id);
        const event_id = data.id;
        let sendFiles = [];
        if (sendAttachment) {
          var img = sendAttachment;
          var len = img.length;
          for (var i = 0; i < len; i++) {
            console.log('')
            if (img[i].type == 'application/pdf') {
              var image = img[i].base64.split(';base64,');
              var image = image[1];
              var extn = img[i].name.split('.');
            } else if (img[i].type == '') {
              var image = img[i].base64.split(';base64,');
              var image = image[1];
              var extn = img[i].name.split('.');
            } else {
              var image = img[i].base64.replace(/^data:image\/\w+;base64,/, '');
              var extn = img[i].name.split('.');
            }
            const att_data = {
              attachment: image,

              extn: extn[1],
            };
            sendFiles.push(att_data);
            //await Axios().post('users/rymindrDesktopAttachment', att_data);
          }
        }

        if (unmatch) {
          // const sendInvitation = await Axios().post('users/inviteForRymindr', inviteTorymidr);
        }

        const dataToSend = {
          deleteAttachment: delAttachment,
          event_id: event_id,
          user_id: user_id,
          sendAttachment: sendFiles,
        };
        console.log('dataToSend--', dataToSend);
        const res = await Axios().post('users/event-attachment', dataToSend);
        console.log('res--', res.data);
        dispatch(
          Success({
            type: actionTypes.BOOK_UPDATERYMINDR,
            payload: response.data.data,
          })
        );
        dispatch(SuccessEvent(response.data.message));

        history.push('/bookings');
      } else {
        dispatch(Fail(response.data.message));
      }
    } catch (error) {
      dispatch(Fail(error.message));
    }
  };
};

export const createEventbook = (data, unmatch, history, sendAttachment, deleteAttachment) => {
  return async (dispatch) => {
    try {
      console.log('deleteAttachment',deleteAttachment);
      dispatch(isLoading());
      const { user_id, business_code, first_name, last_name } = JSON.parse(localStorage.getItem('userData'));

      const dataTosend = { ...data };
      const qiscuss = '';
      const response = await Axios().post('bookevent/create', dataTosend);

      if (response.data.status == 1) {
        const delAttachment = deleteAttachment;
        console.log('data.id', data.id);
        const event_id = response.data.data.id;
        let sendFiles = [];
        if (sendAttachment) {
          var img = sendAttachment;
          var len = img.length;
          for (var i = 0; i < len; i++) {
            if (img[i].type == 'application/pdf') {
              var image = img[i].base64.split(';base64,');
              var image = image[1];
              var extn = img[i].name.split('.');
            } else if (img[i].type == '') {
              var image = img[i].base64.split(';base64,');
              var image = image[1];
              var extn = img[i].name.split('.');
            } else {
              var image = img[i].base64.replace(/^data:image\/\w+;base64,/, '');
              var extn = img[i].name.split('.');
            }
            const att_data = {
              attachment: image,

              extn: extn[1],
            };
            sendFiles.push(att_data);
            //await Axios().post('users/rymindrDesktopAttachment', att_data);
          }
        }

        if (unmatch) {
          // const sendInvitation = await Axios().post('users/inviteForRymindr', inviteTorymidr);
        }
        const dataToSend ={
          deleteAttachment : delAttachment,
          event_id : event_id,
          user_id : user_id,
          sendAttachment : sendFiles
        }
        console.log('dataToSend--',dataToSend)
        const res = await Axios().post('users/event-attachment',dataToSend)

        dispatch(
          Success({
            type: actionTypes.BOOK_CREATERYMINDR,
            payload: response.data.data,
          })
        );
        dispatch(SuccessEvent(response.data.message));

        history.push('/bookings');
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
