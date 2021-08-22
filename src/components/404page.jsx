import { useHistory } from 'react-router-dom';

import classes from '../styles/lostPage.module.css';

function LostPage () {
    const { push } = useHistory();

    const buttonClickHandler = () => {
        push('/');
    }
    return (
        <div  className={ classes.container }>
            <div>
                <div>You seem lost in our domain, click the buttom to go home.</div>
                <button
                    onClick = { buttonClickHandler }
                >home</button>
            </div>
        </div>
    )
}

export default LostPage;