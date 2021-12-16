import * as actionTypes from '../actions/actionTypes';
const initialState = {
  loading: false,
  error: null,
  dashupcomingrymindr: [],
  TodayCount: 0,
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ISLOADING:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case actionTypes.ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    case actionTypes.GETUPCOMMINGRYMINDRDASHBOARD:
      return {
        ...state,
        dashupcomingrymindr: action.payload.list,
        TodayCount: action.payload.TodayCount,
        error: null,
        loading: false,
      };

    default:
      return state;
  }
};
export default dashboardReducer;
