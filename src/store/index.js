import {tinker, initialState} from './reducers/index'
import {getTinkerAction} from './actions/index'
import {createStore , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

let store = createStore(
  tinker, 
  initialState, 
  applyMiddleware(thunk))
store.dispatch(getTinkerAction());

const socket = new WebSocket('wss://api2.poloniex.com');
// Faz a inscrição ao Socket da poloniex
socket.addEventListener('open', function (event) {
    socket.send('{ "command": "subscribe", "channel": "1002" }');
});

// Criar o listener de evento sempre que receber uma atualização de algum dado
socket.addEventListener('message', function (event) {
    store.dispatch({type: 'UPDATE', payload: event.data});
});


export default store;