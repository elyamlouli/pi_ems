import React from "react";
import { Link } from "react-router-dom";
  
const About = () => {
  return (
    <div>
      <Link to="/">Home</Link>,  
      <Link to="/login">Login</Link>
      <h1>About Page</h1>
      <p>Projet en collaboration avec l'Eurométropole de Strasbourg</p>
    </div>
  );
};
  
export default About;