const mqtt = require('mqtt');
const mqttClient = mqtt.connect("mqtt://broker.emqx.io", 8083);
const ActionHistoryCtrl = require('../controller/ActionController');

exports.publishOn = (req, res) => {
    // ActionHistoryCtrl.addNew(req, res);
    mqttClient.publish('esp8266/led/controll', "on led");
    res.status(200).send({"message": "Publish turn on the led successfully!"});
};

exports.publishOff = (req, res) => {
    // ActionHistoryCtrl.addNew(req, res);
    mqttClient.publish('esp8266/led/controll', 'off led');
    res.status(200).send({"message": "Publish turn off the led successfully!"});
};
