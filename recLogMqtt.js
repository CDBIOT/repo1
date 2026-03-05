import mqtt from "mqtt";

const client = mqtt.connect("mqtt://broker.hivemq.com");

client.on("connect", () => {
  client.subscribe("esp32/logs");
});

client.on("message", (topic, message) => {
  const data = JSON.parse(message.toString());
  console.log("LOG RECEBIDO:", data);
});