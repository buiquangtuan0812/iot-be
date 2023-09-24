const express = require('express');
const router = express.Router();

const publish = require('../app/mosquitto/Publish');
const subscribe = require('../app/mosquitto/Subscribe');

router.post('/led/turn-on', publish.publishOn);
router.post('/led/turn-off', publish.publishOff);
router.get('/subscribe', subscribe.subscribeLed);

module.exports = router;