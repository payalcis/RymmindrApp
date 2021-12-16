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

export const SuccessMessage = (message) => {

    return {
        type: actionTypes.SUCCESS_MESSAGE_NOTIFICATION,
        success_message: message,
    };
};

export const Fail = (error) => {
    return {
        type: actionTypes.ERROR,
        error: error,
    };
};

export const getNotifications = (data) => {
    return (dispatch) => {
        Axios().post('/notification', data)
            .then((response) => {
                // console.warn('hello notify', response)
                if (response.data.status === 200) {
                    dispatch(
                        Success({
                            type: actionTypes.GETNOTIFICATION,
                            payload: response.data
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

export const notificationRead = (data) => {
    return (dispatch) => {
        Axios().post('/notification/read', data)
            .then((response) => {
                if (response.data.status === 200) {
                    dispatch(
                        Success({
                            type: actionTypes.NOTIFICATIONREAD,
                            payload: response.data
                        })
                    );
                } else {
                    dispatch(Fail(response.data.message));
                }
            })
            .catch((err) => {
                console.log('err');
                dispatch(Fail(err.message));
            });
    };
};


export const notificationClear = (user_id) => {
    return (dispatch) => {
        console.warn('hello 333')
        Axios().post('users/clearDesktopNotification', { user_id: user_id })
            .then((response) => {
                if (response.data.status === '1') {

                    dispatch(SuccessMessage(response.data));
                } else {
                    dispatch(Fail(response.data.message));
                }
            })
            .catch((err) => {
                console.log('err');
                dispatch(Fail(err.message));
            });
    };
};