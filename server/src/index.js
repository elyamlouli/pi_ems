const env = require('./env');
const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');

const api_routes = require('./api/routes');

app.use(cors());
app.use(express.json());

app.use('/', express.static(path.join(__dirname, '../', './public')));
app.use('/api', api_routes);

app.listen(env.PORT, () => console.log(`Server listening on port: ${env.PORT}`));