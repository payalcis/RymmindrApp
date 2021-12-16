import * as actionTypes from '../actions/actionTypes';
const initialState = {
  loading: false,
  error: null,
  success_message: null,
  booklistdata: null,
  bookdetails:null,
  acceptStatusList:{},
  pendingStatusList:{}
  
};

const bookList = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.BOOKLIST_ISLOADING:
      return {
        ...state,
        error: null,
        loading: true,
        success_message: null,
      };
    case actionTypes.BOOKLIST_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
        success_message: null,
      };
      case actionTypes.SUCCESS_MESSAGE_BOOK:
        return {
            ...state,
            success_message: action.success_message,
            loading: false,
        };
       case actionTypes.BOOKLIST_DETAIL:
      return {
        ...state,
        bookdetails: action.payload,
        error: null,
        loading: false,
        success_message: null,
      };

       case actionTypes.BOOKLIST_LIST:
      return {
        ...state,
        booklistdata: action.payload,
        error: null,
        loading: false,
        success_message: null,
      };

       case actionTypes.STATUS_ACCEPT:
      return {
        ...state,
        acceptStatusList: action.payload,
        error: null,
        loading: false,
        success_message: null,
      };

       case actionTypes.STATUS_PENDING:
      return {
        ...state,
        pendingStatusList: action.payload,
        error: null,
        loading: false,
        success_message: null,
      };

      case actionTypes.EVENT_LIST:
      return {
        ...state,
        eventlistdata: action.payload,
        error: null,
        loading: false,
        success_message: null,
      };

      case actionTypes.BOOKLIST_DELETE:
      return {
        ...state,
        error: null,
        loading: false,
        success_message: null,
      };

    default:
      return state;
  }
};
export default bookList;
