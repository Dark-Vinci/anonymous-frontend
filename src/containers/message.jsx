import Layout from "../components/layout";
import UserMessageCards from "../components/userMessageCards";
import classes from '../styles/message.module.css';

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

function Message () {
    return (
        <div className={ classes.main }>
            <Layout>
                <div className={ classes.container }>
                    <div className={ classes.innercontainer }>
                        <div>Message[icon]</div>
                        <div>
                            Here are the anonymous message youve recieved over the course of registering
                        </div>
                        <div>
                            { hh().length === 0 ? 
                                <div>No message yet</div> :
                                <UserMessageCards 
                                    data={ hh() }
                                />
                            }
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default Message;