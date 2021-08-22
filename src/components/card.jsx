import classes from '../styles/card.module.css';

function Card ({ heading, description }) {
    return (
        <div className={ classes.container }>
            <div className={ classes.p }>
                [icon]
            </div>
            <h4>{ heading }</h4>
            <div className={ classes.d }>{ description }</div>
        </div>
    );
}

export default Card;