import Footer from "./footer";
import Header from "./header";


function Layout ({ children }) {
    return (
        <div style={{ overflowX: 'hidden' }}>
            <Header />
            { children }
            <Footer />
        </div>
    );
}

export default Layout;