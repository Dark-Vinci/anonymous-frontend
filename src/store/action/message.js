import * as actionType from './actionType';
import axios from 'axios';

export const fetchStart = () => {
    return {
        type: actionType.MESSAGE_INIT
    }
}

export const fetchFail = () => {
    return {
        type: actionType.MESSAGE_FETCH_FAIL
    }
}

export const fetchSuccess = (payload) => {
    return {
        type: actionType.MESSAGE_FETCH_SUCCESS,
        payload: payload
    }
}


async function fetchMessage (dispatch, token) {
    try {
        const response = await axios.get('http://localhost:2020/api/user/my-message', { token: token }); // ! hopefully
        const messages = response.data;  // ! need to be corrected
        dispatch(fetchSuccess(messages));
    } catch (ex) {
        dispatch(fetchFail());
    }
}

export const fetch = (token) => {
    return dispatch => {
        dispatch(fetchStart());
        fetchMessage(dispatch, token);
    }
}