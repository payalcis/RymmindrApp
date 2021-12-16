import * as actionTypes from '../actions/actionTypes';
const initialState = {
  loading: false,
  error: null,
  comments: []
};

const commentReducer = (state = initialState, action) => {
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
    case actionTypes.GETCOMMENT:
      return {
        ...state,
        comments: action.payload.data.reverse(),
        error: null,
        loading: false,
      };
    case actionTypes.ADDCOMMENT:
      return {
        ...state,
        comments: action.payload.data,
        error: null,
        loading: false,
      };
    case actionTypes.COMMENTLIKE:
      return {
        ...state,
        error: null,
        loading: false
      }
    case actionTypes.DELETECOMMENT:
      return {
        ...state,
        error: null,
        loading: false
      }

    default:
      return state;
  }
};
export default commentReducer;
