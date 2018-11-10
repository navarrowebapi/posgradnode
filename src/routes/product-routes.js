const express = require('express');
var router = express.Router(); //intercepta todas as rotas
var Produto = require('../app/models/product');
//Definido Rotas
//Rotas para Produto

//DELETE
router.delete('/:productId', function(req, res){
    Produto.findByIdAndRemove(req.params.productId, (erro, produto) => {
        if(erro) return res.status(500).send(erro);

        const response = {
            message: "Produto removido com sucesso",
            id: produto.id
        };
        return res.status(200).send(response);
    });
});


//PUT
router.put('/:productId', function(req, res){
    const id = req.params.productId;
    console.log(id);

    Produto.findById(id, function(erro, produto){
        if(erro){
            res.status(500).json({
                message: "Erro ao encontrar produto, Id mal formado."
            });
        }
        else if(produto == null){
            res.status(400).json({
                message: "Produto não encontrado."
            });
        }
        else{
            produto.nome = req.body.nome;
            produto.preco = req.body.preco;
            produto.descricao = req.body.descricao;
            produto.save(function (erro){
                if(erro)
                    res.send("Erro ao tentar atualizar produto" + error);
                
                res.status(200).json({
                    message: "Produto atualizado com sucesso."
                });  
            });
        }
    });

});

//GETById
router.get('/:productId', function(req, res){
    const id = req.params.productId;
    Produto.findById(id, function(erro, produto){
        if(erro){
            res.status(500).json({
                message: "Erro ao tentar encontrar produto; Id mal formado"
            });
        }
        else if (produto == null){
            res.status(400).json({
                message: "Produto não encontrado"
            });
        }
        else{
            res.status(200).json({
                message: "retorno do produto",
                produto: produto
            });
        }
            
    });
});


//GETALL
router.get('/', function(req, res){
    Produto.find(function(erro, produtos){
        if(erro)
            res.send(erro);
        
        res.status(200).json({
            message: "retorno de todos os produtos",
            allProducts: produtos
        });  
    });
});

//POST
router.post("/", function(req, res){
    var produto = new Produto();
    produto.nome = req.body.nome;
    produto.preco = req.body.preco;
    produto.descricao = req.body.descricao;

    produto.save(function (error){
        if(error)
            res.send("Erro ao salvar produto" + error);
        
        res.status(201).json({message:'Produto inserido com sucesso'});    
    });

})

module.exports = router;