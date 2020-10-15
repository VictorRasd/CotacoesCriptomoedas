import React, {Component} from 'react'; 
import { ICurrency } from '../server/TickerServer'
import store from '../index'
import currencyPairs from '../server/TickerServer'
import DataTable from 'react-data-table-component';
import { Box, TableBody, TableCell, TableContainer, TableHead, TableRow, Table, TableFooter, TablePagination } from '@material-ui/core';



interface OwnProps {
}

interface OwnState {
  currencies: ICurrency[]
}

const columns = [
  {
    name: 'Nome',
    selector: 'name',
    sortable: true,
  },
  {
    name: 'Último',
    selector: 'last',
    sortable: true,
  },
  {
    name: 'Menor Pedido',
    selector: 'lowestAsk',
    sortable: true,
    right: true,
  },
  {
    name: 'Maior Oferta',
    selector: 'highestBid',
    sortable: true,
  },
  {
    name: 'Mudança Percentual',
    selector: 'percentChange',
    sortable: true,
  },
  {
    name: 'Volume Base',
    selector: 'baseVolume',
    sortable: true,
  },
  {
    name: 'Volume Quotação',
    selector: 'quoteVolume',
    sortable: true,
  },
  {
    name: 'Congelado',
    selector: 'isFrozen',
    sortable: true,
  },
  {
    name: 'Maior 24hr',
    selector: 'high24hr',
    sortable: true,
  },
  {
    name: 'Menor 24hr',
    selector: 'low24hr',
    sortable: true,
  },
];



class CurrencyTable extends Component<OwnProps, OwnState> {
  constructor(props: any) {
    super(props);
    this.state = {
      currencies: new Array<ICurrency>()
    }
  }

  componentDidMount(){
    console.log("Component did mount");
    store.subscribe(() => {
      const state = store.getState();
      this.setState({
        currencies: state.data
      })
    });
  }

  shouldComponentUpdate(nextProps: Readonly<OwnProps>, nextState: Readonly<OwnState>){
    return true;
  }
  

  render() {
    return (
      //   <TableContainer >
    //   <Table stickyHeader size="small" aria-label="sticky table">
    //     <TableHead>
    //       <TableRow>
    //         <TableCell>Nome</TableCell>
    //         <TableCell align="right">Último</TableCell>
    //         <TableCell align="right">Menor Pedido</TableCell>
    //         <TableCell align="right">Maior Oferta</TableCell>
    //         <TableCell align="right">Mudança Percentual</TableCell>
    //         <TableCell align="right">Volume Base</TableCell>
    //         <TableCell align="right">Volume Quotação</TableCell>
    //         <TableCell align="right">Congelado</TableCell>
    //         <TableCell align="right">Maior 24hr</TableCell>
    //         <TableCell align="right">Menor 24hr</TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {this.state.currencies.map((currency) => (
    //         <TableRow key={currency.name}>
    //           <TableCell component="th" scope="row">
    //             {currency.name}
    //           </TableCell>
    //           <TableCell align="right">{currency.last}</TableCell>
    //           <TableCell align="right">{currency.lowestAsk}</TableCell>
    //           <TableCell align="right">{currency.highestBid}</TableCell>
    //           <TableCell align="right">{currency.percentChange}</TableCell>
    //           <TableCell align="right">{currency.baseVolume}</TableCell>
    //           <TableCell align="right">{currency.quoteVolume}</TableCell>
    //           <TableCell align="right">{currency.isFrozen}</TableCell>
    //           <TableCell align="right">{currency.high24hr}</TableCell>
    //           <TableCell align="right">{currency.low24hr}</TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>
       <DataTable
       title="Cotações"
       pagination={true}
       columns={columns}
       data={this.state.currencies}
     />  
    );
  }
}

export default CurrencyTable;

