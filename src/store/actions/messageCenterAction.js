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

export const SuccessMessage = (message) => {
  return {
    type: actionTypes.SUCCESS_MESSAGE_CENTER,
    success_message: message,
  };
};

export const getCategories = (data) => {
  return (dispatch) => {
    //dispatch(isLoading());
    Axios()
      .get('users/getCategoryListMessageCenter')
      .then((response) => {
        if (response.data.status === '1') {
          dispatch(
            Success({
              type: actionTypes.GETCATEGORY,
              payload: response.data.data,
              //default_cat: response.data.default_cat,
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

export const getRymindrList = (data) => {
  return (dispatch) => {
    const dataTosend = { ...data };
    Axios()
      .post('users/getRymindrListForMessage', dataTosend)
      .then((response) => {
        if (response.data.status === '1') {
          dispatch(
            Success({
              type: actionTypes.GETUSERRYMINDRLIST,
              payload: response.data.data,
              //default_cat: response.data.default_cat,
            })
          );
        } else {
          dispatch(
            Success({
              type: actionTypes.GETUSERRYMINDRLIST,
              payload: []
            })
          )
        }
      })
      .catch((err) => {
        console.log('getRymindrListForMessage', err.message)
        dispatch(Fail(err.message));
      });
  };
};

export const getRymindrListCalendar = (data) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading());
      const { user_id, business_code, first_name, last_name } = JSON.parse(localStorage.getItem('userData'));
      const dataTosend = { ...data };
      const response = await Axios().post('users/getRymindrListForCalendar', dataTosend);
      console.log('responsee=action', response);
      if (response.data.status === '1') {
        dispatch(
          Success({
            type: actionTypes.GETRYMINDRLIST,
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

export const searchRymindrList = (data) => {
  // alert('search-action');
  return (dispatch) => {
    //dispatch(isLoading());
    //Axios().get('users/getRymindrListForMessage')
    const dataTosend = { ...data };
    Axios()
      .post('users/getRymindrListForMessage', dataTosend)
      .then((response) => {
        if (response.data.status === '1') {
          dispatch(
            Success({
              type: actionTypes.GETRYMINDRLIST,
              payload: response.data.data,
              //default_cat: response.data.default_cat,
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

export const createMessageCenter = (data, unmatch, history, sendAttachment) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading());
      const { user_id, business_code, first_name, last_name } = JSON.parse(localStorage.getItem('userData'));
      const dataTosend = { ...data };
      const response = await Axios().post('users/createMessageCenter', dataTosend);
      if (response.data.status === '1') {
        const message_id = response.data.data;
        let seldFiles = [];
        if (sendAttachment) {
          var img = sendAttachment;
          console.log('sendAttachment', sendAttachment);
          var len = img.length;
          for (var i = 0; i < len; i++) {
            if (img[i].type == 'application/pdf') {
              var image = img[i].base64.split(';base64,');
              var image = image[1];
              var extn = img[i].name.split('.');
            } else if (img.type == '') {
              var image = img[i].base64.split(';base64,');
              var image = image[1];
              var extn = img[i].name.split('.');
            } else {
              var image = img[i].base64.replace(/^data:image\/\w+;base64,/, '');
              var extn = img[i].name.split('.');
            }
            // let att_data = {
            //   attachment: image,
            //   message_center_id: message_id,
            //   user_id: user_id,
            //   extn: extn[1],
            //   attachment_object: img[i].name,
            // };
            // await Axios().post('users/messageCenterAttachment', att_data);

            const att_data = {
              attachment: image,
              extn: extn[1],
              attachment_object: img[i].name,
            };
            seldFiles.push(att_data);
          }
        }
        let dateTosend = {
          message_center_id: message_id,
          user_id: user_id,
          sendAttachment: seldFiles,
          deleteAttachment: []
        };
        console.log('dateTosend=====', dateTosend);
        await Axios().post('users/messageCenterAttachment', dateTosend);
        dispatch(
          Success({
            type: actionTypes.CREATERYMINDR,
            payload: response.data.data,
          })
        );

        dispatch(SuccessMessage('Message has been created sucessfully.'));
        history.push('/message-center');
      } else {
        dispatch(Fail(response.data.message));
      }
    } catch (error) {
      dispatch(Fail(error.message));
    }
  };
};

export const updateMessageCenter = (data, unmatch, history, sendAttachment, deleteAttachment) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading());
      const { user_id, business_code, first_name, last_name } = JSON.parse(localStorage.getItem('userData'));
      const dataTosend = { ...data };
      //console.log('req', data);
      const response = await Axios().post('users/updateMessageCenter', dataTosend);
      if (response.data.status === '1') {
        const message_id = response.data.data;
        let seldFiles = [];
        if (sendAttachment) {
          // const response_att = await Axios().post('users/deleteAttachmentsMessageCenter', dataTosend);
          var img = sendAttachment;
          console.log('sendAttachmentAction====', sendAttachment);
          var len = img.length;
          for (var i = 0; i < len; i++) {
            if (img[i].base64 != undefined) {
              if (img[i].type == 'application/pdf') {
                var image = img[i].base64.split(';base64,');
                var image = image[1];
                var extn = img[i].name.split('.');
              } else if (img.type == '') {
                var image = img[i].base64.split(';base64,');
                var image = image[1];
                var extn = img[i].name.split('.');
              } else {
                var image = img[i].base64.replace(/^data:image\/\w+;base64,/, '');
                var extn = img[i].name.split('.');
              }
              // let att_data = {
              //   attachment: image,
              //   message_center_id: message_id,
              //   user_id: user_id,
              //   extn: extn[1],
              //   attachment_object: img[i].name, //img[i]
              // };


              // console.log('att_data===', att_data);
              // await Axios().post('users/updatemessageCenterAttachment', att_data);
              const att_data = {
                attachment: image,
                extn: extn[1],
                attachment_object: img[i].name,
              };
              seldFiles.push(att_data);
            }
          }
        }
        let dateTosend = {
          message_center_id: message_id,
          user_id: user_id,
          sendAttachment: seldFiles,
          deleteAttachment: deleteAttachment
        };
        console.log('dateTosend=====', dateTosend);
        await Axios().post('users/messageCenterAttachment', dateTosend);
        dispatch(
          Success({
            type: actionTypes.CREATERYMINDR,
            payload: response.data.data,
          })
        );
        dispatch(SuccessMessage('Message has been updated sucessfully.'));
        history.push('/message-center');
      } else {
        dispatch(Fail(response.data.message));
      }
    } catch (error) {
      dispatch(Fail(error.message));
    }
  };
};

export const getMessageDetails = (data) => {
  return (dispatch) => {
    //dispatch(isLoading());
    const dataTosend = { ...data };
    Axios()
      .post('users/getMessageDetails', dataTosend)
      .then((response) => {
        if (response.data.status === '1') {
          dispatch(
            Success({
              type: actionTypes.GETMESSAGECENTERLIST,
              payload: response.data.data,
              //default_cat: response.data.default_cat,
            })
          );
        } else {
          dispatch(
            Success({
              type: actionTypes.GETMESSAGECENTERLIST,
              payload: []
              //default_cat: response.data.default_cat,
            })
          );
          //dispatch(Fail(response.data.message));
        }
      })
      .catch((err) => {
        dispatch(Fail(err.message));
      });
  };
};

export const getMessageContactsDetail = (data) => {
  return (dispatch) => {
    //dispatch(isLoading());
    const dataTosend = { ...data };
    Axios()
      .post('users/messageCenterDetailsWeb', dataTosend)
      .then((response) => {
        if (response.data.status == '1') {
          dispatch(
            Success({
              type: actionTypes.GETMESSAGECONTACTDETAIL,
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

export const getMessageDetails1111 = (data) => {
  return async (dispatch) => {
    const dataTosend = { ...data };
    await Axios()
      .post('users/getMessageDetails', dataTosend)
      .then((response) => {
        if (response.data.status === '1') {
          dispatch(
            Success({
              type: actionTypes.GETMESSAGECENTERLIST,
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

export const messageDetailClear = () => {
  return (dispatch) => {

    dispatch(
      Success({
        type: actionTypes.MESSAGECENTERLISTCLEAR,
        payload: []
      })
    );

  };
}


export const getMessageDetailsById = (data) => {
  return (dispatch) => {
    //dispatch(isLoading());
    const dataTosend = { ...data };
    Axios()
      .post('users/getMessageDetailsById', dataTosend)
      .then((response) => {
        if (response.data.status === '1') {

          dispatch(
            Success({
              type: actionTypes.GETMESSAGECENTERLISTBYID,
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

export const deleteMessage = (msgId, user_id) => {
  return async (dispatch) => {
    try {
      const response = await Axios().post('users/deleteMessageCenter', { message_center_ids: msgId });
      if (response.data.status === '1') {
        dispatch(
          Success({
            type: actionTypes.GETMESSAGECENTERLISTAFTERDELETE,
            payload: response.data.data,
          })
        );
        dispatch(getMessageDetails({ user_id }))
        dispatch(SuccessMessage('Message has been deleted sucessfully.'));
      } else {
        dispatch(Fail(response.data.message));
      }
    } catch (error) {
      dispatch(Fail(error.message));
    }
  };
};

export const getRssFeeds = (data) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading());
      const { user_id, business_code, first_name, last_name } = JSON.parse(localStorage.getItem('userData'));
      const dataTosend = { ...data };
      const response = await Axios().post('users/getRssFeeds', dataTosend);
      if (response.data.status === '1') {
        //console.log('responsee=action', response);
        dispatch(
          Success({
            type: actionTypes.GETRSSFEEDS,
            payload: response.data.data,
          })
        );
      } else {
        dispatch(Fail(response.data.message));
      }
    } catch (error) {
      // dispatch(Fail(error.message));
    }
  };
};
