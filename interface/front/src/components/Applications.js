import Button from "./Button";
const { Link, useNavigate } = require("react-router-dom");

// faire une liste d'application qui redirige vers la liste des devices associés


const ListApplications = () => {
  const navigate = useNavigate()

  const showDevices = () => {
    navigate("/listapplications/listdevices");
    };
  

  return (
    <div>
      <Link to="/">Home</Link>, 
      <Link to="/login">Login</Link>
      <h1>Applications</h1>
      <button onClick={showDevices}>Device 1</button>
      <button onClick={showDevices}>Device 2</button>
      <button onClick={showDevices}>Device 3</button>
      <button onClick={showDevices}>Device 4</button>
    </div>
  );
};

export default ListApplications;
