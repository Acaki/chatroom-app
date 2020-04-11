import React, { useEffect, useState, useRef } from 'react';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import io from 'socket.io-client';
import { Formik } from 'formik';
import { getChatRoomMessages } from './requests';
import './ChatRoom.css';

const SOCKET_IO_URL = 'http://localhost:3000';
const socket = io(SOCKET_IO_URL);

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
    <div className="chat-room-page">
      <div className="chat-box">
        {messages.map((message, i) => {
          return (
            <div className="col-12" key={i}>
              <div className="row">
                <div className="col-2">{message.user.name}</div>
                <div className="col">{message.message}</div>
                <div className="col-3">{message.created_at}</div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <Formik
        validationSchema={schema}
        onSubmit={submitHandler}
        initialValues={{ message: '' }}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
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
    </div>
  );
};

export default ChatRoom;
