import axios from 'axios';

import * as actionTypes from './actionTypes';


export const newPostStart = () => {
    return {
        type: actionTypes.NEW_POST_START
    };
};
export const newPostSuccess = () => {
    return {
        type: actionTypes.NEW_POST_SUCCESS
       
    };
};
export const newPostFail = (error) => {
   
    return {
        type: actionTypes.NEW_POST_FAIL,
        error: error
    };
};
export const postDataHandler = (userId,title, body) => {
    return dispatch => {
        dispatch(newPostStart());
        const postData = {
            userId: userId,
            title: title,
            body:body
        };
        let url = 'http://localhost:8000/api/new-post';
        
        axios.post(url, postData)
            .then(response => {
                dispatch(newPostSuccess());
            })
            .catch(err => {
                
                dispatch(newPostFail(err));
                
            });
    };
};
