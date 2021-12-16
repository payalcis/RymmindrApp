import * as actionTypes from '../actions/actionTypes';
const initialState = {
  loading: false,
  error: null,
  categories: [],
  categories_rymindr: [],
  subcategories: [],
  groups: [],
  businessusers: [],
  matched_contact: null,
  upcommingrymindr: [],
  historyrymindr: null,
  rymindrDetails: null,
  default_cat: 0,
  success_message: null,
  myNotificationListing: [],
  qrImg: null,
  statusList: []
};

const rymidrReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ISLOADING:
      return {
        ...state,
        error: null,
        loading: true,
        success_message: null,
      };
    case actionTypes.ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
        success_message: null,
      };
    case actionTypes.GETCATEGORY:
      return {
        ...state,
        categories: action.payload,
        default_cat: action.default_cat,
        error: null,
        loading: false,
        qrImg: null,
        success_message: null,
      };
    case actionTypes.GETCATEGORYRYMINDR:
      return {
        ...state,
        categories: action.payload,
        default_cat: action.default_cat,
        error: null,
        loading: false,
        qrImg: null,
        success_message: null,
      };
    case actionTypes.SUBCATEGORY:
      return {
        ...state,
        subcategories: action.payload,
        error: null,
        loading: false,
        success_message: null,
      };
    case actionTypes.GROUPLIST:
      return {
        ...state,
        groups: action.payload,
        error: null,
        loading: false,
        success_message: null,
      };
    case actionTypes.BUSINESSUSERS:
      return {
        ...state,
        businessusers: action.payload,
        error: null,
        loading: false,
        success_message: null,
      };

    case actionTypes.CREATERYMINDR:
      return {
        ...state,
        createrymindr: action.payload,
        error: null,
        loading: false,
        qrImg: null,
        success_message: null,
      };

    case actionTypes.INVITEANDADDMOBILE:
      return {
        ...state,
        matched_contact: action.payload,
        error: null,
        loading: false,
        success_message: null,
      };

    case actionTypes.GETUPCOMMINGRYMINDR:
      return {
        ...state,
        upcommingrymindr: action.payload,
        error: null,
        loading: false,
        qrImg: null,
        success_message: null,
      };

    case actionTypes.GETHISTORYRYMINDR:
      return {
        ...state,
        historyrymindr: action.payload,
        error: null,
        loading: false,
        qrImg: null,
        success_message: null,
      };
    case actionTypes.GETRYMINDRDETAILS:
      return {
        ...state,
        rymindrDetails: action.payload,
        error: null,
        loading: false,
        qrImg: null,
        success_message: null,
      };

    case actionTypes.DELETERYMINDR:
      return {
        ...state,
        error: null,
        loading: false,
        qrImg: null,
        success_message: null,
      };

    /*case actionTypes.DELETERYMINDRHISTORY:
        return {
          ...state,
          error: null,
          loading: false,
        };*/

    case actionTypes.RYMINDRACTION:
      return {
        ...state,
        error: null,
        loading: false,
        success_message: null,
      };
    case actionTypes.GETNOTIFICATION:
      return {
        ...state,
        myNotificationListing: action.payload,
        error: null,
        loading: false,
        success_message: null,
      };
    case actionTypes.SUCCESS_MESSAGE_RYMINDR:
      return {
        ...state,
        success_message: action.success_message,
        loading: false,
      };
    case actionTypes.GENERATEQRCODE:
      return {
        ...state,
        qrImg: action.payload.qr_code,
        loading: false,
        success_message: null,
      };
    case actionTypes.STATUSDATA:
      return {
        ...state,
        statusList: action.payload,
        error: null,
        loading: false,
        success_message: null,
      };
    default:
      return state;
  }
};
export default rymidrReducer;
