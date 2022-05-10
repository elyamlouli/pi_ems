const organization_routes = require('./organizations.route');
const login_routes = require('./login.route');
const applications_routes = require('./applications.route');
const devices_routes = require('./devices.route');
const device_nfc = require('./nfc.route');

const express = require('express');
const router = express.Router();


router.use('/organizations', organization_routes);
router.use('/login', login_routes);
router.use('/applications', applications_routes);
router.use('/devices', devices_routes);
router.use('/nfc', device_nfc);

module.exports = router;