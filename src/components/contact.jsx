import classes from '../styles/contact.module.css';

function Contact () {
    return (
        <div className={ classes.container }>
            <p>Reach us on the social media below[web]. follow, like and share our post</p>
            <div>
                <i>instagram</i>
                <i>facebook</i>
                <i>github</i>
                <i>twitter</i>
            </div>
        </div>
    );
}

export default Contact;