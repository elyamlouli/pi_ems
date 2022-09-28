import React from 'react';
import { Link } from "react-router-dom";

import LoginForm from './Form';


const Login = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <h1>Login</h1>
      <LoginForm/>
    </div>
  );
};

export default Login;