export function getAccessToken() {
  return sessionStorage.getItem('accessToken');
}

export function getrefreshToken() {
  return sessionStorage.getItem('refreshToken');
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

export async function get_key(email, password) {
  const url = 'http://localhost:5000/api/sessions/';
  const body = {
    email: email,
    password: password
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
      sessionStorage.setItem('accessToken', data.accessToken);
      sessionStorage.setItem('refreshToken', data.refreshToken);
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

export async function get_applications() {
  const url = 'http://localhost:5000/api/applications';

  try {
    const response = await get_req(getAccessToken(), url);
    const data = await response.json();
    if (response.ok) {
      return data.result;
    } else {
      alert(data.message);
      return [];
    }
  } catch (e) {
    return [];
  }
}

export async function get_devices(appId) {
  const url = 'http://localhost:5000/api/devices/?';
  try {
    const response = await get_req(getAccessToken(), url + new URLSearchParams({
      appId: appId,
    }));

    const data = await response.json();
    if (response.ok) {
      return data.result;
    } else {
      return [];
    }
  } catch (e) {
    console.log(e)
    return [];
  }
};

export async function new_nfc_card(devEUI, nfcUID) {
  const url = 'http://localhost:5000/api/addNfcCardToDevice';
  const body = {
    devEUI: devEUI,
    nfcUID: nfcUID
  };
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getAccessToken()
      },
      mode: 'cors',
      cache: 'default',
      credentials: 'same-origin',
      body: JSON.stringify(body)
    });
    const data = await response.json();
    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
}