import {Modal} from 'react-bootstrap'

const EmployeeDetailsModal = ({ employee, show, onHide }) => {
    if (!employee) return null;

    return (
      <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {employee.first_name} {employee.last_name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Email:</strong> {employee.email}</p>
          <p><strong>Position:</strong> {employee.position}</p>
          <p><strong>Department:</strong> {employee.department}</p>
          <p><strong>Joining Date:</strong> {new Date(employee.date_of_joining).toLocaleDateString()}</p>
          <p><strong>Created:</strong> {new Date(employee.created_at).toLocaleDateString()}</p>
          <p><strong>Updated:</strong> {new Date(employee.updated_at).toLocaleDateString()}</p>
          <p><strong>Salary:</strong> ${employee.salary}</p>
        </Modal.Body>
      </Modal>
    );
  };

  export default EmployeeDetailsModal