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
        type: actionTypes.ERROR,
        error: error,
    };
};

export const getComments = (data) => {
    return (dispatch) => {
        Axios().post('/comment', data)
            .then((response) => {
                if (response.data.status === 200) {
                    dispatch(
                        Success({
                            type: actionTypes.GETCOMMENT,
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

export const addComment = (data) => {
    return (dispatch) => {
        Axios().post('/comment/add', data)
            .then((response) => {
                if (response.data.status === 200) {

                    dispatch(
                        Success({
                            type: actionTypes.GETCOMMENT,
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

export const commentLike = (data) => {
    return (dispatch) => {
        Axios().post('/comment/like', data)
            .then((response) => {
                if (response.data.status === 200) {
                    dispatch(
                        Success({
                            type: actionTypes.COMMENTLIKE
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

export const commentDelete = (data) => {
    return (dispatch) => {
        Axios().post('/comment/delete', data)
            .then((response) => {
                if (response.data.status === 200) {
                    dispatch(
                        Success({
                            type: actionTypes.DELETECOMMENT
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