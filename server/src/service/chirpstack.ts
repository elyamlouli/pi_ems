import axios from 'axios';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5X2lkIjoiY2MyMTQ0YWItZWIwNi00MzEwLThhZDQtNTdjOWZhNmI0Y2M5IiwiYXVkIjoiYXMiLCJpc3MiOiJhcyIsIm5iZiI6MTY0NzI2Nzg1Miwic3ViIjoiYXBpX2tleSJ9.eE8XljZZFxuu8--z9Ios4DuvMjFFvpN5W9WM7GdFVUc";
const orga_id = 116;

export async function getApplicatons() {
    const url = `https://inetlab-lorawan.icube.unistra.fr/api/applications?limit=10&organizationID=${orga_id}`;
    const config = {
        headers: {
            'Accept': 'application/json',
            'Grpc-Metadata-Authorization': `Bearer ${token}`
        },
    };
    try {
        const res = await axios.get(url, config);
        console.log(res.data);
    } catch (e: any) {
        console.log(e.response);
    }
}

export async function getDevices(app_id: number) {
    const url = `https://inetlab-lorawan.icube.unistra.fr/api/devices?limit=10&applicationID=${app_id}`;
    const config = {
        headers: {
            'Accept': 'application/json',
            'Grpc-Metadata-Authorization': `Bearer ${token}`
        },
    };
    try {
        const res = await axios.get(url, config);
        console.log(res.data);
    } catch (e: any) {
        console.log(e.response);
    }
}
