import { useState, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import checkValidity from '../utils/validation';
import Footer from "../components/footer";
import classes from '../styles/login.module.css';
import { onLogin } from '../store/action/authCreator';


// , loading, error, loggedIn 
function Login ({ login }) {
    const [ enabled, setEnabled ] = useState(false);
    const { push } = useHistory();

    // email change reucer function
    const emailReducer = ( state, event ) => {
        // requirement for a valid email input
        const rules = {
            required: true,
            isEmail: true
        }

        // check if the email input is valid
        const validity = checkValidity(event.target.value, rules);

        return {
            ...state,
            value: event.target.value,
            valid: validity
        }
    }

    // password change reducer
    const passwordReducer = ( state, event ) => {
        // requirement for a valid password
        const rules = {
            required: true,
            minLength: 6,
            maxLength: 30
        }

        // check if the input is valid
        const validity = checkValidity(event.target.value, rules);

        return {
            ...state,
            value: event.target.value,
            valid: validity
        }
    }

    // setting the email and password reducer with useReducer
    const [ email, emailDispatch ] = useReducer(emailReducer, { value: '', valid: false });
    const [ password, passwordDispatch ] = useReducer(passwordReducer, { value: '', valid: false });

    // function that checks is the button should be enabled
    const buttonChangeHandler = () => {
        const extracted = email.valid && password.valid;
        setEnabled(extracted);
    }

    // function that is called when the forms submit button is clicked
    const onSubmitFormHandler = (event) => {
        event.preventDefault();

        // data to be sent
        const tosend = { email: email.value, password: password.value }

        // send to backend, push is also passed so that when the login 
        // is successful, the user should be redirected to messages page
        login(tosend, push);
    }

    // handler for redirecting the user to the register page
    const registerButtonHandler = () => {
        push('/register');
    }

    return (
        <div className={classes.main}>
            <div className={ classes.container }>
                <h3>Login</h3>
                <div>
                    Recieve anonymous compliments from your friends,
                    and send anonymous messages to your friend for free.
                </div>

                <form 
                    onSubmit={ onSubmitFormHandler }
                    className={ classes.form }
                >
                    <div>
                        {/* <label>your email</label> */}
                        <input 
                            type="email" 
                            placeholder='email: johnDoe@gmail.com'
                            value={ email.value }
                            onChange= { (event) => {
                                emailDispatch(event);
                                buttonChangeHandler();
                            } }
                        />
                    </div>

                    <div>
                        {/* <label htmlFor="password">your password</label> */}
                        <input 
                            type="password" 
                            value={ password.value }
                            placeholder='Your password'
                            onChange={ (event) => {
                                passwordDispatch(event);
                                buttonChangeHandler();
                            } }
                        />
                    </div>

                    <button
                        disabled={ !enabled }
                    >login</button>
                </form>

                <div>Dont have an account? <button onClick={ registerButtonHandler }>register</button></div>
            </div>
            <Footer />
        </div>
    );
}

// fucntion that helps to get needed slices of states from the store
const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        loggedIn: state.auth.token !== ''
    }
}

// function that help dispatch loging in of the user
const mapDispatchToProps = (dispatch) => {
    return {
        login : (payload, push) => dispatch(onLogin(payload, push))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);