import * as actionType from './actionType';
import axios from 'axios';

// action creator for the start of fetching a users message from server
export const fetchStart = () => {
    return {
        type: actionType.MESSAGE_INIT
    }
}

// action creator for a failed message fetching
export const fetchFail = () => {
    return {
        type: actionType.MESSAGE_FETCH_FAIL
    }
}

// action creator for successful fetch of users messages
export const fetchSuccess = (payload) => {
    return {
        type: actionType.MESSAGE_FETCH_SUCCESS,
        payload: payload
    }
}


async function fetchMessage (dispatch, token) {
    try {
        // reach out to the web with axios
        // const response = await axios.get('http://localhost:2020/api/user/my-messages', {
        //     headers: { 'x-auth-token': token }
        // }); 

        // ! here we go
        const response = await axios.get(`https://proj-ano-tex-v1w9.herokuapp.com/api/user/my-messages`, {
            headers: { 'x-auth-token': token }
        });

        // data transform
        const messages = response.data.data;  
        // success fetch dispatcher
        dispatch(fetchSuccess(messages));
    } catch (ex) {
        // failed fetching of users messages
        dispatch(fetchFail());
    }
}

// main fetching function, dispatches fetch start and reaches to the web with the fetch helper
export const fetch = (token) => {
    return dispatch => {
        dispatch(fetchStart());
        fetchMessage(dispatch, token);
    }
}