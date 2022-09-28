import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';


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
}


const LoginForm = () => (
    <div>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
              <div>
              <label htmlFor='email'> Email </label>
              <Field type="email" name="email" placeholder="email@example.com"/>
              <ErrorMessage name="email" component="div" />
  
              <label htmlFor='password'> Password </label>
              <Field type="password" name="password" placeholder="********"/>
              <ErrorMessage name="password" component="div" />
              <button type="submit" disabled={isSubmitting} onClick={() => get_key()} className="button">
                  Submit
              </button>
              </div>
          </Form>
        )}
      </Formik>
    </div>
  );
  
  export default LoginForm;