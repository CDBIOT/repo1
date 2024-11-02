const express = require('express');
const router = express.Router();
const mqtt = require('mqtt')

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
  console.log('Connected')
  client.subscribe('aqua_light', function (err) {
    if (!err) {
     client.publish('aqua_light', '1')
      console.log('Connected topic aqua_light mqtt_node ')
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  m = message;
  console.log(message.toString())
  //client.end()
})


module.exports =  {
  
  mqtt
}