import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import config from './config';
import connect from './utils/connect';
import logger from './utils/logger';
import routes from './routes';

import deserializeUser from './middleware/deserializeUser';

const app = express();

app.use(cors());

app.use(express.json());

app.use(deserializeUser);

app.listen(config.server.port, async () => {
	logger.info(`Server is running at ${config.server.port}`);

	await connect();

	routes(app);
});
