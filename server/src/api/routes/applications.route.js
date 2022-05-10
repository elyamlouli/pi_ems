const controllers = require('../controllers/applications.controller')
const express = require('express');
const router = express.Router();

router.route('/').get(controllers.get_applications);

module.exports = router;