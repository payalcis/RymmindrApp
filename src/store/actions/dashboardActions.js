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
        const TodayCount = record.length > 0 ?record[0].remindr.length:0;

        dispatch(
          Success({
            type: actionTypes.GETUPCOMMINGRYMINDRDASHBOARD,
            payload: { list: merged.length > 0 ? merged : [], TodayCount: TodayCount },
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
