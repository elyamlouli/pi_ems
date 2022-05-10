const path = require('path');
require('dotenv').config({ "path": path.join(__dirname, '../', '.env')});

const env = {
    PORT: process.env.PORT || 3000,
    CHIRPSTACK_USER: process.env.CHIRPSTACK_USER,
    CHIRPSTACK_PASSWORD: process.env.CHIRPSTACK_PASSWORD,
};

for (const prop in env) {
    if (env[prop] === undefined) {
        console.log(`Error missing evironement variable : ${prop}`)
    }
}

module.exports = env;