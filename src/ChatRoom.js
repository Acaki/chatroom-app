import React, { useEffect, useState, useRef } from 'react';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import io from 'socket.io-client';
import { Formik } from 'formik';
import { getChatRoomMessages } from './requests';
import './ChatRoom.css';

const socket = io(process.env.REACT_APP_SOCKET_IO_URL);

const schema = yup.object({
  message: yup.string().required('Message is required'),
});

const ChatRoom = () => {
  const [messages, setMssages] = useState([]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const submitHandler = async (evt, { resetForm }) => {
    const isValid = await schema.validate(evt);
    if (!isValid) {
      return;
    }
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    const data = {
      userId: loggedUser.id,
      message: evt.message,
    };

    socket.emit('message', data);
    resetForm();
  };

  useEffect(() => {
    const getMessages = async () => {
      const response = await getChatRoomMessages();
      setMssages(response.data);
      scrollToBottom();
    };

    const listenForNewMessages = () => {
      socket.on('newMessage', () => {
        getMessages();
      });
    };

    getMessages();
    listenForNewMessages();
  }, []);

  return (
    <Container fluid className="mt-3">
      <Row className="mb-3">
        <Col sm={2}><b>Name</b></Col>
        <Col sm={8}><b>Message</b></Col>
        <Col sm={2}><b>Time</b></Col>
      </Row>
      <div className="chat-box">
        {messages.map((message, i) => (
          <Col key={i}>
            <Row>
              <Col sm={2}>{message.user.name}</Col>
              <Col sm={8}>{message.message}</Col>
              <Col sm={2}>{message.created_at}</Col>
            </Row>
          </Col>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <Formik
        validationSchema={schema}
        onSubmit={submitHandler}
        initialValues={{ message: '' }}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit} className="mt-3">
            <Form.Row>
              <Form.Group as={Col} md="12" controlId="message">
                <Form.Label>Message</Form.Label>
                <Form.Control type="text" {...formik.getFieldProps('message')} />
              </Form.Group>
            </Form.Row>

            <Button varians="primary" type="submit">
              Send
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default ChatRoom;
