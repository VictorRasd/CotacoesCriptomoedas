import {TINKER_FAILED, TINKER_RECEIVED,TINKER_REQUESTED, UPDATE } from '../actions/index'
import currencyPairs from '../../server/TickerServer'

const initialState = { data: [], status:"" };

function tinker(state = initialState, action) {
  switch (action.type) {
    case TINKER_REQUESTED:
      state = Object.assign({}, state, {status: "waiting"});
      break;
    case TINKER_RECEIVED:
      state = createInitalData(state, action.payload);
      break;
    case TINKER_FAILED:
      state = Object.assign({}, state, {status: "failed", error: action.payload});
      break;
    case UPDATE:
      state = searchCurrency(state, action.payload);
      break;
    default:
      return state;
  }
  
  return state;
}

function createInitalData(state, data){
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
  // allCurrencies.forEach(element => {
  //   if(element.isFrozen == '0'){
  //     element.isFrozen = 'Não'
  //   }
  //   else{
  //     element.isFrozen = 'Sim'
  //   }
  // });
}

function searchCurrency(state,data){
  let dataJson = JSON.parse(data);
  if(dataJson[2] != undefined){
    state.data.forEach(element => {
      if(element.id == dataJson[2][0]){
        element.last = "dataJson[2][1]";
        element.lowestAsk = dataJson[2][2];
        element.highestBid = dataJson[2][3];
        element.percentChange = dataJson[2][4];
        element.baseVolume = dataJson[2][5];
        element.quoteVolume = dataJson[2][6];
        element.isFrozen = dataJson[2][7];
        element.high24hr = dataJson[2][8];
        element.low24hr = dataJson[2][9];
      }
    });
  }
  return Object.assign({}, state, {data: state.data, status: "updated"});
}

export { tinker, initialState}


