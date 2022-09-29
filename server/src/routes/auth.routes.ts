import express from 'express';
import validateRessource from '../middleware/validateRessource';
import requireUser from '../middleware/requireUser';
import { createSessionSchema } from '../schema/session.schema';
import { createSessionHandler } from '../controller/auth.controller';
import { getSessionsHandler } from '../controller/auth.controller';
import { deleteSessionHandler } from '../controller/auth.controller';
import { refreshAccessTokenHandler } from '../controller/auth.controller';

const router = express.Router();

router.post('/api/sessions', validateRessource(createSessionSchema), createSessionHandler);

router.get('/api/sessions', requireUser, getSessionsHandler);

router.delete('/api/sessions', requireUser, deleteSessionHandler);

router.post('/api/sessions/refresh', requireUser,refreshAccessTokenHandler);

export default router;