import { useState , useEffect} from "react";
import { get_devices, new_nfc_card } from "./fetchData";
const { Link, useLocation } = require("react-router-dom");


// Pour chaque item de la liste, on en sort son id, name et description
const ListItem = ({ item }) => {
  const [nfcUID, setNfcUID] = useState('')
  const addCard = async () => {
    const sended = await new_nfc_card(item.devEUI, nfcUID);
    if (sended) {
      alert('sended')
    } else {
      alert('not sended')
    }
  }
  return (
      <li>
        <div><Link to="/listdevices">{item.id}</Link></div>
        <div>{item.devEUI}</div>
        <div>{item.name}</div>
        <div>{item.applicationID}</div>
        <div>{item.description}</div>
        <input type="text" onChange={(event => setNfcUID(event.target.value))} ></input>
        <button onClick={addCard}>Add new NFC card</button>
      </li>
    );
} 


const ListDevices = () => {
  const location = useLocation();
  const [devicesList, setDevicesList] = useState([]);

  useEffect(() => {
    const f = async () => {
      const l = await get_devices(location.state.id);
      setDevicesList(l);
    };
    f().catch((e) => console.log(e));
  }, []);

  return (
    <div>
      <Link to="/">Home</Link>,
      <Link to="/listapplications">Back</Link>
      <h1>Devices Page</h1>
    </div>,
    <div>
      <ul>
        {devicesList.map(item => (
          <ListItem key={item.devEUI} item={item} />
        ))}
      </ul>
    </div>
  );
};


export default ListDevices;