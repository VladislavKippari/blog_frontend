import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
const initialState = {
    error: null,
    loading: false
};
 const newPostStart = (state, action) => {
    return updateObject( state, { error: null, loading: true } );
};
 const newPostSuccess = (state, action) => {
    return updateObject( state, { 
        error: null,
        loading: false
     } );
};
 const newPostFail = (state, action) => {
   
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.NEW_POST_START: return newPostStart(state, action);
        case actionTypes.NEW_POST_SUCCESS: return newPostSuccess(state, action);
        case actionTypes.NEW_POST_FAIL: return newPostFail(state, action);
        default:
            return state;
    }
};

export default reducer;