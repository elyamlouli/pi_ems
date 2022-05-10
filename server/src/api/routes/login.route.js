const controllers = require('../controllers/login.controller');
const express = require('express');
const router = express.Router();

router.route('/').post(controllers.post_login);

module.exports = router;