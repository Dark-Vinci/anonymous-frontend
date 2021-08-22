import { useHistory, withRouter } from 'react-router-dom';

import classes from '../styles/menu.module.css';

function Menu () {
    const menuItems = ['Home', 'Contact', 'Register', 'Login'];
    const { push } = useHistory();

    const clickHandler = (location) => {
        push(location);
    }

    return (
        <nav className={ classes.container } style={{ zIndex: 200 }}>
            <ul>
                { menuItems.map(menuItem => {
                    return (<li
                        onClick = { () => clickHandler(menuItem) }
                        key = { menuItem }
                    >
                        { menuItem }
                    </li>);
                })}
            </ul>
        </nav>
    );
}

export default withRouter(Menu);