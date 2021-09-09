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
  // trying to autologin when the components has been printed in the dom

  // useEffect(() => {
    login();
  // }, [login]);

  return (
    <div className="App">
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

        <Route path='/send-message/:userId' component= { SendMessages } />

        <Route path='/contact' exact>
          <Contact />
        </Route>

        <Route path='/home' exact>
          <Home />
        </Route>

        {
          // to allow only logged in user to be redirected to 
          // their messages page when any unkown part of the url is visited
          // loggedIn ? ( 
          //   <Route path='/my-messages'>
          //     <Messages />
          //   </Route>
          // ): null

           <Route path='/my-messages' component= { Messages } />
        } 

        {/* <Route>
          <LostPage />
        </Route> */}
      </Switch>

      {/* <Route>
          <LostPage />
        </Route> */}
    </div>
  );
}

// function that check if the user is logged in by comapring
// if the auth token in the store is not an empty string
const mapStateToProps = (state) => {
  return {  
    loggedIn: state.auth.token !== ''
  }
}

// function that help to dispatch auto login
const mapDispatchToProps = (dispatch) => {
  return {
    login: () => dispatch(autoLogin())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
