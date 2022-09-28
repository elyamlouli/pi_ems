import express from 'express';
import validateRessource from '../middleware/validateRessource';
import { createUserSchema } from '../schema/user.schema';
import { createUserHandler } from '../controller/user.controller';

const router = express.Router();

router.post('/api/users', validateRessource(createUserSchema), createUserHandler);

export default router;