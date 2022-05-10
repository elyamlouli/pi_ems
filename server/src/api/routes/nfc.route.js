const controllers = require('../controllers/nfc.controller');
const express = require('express');
const router = express.Router();

router.route('/').post(controllers.post_new_nfc);

module.exports = router;