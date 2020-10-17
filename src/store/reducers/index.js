import {TINKER_FAILED, TINKER_RECEIVED,TINKER_REQUESTED, UPDATE } from '../actions/index'
import currencyPairs from '../../server/TickerServer'

const initialState = { data: [], status:"" };

function tinker(state = initialState, action) {
  switch (action.type) {
    case TINKER_REQUESTED:
      state = Object.assign({}, state, {status: "waiting"});
      break;
    case TINKER_RECEIVED:
      state = createInitialData(state, action.payload);
      break;
    case TINKER_FAILED:
      state = Object.assign({}, state, {status: "failed", error: action.payload});
      break;
    case UPDATE:
      state = searchCurrencyAndUpdate(state, action.payload);
      break;
    default:
      return state;
  }
  
  return state;
}

// Esse método cria o array inicial de dados com todas as transações, deixando somente para o searchCurrencyAndUpdate()
// atualizar
function createInitialData(state, data){
  let allCurrencies = [];
  let currency = {};
  currencyPairs.forEach(currencyName => {
    if(data[currencyName] !== undefined){
      currency = {
        name: currencyName,
        id: data[currencyName].id,
        last: data[currencyName].last,
        lowestAsk: data[currencyName].lowestAsk,
        highestBid: data[currencyName].highestBid,
        percentChange: data[currencyName].percentChange,
        baseVolume: data[currencyName].baseVolume,
        quoteVolume: data[currencyName].quoteVolume,
        isFrozen: data[currencyName].isFrozen,
        high24hr: data[currencyName].high24hr,
        low24hr: data[currencyName].low24hr,
      }
      allCurrencies.push(currency);
    }
  });
  return Object.assign({}, state, {data: allCurrencies, status: "received"});
}

// Recebe o dado do socket e atualiza a linha correspondente
function searchCurrencyAndUpdate(state,data){
  let dataJson = JSON.parse(data);
  if(dataJson[2] !== undefined){
    for(let i = 0 ; i < state.data.length; i++){
      if(state.data[i].id === dataJson[2][0]){
        state.data[i].last = dataJson[2][1];
        state.data[i].lowestAsk = dataJson[2][2];
        state.data[i].highestBid = dataJson[2][3];
        state.data[i].percentChange = dataJson[2][4];
        state.data[i].baseVolume = dataJson[2][5];
        state.data[i].quoteVolume = dataJson[2][6];
        state.data[i].isFrozen = dataJson[2][7];
        state.data[i].high24hr = dataJson[2][8];
        state.data[i].low24hr = dataJson[2][9];
        break;
      }
    }
  }
  return Object.assign({}, state, {data: state.data, status: "updated"});
}

export { tinker, initialState}


