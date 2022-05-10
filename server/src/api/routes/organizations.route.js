const controllers = require('../controllers/organizations.controller')
const express = require('express');
const router = express.Router();

router.route('/').get(controllers.get_organizations);

module.exports = router;