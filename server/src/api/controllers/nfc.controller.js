const chirpstack = require('../../chirpstack');
const utils = require('../../utils');

exports.post_new_nfc = async function(req, res) {
    const token = utils.get_token(req);
    if (token == null) {
        return res.status(401).send(JSON.stringify({message:'missing api key'}));
    }
    if (req.body.hasOwnProperty('devEUI') && req.body.hasOwnProperty('nfcUid')) {
        const response = await chirpstack.new_nfc_uid(token, req.body.devEUI, req.body.nfcUid);
        res.status(response.status).send(response.data);
    } else {
        res.sendStatus(400).send(JSON.stringify({message:"missing devEUI or nfcUid"}));
    }
};