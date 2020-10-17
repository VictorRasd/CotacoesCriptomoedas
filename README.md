# Visualizador de Cotações de Criptomoedas em Tempo Real

# Objetivo

O projeto exibe para o usuário dados de criptomoedas atualizando em tempo real.

# Desenvolvimento

A solução consiste em um projeto frontend em React que busca dados da API Poloniex Public API [https://docs.poloniex.com](https://docs.poloniex.com). Primeiramente é buscado da API pública os dados gerais de todas as criptomoedas e esse dado é salvo utilizando Redux Thunk. Após isso é utilizado o WebSocket da mesma API para buscar as atualizações em tempo real de cada moeda. 

A store utilizada pelo Redux Thunk é criada no arquivo 'index.js', assim como a criação do WebSocket que busca as atualizações de dados. As actions e o reducer estão criados nos diretórios 'src/store/actions' e 'src/store/reducers' respectivamente. 

O componente 'src/screens/CurrencyTable.tsx' cuida da parte da exibição de dados. Para poupar performance foi adicionado um menu dropdown para que o usuário possa selecionar somente as criptomoedas de interesse, e somente as mesmas serão renderizadas na tela. 

O arquivo 'src/server/TickerServer.ts' contem alguns dados padrões que são utilizados pelo componente como interface das criptomoedas e também o nome de todas as criptomoedas que é utilizado para criação do select e criação do dado que é buscado na primeira vez pela API.

# Execução

Para executar o projeto é necessário abrir o diretório fonte do projeto no CMD e executar o comando "npm install" ou "yarn" para realizar os downloads das dependências. Após isso utilizar o "npm start" ou "yarn start". Após isso a solução estará sendo executada no endereço [http://localhost:3000](http://localhost:3000).



