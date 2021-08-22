import { useReducer, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Footer from "../components/footer";
import checkValidity from '../utils/validation';
import classes from '../styles/login.module.css';

function Register () {
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

        const tosend = {
            email: email.value,
            password: password.value
        }
        console.log(tosend);

        // send to backend 
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

export default Register;