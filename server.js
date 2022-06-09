
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const routers = require('./rotas_temps');
const mqtt = require('./mqtt_node2');
//const mongo = require('./mongo');
//const db =  require('./database');
var fs = require('fs');
const Temps = require('./temps')
const db_atlas = require('./db_atlas')
const cors = require('cors')

app.use(cors());

app.use((req,res,next) => {
    console.log("Cors habilitado");
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Header",'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        res.status(200).send({})
    }
    
   next()
   })

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(express.json());

app.use(routers);


app.use((req, res, next) =>{
    console.log("MIDDLEWARE2");
    next()
})
const PORT = process.env.PORT || 8081
    app.listen(PORT,function(){
        console.log("Servidor Rodando");
        })

