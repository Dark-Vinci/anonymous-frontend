import classes from '../styles/footer.module.css';

function Footer () {
    return (
        <footer className={ classes.container }>
            <div>Made with love [i] by Tomiwa</div>
            <div>
                <p>Contacts</p>
                <ul>
                    <li>[i]: 09034119761</li>
                    <li>[i] github</li>
                    <li>[i] email</li>
                    <li>[i] twitter</li>
                </ul>
            </div>
            <div>copyright [c] { (new Date()).getFullYear() }- tomiwa tech</div>
            <div>Shout out to Momoh Philip</div>
        </footer>
    );
}

export default Footer;