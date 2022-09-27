import axios from 'axios';
import config from '../config';

export async function getApplicatons() {
    const url = `https://inetlab-lorawan.icube.unistra.fr/api/applications?limit=10&organizationID=${config.chirpstack.orgaId}`;
    const conf = {
        headers: {
            'Accept': 'application/json',
            'Grpc-Metadata-Authorization': `Bearer ${config.chirpstack.orgaToken}`
        },
    };
    return axios.get(url, conf);
}

export async function getDevices(appId: number) {
    const url = `https://inetlab-lorawan.icube.unistra.fr/api/devices?limit=10&applicationID=${appId}`;
    const conf = {
        headers: {
            'Accept': 'application/json',
            'Grpc-Metadata-Authorization': `Bearer ${config.chirpstack.orgaToken}`
        },
    };
    return axios.get(url, conf);
}

export async function addNfcCardToDevice(devEui: string, nfcUID: string) {
    const url = `https://inetlab-lorawan.icube.unistra.fr/api/devices/${devEui}/queue`;
    const conf = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Grpc-Metadata-Authorization': `Bearer ${config.chirpstack.orgaToken}`,
        },
    };
    const obj = {
        'newNfcUid': {
            '1': nfcUID
        }
    };
    const data = {
        'deviceQueueItem': {
            'confirmed': true,
            'devEUI': devEui,
            'fPort': 3,
            'jsonObject': JSON.stringify(obj),
        }
    };
    return axios.post(url, data, conf);
}