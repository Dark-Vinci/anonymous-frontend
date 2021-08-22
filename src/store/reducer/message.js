import * as actionType from '../action/actionType';

const initialState = {
    messages: null,
    loading: false,
    error: false
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionType.MESSAGE_INIT: 
            return {
                ...state,
                loading: true,
                error: false
            }

        case actionType.MESSAGE_FETCH_FAIL: 
            return {
                ...state,
                loading: false,
                error: true
            }

        case actionType.MESSAGE_FETCH_SUCCESS: 
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