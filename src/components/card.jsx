import classes from '../styles/card.module.css';
import { FiCheck } from 'react-icons/fi';

function Card ({ heading, description }) {
    return (
        <div className={ classes.container }>
            <div className={ classes.p }>
                <FiCheck       
                    color='white' 
                    fontSize="40px"
                />
            </div>
            <h4>{ heading }</h4>
            <div className={ classes.d }>{ description }</div>
        </div>
    );
}

export default Card;