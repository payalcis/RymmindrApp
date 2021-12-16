import * as actionTypes from '../actions/actionTypes';
const initialState = {
  loading: false,
  error: null,
  sucessEvent:false,
  categories: [],
  subcategories: [],
  groups: [],
  businessusers: [],
  matched_contact: null,
  upcommingrymindr: null,
  bookEventDetails: null,
  bookEventUpdate:null,
  category: null
};

const bookeventReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.BOOK_ISLOADING:
      return {
        ...state,
        error: null,
        loading: true,
        sucessEvent:false,
      };
    case actionTypes.BOOK_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
       case actionTypes.BOOK_SUCESS:
      return {
        ...state,
        sucessEvent:action.success,
        loading: false,
      };
    case actionTypes.GETCATEGORY:
      return {
        ...state,
        categories: action.payload,
        error: null,
        loading: false,
        sucessEvent:false,
      };
    case actionTypes.SUBCATEGORY:
      return {
        ...state,
        subcategories: action.payload,
        error: null,
        loading: false,
        sucessEvent:false,
      };
    case actionTypes.BOOK_GROUPLIST:
      return {
        ...state,
        groups: action.payload,
        error: null,
        loading: false,
        sucessEvent:false,
      };
    case actionTypes.BOOK_BUSINESSUSERS:
      return {
        ...state,
        businessusers: action.payload,
        error: null,
        loading: false,
        sucessEvent:false,
      };

    case actionTypes.BOOK_CREATERYMINDR:
      return {
        ...state,
        bookEventDetails: action.payload,
        error: null,
        loading: false,
        sucessEvent:false,
      };

      case actionTypes.BOOK_UPDATERYMINDR:
      return {
        ...state,
        bookEventUpdate: action.payload,
        error: null,
        loading: false,
        sucessEvent:false,
      };


    case actionTypes.INVITEANDADDMOBILE:
      return {
        ...state,
        matched_contact: action.payload,
        error: null,
        loading: false,
        sucessEvent:false,
      };

    case actionTypes.GETUPCOMMINGRYMINDR:
      return {
        ...state,
        upcommingrymindr: action.payload,
        error: null,
        loading: false,
      };
    case actionTypes.GETRYMINDRDETAILS:
      return {
        ...state,
        rymindrDetails: action.payload,
        error: null,
        loading: false,
      };

    case actionTypes.DELETERYMINDR:
      return {
        ...state,
        error: null,
        loading: false,
      };

    case actionTypes.RYMINDRACTION:
      return {
        ...state,
        error: null,
        loading: false,
      };
    case actionTypes.BOOK_CATEGORY: 
      return {
        ...state,
        error: null,
        loading: false,
        category: action.payload
      }

    default:
      return state;
  }
};
export default bookeventReducer;
