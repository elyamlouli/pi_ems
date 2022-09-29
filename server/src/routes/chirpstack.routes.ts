import express from 'express';
import requireUser from '../middleware/requireUser';
import validateRessource from '../middleware/validateRessource';
import { getApplicatonsHandler } from '../controller/chirpstack.controller';
import { getDevicesSchema } from '../schema/chirpstack.schema';
import { getDevicesHandler } from '../controller/chirpstack.controller';
import { addNfcCardToDeviceSchema } from '../schema/chirpstack.schema';
import { addNfcCardToDeviceHandler } from '../controller/chirpstack.controller';

const router = express.Router();

router.use(requireUser);

router.get('/api/applications', getApplicatonsHandler);

router.get('/api/devices', validateRessource(getDevicesSchema), getDevicesHandler);

router.post('/api/addNfcCardToDevice', validateRessource(addNfcCardToDeviceSchema), addNfcCardToDeviceHandler);

export default router;