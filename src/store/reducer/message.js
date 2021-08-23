import * as actionType from '../action/actionType';

// initial state of users messages
const initialState = {
    messages: null,
    loading: false,
    error: false
}

// fetching users message reducer
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionType.MESSAGE_INIT: 
            // when the fetching starts
            return {
                ...state,
                loading: true,
                error: false
            }

        case actionType.MESSAGE_FETCH_FAIL: 
            // theres an error in fetching data
            return {
                ...state,
                loading: false,
                error: true
            }

        case actionType.MESSAGE_FETCH_SUCCESS: 
            // successful fetching of data
            return {
                ...state,
                loading: false,
                error: false,
                messages: action.payload
            }
        default:
            return state
    }
}

export default reducer;