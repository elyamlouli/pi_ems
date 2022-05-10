const chirpstack = require('../../chirpstack');
const utils = require('../../utils');

exports.get_organizations = async function(req, res) {
    const token = utils.get_token(req);
    if (token == null) {
        return res.status(401).send(JSON.stringify({message:'missing api key'}));
    }
    const response = await chirpstack.get_organizations(token);
    return res.status(response.status).send(response.data);
};