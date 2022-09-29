import { useNavigate } from "react-router-dom";

// faire une liste d'application qui redirige vers la liste des devices associés


const ListApplications = () => {
  const navigate = useNavigate()

  const showDevices = () => {
    navigate("/listdevices");
    };

  return (
    <div>
      <h1>Applications</h1>
      <button onClick={showDevices}>Device 1</button>
      <button onClick={showDevices}>Device 2</button>
      <button onClick={showDevices}>Device 3</button>
      <button onClick={showDevices}>Device 4</button>
    </div>
  );
};

export default ListApplications;
