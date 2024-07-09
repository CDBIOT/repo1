//API POLAR BEYOND BACKEND NODE JAVASCRIPT 

const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const routers = require('../rotas_temps','../rotas_user','../publisher','../subscriber');
require('dotenv').config()
const cookieParser = require('cookie-parser')
const session = require('express-session')
const mqtt_node = require('../mqtt_node');
const bot = require('../bot')
const {Server} = require ("socket.io");


const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal')



//const mongo = require('./mongo');
//const db =  require('./database');
var fs = require('fs');
const Temps = require('../temps')
const Person = require('../user')
const db_atlas = require('../db_atlas')
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
app.use(cookieParser())
//app.use(session({secret: '123456' , token: 'token'}))
app.use(session({secret: '123456' , token: 'token',resave: true,saveUninitialized: true}))


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(express.json());

app.use(routers);


// Create a new client instance
const client = new Client();

// client.on('qr', qr => {
//     qrcode.generate(qr, {small: true});
// });

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Client is ready!');
});

client.on('message_create', message => {
	if (message.body === '!ping') {
		// send back "pong" to the chat the message was sent in
		client.sendMessage(message.from, 'pong');
	}
});

// Start your client
client.initialize();


const PORT = process.env.PORT || 3000 || 5500;
    app.listen(PORT,function(){
        console.log("Servidor Rodando");
        })

  //      "src": "api/index.js",
  //"src": "!{api/**,package.json,middleware.[jt]s}",