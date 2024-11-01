const express = require('express');
const router = express.Router();
const mqtt = require('mqtt');
const { publishMessage } = require('./publisher');

var client
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
 reconnectPeriod: 100000,
}
const client  = mqtt.connect('mqtt://broker.mqtt-dashboard.com:1883', options)
client.on('connect', function () {
  console.log('Connected on mqtt broker topic Teste1')


  client.subscribe('Teste1', function (err) {

    console.log('Subscribe to topic room_light')
    if (!err) {
     client.publish('room_light', '0')
      console.log('Enviado comando 0 para room_light ')
    }
  })
 // client.end()

})

client.on('message', function (topic, message) {
  // message is Buffer
  m = message.toString();
  console.log(message.toString())
 // client.end()
})

 //Page published
 const postPub=( async (req, res) =>{
  const {message,payload } = req.body
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
  client.subscribe('Teste1', function (err) {

    console.log('Subscribe to topic room_light')
    if (!err) {
     client.publish('room_light', '0')
      console.log('Enviado comando 0 para room_light ')
    }
  })
 // client.end()

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