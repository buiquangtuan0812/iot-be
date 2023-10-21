const mqtt = require('mqtt');
const mqttClient = mqtt.connect("mqtt://broker.emqx.io", 8083);
const topic = "esp8266/datasensor";
const http = require('http'); // tạo máy chủ http
const websocket = require('ws'); // tạo máy chủ websocket
const DataSensor = require('../model/DataSensor');

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
        const data = JSON.parse(message);
        const date = new Date();
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        let day = date.getDate();
        day = day < 10 ? '0' + day : day;
        let hour = date.getHours();
        hour = hour < 10 ? '0' + hour : hour;
        let minute = date.getMinutes();
        minute = minute < 10 ? '0' + minute : minute;
        let second = date.getSeconds();
        second = second < 10 ? '0' + second : second;
        const time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
        data["time"] = time;
        const dustLevel = Math.floor(Math.random() * (100 - 15)) + 15;
        data["dustLevel"] = dustLevel;
        const newDataSensor = new DataSensor({
            ssid: 1,
            temperature: data["temp"],
            humidity: data["humidity"],
            brightness: data["bright"],
            dustLevel: data["dustLevel"],
            time: time
        });
        DataSensor.create(newDataSensor, (err, data) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Sensor created");
            }
        })
        wss.clients.forEach(client => {
            if (client.readyState === websocket.OPEN) {
                client.send(JSON.stringify(data));
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