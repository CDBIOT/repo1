const { response } = require('express');
const express = require('express');
const routers = express.Router();
const app = express();
//const bot = require('./bot')
const Temps = require('./temps')
const Person = require('./user')
const mqtt = require('./mqtt_node')
const mqttnode = require('./mqtt_node')
const mqttio = require('./mqttio')
//const mqtt2 = require('./mqtt_node2')
const subscribe = require('./subscriber')
const publisher =require('./publisher')
var fs = require('fs');
//app.use(mqtt);
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


//const { onLight } = require('./mqtt_node2.js');


routers.get('/mqtton', mqttio.postPub);
routers.get('/mqttoff', mqttio.offLight);
routers.get('/mqtton2', mqttio.onLight);
routers.post('/subscrib', subscribe.publishMessage);

routers.post('/subscriber', subscribe.publishMessage)

//routers.post('/bot',bot)
//routers.use(qrcode);

// router.get('/getsensordata', function (req, res) {
//     var vm = {
//     data:m
//     };
//     res.send(vm);
// });

// router.get('/', function (req, res) {
//     /*Render the index.hbs and pass the View Model*/
//     var vm = {
//         title: 'MQTT',
//         message: [new Date(), m]
//     }
//     console.log(vm.message);
//     res.render('mqtt/index', vm);
// });



 routers.get('/mqtt',(req, res) =>{
    try{ 
        date = new Date() 
        var vm = {
            temp: temp,
            local: local,
            dia: date.getDate(),   
            mes: date.getMonth() + 1,
            ano: date.getFullYear()
        }
        console.log(vm);
        res.send(vm);
        res.status(200).json({vm})
     }catch(error){
         res.status(500).json(error)
     }  
    })
    
 routers.get('/subscriber',(req, res) =>{
    try{ 
        date = new Date() 
        var vm = {
            temp: temp,
            local: local,
            dia: date.getDate(),   
            mes: date.getMonth() + 1,
            ano: date.getFullYear()
        }
        console.log(vm);
        //res.send(vm);
        res.status(200).json({vm})
     }catch(error){
         res.status(500).json(error)
     }  
    })
    
 //Create temps[]
 routers.post('/temps', async (req, res) =>{
const {local, temperatura, dia, mes, ano } = req.body
   // const temps = req.params
const temps = {local,temperatura, dia, mes, ano}
const create_temp = new Temps(req.body);
//temps.save()
    try{
        await Temps.create(temps)
        //temps.save()
        console.log(temps)
        res.status(201).json({message: "Temperatura inserida"})
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

//Read
routers.get('/temps/:dia', async (req, res) =>{
    const dia = req.params.dia
    try{
       const dias = await Temps.findAll({dia})
        res.status(200).json({dias})
    }catch(error){
        res.status(500).json({error: error})
    }  
})

//Update
routers.patch('/temps/:id',async (req, res) =>{
    const id = req.params.id
    const {local, temperatura, dia, mes, ano } = req.body
    const temps = {local, temperatura, dia, mes, ano}
    try{
     const updateTemp = await Temps.updateOne({id: id},temps);
     res.status(200).json(temps);
    }catch(error){
    res.status(500).json({error: error})
    }  
})

routers.post('/temps/:id',async(req, res) =>{
    const  id = req.params.id
    
    res.status(201).send({
    mensagem: 'inserido',
    produtoCriado: produto
    })
  });

 //Delete
routers.delete('/temps/:id', async (req, res) => {
    const id= req.params.id //temps.remove({id: req.body.id})
    try{
    await Temps.deleteOne({_id: id}) 
        return res.json({
            message: "Artigo apagado com sucesso!",
            id
            })
    }catch(error){
         return res.status(400).json({
        message: "Error: Artigo não foi apagado com sucesso!"
    })}
})

   // try{
    //    await Temps.deleteOne({"_id": id});
    //    res.status(200).json({message: 'Temperatura removida com sucesso'});
        //res.redirect('/temps')
   // }catch(error){
  //  res.status(500).json({error: error})
//}  
//});



 //Create user
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


//Read user private page
// routers.get('/user', async (req, res) =>{
//     const id= req.params.id
//     try{
//        const people = await Person.findById(id, '-senha')
//         res.status(200).json({people})
//         console.log(req.user._id + 'fez esta chamada')
//     }catch(error){
//         res.status(500).json({error: error})
//     }  
// })


//Login com senha criptografada
routers.post('/login', async (req, res) =>{
    const {nome, senha0} = req.body
   // $2a$08$VaEBCrDE50.Sy56I7nuUkeKr0HLt2W2.mQZbvtmMCte6Jq4Iw.6oe
   if(!nome){
    return res.status(422).json({message: 'O nome é obrigatório'})
    }
    if(!senha0){
    return res.status(422).json({message: 'A senha é obrigatória'})
    }
    //check if user exists
    const senha = senha0;

    const user = await Person.findOne({ nome: nome})

    if(!user){
    return res.status(404).json({error:  'Usuário não encontrado'})
    }
     //check if password match
     const checkpass = await bcrypt.compare(senha0, user.senha)

    if(!checkpass){
    return res.status(422).json({error: 'Senha inválida'})
   }

    try{
    const secret = process.env.SECRET
    // gera token com informação de id do usuario + secret
    const token = jwt.sign ({id: user._id}, secret)
    const id  = user._id


    res.cookie('token',token,{maxAge: 60000, httpOnly: false});

    res.cookie('didox','texto1',{maxAge: 60000, httpOnly: false});

	//window.localStorage.setItem =("token",token);
    req.session.token = token;
    console.log(req.session)

     res.status(200).json({message: 'Usuário autenticado com sucesso', token,user})
        res.user;
     }catch(error){
        console.log(error)
          res.status(500).json({error: "Aconteceu um erro no servidor!",token})
     }
})

//Funcão check token
function checkToken (req, res, next) {

const authHeader = req.headers.authorization || req.body.token ||req.query.token;

//const token = authHeader && authHeader.split(' ')[1];
//const [Bearer ,token] = authHeader.split(' ')[1];

const token = req.cookies.token
//const token = req.session.token
const didox = req.cookies.didox
const {cookies}=req;

console.log(req.cookies.didox)
console.log(req.cookies.token)

console.log("token:", token)
console.log("autHeader: ",authHeader)

if(!authHeader){
 return res.status(401).json({message: "Token incorreto"})
}
   try {
    
   const secret = process.env.SECRET
   jwt.verify(token,secret,(err,decoded)=> {
    if(err){ res.status(401).json({ message: "Token errado" });
    req.userID = decoded.userId;
    }else{

    next();
    }
   })}catch (error) {
    res.status(401).json({msg: "Token Invalido!"})
   }
   
}

//Cadastrar usuario com senha criptografada 
routers.post('/cadastrar', async (req, res) =>{

    const {nome, email, senha0} = req.body
    
   if(!nome){
    return res.status(422).json({message: 'O nome é obrigatório'})
    }
    if(!email){
    return res.status(422).json({message: 'O email é obrigatório'})
    }
    if(!senha0){
    return res.status(422).json({message: 'A senha é obrigatória'})
    }
    
    const salt = await bcrypt.genSalt(12)
        
    const senha= await bcrypt.hash(senha0, salt);

    const person = { nome, email, senha }

    try{
        await Person.create(person)
        res.status(201).json({message: 'Usuário cadastrado com sucesso'})

    }catch(error){
        res.status(500).json({error: error})
    }  
    console.log(senha);
})



 //Delete usuario
 routers.delete('/user/:id', async (req, res) => {
    const id = req.params.id
    const person = await Person.findById(id)
    if(!person){
    res.status(422).json({message:  'Usuário não encontrado'});

    return
    }
    try{
        await Person.deleteOne(person);
        res.status(200).json({message: 'Usuário removido com sucesso'});
    
    }catch(error){
    res.status(500).json({error: error})
    console.log(id);
}  

});

//Read 
routers.get('/user',checkToken, async (req, res) =>{

    try{
        const people = await Person.find()
        return res.status(422).json({people})
    }catch(error){
        res.status(500).json({error: error})
    }  
})

//Update usuario
routers.patch('/user/:id',async (req, res) =>{
    const id = req.params.id
    const {nome,sobrenome,idade} = req.body
    const person = {nome,sobrenome,idade,}
    try{
     const updatePerson = await Person.updateOne({id: _id},person);
     res.status(200).json(person);
    }catch(error){
    res.status(500).json({error: error})
}  
});

routers.use('/', express.static(__dirname + '/'))
routers.use('/css', express.static(__dirname + "/css"))
routers.use('/imagens', express.static(__dirname +"/imagens"))
routers.use('/grafico.js', express.static("/"))

//routers.use('/mqtt_node2.js', express.static("/"))


//  routers.get("/mqtt_node2",function(req,res){
//     res.sendFile(__dirname + "/mqtt_node2.js");
// });


// routers.get("/bot",function(req,res){
//     res.sendFile(__dirname + "/bot.js");
// });

routers.get("/mqtt.html",function(req,res){
    res.sendFile(__dirname + "/pages/mqtt.html");
});
 
 routers.get("/Grafico.html",function(req,res){
     res.sendFile(__dirname + "/pages/Grafico.html");
 });
 
 routers.get("/Monitor.html",function(req,res){
    res.sendFile(__dirname + "/pages/Monitor.html");
});

 routers.get("/grafico.html",function(req,res){
     res.sendFile(__dirname + "/grafico.js");
 });
 
 routers.get("/autentica.html",function(req,res){
    res.sendFile(__dirname + "/pages/autentica.html");
});

//routers.get("/socketio",function(req,res){
 //   res.sendFile(__dirname + "/pages/socketio.html");
//});

routers.get("/",function(req,res){
    res.sendFile(__dirname + "/pages/index.html");
});

module.exports = routers