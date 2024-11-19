import React from 'react';
import { Modal } from 'react-bootstrap';
import './EmployeeDetails.css'

const EmployeeDetailsModal = ({ employee, show, onHide }) => {
  if (!employee) return null;

  return (
    <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={onHide} className="employee-modal">
      <Modal.Header closeButton className="modal-header">
        <Modal.Title id="contained-modal-title-vcenter" className="modal-title">
          {employee.first_name} {employee.last_name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <div className="modal-info">
          <p className='detail' ><strong className='detail-head'>Email:</strong> {employee.email}</p>
          <p className='detail' ><strong className='detail-head'>Position:</strong> {employee.position}</p>
          <p className='detail' ><strong className='detail-head'>Department:</strong> {employee.department}</p>
          <p className='detail' ><strong className='detail-head'>Joining Date:</strong> {new Date(employee.date_of_joining).toLocaleDateString()}</p>
          <p className='detail' ><strong className='detail-head'>Created:</strong> {new Date(employee.created_at).toLocaleDateString()}</p>
          <p className='detail' ><strong className='detail-head'>Updated:</strong> {new Date(employee.updated_at).toLocaleDateString()}</p>
          <p className='detail' ><strong className='detail-head'>Salary:</strong> ${employee.salary}</p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EmployeeDetailsModal;
