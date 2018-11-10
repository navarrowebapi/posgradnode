import express from 'express';
import bodyParser from 'body-parser';
var mongoose = require('mongoose');

//Inicialização do Express
const app = express();

//Configurar App para usar Body-Parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Persistência 
mongoose.connect('mongodb://localhost/bdPos', {useNewUrlParser:true});

//ROTAS
var indexRoute = require('./src/routes/index-routes');
var productRoute = require('./src/routes/product-routes');

//Definindo porta onde server vai responder
var port = process.env.port || 3000;

//Vincular app com motor de rotas
app.use('/api', indexRoute);
app.use('/produtos', productRoute);

app.listen(port, () => {
    console.log("server up and running on port "+ port );
});
