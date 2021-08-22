import { useReducer, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import Footer from "../components/footer";
import checkValidity from '../utils/validation';
import classes from '../styles/login.module.css';
import {auth} from '../store/action/authCreator';

function Register (props) {
    const [ enabled, setEnabled ] = useState(false);
    const { push } = useHistory();

    const emailReducer = ( state, event ) => {
        const rules = {
            required: true,
            isEmail: true
        }
        const validity = checkValidity(event.target.value, rules);

        return {
            ...state,
            value: event.target.value,
            valid: validity
        }
    }

    const passwordReducer = ( state, event ) => {
        const rules = {
            required: true,
            minLength: 6,
            maxLength: 30
        }
        const validity = checkValidity(event.target.value, rules);

        return {
            ...state,
            value: event.target.value,
            valid: validity
        }
    }
    const [ email, emailDispatch ] = useReducer(emailReducer, { value: '', valid: false });
    const [ password, passwordDispatch ] = useReducer(passwordReducer, { value: '', valid: false });

    const buttonChangeHandler = () => {
        const extracted = email.valid && password.valid;
        setEnabled(extracted);
    }

    const onSubmitFormHandler = (event) => {
        event.preventDefault();

        const toSend = {
            email: email.value,
            password: password.value
        }

        props.onAuth(toSend, push);
    }

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
                        { props.err && <p 
                                style={{ color: 'red', fontWeight: 'bold', fontSize: '23px' }}
                            >something went wrong</p>
                        }
                        <label htmlFor="email">Email</label>
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
                        <label htmlFor="password">Password</label>
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

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
} 

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (payload, push) => {
            return dispatch(auth(payload, push))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);