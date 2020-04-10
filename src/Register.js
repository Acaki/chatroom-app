import React, { useState } from 'react';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';
import * as yup from 'yup';
import { register } from './requests';
import { useAuthDataContext } from './AuthDataProvider';
import Alert from 'react-bootstrap/Alert';

const schema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const Register = () => {
  const { onLogin } = useAuthDataContext();
  const [redirectUri, setRedirectUri] = useState('');
  const submitHandler = async (evt, { setErrors }) => {
    const isValid = await schema.validate(evt);
    if (!isValid) {
      return;
    }
    let response;
    try {
      response = await register(evt.username, evt.password);
    } catch (e) {
      if (e.response.status === 401) {
        setErrors(e.response.data);
      } else {
        setErrors({ other: e.response.data });
      }
      return;
    }
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
            <Form.Control type="text" isInvalid={formik.errors.username} {...formik.getFieldProps('username')} />
            <Form.Control.Feedback type="invalid">
              {formik.errors.username}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" {...formik.getFieldProps('password')} />
          </Form.Group>

          <Button varians="primary" type="submit">
            Register
          </Button>

          { formik.errors.other && (
            <Alert variant="danger">{formik.errors.other}</Alert>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default Register;
