import * as actionTypes from '../actions/actionTypes';
const initialState = {
  loading: false,
  error: null,
  success_message2: null,
  formlistdata:null,
  formsubmitteddata:null,
  formlistdata2:null,
  submittedformsdata:null,
  formDeleted:false,
  templateDeleted:false,
  formStatusList:{}
};

const formBuilderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ISLOADING:
      return {
        ...state,
        error: null,
        loading: true,
        success_message2: null,
      };
    case actionTypes.ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
        success_message2: null,
      };

    case actionTypes.SUCCESS_MESSAGE_FORM:
      return {
        ...state,
        success_message2: action.success_message2,
        loading: false,
      };

    case actionTypes.CREATEFORMBUILDER:
      return {
        ...state,
        error: null,
        loading: false,
        success_message2: null,
      };
      case actionTypes.CREATETEMPLATE:
      return {
        ...state,
        error: null,
        loading: false,
        success_message2: null,
      };
    case actionTypes.FORM_BUILDER_LIST:
      return {
        ...state,
        formlistdata: action.payload,
        error: null,
        loading: false,
        //success_message2: null,
      };

      case actionTypes.SUBMITTED_FORM_BY_CONTACT:
      return {
        ...state,
        formsubmitteddata: action.payload,
        error: null,
        loading: false,
        //success_message2: null,
      };

      case actionTypes.FORM_TEMPLATES_LIST:
      return {
        ...state,
        formlistdata2: action.payload,
        error: null,
        loading: false,
        //success_message2: null,
      };
      case actionTypes.FORMSTATUS:
      return {
        ...state,
        formStatusList: action.payload,
        error: null,
        loading: false,
      };

      case actionTypes.SUBMITTED_FORM_LIST:
      return {
        ...state,
        submittedformsdata: action.payload,
        error: null,
        loading: false,
        //success_message2: null,
      };
      case actionTypes.DELETE_FORM_DATA:
        return{
          ...state,
          formDeleted:true,
          error:null,
          loading:false
        }
      case actionTypes.DELETE_TEMPLATE_DATA:
        return{
          ...state,
          templateDeleted:true,
          error:null,
          loading:false
        }

    default:
      return state;
  }
};
export default formBuilderReducer;
