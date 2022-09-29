import React, { useState } from "react";


class LoginForm extends React.Component{
  render(){
    return(
      <div id="loginform">
        <FormHeader title="Login" />
        <Form />
      </div>
    )
  }
};
  
const FormHeader = props => (
  <h2 id="headerTitle">{props.title}</h2>
);
  
  
const Form = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (setData) => (event) => {
    setData(event.target.value);
  }

  return (
    <div>
      <FormInput description="Email" placeholder="Enter your email" type="email" onChange={handleChange(setEmail)} />
      <FormInput description="Password" placeholder="Enter your password" type="password" onChange={handleChange(setPassword)} />
      <FormButton title="Log in" onClick={() => get_key(email, password)} />
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
    <input type={props.type} placeholder={props.placeholder} onChange={props.onChange}/>
  </div>  
);


async function get_key(email, password) {
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
      console.log(data);
    } else {
      alert(data.message);
    }
  } catch (e) {
      console.log(e);
    }
};



export default LoginForm;