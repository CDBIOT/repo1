const express = require('express');
const router = express.Router();
const mqtt = require('mqtt');
const { publishMessage } = require('./publisher');

const topic1 = 'Sala'
const topic2 = 'room_temp'
const topic3 = 'aqua_temp'

const options = {
  // Clean session
  clean: true,
  connectTimeout: 4000,
  // Auth
  clientId: 'cdbiot123',
  username: 'test',
  password: 'test',
 reconnectPeriod: 1000,
}
const client  = mqtt.connect('wss://broker.mqtt-dashboard.com:8884/mqtt', options)
client.on('connect', function () {
  console.log('Connected on mqtt broker')

  client.subscribe('room_light', function (err) {

    console.log('Subscribe to topic room_light mqttio')
    if (!err) {
     client.publish('room_light', '0')
      console.log('Enviado comando 0 para room_light ')
    }
  })
  client.end()

})

client.on('message', function (topic, message) {
  // message is Buffer
  m = message.toString();
  console.log(message.toString())
  client.end()
})

router.get('/', function (req, res) {
  /*Render the index.hbs and pass the View Model*/
  var vm = {
      title: 'MQTT',
      message: [new Date(), m]
  }
  console.log(vm.message);
  res.render('mqtt/index', vm);
});

 //Page published
 const postPub=( async (req, res) =>{
  const {message,payload } = req.body
  
//body: JSON.stringify({"topic":'room_light',"message": '1'})
     // const temps = req.params
  const mess = (req.body)
  const create_temp = new publishMessage(req.body);
  //temps.save()
      try{
          await client.publish(mess)
          //temps.save()
          console.log(mess)
          res.status(201).json({message: "Lâmpada Ligada"})
          }catch(error){
          res.status(500).json({error: error})
      }  
  })
  
 //Page published
 const offLight=( async (req, res) =>{
  client.subscribe('room_light', function (err) {

    console.log('Subscribe to topic room_light')
    if (!err) {
     client.publish('room_light', '0')
      console.log('Enviado comando 0 para room_light ')
    }
  })
  client.end()

})

 
const onLight=(async (req,res)=>{
    
publishMessage("room_light","1");
 
    // try{
    //   await client.publish(topic, "1", { qos: 0, retain: true }, (error) => {
    //     if (error) {
    //           console.error(error)
    //         }
    //       })
    
    //     }catch(error){
    //       res.status(500).json({error: error})
    //     }
     })
    



module.exports =  {

  postPub,
  offLight,
  onLight,
  mqtt
}