import { useHistory } from 'react-router-dom';

import classes from '../styles/lostPage.module.css';

function LostPage () {
    const { push } = useHistory();

    const buttonClickHandler = () => {
        push('/');
    }

    const registerClickHandler = () => {
        push('/register');
    }

    return (
        <div  className={ classes.container }>
            <div>
                <div>You seem lost in our domain, click the buttom to go home.</div>
                <button
                    style={{ border: '2px solid white', backgroundColor: 'rgb(214, 6, 214)', color: 'white' }}
                    onClick = { buttonClickHandler }
                >home</button>
                <button
                    className={ classes.reg }
                    onClick={ registerClickHandler }
                >register</button>
            </div>
        </div>
    )
}

export default LostPage;