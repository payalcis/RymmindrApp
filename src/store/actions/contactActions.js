import * as actionTypes from './actionTypes';
import Axios from '../../helper/axios';

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
    type: actionTypes.CONTACT_ERROR,
    error: error,
  };
};

export const SuccessMessage = (message) => {
  return {
    type: actionTypes.SUCCESS_MESSAGE,
    success_message: message,
  };
};
export const getContactlist = (data) => {
  let datatogroup = {
    user_id: data.user_id,
  };
  return async (dispatch) => {
    try {
      dispatch(SuccessMessage(null));
      dispatch(isLoading());
      const contactlist = await Axios().post('users/businessUserListrequest', data);
      const grouplist = await Axios().post('users/getGroupList', datatogroup);
      let mergedlist = [];
      let GroupList = [];
      let ContactList = [];
      if (contactlist.data.data.length > 0 || grouplist.data.data.length > 0) {
        console.log('response.data-',contactlist.data)
        if (grouplist.data.data.length > 0) {
          GroupList = grouplist.data.data;
          GroupList.map((item) => {
            data = {
              id: item.group_id,
              imageicon: item.group_icon,
              type: 'groups',
              name: item.group_name,
            };
            mergedlist.push(data);
          });
        }

        if (contactlist.data.data.length > 0) {
          ContactList = contactlist.data.data;
          ContactList.map((item) => {
            //if(item.accept_status==1){
            data = {
              id: item.user_id,
              imageicon: item.profile_image,
              type: 'contact',
              name: item.first_name + ' ' + item.last_name,
              mobile_no: item.mobile_no,
            };
            mergedlist.push(data);
            //}
          });
        }

        let newData = contactlist.data.data.filter((a) => a.accept_status == 1);
        dispatch(
          Success({
            type: actionTypes.GETCONTACTLIST,
            payload: { mergedlist, GroupList, ContactList: ContactList },
            pendingCount: contactlist.data.pending_count
          })
        );
      } else {
        dispatch(
          Success({
            type: actionTypes.GETCONTACTLIST,
            payload: { mergedlist, GroupList, ContactList },
          })
        );
      }
    } catch (error) {
      dispatch(Fail(error.message));
    }
  };
};

// Get group list.
export const getGroupList = (data) => {
  return async (dispatch) => {
    try {
      dispatch(SuccessMessage(null));
      dispatch(isLoading());
      const grouplist = await Axios().post('users/getGroupList', data);
      let mergedlist = [];
      let GroupList = [];

      if (grouplist.data.data.length > 0) {
        if (grouplist.data.data.length > 0) {
          console.log('grp calls')
          GroupList = grouplist.data.data;
          GroupList.map((item) => {
            data = {
              id: item.group_id,
              imageicon: item.group_icon,
              type: 'groups',
              name: item.group_name,
            };
            mergedlist.push(data);
          });
        }

        dispatch(
          Success({
            type: actionTypes.GETGROUPLIST,
            payload: { mergedlist, GroupList },
          })
        );
      } else {
        dispatch(
          Success({
            type: actionTypes.GETGROUPLIST,
            payload: { mergedlist, GroupList },
          })
        );
      }
    } catch (error) {
      dispatch(Fail(error.message));
    }
  };
};

export const inviteGroup = ({ request_id, status, user_id, business_code }) => {
  const data = {
    request_id,
    status,
  };
  const dataToSend = {
    user_id,
    business_code,
  };
  return async (dispatch) => {
    try {
      console.log('accept Success');
      const response = await Axios().post('user/invite-group-action', data);
      console.log('response--', response);
      if (response.data.status === '1') {
        dispatch(getContactlist(dataToSend));
      } else {
        dispatch(Fail(response.data.message));
        console.log('invite api error');
      }
    } catch (error) {
      dispatch(Fail(error.message));
    }
  };
};

