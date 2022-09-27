import { Request, Response } from 'express';
import { pick, get } from 'lodash';
import { addNfcCardToDevice, getApplicatons, getDevices } from '../service/chirpstack';
import { addNfcCardToDeviceInput, GetDevicesInput } from '../schema/chirpstack.schema';

export async function getApplicatonsHandler(req: Request, res: Response) {
    try {
        const response = await getApplicatons();
        const totalCount = get(response, 'data.totalCount');
        const r: Object[] = get(response, 'data.result');
        const result = r.map(obj => pick(obj, ['id', 'name', 'description']));
        return res.status(200).send({
            totalCount,
            result
        });
    } catch (e: any) {
        return res.status(400).send(e.message);
    }
}

export async function getDevicesHandler(req: Request<{}, {}, {}, GetDevicesInput['query']>, res: Response) {
    try {
        const appId = Number(req.query.appId);
        const response = await getDevices(appId);
        const totalCount = get(response, 'data.totalCount');
        const r: Object[] = get(response, 'data.result');
        const result = r.map(obj => pick(obj, ['devEUI', 'name', 'applicationID', 'description']));
        return res.status(200).send({
            totalCount,
            result
        });
    } catch (e: any) {
        return res.status(400).send(e.message);
    }
}

export async function addNfcCardToDeviceHandler(req: Request<{}, {}, addNfcCardToDeviceInput['body']>, res: Response) {
    try {
        const devEUI = req.body.devEUI;
        const nfcUID = req.body.nfcUID;
        const response = await addNfcCardToDevice(devEUI, nfcUID);
        return res.status(200).send(response.data);
    } catch (e: any) {
        return res.status(400).send(e.message);
    }
}