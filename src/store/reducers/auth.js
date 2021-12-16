import * as actionTypes from '../actions/actionTypes';
const initialState = {
  token: null,
  user: null,
  error: null,
  error2: null,
  loading: false,
  loginLoading: false,
  authRedirectPath: '/',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START2:
      return {
        ...state,
        error: null,
        error2: null,
        loginLoading: true,
      };
    case actionTypes.AUTH_START:
      return {
        ...state,
        error: null,
        error2: null,
        loading: true,
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.idToken,
        user: action.user,
        error: null,
        error2: null,
        loginLoading: false,
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        error2: null,
        loginLoading: false,
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
        error: null,
        error2: null,
      };
    // case actionTypes.ISLOADING:
    //   return {
    //     ...state,
    //     error: null,
    //     loading: true,
    //   };
    case actionTypes.AUTHERROR:
      return {
        ...state,
        error2: action.error2,
        loading: false,
      };

    case actionTypes.EMAIL_VERIFY:
      return {
        ...state,
        loading: false,
      };

    case actionTypes.SIGNUP:
      return {
        ...state,
        register: action.payload,
        error: null,
        error2: null,
        loading: false,
      };
    default:
      return state;
  }
};
export default reducer;
