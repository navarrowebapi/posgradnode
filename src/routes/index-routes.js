const express = require('express');
//Definido Rotas
var router = express.Router(); //intercepta todas as rotas

//MIDDLEWARE
router.use(function(req, res, next){
    console.log("Interceptação pelo Middleware OK");
    //log
    next();
});
//Rota teste
router.get('/', function(req, res){
    res.json({'message':'OK, rota de teste funcionando'});
});

module.exports = router;
