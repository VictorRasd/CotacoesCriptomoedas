import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore , applyMiddleware} from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import {tinker, initialState} from './store/reducers/index'
import {getTinkerAction} from './store/actions/index'


let store = createStore(
  tinker, 
  initialState, 
  applyMiddleware(thunk))
store.dispatch(getTinkerAction());

const socket = new WebSocket('wss://api2.poloniex.com');
socket.addEventListener('open', function (event) {
    socket.send('{ "command": "subscribe", "channel": "1002" }');
});
socket.addEventListener('message', function (event) {
    store.dispatch({type: 'UPDATE', payload: event.data});
});


export default store;


ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,  
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
