import * as actionTypes from '../actions/actionTypes';
import { act } from 'react-dom/test-utils';

const initialState = {
    loading: false,
    success: null,
    error: null,
    contacts: [],
    chatroom: null
};

const liveChatReducer = (state = initialState, action) => {
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
    case actionTypes.GET_USER_AND_GROUP_LIST:
        let existingState = {...state};
        existingState.contacts = action.payload;
        return {
            ...existingState,
            error: null,
            success: null,
            loading: false,
        }
    case actionTypes.CREATE_GROUP:
        return {
            ...state,
            error: null,
            success: "Group created successfully",
            loading: false,
        }
    case actionTypes.INIT_CHAT:
        return {
            ...state,
            chatroom: action.payload.chat_room,
            error: null,
            success: null,
            loading: false,
        }
    default:
        return state;
    }
};
export default liveChatReducer;
