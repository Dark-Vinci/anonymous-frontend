import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { AiFillMessage } from 'react-icons/ai';

import Layout from "../components/layout";
import UserMessageCards from "../components/userMessageCards";
import classes from '../styles/message.module.css';
import { fetch } from '../store/action/message';


function Message ({ onFetch, token, messages, loading, error, userId }) {
    const [ printed, setPrinted ] = useState(false);
    const [ copied, setCopied ] = useState(false);

    useEffect(() => {
        onFetch(token);
        setPrinted(true);
    }, [token, onFetch]);   

    const copyHandler = () => {
        // generate the users message link
        // const url = `http://localhost:3000/send-message/${ userId }`;

        // !here we go 
        const url = `https://Dark-Vinci.github.io/anonymous-frontend/send-message/${ userId }`

        // copy to clipboard
        navigator.clipboard.writeText(url);

        // to change from [copy] to [copied]
        setCopied(true);
    }

    return (
        <div className={ classes.main }>
            <Layout>
                <div className={ classes.container }>
                    <div className={ classes.innercontainer }>
                        <div>Message 
                            <AiFillMessage 
                                color='white'
                                fontSize='60px'
                        /></div>
                        <div>
                            {/* for generating link for users friends to send messages */}
                            generate your anonymous link 
                            <button 
                                onClick={copyHandler}
                                style={{ border: '1px solid white', margin: '3px', borderRadius: '5px' }}
                            >{ copied ? 'copied': 'copy' }</button>
                        </div>
                        <div>
                            Here are the anonymous message youve recieved over the course of registering
                        </div>
                        { 
                            loading ?
                            // change the displayed message if there is an error or 
                            // data is still loading or data has been succesfully fetched
                                <h3> loading... </h3> :
                            error ?
                                <h3 style={{ color: 'red' }}> something went wrong</h3> :
                                printed && <div>
                                    { 
                                        messages.length === 0 ?
                                        // the user has no messages yet in the database
                                        <div>No message yet</div> :
                                        // users messages is one or more, the card of message would be displayed
                                        <UserMessageCards 
                                            data = { messages }
                                        />
                                    }
                                </div>
                                
                            }
                    </div>
                </div>
            </Layout>
        </div>
    )
}


// function that get the slice of the needed state from various stores
const mapStateToProps = state => {
    return {
        token: state.auth.token,
        messages: state.mesg.messages,
        loading: state.mesg.loading,
        error: state.mesg.error,
        userId: state.auth.userId
    }
}

// function that dispatch fetching of data in the store
const mapDispatchToProps = dispatch => {
    return {
        onFetch: (token) => dispatch(fetch(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Message);