const express = require('express');
const router = express.Router();

const publish = require('../app/mosquitto/Publish');

router.post('/led/controll', publish.PublishControll);
router.post('/warning', publish.PublishWarning);


module.exports = router;