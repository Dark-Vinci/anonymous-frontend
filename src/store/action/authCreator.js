import * as actionType from './actionType';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionType.REGISTER_START
    }
}

export const authFail = () => {
    return {
        type: actionType.REGISTER_FAIL
    }
}

export const authSuccess = (payload) => {
    return {
        type: actionType.REGISTER_SUCCESS,
        payload: payload
    }
}

export const loginStart = () => {
    return {
        type: actionType.LOGIN_START
    }
}

export const loginFail = (error) => {
    return {
        type: actionType.LOGIN_FAIL,
        error: error
    }
}

export const loginSuccess = (payload) => {
    return {
        type: actionType.LOGIN_SUCCESS,
        payload: payload
    }
}

export const autoSign = (payload) => {
    return {
        type: actionType.AUTO_SIGN,
        payload: payload
    }
}

export const countDown = (time, dispatch) => {
    setTimeout(() => {
        dispatch(logout());
    }, time * 1000)
}

async function register (load, dispatch, push) {
    try {
        const response = await axios.post('http://localhost:2020/api/register', load);
        const token = response.headers['x-auth-token'];
        const id = response.body._id;
        const payload = {
            id,
            token
        }
        console.log(response);
        console.log(payload);

        localStorage.setItem('id', id);
        localStorage.setItem('token', token);
        localStorage.setItem('expiresIn', 2000); //faulty

        dispatch(authSuccess(payload));
        dispatch(countDown(2000, dispatch));
        push('/generate-link');
    } catch (ex) {
        dispatch(authFail());
    }
}

async function login (load, dispatch, push) {
    try {
        const response = await axios.post('http://localhost:2020/api/login', load);
        const token = response.headers['x-auth-token'];
        const id = response.body._id;
        const payload = {
            id,
            token
        }
        console.log(response);
        console.log(payload)

        localStorage.setItem('id', id);
        localStorage.setItem('token', token);
        localStorage.setItem('expiresIn', 2000); // faulty

        dispatch(loginSuccess(payload));
        dispatch(countDown(2000, dispatch));
        push('/my-messages');
    } catch (ex) {
        dispatch(loginFail(ex.message));
    }
}

export const logout = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');

    return {
        type: actionType.LOGOUT
    }
}

export const onLogin = (payload, push) => {
    return dispatch => {
        dispatch(loginStart());
        login(payload, dispatch, push);
    }
}

export const auth = ( payload, push ) => {
    return dispatch => {
        dispatch(authStart());
        register(payload, dispatch, push);
    }
}

export const autoLogin = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');
        const expiresIn = localStorage.getItem('expiresIn');

        if (!token || !id) {
            dispatch(logout());
        } else {
            if (+expiresIn < (new Date().getTime())) {
                dispatch(logout());
            } else {
                const payload = { id, token }
                dispatch(autoSign(payload));
            }
        }
    }
}