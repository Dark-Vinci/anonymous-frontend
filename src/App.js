import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useEffect } from 'react';

import './App.css';
import LostPage from './components/404page';
import Home from './containers/home';
import Login from './containers/login';
import Register from './containers/register';
import Messages from './containers/message';
import SendMessages from './containers/sendMessage';
import { autoLogin } from './store/action/authCreator';
import Contact from './components/contact';


function App({ loggedIn, login }) {
  useEffect(() => {
    login();
  }, [login]);

  return (
    <div className="App">
      {
        loggedIn && (
          <Route>
            <Messages />
          </Route>
        )
      }

      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>

        <Route path='/register' exact>
          <Register />
        </Route>

        <Route path='/login' exact>
          <Login />
        </Route>

        {
          loggedIn && (
            <Route path='/my-messages' exact>
              <Messages />
            </Route>
          )
        }

        <Route path='/send-message/:userId' component= { SendMessages } />

        <Route path='/contact' exact>
          <Contact />
        </Route>

        <Route path='/home' exact>
          <Home />
        </Route>

        <Route>
          <LostPage />
        </Route>
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {  
    loggedIn: state.auth.token !== ''
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: () => dispatch(autoLogin())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
