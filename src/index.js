import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import authReducer from './store/reducer/auth';
import messageReducer from './store/reducer/message';
import sendReducer from './store/reducer/sendMessage';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const combinedReducer = combineReducers({
  auth: authReducer,
  mesg: messageReducer,
  send: sendReducer
});
const store = createStore(combinedReducer, composeEnhancer(applyMiddleware(thunk)));

const app = (
  <React.StrictMode>
    <Provider store={store}>
      <Router basename='/anonymous-frontend'>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);

ReactDOM.render( app, document.getElementById('root') );

reportWebVitals();
