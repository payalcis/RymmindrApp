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

export const getUserAndGroupList = (data) => {
    return async (dispatch) => {
        dispatch(isLoading());

        await Axios().post('livechat/getuserandgrouplist', data)
            .then((response) => {
                if (response.data.status === '1') {
                    dispatch(
                        Success({
                            type: actionTypes.GET_USER_AND_GROUP_LIST,
                            payload: response.data.data
                        })
                    );
                }
                else
                {
                    dispatch(Fail(response.data.message));
                }
            })
            .catch((err) => {
            dispatch(Fail(err.message));
        });
    };
};

export const createGroup = (data) => {
    const formData = new FormData();
    formData.append("userId", data.userId);
    formData.append("groupIcon", data.groupIcon);
    formData.append("groupName", data.groupName);
    formData.append("users", data.users);

    return async (dispatch) => {
        dispatch(isLoading());

        await Axios()({
            method: 'post',
            url: 'livechat/creategroup',
            data: formData,
            headers: {'Content-Type': 'multipart/form-data'}
        })
        .then((response) => {
            if (response.data.status === '1') {
                dispatch(
                    Success({
                        type: actionTypes.CREATE_GROUP,
                        payload: response.data.data
                    })
                );
            }
            else
            {
                dispatch(Fail(response.data.message));
            }
        })
        .catch((err) => {
            dispatch(Fail(err.message));
        });
    };
};

export const initChat = (data) => {
    return async (dispatch) => {
        dispatch(isLoading());

        await Axios().post('livechat/initchat', data)
            .then((response) => {
                console.log('data',data)
                if (response.data.status === '1') {
                    dispatch(
                        Success({
                            type: actionTypes.INIT_CHAT,
                            payload: response.data.data
                        })
                    );
                }
                else
                {
                    dispatch(Fail(response.data.message));
                }
            })
            .catch((err) => {
            dispatch(Fail(err.message));
        });
    };
};

