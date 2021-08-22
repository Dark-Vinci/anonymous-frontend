

import Menu from "./menu";
import classes from '../styles/header.module.css';

function Header ({ clicked, open }) {
    return (
        <div className={ classes.main }>
            <div className={ classes.container }>
                <h2>AnonText</h2>
                <i
                    onClick={ clicked }
                >menu</i>
            </div>
            <div className={ classes.menu }>
                { open && <Menu /> }
            </div>
        </div>
    );
}

export default Header;