const cors = require('cors');
const morgan = require('morgan');
const express = require('express');

const port = 8008;
const app = express();
const route = require('./src/routes/routes');
const bodyParser = require('body-parser');
const db = require('./src/config/connectDb');
const websocket = require('./src/app/websocket/WebSocket');
const subscribe = require('./src/app/mosquitto/Subscribe');


db;
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000}));
route(app);
// websocket(app);
subscribe(app);

app.listen(port);