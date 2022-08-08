const { response } = require('express');
const express = require('express');
const routers = express.Router();
const app = express();
//const Person = require('./mongo')
const Temps = require('./temps')
//app.use(mqtt);

//const route = router.get('/',(req,res,next) => {
 //   res.status(200).sendFile(__dirname + "/index.html");
 //   });

 routers.post('/mqtt',(req, res) =>{
    // res.send("Texto: "+ req.body.output);
 })

 //Create
routers.post('/user', async (req, res) =>{
    const {nome, sobrenome, idade } = req.body
    const person = {
        nome,sobrenome,idade
                    }
    try{
        await Person.create(person)
        res.status(201).json({message: "Pessoa inserida com sucesso"})
    }catch(error){
        res.status(500).json({error: error})
    }  
})

 //Create temps
 routers.post('/temps', async (req, res) =>{
    const {id, local, temperatura, dia, mes, ano } = req.body
    const temperature = {
        id,local,temperatura, dia, mes, ano
                    }
    try{
        await Temps.create(temperature)
        res.status(201).json({message: "Temperatura inserida"})
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

//Read
routers.get('/temps', async (req, res) =>{
    try{
       const temps = await Temps.find()
        res.status(200).json({temps})
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

 //Delete
 routers.delete('/temps/:id', async (req, res) => {

    const id= req.params.id
    const temperature = await Temps.findOne({id: id})

    if(!temperature){
    res.status(422).json({message:  'Usuário não encontrado'});
    return
    }
    try{
        await Temps.deleteOne({_id: id});
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
routers.use('/grafico.js', express.static("/"))
 
 routers.get('/index.html',function(req,res){
     res.sendFile(__dirname + "/index.html");
 });
 
 routers.get("/Grafico",function(req,res){
     res.sendFile(__dirname + "/Grafico.html");
 });
 
 routers.get("/grafico",function(req,res){
     res.sendFile(__dirname + "/grafico.js");
 });

module.exports = routers