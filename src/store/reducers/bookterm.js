import * as actionTypes from '../actions/actionTypes';
const initialState = {
    loading: false,
    error: null,
    sucessTerm: false,
    sucessHoliday: false,
    termRymindr: null,
    bookTermDetails: null,
    bookTermlistdata: null,
    bookTermUpdate: null,
    success_message: null,
};

const booktermReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TERM_ISLOADING:
            return {
                ...state,
                error: null,
                loading: true,
                sucessTerm: false,
                success_message: null,
            };
        case actionTypes.TERM_ERROR:
            return {
                ...state,
                error: action.error,
                loading: false,
                success_message: null,
            };

        case actionTypes.SUCCESS_TERM_HOLIDAY:
        return {
            ...state,
            success_message: action.success_message,
            loading: false,
        };
        
        case actionTypes.TERM_SUCESS:
            return {
                ...state,
                sucessTerm: action.success,
                loading: false,
                success_message: null,
            };

        case actionTypes.Holiday_SUCESS:
            return {
                ...state,
                sucessHoliday: action.success,
                loading: false,
                success_message: null,
            };
        case actionTypes.TERM_CREATERYMINDR:
            return {
                ...state,
                bookEventDetails: action.payload,
                error: null,
                loading: false,
                success_message: null,
            };


        case actionTypes.TERM_DETAIL:
            return {
                ...state,
                bookdetails: action.payload,
                error: null,
                loading: false,
                success_message: null,
            };

        case actionTypes.TERM_LIST:
            return {
                ...state,
                bookTermlistdata: action.payload,
                error: null,
                loading: false,
                success_message: null,
            };

        case actionTypes.TERM_DELETE:
            return {
                ...state,
                error: null,
                loading: false,
                success_message: null,
            };


        case actionTypes.TERM_UPDATERYMINDR:
            return {
                ...state,
                bookTermUpdate: action.payload,
                error: null,
                loading: false,
                success_message: null,

            };


        case actionTypes.INVITEANDADDMOBILE:
            return {
                ...state,
                matched_contact: action.payload,
                error: null,
                loading: false,
                success_message: null,
            };

        case actionTypes.GETUPCOMMINGRYMINDR:
            return {
                ...state,
                upcommingrymindr: action.payload,
                error: null,
                loading: false,
                success_message: null,
            };
        case actionTypes.GETRYMINDRDETAILS:
            return {
                ...state,
                rymindrDetails: action.payload,
                error: null,
                loading: false,
                success_message: null,
            };

        case actionTypes.DELETERYMINDR:
            return {
                ...state,
                error: null,
                loading: false,
                success_message: null,
            };

        case actionTypes.RYMINDRACTION:
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
export default booktermReducer;