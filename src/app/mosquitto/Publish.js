const mqtt = require('mqtt');
const mqttClient = mqtt.connect("mqtt://broker.emqx.io", 8083);
const ActionHistoryCtrl = require('../controller/ActionController');

// Handle MQTT connection errors
mqttClient.on('error', (error) => {
  console.error('MQTT Connection Error:', error);
});

exports.PublishControll = (req, res) => {
    const data = req.body;
    ActionHistoryCtrl.addNew(data);
    mqttClient.publish('esp8266/led/controll', data.action, (error) => {
        if (error) {
            console.error('MQTT Publish Error:', error);
            res.status(500).json({ error: 'Failed to publish MQTT message' });
        } else {
            res.status(200).json({ message: 'MQTT message published' });
        }
    });
};


exports.PublishWarning = (req, res) => {
    mqttClient.publish('warning/dustlevel', 'warning/dustlevel', (err) => {
        if (err) {
            console.error('MQTT Publish Error:', err);
            res.status(500).json({ error: 'Failed to publish MQTT message' });
        } else {
            res.status(200).json({ message: 'MQTT message published' });
        }
    });
};