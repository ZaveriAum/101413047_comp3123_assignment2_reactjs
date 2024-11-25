import React from 'react';
import Alert from 'react-bootstrap/Alert';

export default function CusAlert({ type, heading, message, show, onClose }) {
  return (
    show && (
      <Alert variant={type} onClose={onClose} dismissible>
        <Alert.Heading>{heading}</Alert.Heading>
        <p>{message}</p>
      </Alert>
    )
  );
}
