const chirpstack = require('../../chirpstack');

exports.post_login = async function(req, res) {
    if (req.body.hasOwnProperty('email') && req.body.hasOwnProperty('password')) {
        const response = await chirpstack.get_token(req.body.email, req.body.password);
        res.status(response.status).send(response.data);
    } else {
        res.sendStatus(400).send(JSON.stringify({message:"missing email or password"}));
    }
};