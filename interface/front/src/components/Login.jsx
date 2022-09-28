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
  }
  
  const FormHeader = props => (
    <h2 id="headerTitle">{props.title}</h2>
  );
  
  
  const Form = props => (
   <div>
     <FormInput description="Email" placeholder="Enter your email" type="email" />
     <FormInput description="Password" placeholder="Enter your password" type="password"/>
     <FormButton title="Log in"/>
   </div>
  );
  
  const FormButton = props => (
  <div id="button" className="row">
    <button>{props.title}</button>
  </div>
  );
  // add onclick to button
  
  const FormInput = props => (
  <div className="row">
    <label>{props.description}</label>
    <input type={props.type} placeholder={props.placeholder}/>
  </div>  
  );

export default LoginForm;