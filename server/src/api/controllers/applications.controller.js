const chirpstack = require('../../chirpstack');
const utils = require('../../utils');

exports.get_applications = async function(req, res) {
    const token = utils.get_token(req);
    if (token == null) {
        return res.status(401).send(JSON.stringify({message:'missing api key'}));
    }
    if (req.query.organization == null) {
        return res.status(400).send(JSON.stringify({message:'missing organization id'}));
    }
    const response = await chirpstack.get_applications(token, req.query.organization);
    return res.status(response.status).send(response.data);
};