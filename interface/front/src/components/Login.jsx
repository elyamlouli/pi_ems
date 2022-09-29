import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { get_key } from "./fetchData";

class LoginForm extends React.Component {
  render() {
    return (
      <div id="loginform">
        <FormHeader title="Login" />
        <Form />
      </div>
    );
  }
};

const FormHeader = props => (
  <h2 id="headerTitle">{props.title}</h2>
);


const Form = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleChange = (setData) => (event) => {
    setData(event.target.value);
  };

  return (
    <div>
      <FormInput description="Email" placeholder="Enter your email" type="email" onChange={handleChange(setEmail)} />
      <FormInput description="Password" placeholder="Enter your password" type="password" onChange={handleChange(setPassword)} />
      <FormButton title="Log in" onClick={() => {
        if (get_key(email, password)) {
          navigate("/");
        }
      }} />
    </div>
  );
};

const FormButton = props => (
  <div id="button" className="row">
    <button onClick={props.onClick}>{props.title}</button>
  </div>
);

const FormInput = props => (
  <div className="row">
    <label>{props.description}</label>
    <input type={props.type} placeholder={props.placeholder} onChange={props.onChange} />
  </div>
);


export default LoginForm;