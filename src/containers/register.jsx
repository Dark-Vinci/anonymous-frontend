import { useReducer, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import Footer from "../components/footer";
import checkValidity from '../utils/validation';
import classes from '../styles/login.module.css';
import {auth} from '../store/action/authCreator';

function Register ({ onAuth, error }) {
    const [ enabled, setEnabled ] = useState(false);
    const { push } = useHistory();

    // ruducer function for email states
    const emailReducer = ( state, event ) => {
        // defining rules for a valid email input
        const rules = {
            required: true,
            isEmail: true
        }

        // checking the validity of the input
        const validity = checkValidity(event.target.value, rules);

        return {
            ...state,
            value: event.target.value,
            valid: validity
        }
    }

    // ruducer function for password states
    const passwordReducer = ( state, event ) => {
        // defining the rules for a valid password
        const rules = {
            required: true,
            minLength: 6,
            maxLength: 30
        }

        // checking the validity of the inut
        const validity = checkValidity(event.target.value, rules);

        return {
            ...state,
            value: event.target.value,
            valid: validity
        }
    }
    // connectinf the reducer function with the state using useReducer
    const [ email, emailDispatch ] = useReducer(emailReducer, { value: '', valid: false });
    const [ password, passwordDispatch ] = useReducer(passwordReducer, { value: '', valid: false });

    // function for cheching if the register button should be enabled or not
    const buttonChangeHandler = () => {
        const extracted = email.valid && password.valid;
        setEnabled(extracted);
    }

    // function that is called when the submit button in the form is clicked
    const onSubmitFormHandler = (event) => {
        event.preventDefault();

        // data to be sent
        const toSend = {
            email: email.value,
            password: password.value
        }

        // send the data to the backend withe the help if actio creatir and the store
        onAuth(toSend, push);
    }

    // handler for changing the page to login page
    const loginButtonHandler = () => {
        push('/login');
    }

    return (
        <div className={classes.main}>
            <div className={ classes.container }>
                <h3>Register</h3>
                <div>
                    Recieve anonymous compliments from your friends, 
                    and send anonymous messages to your friend for free.
                </div>

                <form
                    onSubmit={ onSubmitFormHandler }
                    className={ classes.form }
                >
                    <div>
                        { error && <p 
                                style={{ color: 'red', fontWeight: 'bold', fontSize: '23px' }}
                            >something went wrong</p>
                        }
                        {/* <label htmlFor="email">Email</label> */}
                        <input 
                            type="email" 
                            placeholder='johnDoe@gmail.com'
                            value={ email.value }
                            onChange= { (event) => {
                                emailDispatch(event);
                                buttonChangeHandler();
                            } }
                        />
                    </div>

                    <div>
                        {/* <label htmlFor="password">Password</label> */}
                        <input 
                            type="password" 
                            placeholder='Your password'
                            value={ password.value }
                            onChange={ (event) => {
                                passwordDispatch(event);
                                buttonChangeHandler();
                            } }
                        />
                    </div>

                    <button
                        disabled={ !enabled }
                    >Register</button>
                </form>

                <div>Have an account?<button onClick={ loginButtonHandler }>login</button></div>
            </div>

            <Footer />
        </div>
    );
}

// function that map the needed slices of the states needed from the stores
const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
} 

// function that help dispatch registering action in the store
const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (payload, push) => {
            return dispatch(auth(payload, push))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);