import * as actionType from '../action/actionType';

const initialState = {
    loading: false,
    error: false,
    sent: false
}

const sendReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionType.MESSAGE_SEND_START:
            return {
                ...state,
                error: false,
                loading: true
            }

        case actionType.MESSAGE_SEND_FAIL:
            return {
                ...state,
                loading: false,
                error: true,
                sent: false
            }

        case actionType.MESSAGE_SEND_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                sent: true
            }

        default: 
            return state
    }
}

export default sendReducer;