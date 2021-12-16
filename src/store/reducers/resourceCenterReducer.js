import * as actionTypes from '../actions/actionTypes';
const initialState = {
  loading: false,
  error: null,
  contentList:[]
}

const resourceCenterReducer = (state = initialState, action) => {
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
    
        case actionTypes.GETRESOURCECONTENT:        
        return {
          ...state,
          contentList: action.payload,
          error: null,
          loading: false,
        };
      
      default:
        return state;
  }
};
export default resourceCenterReducer;
