
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const routers = require('./rotas_temps');
const mqtt = require('./mqtt_node2');
//const mongo = require('./mongo');
//const db =  require('./database');
const Temps = require('./temps')
const db_atlas = require('./db_atlas')
const cors = require('cors')

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

