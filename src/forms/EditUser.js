import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import * as yup from 'yup';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

const schema = yup.object({
  name: yup.string().required('Username is required'),
});

const EditUser = (props) => {
  const [user, setUser] = useState(props.editingUser);

  const submitHandler = async (evt) => {
    const isValid = await schema.validate(evt);
    if (!isValid) {
      return;
    }
    setUser(Object.assign(user, evt));
    props.updateUser(user.id, user);
  };

  useEffect(() => {
    setUser(props.editingUser);
  }, [props]);

  return (
    <Formik
      validationSchema={schema}
      onSubmit={submitHandler}
      initialValues={{ name: user.name, role: user.role }}
      enableReinitialize="true"
    >
      {(formik) => (
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group as={Row} controlId="name">
            <Form.Label column sm="2">Username</Form.Label>
            <Col sm="10">
              <Form.Control type="text" {...formik.getFieldProps('name')} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="role">
            <Form.Label column sm="2">Role</Form.Label>
            <Col sm="10">
              <Form.Control type="role" {...formik.getFieldProps('role')} />
            </Col>
          </Form.Group>

          <Button variants="primary" type="submit">
            Update
          </Button>
          <Button variants="secondary" onClick={() => props.setEditing(false)}>
            Cancel
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default EditUser;
