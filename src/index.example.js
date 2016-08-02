import React from 'react';
import ReactDOM from 'react-dom';

import Firebase from 'firebase';

import App from './App';
import './index.css';

// Initialize Firebase
var config = {
  apiKey: "xxxxxx",
  authDomain: "xxxxxx",
  databaseURL: "xxxxxx",
  storageBucket: "xxxxxx",
};
Firebase.initializeApp(config);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
