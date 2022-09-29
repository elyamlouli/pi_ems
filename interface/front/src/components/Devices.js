import Button from "./Button";
const { Link } = require("react-router-dom");

/*
    Faire liste applications => liste devices comme sur Chirpstack */

const ListDevices = (props) => {
    return (
        <div>
            <Link to="/">Home</Link>
            <h1>Devices Page</h1>
            <Button title="Add new device" />
            <Button title="Get list of devices" onClick={get_devices} />
        </div>
    );
};

async function get_devices() {
    const url = 'http://localhost:5000/api/devices/?';
    const api_key = document.getElementById('api-key').value;
    const application_id = document.getElementById('application-id').value;

    try {
        const response = await get_req(api_key, url + new URLSearchParams({
            application: application_id,
        }));
        const data = await response.json();
        if (response.ok) {
            update_list('list-devices', 'set_device(this)', data, 'devEUI');
        } else {
            alert(data.message);
        }
    } catch (e) {
        console.log(e);
    }
};


async function get_req(api_key, url) {
    return await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + api_key
        },
        mode: 'cors',
        cache: 'default',
        credentials: 'same-origin',
    });
};


function update_list(list_id, onclick_attr, data, name) {
    let ul = document.getElementById(list_id);
    ul.innerHTML = '';
    let doc_frag = document.createDocumentFragment();
    let l = data.result;
    for (const obj of l) {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(obj[name]));
        li.setAttribute('onclick', onclick_attr);
        doc_frag.appendChild(li);
    }
    ul.appendChild(doc_frag);
};


export default ListDevices;