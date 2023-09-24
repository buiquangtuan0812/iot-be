const http = require('http');
const websocket = require('ws');

function Websocket(app) {
    const server = http.createServer(app);
    server.listen(8000);
    const wss = new websocket.Server({server: server});

    wss.on('connection', (ws) => {
        console.log("Client connected");
        ws.on('message', (msg) => {
            console.log(`Received ${msg}`);
            wss.clients.forEach(client => {
                if (client !== ws && client.readyState === websocket.OPEN) {
                    client.send(msg);
                };
            });
        });

        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });
};

module.exports = Websocket;