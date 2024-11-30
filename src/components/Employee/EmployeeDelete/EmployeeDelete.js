import React, {useState} from 'react';
import { Modal, Button } from 'react-bootstrap';
import EmployeeService from '../../../service/EmployeeService';
import './EmployeeDelete.css';
import CusAlert from '../../Util/Alert'

const EmployeeDeleteModal = ({ employee, show, onHide, onEmployeeDeleted }) => {
  const [alert, setAlert] = useState({
    type: '',
    heading: '',
    message: '',
    show: false,
  });
  
  if (!employee) return null;

  const handleDelete = async (e) => {
    e.stopPropagation();
    let token = localStorage.getItem("token")
    await EmployeeService.deleteEmployee(employee._id, token)
      setAlert({
          type: 'Success',
          heading: 'Deleted Successfully',
          message: `${employee.first_name} deleted successfully signed up.`,
          show: true,
      });
      setTimeout(() => {
        onHide();
        setAlert({
          type: 'Success',
          heading: 'Deleted Successfully',
          message: `${employee.username} deleted successfully signed up.`,
          show: false,
      });
        onEmployeeDeleted();
      }, 2000);
  };

  return (
    <>
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
    <CusAlert
      type={alert.type}
      heading={alert.heading}
      message={alert.message}
      show={alert.show}
      onClose={() => setAlert({ ...alert, show: false })}
    />
    </>
  );
};

export default EmployeeDeleteModal;
