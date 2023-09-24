const express = require('express');
const router = express.Router();

const DataSensorController = require('../app/controller/DataSensorController');

router.get('/get-all', DataSensorController.findAll);
router.post('/add', DataSensorController.addNew);

module.exports = router;