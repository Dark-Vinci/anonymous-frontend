import * as actionType from './actionType';
import axios from 'axios';

// action creator for starting registration
export const authStart = () => {
    return {
        type: actionType.REGISTER_START
    }
}

// action creator for failed registration
export const authFail = () => {
    return {
        type: actionType.REGISTER_FAIL
    }
}

// action creator for successful registration
export const authSuccess = (payload) => {
    return {
        type: actionType.REGISTER_SUCCESS,
        payload: payload
    }
}

// action creator for starting loging in
export const loginStart = () => {
    return {
        type: actionType.LOGIN_START
    }
}

// action creator for failed login
export const loginFail = (error) => {
    return {
        type: actionType.LOGIN_FAIL,
        error: error
    }
}

// action creator for successful login
export const loginSuccess = (payload) => {
    return {
        type: actionType.LOGIN_SUCCESS,
        payload: payload
    }
}

// action creator for signing in automatically
export const autoSign = (payload) => {
    return {
        type: actionType.AUTO_SIGN,
        payload: payload
    }
}

// action creator for logging users out
export const logout = () => {
    // remove the id, token and exipration date from local storage
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');

    return {
        type: actionType.LOGOUT
    }
}

// expiry logout timout dispatcher
// export const countDown = (time) => {
//     console.log('time', time);
//     // console.log(dispatch);
//     const realTime = time * 1000

//     return dispatch => {
//         setTimeout(() => {
//             console.log('here')
//             dispatch(logout());
//         }, realTime);
//     }
// }

export const countDown = (time) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, time * 1000000);
    }
}

// asynchrous registration function helper
async function register (load, dispatch, push) {
    try {
        // post to the server
        // const response = await axios.post('http://localhost:2020/api/register', load);

         // !here we go
        const response = await axios.post(`https://proj-ano-tex-v1w9.herokuapp.com/api/register`, load);

        // set token, id and expiration date
        const token = response.headers['x-auth-token'];
        const id = response.data.user._id;
        const expiresIn = +response.data.expiresIn;

        console.log(expiresIn);
        // console.log(id)

        // calculate the expiration date in milliseconds
        const expiryDate = (new Date()).getTime() + expiresIn * 1000;

        const payload = { id, token }

        // store id, token, exipration date in local storage
        localStorage.setItem('id', id);
        localStorage.setItem('token', token);
        localStorage.setItem('expiryDate', expiryDate);

        // dispatch authenication success and logout countdown
        dispatch(authSuccess(payload));
        // dispatch(countDown(expiresIn));

        // redirect to /my-messages
        push('/my-messages');
    } catch (ex) {
        // dispatch failure to register
        dispatch(authFail());
    }
}

async function login (load, dispatch, push) {
    try {
        // post login request to the server
        // const response = await axios.post('http://localhost:2020/api/login', load);

        // !here we go
        const response = await axios.post(`https://proj-ano-tex-v1w9.herokuapp.com/api/login`, load);

        // set token, id, expiresIn
        const token = response.headers['x-auth-token'];
        const id = response.data.user._id;
        const expiresIn = +response.data.expiresIn;

        // set the expiration date in milliseconds
        const expiryDate = (new Date()).getTime() + expiresIn * 1000;

console.log('expires in', expiresIn);
        // payload for successful login
        const payload = { id, token }

        // set the id, token and expirationdate in the local storage
        localStorage.setItem('id', id);
        localStorage.setItem('token', token);
        localStorage.setItem('expiryDate', expiryDate); 

        // dispatch login and countdown for logging out when token expires
        dispatch(loginSuccess(payload));
        dispatch(countDown(expiresIn));

        push('/my-messages');
    } catch (ex) {
        // dispatch login failure
        dispatch(loginFail(ex.message));
    }
}

// dispatch login start and reaches out to the web with the login helper
export const onLogin = (payload, push) => {
    return dispatch => {
        dispatch(loginStart());
        login(payload, dispatch, push);
    }
}

// dispatch register start and reaches out to the web with the register helper
export const auth = ( payload, push ) => {
    return dispatch => {
        dispatch(authStart());
        register(payload, dispatch, push);
    }
}

// dispatch for auto logging in of the user when the site is visited
export const autoLogin = () => {
    return dispatch => {
        // get the token, id and expiry date from the loacl storage
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');
        const expiryDate = localStorage.getItem('expiryDate');
        const dateInSeconds = +expiryDate

        if (!token || !id) {
            // dispatch logout if theres is no token or id in the localstorage
            console.log('if1')
            dispatch(logout());
        } else {
            if (dateInSeconds < (new Date().getTime())) {
                // dispatch logout if the token has expired
                console.log('if2')
                dispatch(logout());
            } else {
                // get the time left in milliseconds
                const timeLeft = dateInSeconds - (new Date().getTime());
                console.log('if3')

                const payload = { id, token }

                // dispatch autoSignIn and logout countdown timer 
                dispatch(autoSign(payload));
                dispatch(countDown(timeLeft / 1000));
            }
        }
    }
}