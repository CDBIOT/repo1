const mqtt = require('mqtt');
const express = require('express');
const router = express.Router();

const topic1 = 'Sala'
const topic2 = 'room_temp'
const topic3 = 'aqua_temp'

const host = 'broker.mqtt-dashboard.com'
const port = '1883'



const connectUrl = `mqtt://${host}:${port}`
const options = {
    // Clean session
    keepalive: 60,
    clean: true,
    connectTimeout: 3000,
    keepalive: 60,
    // Auth
    clientId: 'cdbiot123',
    username: 'test',
    password: 'test',
   reconnectPeriod: 100000,
  }

const client = mqtt.connect(connectUrl,options)

function connectToBroker(){

client.on('connect', function () {
  console.log('Connected to Subscriber')
  
  client.subscribe("Sala", function (err) {

    console.log('Subscribe to aqua_temp')
    if (!err) {
      client.publish("aqua_light", '0')
    }
  })
 // client.end()

})

client.on("error",(err)=> {
    console.log("Error: ",err);
    client.end();
})

// client.on("reconnect", () => {
//     console.log("Reconnecting...");
// });

client.on('connect', () => {
  console.log('Connected:' + options.clientId)
 // client.end();
})

client.on('message', (topic,message, payload) => {
      temp = payload.data,
     // local= payload.data,
      message=message,
      console.log('Received Message subscriber:'+topic, message.toString(), payload.toString(),temp)
     // client.end();
    })
}

function publishMessage(topic,message){
  console.log(`Sending Topic via Subscriber.publishMessage: ${topic}, Message: ${message}`);
  client.publish(topic,message,{qos: 0, retain: false});
 // client.end()
}
function subscribeToTopic(topic2,message){
  console.log(`Subscribing to Topic via subscribe function in: ${topic2}`);
  client.subscribe(topic1,message,{qos: 0});
  //client.end()
}

connectToBroker();
subscribeToTopic("Sala","0");

publishMessage("aqua_light","0");


module.exports = {
    connectToBroker,
    subscribeToTopic,
    publishMessage,
  mqtt
}
