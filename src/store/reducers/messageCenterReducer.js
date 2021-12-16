import * as actionTypes from '../actions/actionTypes';
const initialState = {
    loading: false,
    error: null,
    categories: [],
    rymindrList: [],
    userRymindrList: [],
    messageDetail: [],
    messageContactDetail: [],
    messageDetailById: [],
    rssFeedsList: [],
    success_message: null
}

const messageCenterReducer = (state = initialState, action) => {
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
        case actionTypes.SUCCESS_MESSAGE_CENTER:
            return {
                ...state,
                success_message: action.success_message,
                loading: false,

            };
        case actionTypes.GETCATEGORY:
            return {
                ...state,
                categories: action.payload,
                //default_cat: action.default_cat,
                error: null,
                loading: false,
                success_message: null,
            };
        case actionTypes.GETRYMINDRLIST:
            return {
                ...state,
                rymindrList: action.payload,
                error: null,
                loading: false,
                success_message: null,
            };
        case actionTypes.GETUSERRYMINDRLIST:
            return {
                ...state,
                userRymindrList: action.payload,
                error: null,
                loading: false,
                success_message: null,
            };
            
        case actionTypes.GETMESSAGECENTERLIST:

            return {
                ...state,
                messageDetail: action.payload,
                error: null,
                loading: false,
                success_message: null,
            };

        case actionTypes.GETMESSAGECONTACTDETAIL:
            return {
                ...state,
                messageContactDetail: action.payload,
                error: null,
                loading: false,
                success_message: null,
            };

        case actionTypes.GETMESSAGECENTERLISTBYID:
            return {
                ...state,
                messageDetailById: action.payload,
                error: null,
                loading: false,
                success_message: null,
            };

        case actionTypes.MESSAGECENTERLISTCLEAR:
            return {
                ...state,
                messageDetailById: action.payload,
                error: null,
                loading: false,
                success_message: null,
            };

        case actionTypes.GETRSSFEEDS:
            return {
                ...state,
                rssFeedsList: action.payload,
                error: null,
                loading: false,
                success_message: null,
            };
        case actionTypes.GETMESSAGECENTERLISTAFTERDELETE:
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
export default messageCenterReducer;