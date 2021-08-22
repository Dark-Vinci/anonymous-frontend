import * as actionType from './actionType';
import axios from 'axios';

export const sendStart = () => {
    return {
        type: actionType.MESSAGE_SEND_START
    }
}

export const sendFail = () => {
    return {
        type: actionType.MESSAGE_SEND_FAIL
    }
}

export const sendSuccess = () => {
    return {
        type: actionType.MESSAGE_SEND_SUCCESS
    }
}

async function sendHelper ( payload, dispatch ) {
    try {
        const message = { message: payload.message }
        const response = await axios.post(`http://localhost:2020/api/send-message/${ payload.userId }`, message);
        console.log(response);
        dispatch(sendSuccess());
    } catch (ex) {
        dispatch(sendFail());
    }
}

export const send = (payload) => {
    return dispatch => {
        dispatch(sendStart());
        sendHelper(payload, dispatch);
    }
}