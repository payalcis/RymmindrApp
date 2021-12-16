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
    type: actionTypes.SUCCESS_MESSAGE_RYMINDR,
    success_message: message,
  };
};

export const getCategories = (data) => {
  return (dispatch) => {
    // dispatch(isLoading());
    Axios()
      .post('users/getCategoryList', data)
      .then((response) => {
        if (response.data.status === '1') {
          let temp = response.data.data;
          let tempArr = [];

          temp.map((data, i) => {
            if (
              data.id != 119 &&
              data.category_name != 'Receipts' &&
              data.id != 39 &&
              data.category_name != 'Warranty'
            ) {
              tempArr.push(data);
            }
          });
          dispatch(
            Success({
              type: actionTypes.GETCATEGORY,
              payload: tempArr,
              default_cat: response.data.default_cat, 
            })
          );
          //get subcategories
          const dataTosend = {
            user_id: data.user_id,
            category_id: response.data.default_cat,
          };
          dispatch(getSubCategories(dataTosend));
        } else {
          // dispatch(Fail(response.data.message));
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
          // dispatch(Fail(response.data.message));
        }
      })
      .catch((err) => {
        dispatch(Fail(err.message));
      });
  };
};

export const getGroups = (data) => {
  return (dispatch) => {
    // dispatch(isLoading());
    Axios()
      .post('users/getGroupList', data)
      .then((response) => {
        if (response.data.status === '1') {
          dispatch(
            Success({
              type: actionTypes.GROUPLIST,
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
              type: actionTypes.BUSINESSUSERS,
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

export const createRymindr = (data, unmatch, history, sendAttachment) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading());
      const { user_id, business_code, first_name, last_name } = JSON.parse(localStorage.getItem('userData'));
      const qiscusId = ''; //getqiscusId.data.results.room.room_id;
      const dataTosend = { ...data };
      dataTosend.qiscus_id = qiscusId;

      const response = await Axios().post('users/create_quick_rymindr', dataTosend);

      if (response.data.status === '1') {
        const rymindr_id = response.data.data.id;
        let inviteTorymidr = {
          mobile_no: unmatch,
          rymindr_id: rymindr_id,
          user_id: user_id,
          user_name: first_name + ' ' + last_name,
          business_code: business_code,
          qiscuss: qiscusId,
          rymind_type: data.rymind_type,
        };

        let seldFiles = []
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
              //recr_rymindr_id: rymindr_id,
              //user_id: user_id,
              extn: extn[1],
            };
            seldFiles.push(att_data);
            //await Axios().post('users/rymindrDesktopAttachment', att_data);
          }
        }
        if (unmatch) {
          const sendInvitation = await Axios().post('users/inviteForRymindr', inviteTorymidr);
        }

        let dateTosend = {
          recr_rymindr_id: rymindr_id,
          user_id: user_id,
          sendAttachment:seldFiles,
          deleteAttachment:[]
      };
      console.log('dateTosend=====',dateTosend);
      await Axios().post('users/rymindrDesktopAttachment', dateTosend);

        dispatch(
          Success({
            type: actionTypes.CREATERYMINDR,
            payload: response.data.data,
          })
        );
        dispatch(SuccessMessage('Rymindr has been created sucessfully.'));

        
      } else {
        dispatch(Fail(response.data.message));
      }
    } catch (error) {
      dispatch(Fail(error.message));
    } finally {
      dispatch(SuccessMessage(null));
      dispatch(Fail(null));
    }
  };
};

export const editRymindr = (data, history, sendAttachment,deleteAttachment) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading());
      const { user_id, business_code, first_name, last_name } = JSON.parse(localStorage.getItem('userData'));
      

      const response = await Axios().post('users/updateQuickRymindr', data);

      if (response.data.status === '1') {
        const rymindr_id = data.rymindr_id;
      
        let seldFiles = []
        if (sendAttachment) {
          var img = sendAttachment;
          var len = img.length;
          for (var i = 0; i < len; i++) {
            if (img[i].base64 != undefined) {
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
              seldFiles.push(att_data);
              //await Axios().post('users/rymindrDesktopAttachment', att_data);
            }
          }
        }

        let dateTosend = {
            recr_rymindr_id: rymindr_id,
            user_id: user_id,
            sendAttachment:seldFiles,
            deleteAttachment:deleteAttachment
        };
        console.log('dateTosend=====',dateTosend);
        await Axios().post('users/rymindrDesktopAttachment', dateTosend);
        dispatch(
          Success({
            type: actionTypes.EDITRYMINDR,
            payload: response.data.data,
          })
        );
        dispatch(SuccessMessage('Rymindr has been updated sucessfully.'));

        history.push('/rymindrs');
      } else {
        dispatch(Fail(response.data.message));
      }
    } catch (error) {
      dispatch(Fail(error.message));
    } finally {
      dispatch(SuccessMessage(null));
      dispatch(Fail(null));
    }
  };
};

