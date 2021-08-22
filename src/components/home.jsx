import { useHistory } from 'react-router-dom';

import classes from '../styles/home.module.css';
import Cards from "./cards";
import Layout from "./layout";
import content from '../utils/body';

function Home () {
    const { push } = useHistory();

    const startButtonHandler = () => {
        push('/register');
    }
    return (
        <Layout>
            <div className={ classes.container }>
                <header>
                    <h3>Send secrete anonymous messages online</h3>
                    <div>
                        AnonText is an interactive anonymous messaging
                        website with a dare game. Create your Profile Link
                        and send it to all your contacts to check what your 
                        friends think about you. With AnonText, you can 
                        send and recieve anonymous compliments easily for free
                    </div>
                    <button
                        onClick={ startButtonHandler }
                    >start now</button>
                </header>

                <main>
                    <h3>Why use AnonText?</h3>
                    <div>
                        Our Anonymous messaging website comes with alot of
                        great features.Here we are going to list a few of them. Have a look.
                    </div>
                    <Cards 
                        data = { content() }
                    />
                </main>

                <main>
                    <h3>App screenshots</h3>
                    <div>
                        Out of all other Anonymous Messaging and Anonymous feedback apps 
                        our User Interface is much easier to use.
                    </div>
                </main>
            </div>
        </Layout>
    );
}

export default Home;