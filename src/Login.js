import React, { useState } from 'react';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';
import * as yup from 'yup';
import { login } from './requests';
import { useAuthDataContext } from './AuthDataProvider';

const schema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const Login = () => {
  const { onLogin } = useAuthDataContext();
  const [redirectUri, setRedirectUri] = useState('');
  const submitHandler = async (evt) => {
    const isValid = await schema.validate(evt);
    if (!isValid) {
      return;
    }
    const response = await login(evt.username, evt.password);
    setRedirectUri(response.data.redirectUri);
    localStorage.setItem('loggedUser', JSON.stringify(response.data.loggedUser));
    onLogin(response.data.loggedUser);
  };

  if (redirectUri) {
    return <Redirect to={redirectUri} />;
  }

  return (
    <Formik
      validationSchema={schema}
      onSubmit={submitHandler}
      initialValues={{ username: '', password: '' }}
    >
      {(formik) => (
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" {...formik.getFieldProps('username')} />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" {...formik.getFieldProps('password')} />
          </Form.Group>

          <Button varians="primary" type="submit">
            Login
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
