import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const app = (
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

ReactDOM.render( app, document.getElementById('root') );

reportWebVitals();
