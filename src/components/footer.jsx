import classes from '../styles/footer.module.css';
import { FaGithub, FaTwitterSquare, FaPhoneSquare, FaCopyright, FaHeart } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

function Footer () {
    return (
        <footer className={ classes.container }>
            <div>Made with love <FaHeart color='red' fontSize='20px'/> by Tomiwa</div>
            <div>
                <p>Contacts</p>
                <ul>
                    <li><FaPhoneSquare color='yellow' fontSize='30px'/> 09034119761</li>
                    <li><FaGithub color='white' fontSize='30px'/>   github</li>
                    <li><MdEmail color='aqua' fontSize='30px'/>    email</li>
                    <li><FaTwitterSquare color='blue' fontSize='30px'/>    twitter</li>
                </ul>
            </div>
            <div>copyright <FaCopyright /> { (new Date()).getFullYear() }- tomiwa tech</div>
            <div>Shout out to Momoh Philip</div>
        </footer>
    );
}

export default Footer;