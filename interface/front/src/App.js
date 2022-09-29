import React from "react";
import { Routes, Route } from "react-router-dom"

import './App.css'

import LoginForm from "./components/Login";
import Home from "./components/Home"
import About from "./components/About"
import ContactUs from "./components/ContactUs"
import ListDevices from './components/Devices';
import ListApplications from "./components/Applications";

const App = props => {
  return (
    <div className="App">
      <Routes>
        <Route path="login" element={ <LoginForm/> } />
        <Route path="/" element={ <Home/> } />
        <Route path="about" element={ <About/> } />
        <Route path="contactus" element={ <ContactUs/> } />
        <Route path="listapplications" element={ <ListApplications/> } />
        <Route path="/listapplications/listdevices" element={ <ListDevices/> } />
      </Routes>
    </div>
  )
}

export default App