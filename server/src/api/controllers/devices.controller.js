const chirpstack = require('../../chirpstack');
const utils = require('../../utils');

exports.get_devices = async function(req, res) {
    const token = utils.get_token(req);
    if (token == null) {
        return res.status(401).send(JSON.stringify({message:'missing api key'}));
    }
    if (req.query.application == null) {
        return res.status(400).send(JSON.stringify({message:'missing application id'}));
    }
    const response = await chirpstack.get_devices(token, req.query.application);
    return res.status(response.status).send(response.data);
};