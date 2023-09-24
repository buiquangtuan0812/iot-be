const mqtt = require('mqtt');
const mqttClient = mqtt.connect(1883);
const topic = "esp8266/light";
var data = {};

mqttClient.on('message', (receivedTopic, message) => {
    data['msg'] = message.toString();
    data['topic'] = receivedTopic;
});

exports.subscribeLed = (req, res) => {
    mqttClient.subscribe(topic, (err) => {
        if (!err) {
            console.log(`Subscribed to topic: ${topic}`);
            res.status(200).send(data);
        } else {
            console.error(`Error subscribing to topic: ${err}`);
            res.status(500).send(err);
        }
    });
}