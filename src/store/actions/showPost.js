import axios from 'axios';

import * as actionTypes from './actionTypes';



export const getPost= () => {
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