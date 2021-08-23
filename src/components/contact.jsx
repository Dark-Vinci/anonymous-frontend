import classes from '../styles/contact.module.css';
import { FaGithub, FaTwitterSquare } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

function Contact () {
    return (
        <div className={ classes.container }>
            <div className={ classes.mini }>
                <p>Reach us on the social media below[web]. follow, like and share our post</p>
                <ul>
                    <li><FaGithub color='white' fontSize='30px'/></li>
                    <li><MdEmail color='aqua' fontSize='30px'/></li>
                    <li><FaTwitterSquare color='blue' fontSize='30px'/></li>
                </ul>
            </div>
        </div>
    );
}

export default Contact;