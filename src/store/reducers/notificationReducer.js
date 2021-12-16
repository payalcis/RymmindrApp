import * as actionTypes from '../actions/actionTypes';
const initialState = {
  loading: false,
  error: null,
  notifications: [],
  isTriggerNotify: false,
  success_message: null,
};

const notificationReducer = (state = initialState, action) => {
// console.warn('action5555', action)
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
    case actionTypes.GETNOTIFICATION:
      return {
        ...state,
        notifications: action.payload.data,
        isTriggerNotify: action.payload.is_web_pushnotification,
        error: null,
        loading: false,
      };
    case actionTypes.NOTIFICATIONREAD:
      return {
        ...state,
        notifications: action.payload.data,
        isTriggerNotify: action.payload.is_web_pushnotification,
        error: null,
        loading: false
      }
    case actionTypes.SUCCESS_MESSAGE_NOTIFICATION:
      return {
          ...state,
          success_message: action.success_message,
          loading: false,
      };
    default:
      return state;
  }
};
export default notificationReducer;
