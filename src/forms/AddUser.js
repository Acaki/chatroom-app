import React from 'react';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import * as yup from 'yup';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { createUser } from '../requests';

const schema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const AddUser = (props) => {
  const submitHandler = async (evt) => {
    const isValid = await schema.validate(evt);
    if (!isValid) {
      return;
    }
    const response = await createUser(evt.username, evt.password);
    props.addUser(response.data);
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={submitHandler}
      initialValues={{ username: '', password: '' }}
    >
      {(formik) => (
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group as={Row} controlId="username">
            <Form.Label column sm="2">Username</Form.Label>
            <Col sm="10">
              <Form.Control type="text" {...formik.getFieldProps('username')} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="password">
            <Form.Label column sm="2">Password</Form.Label>
            <Col sm="10">
              <Form.Control type="password" {...formik.getFieldProps('password')} />
            </Col>
          </Form.Group>

          <Button variants="primary" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddUser;
