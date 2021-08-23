import {  useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';

import Layout from '../components/layout';
import checkValidity from '../utils/validation';
import classes from '../styles/snedMessage.module.css';
import { send } from '../store/action/sendMessage';

function SendMessages ({ onSend, sent, match, loading, error }) {
    const [ enabled, setEnabled ] = useState(false);
    const [ input, setInput ] = useState('');
    const { push } = useHistory();

    const inputChangeHandler = (event) => {
        // seting the input value
        setInput(event.target.value);

        // checking if the input is valid
        const toSet = checkValidity(
            event.target.value, 
            { minLength: 2, required: true, maxLength: 250 }
        );

        setEnabled(toSet);
    }

    // function that is called when the form is submitted
    const onSubmitFormHandler = (event) => {
        event.preventDefault();
        const toSend = { message: input, userId: match.params.userId };
        
        // empty the input element
        setInput('');

        onSend(toSend);
    }

    // function that direct user to the register page
    const registerClickHandler = () => {
        push('/register');
    }

    return (
        match.params.userId ?
        <div className={ classes.main }>
            <Layout>
                <div className={ classes.container }>
                    <div>
                        <h3>AnonText</h3>
                    </div>
                    { 
                        !sent ?
                            // to check if the form has not been filled
                            <form
                                onSubmit={ onSubmitFormHandler }
                            >
                                <div>
                                    <label htmlFor="">Leave an anonymous message for {'user'}</label>
                                    {/* checking for error to know the right message to display */}
                                    { error ? <h3 style={{ color: 'red' }}>something went wrong</h3> : null }
                                    <textarea 
                                        name="" id="" cols="30" rows="8"
                                        placeholder='leave a message'
                                        value={ input }
                                        onChange={ inputChangeHandler }
                                    >
                                    </textarea>
                                </div>
                                <button
                                    disabled={ !enabled }
                                    style={{ marginBottom: '40px' }}
                                >{ loading ? 'sending...': 'send'}</button>   
                            </form> :

                                // would be shown when the user submit a message, justo to make the user also register
                            <div>
                                <div>know what people also think about you anonymously?, click the buttom below to get started</div>
                                <button
                                    onClick={ registerClickHandler }
                                >register</button>
                            </div> 
                    }
                </div>
            </Layout>
        </div> : 
        // to redirect the user to the home page if theres is no user id in the url
        <Redirect to='/home' />
    );
}

// function that maps the needed state to what we have in redux store
const mapStateToProps = ( state ) => {
    return {
        sent: state.send.sent,
        loading: state.send.loading,
        error: state.send.error
    }
}

// function that maps the sending function to an action in the store
const mapDispatchToProps = ( dispatch ) => {
    return {
        onSend: (payload) => dispatch(send(payload))
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(SendMessages);