async function get_key() {
    const url = 'http://localhost:3000/api/login/';
    const body = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            mode: 'cors',
            cache: 'default',
            credentials: 'same-origin',
            body: JSON.stringify(body)
        });
        const data = await response.json();
        if (response.ok) {
            document.getElementById('api-key').value = data.jwt;
        } else {
            alert(data.message);
        }
    } catch (e) {
        console.log(e);
    }
}

async function get_organizations() {
    const url = 'http://localhost:3000/api/organizations/';
    const api_key = document.getElementById('api-key').value;
    try {
        const response = await get_req(api_key, url);
        const data = await response.json();
        if (response.ok) {
            update_list('list-organizations', 'set_organization(this)', data, 'id');
        } else {
            alert(data.message);
        }
    } catch (e) {
        console.log(e);
    }
}

async function set_organization(obj) {
    document.getElementById('organization-id').value = obj.innerHTML
}

async function get_applications() {
    const url = 'http://localhost:3000/api/applications/?';
    const api_key = document.getElementById('api-key').value;
    const organization_id = document.getElementById('organization-id').value;

    try {
        const response = await get_req(api_key, url + new URLSearchParams({
            organization: organization_id,
        }));
        const data = await response.json();
        if (response.ok) {
            update_list('list-applications', 'set_application(this)', data, 'id');
        } else {
            alert(data.message);
        }
    } catch (e) {
        console.log(e);
    }
}

async function set_application(obj) {
    document.getElementById('application-id').value = obj.innerHTML
}

async function get_devices() {
    const url = 'http://localhost:3000/api/devices/?';
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
}

async function set_device(obj) {
    document.getElementById('device-id').value = obj.innerHTML
}

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
}

async function send_nfc() {
    const url = 'http://localhost:3000/api/nfc/';
    const api_key = document.getElementById('api-key').value;
    const dev_eui = document.getElementById('device-id').value;
    const body = {
        devEUI: dev_eui,
        nfcUid: document.getElementById('nfc-id').value
    };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + api_key
            },
            mode: 'cors',
            cache: 'default',
            credentials: 'same-origin',
            body: JSON.stringify(body)
        });
        const data = await response.json();
        if (response.ok) {
            alert(`UID ${dev_eui} sent`);
        } else {
            alert(data.message);
        }
    } catch (e) {
        console.log(e);
    }
}


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
}

