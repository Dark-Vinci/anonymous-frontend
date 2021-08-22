import { useEffect, useState } from "react";
import { connect } from 'react-redux';

import Layout from "../components/layout";
import UserMessageCards from "../components/userMessageCards";
import classes from '../styles/message.module.css';
import { fetch } from '../store/action/message';


function Message ({ onFetch, token, messages, loading, error, userId }) {
    const [ copied, setCopied ] = useState(false)
    useEffect(() => {
        onFetch(token);
    }, [token, onFetch]);

    const copyHandler = () => {
        // the user url;
        console.log(userId);
        const url = `http://localhost:2020/api/send/${ userId }`;
        navigator.clipboard.writeText(url);
        setCopied(true);
    }

    return (
        <div className={ classes.main }>
            <Layout>
                <div className={ classes.container }>
                    <div className={ classes.innercontainer }>
                        <div>Message[icon]</div>
                        <div>
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
                            // !spinner
                                <h3> loading... </h3> :
                            error ?
                                <h3 style={{ color: 'red' }}> something went wrong</h3> :
                                <div>
                                    { hh().length === 0 ? 
                                        // messages.length == 0 ?
                                        <div>No message yet</div> :
                                        <UserMessageCards 
                                            data={ hh() }
                                            // data = { messages }
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

// dummy
function hh () {
    return [
        {
            createdAt: '2020',
            message: 'i wan marry you'
        },
        {
            createdAt: '2021',
            message: 'i wan marry you, but you too like shakara'
        }, 
        {
            createdAt: '2022',
            message: 'i wan marry you, but you too like shakara, you go dey alright last last'
        },
        {
            createdAt: '202n',
            message: 'i wan marry you, but you too like shakara, you go dey alright last last'
        }
    ]
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        messages: state.mesg.messages,
        loading: state.mesg.loading,
        error: state.mesg.error,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetch: (token) => dispatch(fetch(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Message);