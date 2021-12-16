import * as actionTypes from '../actions/actionTypes';
const initialState = {
  loading: false,
  error: null,
  sucess: null,
  success_message: null,
  showOtpform: false,
  activeDelete: true,
  userdetails: {},
};

const accountsettingReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ACISLOADING:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case actionTypes.ACERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    case actionTypes.MAKEDEFAULTCATEGORY:
      return {
        ...state,
        error: null,
        loading: false,
      };

    case actionTypes.CHANGEPASSWORD:
      return {
        ...state,
        error: null,
        loading: false,
      };

    case actionTypes.UPDATEPROFILE:
      return {
        ...state,
        error: null,
        sucess:"Profile Updated Sucessfully",
        loading: false,
      };
    case actionTypes.CHANGENOTIFICATIONSETTING:
      return {
        ...state,
        error: null,
        sucess:'Notification updated sucessfully',
        loading: false,
      };
      
    case actionTypes.DELETEUSERACCOUNT:
      return {
        ...state,
        error: null,
        loading: false,
        activeDelete: true,
        showOtpform: false,
      };

    case actionTypes.SENDOTP:
      return {
        ...state,
        error: null,
        showOtpform: true,
        loading: false,
      };

    case actionTypes.VERIFYOTP:
      return {
        ...state,
        error: null,
        activeDelete: false,
        loading: false,
      };

    case actionTypes.RESETDATA:
      return {
        ...state,
        error: null,
        loading: false,
        activeDelete: true,
        showOtpform: false,
      };
    case actionTypes.GETUSERDETAILS:
      return {
        ...state,
        error: null,
        loading: false,
        userdetails: action.payload,
      };

    case actionTypes.GENRATEQRCODE:
      return {
        ...state,
        error: null,
        loading: false,
        // userdetails: action.payload,
      };
      case actionTypes.SUCCESS_MESSAGE_ACCOUNT_SETTING:
        return {
            ...state,
            success_message: action.success_message,
            loading: false,
        };
    default:
      return state;
  }
};
export default accountsettingReducer;
