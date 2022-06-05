const { response } = require('express');
const express = require('express');
const routers = express.Router();
const app = express();
const Temps = require('./temps')

//app.use(mqtt);

app.use((req,res,next) => {
    console.log("Cors habilitado");
    app.usee(cors())
    next()
   })

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
        //res.send(vm);
        res.status(200).json({vm})
     }catch(error){
         res.status(500).json(error)
     }  
    })

 //Create temps
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
    try{
       const temps = await Temps.findAll({dia})
        res.status(200).json({temps})
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
     const updateTemp = await Temps.updateOne({_id: id},temps);
     res.status(200).json(temps);
    }catch(error){
    res.status(500).json({error: error})
}  
})

 //Delete
routers.delete('/temps/:dia', async (req, res) => {
    const dia= req.params.dia
    const temps = await Temps.findByIdAndDelete({dia: dia})
    if(!temps){
    res.status(422).json({message:  'Temperatura não encontrada'});
    return
    }
    try{
        await Temps.deleteOne({temperatura});
        res.status(200).json({message: 'Temperatura removida com sucesso'});
    }catch(error){
    res.status(500).json({error: error})
}  
});

routers.use('/', express.static(__dirname + '/'))
routers.use('/css', express.static("/css"))
routers.use('/imagens', express.static("/imagens"))
routers.use('/grafico.js', express.static("/"))
routers.use('/mqtt_node2.js', express.static("/"))
 routers.get('/index.html',function(req,res){
     res.sendFile(__dirname + "/index.html");
 });
 
 routers.get("/mqtt_node2",function(req,res){
    res.sendFile(__dirname + "/mqtt_node2.js");
});

routers.get("/mqtt.html",function(req,res){
    res.sendFile(__dirname + "/mqtt.html");
});
 
 routers.get("/Grafico",function(req,res){
     res.sendFile(__dirname + "/Grafico.html");
 });
 
 routers.get("/grafico",function(req,res){
     res.sendFile(__dirname + "/grafico.js");
 });

module.exports = routers