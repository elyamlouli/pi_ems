const controllers = require('../controllers/devices.controller')
const express = require('express');
const router = express.Router();

router.route('/').get(controllers.get_devices);

module.exports = router;