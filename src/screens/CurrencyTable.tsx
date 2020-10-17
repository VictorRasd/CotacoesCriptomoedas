import React, {Component} from 'react'; 
import { ICurrency } from '../server/TickerServer'
import store from '../index'
import { Box, TableBody, TableCell, TableContainer, TableHead, TableRow, Table, Typography} from '@material-ui/core';
import Select from 'react-select'
import  currencyPairs  from '../server/TickerServer'


interface OwnProps {
}

interface OwnState {
  // Currencies são os dados de cada criptomoeda que serão exibidos na tela
  currencies: ICurrency[]
  // currencyPairSelect é o array que será exibido no select para que o usuário selecione as moedas
  currencyPairSelect: any[]
  // selectedCurrencies são as moedas selecionadas pelo usuário no select
  selectedCurrencies: any[]
}



class CurrencyTable extends Component<OwnProps, OwnState> {
  constructor(props: any) {
    super(props);
    this.state = {
      currencies: new Array<ICurrency>(),
      currencyPairSelect: new Array<any>(),
      selectedCurrencies: new Array<any>()
    }
  }


  componentDidMount(){
    // O ComponentDidMount é utilizado para criar o subscribe na store, buscando assim sempre os dados novos
    this.subscriptionHandler();
  }

  subscriptionHandler(){
    store.subscribe(() => {
      const state = store.getState();
      // O status é 'updated' sempre quando o websocket envia uma nova atualização. O state.data recebido já o array de dados
      // todo atualizado
      if(state.status === 'updated'){
        let currenciesToShow: ICurrency[] = new Array<ICurrency>();
        for( let i = 0 ; i < this.state.selectedCurrencies.length ; i++ ){
          for ( let j = 0 ; j < state.data.length ; j++){
            if(this.state.selectedCurrencies[i].value === state.data[j].name)
              {
                currenciesToShow.push(state.data[j]);
                break;
            }
          }
        }
        this.setState({
          currencies: currenciesToShow,
        })
      }
      // O status 'received' é enviado na primeira busca a API. Dentro desse if é criado todos os campos do select
      // para que somente sejam exibidos criptomoedas que estão sendo trabalhadas na API no momento
      else if(state.status === 'received'){
        let currencyPairsSelect: any = [];
        currencyPairs.forEach(element => {
            let obj: {value: string, label: string};
            obj ={
                value: element,
                label: element
            }
            for ( let i = 0 ; i < state.data.length ; i++){
              if(state.data[i].name === obj.value){
                currencyPairsSelect.push(obj);
                break;
              }
            }
        });
        this.setState({
          currencyPairSelect: currencyPairsSelect
        })
      }
    })
  }

  
  selectCurrencies(event: any){
    if(event === null){
      this.setState({
        selectedCurrencies: new Array<any>()
      })
    }
    else{
      this.setState({
        selectedCurrencies: event
      })
    }
  }

  render() {
    return (
      <Box>
        <Box m={2}>
          <Typography> Favor selecione abaixo as cotações de criptomoedas a serem exibidas </Typography>
        </Box>
        <Box m={2}>
          <Select
            isMulti
            onChange={(event) => this.selectCurrencies(event)}
            name="colors"
            options={this.state.currencyPairSelect}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </Box>
        <TableContainer>
       <Table size="small" aria-label="sticky table" id="tabela">
         <TableHead>
           <TableRow>
             <TableCell>Nome</TableCell>
             <TableCell align="right">Último</TableCell>
             <TableCell align="right">Menor Pedido</TableCell>
             <TableCell align="right">Maior Oferta</TableCell>
             <TableCell align="right">Mudança Percentual</TableCell>
             <TableCell align="right">Volume Base</TableCell>
             <TableCell align="right">Volume Quotação</TableCell>
             <TableCell align="right">Congelado <br/> ( 0 = Não, 1 = Sim)</TableCell>
             <TableCell align="right">Maior 24hr</TableCell>
             <TableCell align="right">Menor 24hr</TableCell>
           </TableRow>
         </TableHead>
         <TableBody >
           {this.state.currencies.map((currency) => (
             <TableRow key={currency.name} >
               <TableCell component="th" scope="row">
                 {currency.name}
               </TableCell>
               <TableCell align="right">{currency.last}</TableCell>
               <TableCell align="right">{currency.lowestAsk}</TableCell>
               <TableCell align="right">{currency.highestBid}</TableCell>
               <TableCell align="right">{currency.percentChange}</TableCell>
               <TableCell align="right">{currency.baseVolume}</TableCell>
               <TableCell align="right">{currency.quoteVolume}</TableCell>
               <TableCell align="right">{currency.isFrozen}</TableCell>
               <TableCell align="right">{currency.high24hr}</TableCell>
               <TableCell align="right">{currency.low24hr}</TableCell>
             </TableRow>
           ))}
         </TableBody> 
       </Table>
     </TableContainer>
    </Box>
    );
  }
}

export default CurrencyTable;

