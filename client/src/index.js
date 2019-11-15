import React from 'react';
import ReactDOM from 'react-dom';
import socketio from 'socket.io-client';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
/* eslint-disable */
ReactDOM.render(<App />, document.getElementById('root'));

const socket = socketio.connect('http://localhost:3000');
(() => {
    socket.emit('init', { name: 'bella' });
  
    socket.on('welcome', (msg) => {
      console.log(msg);
    });
})();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
