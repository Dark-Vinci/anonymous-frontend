import * as actionType from '../action/actionType';

const initialState = {
    userId: '', 
    token: '', 
    error: false,
    loading: false
}

const reducer = ( state = initialState, action ) => {
    switch(action.type) {
        case actionType.REGISTER_START:
            return {
                ...state,
                loading: true,
                error: false,
                userId: ''
            }

        case actionType.REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                error: true,
                userId: ''
            }

        case actionType.REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                token: action.payload.token,
                userId: action.payload.userId
            }
        case actionType.LOGIN_START:
            return {
                ...state,
                loading: true,
                error: false,
                userId: ''
            }

        case actionType.LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                userId: ''
            }

        case actionType.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                userId: action.payload.id,
                token: action.payload.token
            }

        case actionType.LOGOUT:
            return {
                ...state,
                loading: false,
                userId: '',
                token: '', 
                error: false
            }

        case actionType.AUTO_SIGN:
            return {
                ...state,
                loading: false,
                userId: action.payload.id,
                token: action.payload.token,
                error: false
            }
        default:
            return state
    }
}

export default reducer;