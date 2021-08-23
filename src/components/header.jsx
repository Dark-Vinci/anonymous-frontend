import { useContext } from 'react';

import MenuContext from '../context/menucontext';
import Menu from "./menu";
import classes from '../styles/header.module.css';

function Header () {
    const { opened, openAction } = useContext(MenuContext);

    return (
        <div className={ classes.main }>
            <div className={ classes.container }>
                <h2
                    style={{ marginLeft: '20px' }}
                >AnonText</h2>
                <div
                    className={ classes.icon }
                    onClick={ openAction }
                >
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div className={ classes.menu }>  
                { opened && <Menu /> }
            </div>
        </div>
    );
}

export default Header;