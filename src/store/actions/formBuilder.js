import * as actionTypes from './actionTypes';
import Axios from '../../helper/axios';
import axios from 'axios';

export const isLoading = () => {
    return {
        type: actionTypes.ISLOADING,
    };
};

export const Success = (response) => {
    return response;
};

export const Fail = (error) => {
    return {
        type: actionTypes.ERROR,
        error: error,
    };
};

export const SuccessMessage2 = (message) => {
    return {
        type: actionTypes.SUCCESS_MESSAGE_FORM,
        success_message2: message,
    };
};

export const createForm = (data, history,user_id) => {
    return async(dispatch) => {
        try {
            dispatch(isLoading());
            const response = await Axios().post('user/create-form', data);
            console.log('response===', response);
            if (response.data.status == '1') {
                dispatch(getFormBuilderList({user_id}))
                dispatch(SuccessMessage2(response.data.message));
                dispatch(
                    Success({
                        type: actionTypes.CREATEFORMBUILDER,
                        payload: [],
                    })
                );
                history.push('/form-builders');
            } else {
                dispatch(Fail(response.data.message));
            }
        } catch (error) {
            dispatch(Fail(error.message));
        } finally {
            dispatch(SuccessMessage2(null));
            dispatch(Fail(null));
        }
    };
};

export const createTemplateForm = (data, history,user_id) => {

    return async(dispatch) => {
        try {
            dispatch(isLoading());
            const response = await Axios().post('user/create-template', data);
            if (response.data.status == '1') {
                dispatch(getTemplatesList({user_id}))
                dispatch(SuccessMessage2(response.data.message));
                dispatch(
                    Success({
                        type: actionTypes.CREATETEMPLATE,
                        payload: [],
                    })
                );
                history.push('/form-templates');
            } else {
                dispatch(Fail(response.data.message));
            }
        } catch (error) {
            dispatch(Fail(error.message));
        } finally {
            dispatch(SuccessMessage2(null));
            dispatch(Fail(null));
        }
    };
};

export const getFormBuilderList = (data) => {
    return async(dispatch) => {
        try {
            dispatch(isLoading());
            const response = await Axios().post('user/list-form', data);
            if (response.data.status == 1) {
                dispatch(
                    Success({
                        type: actionTypes.FORM_BUILDER_LIST,
                        payload: response.data.data
                    })
                );
            } else {
                dispatch(Fail(response.data.message));
            }
        } catch (error) {
            dispatch(Fail(error.message));
        }
    };
};

export const getExamDetailsForContact = (data) => {
    return async(dispatch) => {
        try {
            dispatch(isLoading());
            const response = await Axios().post('user/exam-details-for-contact', data);
            if (response.data.status == 1) {
                dispatch(
                    Success({
                        type: actionTypes.SUBMITTED_FORM_BY_CONTACT,
                        payload: response.data.data
                    })
                );
            } else {
                dispatch(Fail(response.data.message));
            }
        } catch (error) {
            dispatch(Fail(error.message));
        }
    };
};

export const getTemplatesList = (data) => {
    return async(dispatch) => {
        try {
            dispatch(isLoading());
            const response = await Axios().post('user/list-template', data);
            if (response.data.status == 1) {
                dispatch(
                    Success({
                        type: actionTypes.FORM_TEMPLATES_LIST,
                        payload: response.data.data,
                    })
                );
            } else {
                dispatch(Fail(response.data.message));
            }
        } catch (error) {
            dispatch(Fail(error.message));
        }
    };
};


export const getSubmittedFormsList = (data) => {
    return async(dispatch) => {
        try {
            dispatch(isLoading());
            const response = await Axios().post('user/exam-details-by-id', data);
            console.log('response====', response);
            if (response.data.status == 1) {
                dispatch(
                    Success({
                        type: actionTypes.SUBMITTED_FORM_LIST,
                        payload: response.data.data,
                    })
                );
            } else {
                dispatch(Fail(response.data.message));
            }
        } catch (error) {
            dispatch(Fail(error.message));
        }
    };
};
export const formStatus = (data) => {
    return async (dispatch)=>{
        try {
            const response = await Axios().post('user/formStatus',data)
            if (response.data.status== 1){
                dispatch(
                    Success({
                        type: actionTypes.FORMSTATUS,
                        payload: response.data.data
                    })
                )
                console.log('response.data.data+',response.data.data)
            }
            else{
                dispatch(Fail(response.data.message))
            }
        }
        catch(error){
            dispatch(Fail(error.message))
        }
    }
};

export const deleteFormData=({id,user_id})=>{
    const data= {"form_id":id}
    return async(dispatch) => {
        try {
            dispatch(isLoading());
            const response = await Axios().post('user/delete-form',data);
            console.log('delresponse====', response);
            if (response.data.status == 1) {
                dispatch(
                    Success({
                        type: actionTypes.DELETE_FORM_DATA,
                    })
                );
                dispatch(SuccessMessage2('Form has been deleted successfully.'));
                dispatch(getFormBuilderList({user_id}));
            
            } else {
                dispatch(Fail(response.data.message));
            }
        } catch (error) {
            dispatch(Fail(error.message));
        }
    };   
}

export const deleteTemplateData=({id,user_id})=>{
    const data= {"temp_id": id}
    return async(dispatch) => {
        try {
            dispatch(isLoading());
            const response = await Axios().post('user/delete-template',data);
            console.log('delresponse====', response);
            if (response.data.status == 1) {
                dispatch(
                    Success({
                        type: actionTypes.DELETE_TEMPLATE_DATA,
                    })
                );
                dispatch(SuccessMessage2('Template has been deleted successfully.'));
                dispatch(getTemplatesList({user_id}));
            
            } else {
                dispatch(Fail(response.data.message));
            }
        } catch (error) {
            dispatch(Fail(error.message));
        }
    };   
}