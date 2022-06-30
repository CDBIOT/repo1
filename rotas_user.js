const { response } = require('express');
const express = require('express');
const routers = express.Router();
const app = express();
const Person = require('./user')
var fs = require('fs');
//const Temps = require('./temps')


 //Create
routers.post('/user', async (req, res) =>{
    const {nome, email, senha } = req.body
    const person = { nome,email,senha }
    try{
        await Person.create(person)
        res.status(201).json({message: "Pessoa inserida com sucesso"})
    }catch(error){
        res.status(500).json({error: error})
    }  
})

//Read
routers.get('/user', async (req, res) =>{
    try{
       const people = await Person.find()
        res.status(200).json({people})
    }catch(error){
        res.status(500).json({error: error})
    }  
})

//Update
routers.patch('/user/:id',async (req, res) =>{
    const id = req.params.id
    const {nome,sobrenome,idade} = req.body
    const person = {nome,sobrenome,idade,}
    try{
     const updatePerson = await Person.updateOne({_id: id},person);
     res.status(200).json(person);
    }catch(error){
    res.status(500).json({error: error})
}  
})

 //Delete
routers.delete('/user/:id', async (req, res) => {
    const id= req.params.id
    const person = await Person.findOne({_id: id})
    if(!person){
    res.status(422).json({message:  'Usuário não encontrado'});
    return
    }
    try{
        await Person.deleteOne({_id: id});
        res.status(200).json({message: 'Usuário removido com sucesso'});
    }catch(error){
    res.status(500).json({error: error})
}  
});

routers.post('/produtos',async(req, res) =>{
    const  produto = {
    //Utiliza as inf do form html
      nome: req.body.nome,
      preco: req.body.preco
    }
    res.status(201).send({
    mensagem: 'inserido',
    produtoCriado: produto
    })
  });

routers.use('/', express.static(__dirname + '/'))
routers.use('/css', express.static("/css"))
routers.use('/imagens', express.static("/imagens"))
routers.use('/user.js', express.static("/"))
routers.use('/rotas_user.js', express.static("/"))
 
 routers.get("/cad_user",function(req,res){
    res.sendFile(__dirname + "/cad_user.html");
});
 routers.get("/user.js",function(req,res){
     res.sendFile(__dirname + "/user.js");
 });

module.exports = routers