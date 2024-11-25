import React from 'react';
import Alert from 'react-bootstrap/Alert';
import styles from './Alert.module.css'

export default function CusAlert({ type, heading, message, show, onClose }) {
  return (
    show && (
      <Alert variant={type} onClose={onClose} className={styles.alertbody} dismissible>
        <Alert.Heading className={styles.alertheading}>{heading}</Alert.Heading>
        <p className={styles.alertmessage}>{message}</p>
      </Alert>
    )
  );
}
