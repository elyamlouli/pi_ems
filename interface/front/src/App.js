import { Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import About from "./components/About"
import ContactUs from "./components/ContactUs"
import Login from "./components/Login"
import ListDevices from './components/Devices';

function App() {
  return (
    <div className="App">

      <Routes>
      <Route path="login" element={ <Login/> } />
        <Route path="/" element={ <Home/> } />
        <Route path="about" element={ <About/> } />
        <Route path="contactus" element={ <ContactUs/> } />
        <Route path="listdevices" element={ <ListDevices/> } />
      </Routes>
    </div>
  )
}

export default App