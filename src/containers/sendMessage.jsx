import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';

import Layout from '../components/layout';
import checkValidity from '../utils/validation';
import classes from '../styles/snedMessage.module.css';
import { send } from '../store/action/sendMessage';

function SendMessages ({ onSend, sent, match, loading, error }) {
    useEffect(() => {
        console.log(match)
    }, [match]);

    const [ enabled, setEnabled ] = useState(false);
    const [ input, setInput ] = useState('');
    const { push } = useHistory();

    const inputChangeHandler = (event) => {
        setInput(event.target.value);
        const toSet = checkValidity(
            event.target.value, 
            { minLength: 1, required: true, maxLength: 250 }
        );
        setEnabled(toSet);
    }

    const onSubmitFormHandler = (event) => {
        event.preventDefault();
        const toSend = { message: input, userId: match.params.userId };
        console.log(toSend);
        setInput('');
        onSend(toSend);
    }

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
                            <form
                                onSubmit={ onSubmitFormHandler }
                            >
                                <div>
                                    <label htmlFor="">Leave an anonymous message for {'user'}</label>
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
        <Redirect to='/home' />
    );
}


const mapStateToProps = ( state ) => {
    return {
        sent: state.send.sent,
        loading: state.send.loading,
        error: state.send.error
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return {
        onSend: (payload) => dispatch(send(payload))
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(SendMessages);