const express = require('express');
const router = express.Router();

const DataSensorController = require('../app/controller/DataSensorController');

router.get('/get-all', DataSensorController.findAll);
router.get('/filter-by-day', DataSensorController.filter);
router.get('/filter-by-hour', DataSensorController.filterByHour);

module.exports = router;