const mqtt = require('mqtt');
const mqttClient = mqtt.connect(1883);

exports.publishOn = (req, res) => {
    mqttClient.publish('esp8266/light', "on led");
    res.send({message: "Turn on the light"});
};

exports.publishOff = (req, res) => {
    mqttClient.publish('esp8266/light', 'off led');
    res.send({message: "Turn off the light"});
};
