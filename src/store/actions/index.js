const TINKER_REQUESTED = "TINKER_REQUESTED";
const TINKER_RECEIVED = "TINKER_RECEIVED";
const TINKER_FAILED = "TINKER_FAILED";
const UPDATE = "UPDATE"

// Busca os dados da API de maneira asincrona
function getTinkerAction() {
  return function(dispatch) {
    dispatch({
      type: TINKER_REQUESTED,
    });
    
  fetch("https://poloniex.com/public?command=returnTicker")
    .then(response => response.json())
    .then(data => dispatch({
        type: TINKER_RECEIVED,
        payload: data
      }))
    .catch(error => dispatch({
        type: TINKER_FAILED,
        payload: error
      })
    );
  }
}




export {getTinkerAction , TINKER_FAILED , TINKER_RECEIVED , TINKER_REQUESTED , UPDATE }