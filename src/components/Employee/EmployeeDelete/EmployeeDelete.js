import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import EmployeeService from '../../../service/EmployeeService';
import './EmployeeDelete.css';

const EmployeeDeleteModal = ({ employee, show, onHide, onEmployeeDeleted }) => {
  if (!employee) return null;

  const handleDelete = (e) => {
    e.stopPropagation();
    EmployeeService.deleteEmployee(employee._id)
      .then(() => {
        onHide();
        onEmployeeDeleted();
      })
      .catch((e) => console.log(e));
  };

  return (
    <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={onHide} className="employee-delete-modal">
      <Modal.Header closeButton className="modal-header">
        <Modal.Title id="contained-modal-title-vcenter" className="modal-title">
          Are you sure you want to delete this employee?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <div className="modal-info">
          <p className='delete-info' ><strong className="detail-head">Name:</strong> {employee.first_name} {employee.last_name}</p>
          <p className='delete-info' ><strong className="detail-head">Email:</strong> {employee.email}</p>
          <p className='delete-info' ><strong className="detail-head">Position:</strong> {employee.position}</p>
          <p className='delete-info' ><strong className="detail-head">Department:</strong> {employee.department}</p>
        </div>
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <Button variant="danger" onClick={handleDelete} className="delete-button">Delete</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EmployeeDeleteModal;