export const getPendingList = (data) => {
  return async (dispatch) => {
    try {
      const response = await Axios().post('user/businessPendingRequest', data);
      if (response.data.status === '1') {
        dispatch(
          Success({
            type: actionTypes.PENDINGREQUEST,
            payload: response.data.data,
            acceptedCount: response.data.accepted_count
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

export const getGroupMemberList = (data) => {
  return async (dispatch) => {
    try {
      const response = await Axios().post('users/getGroupDetail', data);
      if (response.data.status === '1') {
        dispatch(
          Success({
            type: actionTypes.CONTACT_GROUP_MEMBER_LIST,
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
export const groupDelete = (data, dataTosend) => {
  return async (dispatch) => {
    try {
      const response = await Axios().post('users/deleteGroup', data);
      if (response.data.status === '1') {
        dispatch(getContactlist(dataTosend));
        dispatch(
          Success({
            type: actionTypes.GROUPDELETE,
            payload: response.data.message,
          })
        );
        dispatch(SuccessMessage('Group has been deleted successfully.'));
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
export const contactDelete = (data, dataTosend) => {
  return async (dispatch) => {
    try {
      const response = await Axios().post('users/removebusinessuser', data);
      if (response.data.status === '1') {
        dispatch(
          Success({
            type: actionTypes.CONTACTDELETE,
            payload: response.data.message,
          })
        );
        dispatch(getContactlist(dataTosend));
        dispatch(SuccessMessage('Contact has been deleted successfully.'));
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
export const getAllUser = (data) => {
  return async (dispatch) => {
    dispatch(
      Success({
        type: actionTypes.ISLOADING,
      })
    );
    try {
      // dispatch(
      //   Success({
      //     type: actionTypes.GET_SEARCHED_USERS,
      //     payload: []
      //   })
      // );
      // dispatch(isLoading());
      const searchedlist = await Axios().post('users/searchDesktopUser', data);

      if (searchedlist.data.status === '1') {
        dispatch(
          Success({
            type: actionTypes.GET_SEARCHED_USERS,
            payload: searchedlist.data.data,
          })
        );
      } else {
        console.log('GET_SEARCHED_USERSGET_SEARCHED_USERSGET_SEARCHED_USERS');
        dispatch(
          Success({
            type: actionTypes.GET_SEARCHED_USERS,
            payload: null,
          })
        );
      }
    } catch (error) {
      dispatch(Fail(error.message));
    }
  };
};
export const addNewGroup = (data, dataTosend) => {
  return async (dispatch) => {
    try {
      const response = await Axios().post('users/addNewGroup', data);

      if (response.status == 200) {
        dispatch(getContactlist(dataTosend));

        dispatch(
          Success({
            type: actionTypes.ADDNEWGROUP,
            payload: response.data.message,
          })
        );
        dispatch(SuccessMessage('Group has been added sucessfully.'));
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
export const addContact = (data, dataTosend) => {
  return async (dispatch) => {
    try {
      const addcontact = await Axios().post('users/sendBusinessRequestToUser', data);
      if (addcontact.data.status === '1') {
        dispatch(
          Success({
            type: actionTypes.ADD_CONTACT,
            payload: addcontact.data.data,
          })
        );
        dispatch(getContactlist(dataTosend));
        dispatch(SuccessMessage('Contact added successfully.'));
      } else {
        dispatch(Fail(addcontact.data.message));
      }
    } catch (error) {
      dispatch(Fail(error.message));
    } finally {
      dispatch(SuccessMessage(null));
      dispatch(Fail(null));
    }
  };
};
export const updateGroup = (data, dataTosend) => {
  return async (dispatch) => {
    try {
      const response = await Axios().post('users/updateGroup', data);
      if (response.status == 200) {
        dispatch(
          Success({
            type: actionTypes.ADDNEWGROUP,
            payload: response.data.message,
          })
        );
        dispatch(getContactlist(dataTosend));
        dispatch(SuccessMessage('Group has been updated successfully.'));
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
export const getRyminderList = (data) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading());
      const response = await Axios().get('rymindr/getRymindrsTermsHolidays', { params: data });
      let payload;
      if (response.data.status === 1) {
        payload = response.data.data;
      } else {
        payload = response.data;
      }
      dispatch(
        Success({
          type: actionTypes.RYMINDR_LIST,
          payload: payload,
        })
      );
    } catch (error) {
      dispatch(Fail(error.message));
    }
  };
};

//add contact to Rymindr
export const addToRymindr = (data, dataTosend) => {
  return async (dispatch) => {
    try {
      const response = await Axios().post('rymindr/updateContactToRymindrTermHoliday', data);
      if (response.data.status === '1') {
        dispatch(
          Success({
            type: actionTypes.ADDCONTACTTORYMINDR,
            payload: response.data.data,
          })
        );
        dispatch(SuccessMessage(response.data.message));
        dispatch(getRyminderList(dataTosend));
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

//add contact to Event.
export const addToEvent = (data) => {
  return async (dispatch) => {
    try {
      const response = await Axios().post('users/updateEventUser', data);
      if (response.data.status === '1') {
        dispatch(
          Success({
            type: actionTypes.ADDCONTACTTOEVENT,
            payload: response.data.data,
          })
        );
        dispatch(SuccessMessage('Contact added to Event successfully.'));
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

export const InviteUser = (data) => {
  return async (dispatch) => {
    try {
      const response = await Axios().post('users/invite_user', data);
      if (response.data.status === '1') {
        dispatch(SuccessMessage(response.data.message));
      } else {
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(SuccessMessage(null));
      dispatch(Fail(null));
    }
  };
};

export const InviteUserInBulk = (data) => {
  return async (dispatch) => {
    try {
      const response = await Axios().post('user/bulkInvite', data);
      console.log('response==============', response);
      if (response.data.status == '1') {
        dispatch(SuccessMessage(response.data.message));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(SuccessMessage(null));
      dispatch(Fail(null));
    }
  };
};

// Cancel Invitition Request
export const CancelInvititionRequest = (data) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading());
      const response = await Axios().post('users/cancel_invitation_request', data);
      if (response.data.status === '1') {
        const dataTosend = {
          user_id: data.user_id,
          business_code: data.business_code,
        };

        dispatch(getContactlist(dataTosend));
        dispatch(SuccessMessage(response.data.message));
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

// Check if group exists in active rymindrs.
export const checkGroupExistInActiveRymindrs = (data) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading());
      const response = await Axios.post('rymindr/checkGroupExistInActiveRymindr', data);
      dispatch(SuccessMessage(null));
      return response.data.status;
    } catch (error) {
      dispatch(Fail(error.message));
    }
  };
};