export const generateQrCodeDB = (data, history) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading());
      const { user_id, business_code, first_name, last_name } = JSON.parse(localStorage.getItem('userData'));
      const dataTosend = { ...data };

      const response = await Axios().post('users/generateRymindrQrCode', dataTosend);

      console.warn('respons55555e', response);

      if (response.status == 200) {
        dispatch(
          Success({
            type: actionTypes.GENERATEQRCODE,
            payload: response.data.tbl_rymindr,
          })
        );
        dispatch(SuccessMessage('QR Code has been created sucessfully.'));
        history.push('/rymindrs');
      } else {
        dispatch(Fail(response.data.message));
      }
    } catch (error) {
      dispatch(Fail(error.message));
    } finally {
      dispatch(SuccessMessage(null));
      dispatch(Fail(null));
    }
  };
};
export const statusData = (data) => {
  return async (dispatch) => {
    try {
      
      const { user_id, business_code, first_name, last_name } = JSON.parse(localStorage.getItem('userData'));
      const dataTosend = { ...data };

      const response = await Axios().post('user/rymindrStatus', dataTosend);

      console.log('response.data.data',response.data)
      if (response.status == 200) {
        dispatch(
          Success({
            type: actionTypes.STATUSDATA,
            payload: response.data.data,
          })
        );
    
      } else {
        dispatch(Fail(response.data.message));
      }
    } catch (error) {
      dispatch(Fail(error.message));
    } finally {
      dispatch(SuccessMessage(null));
      dispatch(Fail(null));
    }
  };
};

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
        console.log('data',data)

        var merged = [].concat.apply([], upcomingry);

        let reqData = {};

        if (record.length > 0) {
          if (merged[0].rymindr_type == 'Holiday' && merged[0].is_bank_holiday==1) {
            reqData = {
              user_id: data.user_id,
              rymindr_id: merged[0].id,
              is_page: 'history',
              is_bank_holiday: 1,
            };
          } else {
            reqData = {
              user_id: data.user_id,
              rymindr_id: merged[0].rymindr_id,
              is_page: 'history',
            };
          }
          dispatch(getRymidrDetails(reqData));
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

export const getHistoryRymindrs = (data) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading());
      const response = await Axios().post('users/getHistoryRymindr', data);
      console.log('response====', response);
      if (response.data.status === '1') {
        const record = response.data.data;
        const all_rymindrids = response.data.rymindrid;
        let upcomingry = [];
        record.forEach((item) => {
          upcomingry.push(item.remindr);
        });
        var merged = [].concat.apply([], upcomingry);
        if (data.selected_id) {
          const reqData = {
            user_id: data.user_id,
            rymindr_id: data.selected_id,
          };
          await dispatch(getRymidrDetails(reqData));
        } else {
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
        }
        dispatch(
          Success({
            type: actionTypes.GETHISTORYRYMINDR,
            payload: { upcomingList: merged.length > 0 ? merged : [], rymindr_id: response.data.rymindrids },
            //payload: { record, upcomingList: merged.length > 0 ? merged : [], rymindr_id: response.data.rymindrids }
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
  console.warn('dtaa454545', data);
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

export const getHolidayDetails = (data) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading());

      const response = await Axios().post('user/bankHolidayDetails', data);

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

export const delete_rymindr2 = (data) => {
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
        dispatch(SuccessMessage('Rymindr has been deleted successfully'));
         await dispatch(getUpcommingRymindrs({ user_id: data.user_id}))
        //await dispatch(getHistoryRymindrs({ user_id: data.user_id, selected_id: data.upcoming }));

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
    } finally {
      dispatch(SuccessMessage(null));
      dispatch(Fail(null));
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
        dispatch(SuccessMessage('Rymindr has been deleted successfully'));
         //await dispatch(getUpcommingRymindrs({ user_id: data.user_id }))
        await dispatch(getHistoryRymindrs({ user_id: data.user_id, selected_id: data.upcoming }));

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
    } finally {
      dispatch(SuccessMessage(null));
      dispatch(Fail(null));
    }
  };
};

export const clearRymindrHistory2 = (data) => {
  return async (dispatch) => {
    try {
      // const response = await Axios().post('users/clearHistory', data)
      // if (response.data.status === '1') {
      //   console.log('response.data.status======',response.data.status);
      //   dispatch(
      //     Success({
      //       type: actionTypes.DELETERYMINDRHISTORY,
      //       payload: response.data.status
      //     })
      //   )
      // } else {
      //   dispatch(Fail(response.data.message))
      // }
      
        dispatch(SuccessMessage('Rymindr Histories have cleared successfully.'));
        await dispatch(getHistoryRymindrs(data));
        
    } catch (error) {
      dispatch(Fail(error.message));
    }
  };
};

export const clearRymindrHistory = (data) => {
  return async (dispatch) => {
    try {
      const response = await Axios().post('users/clearHistory', data);
      if (response.data.status === '1') {
        console.log('response.data.status======', response.data.status);
        dispatch(SuccessMessage('Rymindr Histories have cleared successfully.'));
        await dispatch(getHistoryRymindrs(data));
      } else {
        dispatch(Fail(response.data.message));
        await dispatch(getHistoryRymindrs(data));
      }
    } catch (error) {
      dispatch(Fail(error.message));
      await dispatch(getHistoryRymindrs(data));
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

//
export const getNotification = (data) => {
  return (dispatch) => {
    // dispatch(isLoading());
    Axios()
      .post('users/newRymindrList', data)
      .then((response) => {
        if (response.data.status === '1') {
          dispatch(
            Success({
              type: actionTypes.GETNOTIFICATION,
              payload: response.data.data,
              default_cat: response.data.default_cat,
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

export const getCategoriesRymindr = (data) => {
  return (dispatch) => {
    // dispatch(isLoading());
    Axios()
      .post('users/getCategoryListRymindr', data)
      .then((response) => {
        if (response.data.status === '1') {
          let temp = response.data.data;
          let tempArr = [];

          temp.map((data, i) => {
            if (
              data.id != 119 &&
              data.category_name != 'Receipts' &&
              data.id != 39 &&
              data.category_name != 'Warranty'
            ) {
              tempArr.push(data);
            }
          });

          dispatch(
            Success({
              type: actionTypes.GETCATEGORY,
              payload: tempArr,
              default_cat: response.data.default_cat,
            })
          );

          //get subcategories
          const dataTosend = {
            user_id: data.user_id,
            category_id: response.data.default_cat,
          };
          dispatch(getSubCategories(dataTosend));
        } else {
          // dispatch(Fail(response.data.message));
        }
      })
      .catch((err) => {
        // dispatch(Fail(err.message));
      });
  };
};
