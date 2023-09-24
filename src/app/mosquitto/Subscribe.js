const mqtt = require('mqtt');
const mqttClient = mqtt.connect(1883);
const topic = "esp8266/light";
const http = require('http');
const websocket = require('ws');
var data = {};

function Subscribe(app) {
    const server = http.createServer(app);
    server.listen(8000);
    const wss = new websocket.Server({server: server});
    mqttClient.on('connect', () => {
        mqttClient.subscribe(topic, (err) => {
            if (!err) {
                console.log(`Subscribed to topic: ${topic}`);
            } else {
                console.error(`Error subscribing to topic: ${err}`);
            }
        });
    });
    mqttClient.on('message', (receivedTopic, message) => { 
        data['msg'] = message.toString();
        data['topic'] = receivedTopic;
        console.log(data);
        wss.clients.forEach(client => {
            if (client.readyState === websocket.OPEN) {
                client.send(message);
            }
        });
    
        mqttClient.on('offline', () => {
            console.log("MQTT disconnected");
        });
    
        mqttClient.on('error', (err) => {
            console.log("MQTT error: " + err);
        });
    })
}

module.exports = Subscribe;