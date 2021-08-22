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
            <div className={ classes.menu }
                style={{ 
                    // height: opened ? 'auto' : '0px', 
                    border: '2px solid red',
                    transition: 'transform 0.9s',
                    transfrom: opened ? 'translateY(-25px)' : 'translateY(0px)'
                    // display: 'flex',
                    // justifyContent: 'center',
                    // alignItems: 'center'
                }}
            >  
                { opened && <Menu /> }
                {/* <Menu /> */}
            </div>
        </div>
    );
}

export default Header;