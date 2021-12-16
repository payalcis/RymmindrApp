import * as actionTypes from '../actions/actionTypes'
const initialState = {
    loading: false,
    error: null,
    ryminderlist: []
};


const dshboardReducer = (state = initialState, action) => {
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
        case actionTypes.DASHBOARD_RYMINDR_DATA:
            return {
                ...state,
                ryminderlist: action.payload,
                error: null,
                loading: false,
            };

        default:
            return state;
    }
};
export default dshboardReducer;