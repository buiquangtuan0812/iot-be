const express = require('express');
const router = express.Router();

const ActionAcontroller = require('../app/controller/ActionController');

router.get('/get-all', ActionAcontroller.findAll);
router.post('/add', ActionAcontroller.addNew);

module.exports = router;

