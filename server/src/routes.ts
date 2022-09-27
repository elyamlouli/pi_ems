import { Express, Request, Response } from 'express';
import { createSessionHandler, deleteSessionHandler, getSessionsHandler } from './controller/auth.controller';
import { addNfcCardToDeviceHandler, getApplicatonsHandler, getDevicesHandler } from './controller/chirpstack.controller';
import { createUserHandler } from './controller/user.controller';
import requireUser from './middleware/requireUser';
import validateRessource from './middleware/validateRessource';
import { addNfcCardToDeviceSchema, getDevicesSchema } from './schema/chirpstack.schema';
import { createSessionSchema } from './schema/session.schema';
import { createUserSchema } from './schema/user.schema';

function routes(app: Express) {
    app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

    app.post('/api/users', validateRessource(createUserSchema), createUserHandler);

    app.post('/api/sessions', validateRessource(createSessionSchema), createSessionHandler);

    app.get('/api/sessions', requireUser, getSessionsHandler);

    app.delete('/api/sessions', requireUser, deleteSessionHandler);

    app.get('/api/applications', getApplicatonsHandler);

    app.get('/api/devices', validateRessource(getDevicesSchema), getDevicesHandler);

    app.post('/api/addNfcCardToDevice', validateRessource(addNfcCardToDeviceSchema), addNfcCardToDeviceHandler);

}

export default routes;