import Footer from "./footer";
import Header from "./header";


function Layout ({ children }) {
    return (
        <div style={{ overflowX: 'hidden',
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Header />
            { children }
            <Footer />
        </div>
    );
}

export default Layout;