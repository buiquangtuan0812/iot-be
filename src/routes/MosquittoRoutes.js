const express = require('express');
const router = express.Router();

const publish = require('../app/mosquitto/Publish');

router.post('/led/turn-on', publish.publishOn);
router.post('/led/turn-off', publish.publishOff);

module.exports = router;