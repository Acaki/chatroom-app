import React from 'react';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import * as yup from 'yup';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { createUser } from '../requests';
import Alert from 'react-bootstrap/Alert';

const schema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const AddUser = (props) => {
  const submitHandler = async (evt, { setErrors, resetForm }) => {
    const isValid = await schema.validate(evt);
    if (!isValid) {
      return;
    }
    let response;
    try {
      response = await createUser(evt.username, evt.password);
    } catch (e) {
      if (e.response.status === 303) {
        setErrors(e.response.data);
      } else {
        setErrors({ other: e.response.data });
      }
      return;
    }
    props.addUser(response.data.loggedUser);
    resetForm();
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
              <Form.Control type="text" isInvalid={formik.errors.username} {...formik.getFieldProps('username')} />
              <Form.Control.Feedback type="invalid">
                {formik.errors.username}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="password">
            <Form.Label column sm="2">Password</Form.Label>
            <Col sm="10">
              <Form.Control type="password" isInvalid={formik.errors.password} {...formik.getFieldProps('password')} />
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Button variants="primary" type="submit">
            Submit
          </Button>

          { formik.errors.other && (
            <Alert variant="danger">{formik.errors.other}</Alert>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default AddUser;
