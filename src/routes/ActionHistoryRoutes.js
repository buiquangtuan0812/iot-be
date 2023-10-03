const express = require('express');
const router = express.Router();

const ActionAcontroller = require('../app/controller/ActionController');

router.get('/get-all', ActionAcontroller.findAll);
router.get('/filter-by-day', ActionAcontroller.filterByDay);
router.get('/filter-by-hour', ActionAcontroller.filterByHour);

module.exports = router;

