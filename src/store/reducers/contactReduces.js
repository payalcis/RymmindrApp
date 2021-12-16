import * as actionTypes from '../actions/actionTypes';
const initialState = {
  loading: false,
  error: null,
  contactlist: [],
  contactGroupMemberlist: [],
  grouplist: [],
  usercontactlist: [],
  groupdeletemessage: '',
  success_message: null,
  searchedUsers: [],
  addcontact: '',
  rymindrlist: [],
  addmessage: '',
  invitemessage: '',
  pendingList: [],
  pendingCount: 0,
  acceptedCount: 0
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ISLOADING:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case actionTypes.CONTACT_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    case actionTypes.SUCCESS_MESSAGE:
      return {
        ...state,
        success_message: action.success_message,
        loading: false,
      };

    case actionTypes.GETCONTACTLIST:
      return {
        ...state,
        contactlist: action.payload.mergedlist,
        pendingCount: action.pendingCount,
        grouplist: action.payload.GroupList,
        usercontactlist: action.payload.ContactList,
        error: null,
        loading: false,
      };

    case actionTypes.PENDINGREQUEST:
      return {
        ...state,
        pendingList: action.payload,
        acceptedCount: action.acceptedCount,
        loading: false,
        error: null,
      };

    case actionTypes.GETGROUPLIST:
      return {
        ...state,
        grouplist: action.payload.GroupList,
        error: null,
        loading: false,
      };

    case actionTypes.CONTACT_GROUP_MEMBER_LIST:
      return {
        ...state,
        contactGroupMemberlist: action.payload,
        error: null,
        loading: false,
      };

    case actionTypes.GROUPDELETE:
      return {
        ...state,
        groupdeletemessage: action.payload,
        error: null,
        loading: false,
      };
    case actionTypes.CONTACTDELETE:
      return {
        ...state,
        groupdeletemessage: action.payload,
        error: null,
        loading: false,
      };

    case actionTypes.GET_SEARCHED_USERS:
      return {
        ...state,
        searchedUsers: action.payload,
        error: null,
        loading: false,
      };

    case actionTypes.ADD_CONTACT:
      return {
        ...state,
        addcontact: action.payload,
        error: null,
        loading: false,
      };

    case actionTypes.RYMINDR_LIST:
      return {
        ...state,
        rymindrlist: action.payload,
        error: null,
        loading: false,
      };

    case actionTypes.ADDCONTACTTORYMINDR:
      return {
        ...state,
        addmessage: action.payload,
        error: null,
        loading: false,
      };

    case actionTypes.INVITE_USER:
      return {
        ...state,
        invitemessage: action.payload,
        error: null,
        loading: false,
      };

    default:
      return state;
  }
};
export default contactReducer;
