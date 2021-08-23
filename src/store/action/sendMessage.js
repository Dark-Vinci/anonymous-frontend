import * as actionType from './actionType';
import axios from 'axios';

// action creator for sending a user a message
export const sendStart = () => {
    return {
        type: actionType.MESSAGE_SEND_START
    }
}

// action creator for failed sending message
export const sendFail = () => {
    return {
        type: actionType.MESSAGE_SEND_FAIL
    }
}

// action creator for a successful sending of message
export const sendSuccess = () => {
    return {
        type: actionType.MESSAGE_SEND_SUCCESS
    }
}

// aysnc function for sending the message, reaches out to the web with axios
async function sendHelper ( payload, dispatch ) {
    try {
        // sending the message
        const message = { content: payload.message }
        const response = await axios.post(`http://localhost:2020/api/user/send-message/${ payload.userId }`, message);

        console.log(response);
        // successful sending
        dispatch(sendSuccess());
    } catch (ex) {
        // failure in sending the message
        dispatch(sendFail());
    }
}

// main dispatcher for sending the message
export const send = (payload) => {
    return dispatch => {
        dispatch(sendStart());
        sendHelper(payload, dispatch);
    }
}