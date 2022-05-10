const axios = require('axios');

exports.get_token = async function (email, password) {
    const url = 'https://inetlab-lorawan.icube.unistra.fr/api/internal/login';
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    };
    const data = {
        email: email,
        password: password
    };
    try {
        return await axios.post(url, data, config);
    } catch (e) {
        return e.response;
    }
};

exports.get_organizations = async function (token) {
    const url = 'https://inetlab-lorawan.icube.unistra.fr/api/organizations?limit=10';
    const config = {
        headers: {
            'Accept': 'application/json',
            'Grpc-Metadata-Authorization': `Bearer ${token}`
        },
    };
    try {
        return await axios.get(url, config);
    } catch (e) {
        return e.response;
    }
};

exports.get_applications = async function (token, orga_id) {
    const url = `https://inetlab-lorawan.icube.unistra.fr/api/applications?limit=10&organizationID=${orga_id}`;
    const config = {
        headers: {
            'Accept': 'application/json',
            'Grpc-Metadata-Authorization': `Bearer ${token}`
        },
    };
    try {
        return await axios.get(url, config);
    } catch (e) {
        return e.response;
    }
};

exports.get_devices = async function (token, app_id) {
    const url = `https://inetlab-lorawan.icube.unistra.fr/api/devices?limit=10&applicationID=${app_id}`;
    const config = {
        headers: {
            'Accept': 'application/json',
            'Grpc-Metadata-Authorization': `Bearer ${token}`
        },
    };
    try {
        return await axios.get(url, config);
    } catch (e) {
        return e.response;
    }
};

exports.new_nfc_uid = async function (token, dev_eui, nfc_uid) {
    const url = `https://inetlab-lorawan.icube.unistra.fr/api/devices/${dev_eui}/queue`;
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Grpc-Metadata-Authorization': `Bearer ${token}`,
        },
    };
    const obj = {
        'newNfcUid': {
            '1': nfc_uid
        }
    };
    const data = {
        'deviceQueueItem': {
            'confirmed': true,
            'devEUI': dev_eui,
            'fPort': 3,
            'jsonObject': JSON.stringify(obj),
        }
    };
    try {
        return await axios.post(url, data, config);
    } catch (e) {
        return e.response;
    }
};