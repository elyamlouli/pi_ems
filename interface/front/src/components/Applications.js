import { useEffect, useState } from "react";
import { get_applications } from "./fetchData";
const { Link } = require("react-router-dom");



// Pour chaque item de la liste, on en sort son id, name et description
const ListItem = ({ item }) => (
  <li>
    <div><Link to={"listdevices"}
      state={{id:item.id}}
    >{item.id}</Link></div>
    <div>{item.name}</div>
    <div>{item.description}</div>
  </li>
);

const ListApplications = () => {
  const [appList, setAppList] = useState([]);

  useEffect(() => {
    const f = async () => {
      const l = await get_applications();
      setAppList(l);
    };
    f().catch((e) => console.log(e));
  }, []);

  return (
    <div>
      <Link to="/">Home</Link>,
      <Link to="/login">Login</Link>
      <h1>Applications</h1>
      <ul>
        {appList.map(item => (
          <ListItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default ListApplications;
