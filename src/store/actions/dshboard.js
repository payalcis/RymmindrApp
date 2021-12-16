import * as actionTypes from './actionTypes';
import Axios from '../../helper/axios';

export const isLoading = () => {
    return {
        type: actionTypes.AUTH_START,
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

export const getRymindrList = (data) => {
    return (dispatch) => {
        dispatch(isLoading());
        Axios().post('users/getUpcommingRymindr', data)
            .then((response) => {
                if (response.data.status === '1') {
                    dispatch(
                        Success({
                            type: actionTypes.DASHBOARD_RYMINDR_DATA,
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
