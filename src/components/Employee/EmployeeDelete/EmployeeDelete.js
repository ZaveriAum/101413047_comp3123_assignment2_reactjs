import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import EmployeeService from '../../../service/EmployeeService';

const EmployeeDeleteModal = ({ employee, show, onHide, onEmployeeDeleted }) => {
  if (!employee) return null;

  const handleDelete = (e) => {
    e.stopPropagation();
    EmployeeService.deleteEmployee(employee._id)
      .then(() => {
        onHide(); // Close the modal
        onEmployeeDeleted(); // Trigger a refresh of the employee list
      })
      .catch((e) => console.log(e));
  };

  return (
    <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Are you sure you want to delete this employee?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Name: </strong>{employee.first_name} {employee.last_name}</p>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Position:</strong> {employee.position}</p>
        <p><strong>Department:</strong> {employee.department}</p>
        <p><strong>Joining Date:</strong> {new Date(employee.date_of_joining).toLocaleDateString()}</p>
        <p><strong>Created:</strong> {new Date(employee.created_at).toLocaleDateString()}</p>
        <p><strong>Updated:</strong> {new Date(employee.updated_at).toLocaleDateString()}</p>
        <p><strong>Salary:</strong> ${employee.salary}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EmployeeDeleteModal;
