import { object, string, TypeOf } from 'zod';

export const getDevicesSchema = object({
    query: object({
        appId: string({
            required_error: 'appID is required'
        }).regex(/[0-9]+/, { message: 'appID should be an number' })
    })
});

export type GetDevicesInput = TypeOf<typeof getDevicesSchema>;

export const addNfcCardToDeviceSchema = object({
    body: object({
        devEUI: string({
            required_error: 'devEUI is required'
        }),
        nfcUID: string({
            required_error: 'nfcUID is required'
        })
    })
});

export type addNfcCardToDeviceInput = TypeOf<typeof addNfcCardToDeviceSchema>;
