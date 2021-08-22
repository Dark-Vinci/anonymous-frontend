import { Switch, Route } from 'react-router-dom';

import './App.css';
import LostPage from './components/404page';
import Home from './components/home';
import Login from './containers/login';
import Register from './containers/register';
import Messages from './containers/message';
import SendMessages from './containers/sendMessage';


function App() {
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

        <Route path='/my-messages' exact>
          <Messages />
        </Route>

        <Route path='/send-message' exact>
          <SendMessages />
        </Route>

        <Route>
          <LostPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
