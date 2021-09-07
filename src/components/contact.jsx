import classes from '../styles/contact.module.css';
import { FaGithub, FaTwitterSquare } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

function Contact () {
    return (
        <div className={ classes.container }>
            <div className={ classes.mini }>
                <p>Reach us on the social media below[web]. follow, like and share our post</p>
                <ul>
                    <li>
                        <a href='https://github.com/Dark-Vinci' target='blank'>
                            <FaGithub color='white' fontSize='30px'/>
                        </a>
                    </li>
                    <li>
                        <a href="https://mail.google.com/mail/u/?authuser=ademolaolutomiwa4real@gmail.com" target='blank'>
                            <MdEmail color='aqua' fontSize='30px'/>
                        </a>
                    </li>

                    <li>
                        <a href="https://twitter.com/Tomiwa92699291" target='blank'>
                            <FaTwitterSquare color='blue' fontSize='30px'/>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Contact;