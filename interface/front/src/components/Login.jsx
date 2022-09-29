import React from "react";


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
  return (
    <div>
      <FormInput description="Email" placeholder="Enter your email" type="email" id="email" />
      <FormInput description="Password" placeholder="Enter your password" type="password" id="password" />
      <FormButton title="Log in" onClick={get_key} />
    </div>
  );
};
  
const FormButton = props => (
  <div id="button" className="row">
    <button>{props.title}</button>
  </div>
);
  
const FormInput = props => (
  <div className="row">
    <label>{props.description}</label>
    <input type={props.type} placeholder={props.placeholder}/>
  </div>  
);


async function get_key() {
  const url = 'http://localhost:5000/api/login/';
  const body = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
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
      document.getElementById('api-key').value = data.jwt;
    } else {
      alert(data.message);
    }
  } catch (e) {
      console.log(e);
    }
};



export default LoginForm;