import apiClient from '../../client/apiClient';
import { useState, useEffect } from 'react';
import { Button, Card, Modal, Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const [query, setQuery] = useState()
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  const getEmployees = async () => {    
    await apiClient
    .get('/api/v1/emp/employees')
    .then((emps) => {
        setEmployee(emps.data.employees);
    })
    .catch((e) => console.log(e));
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const search = async (e)=>{
    e.preventDefault();
    await apiClient
    .get(`/api/v1/emp/search/${query}`)
    .then((emps) => {
        setEmployee(emps.data.employees);
    })
    .catch((e) => console.log(e));
  }

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

  return (
    <div className="empBody">
        <InputGroup name="query" type="query" onChange={(e) => setQuery(e.target.value)}>
            <Form.Control type="text"/>
            <Button onClick={(e) => search(e)}><InputGroup.Text><FontAwesomeIcon icon={faMagnifyingGlass} /></InputGroup.Text></Button>
        </InputGroup>
      {employee.map((emp) => (
        <Card
          key={emp._id}
          style={{ width: '18rem', cursor: 'pointer', marginBottom: '10px' }}
          onClick={() => {
            setSelectedEmployee(emp);
            setModalShow(true);
          }}
        >
          <Card.Body>
            <Card.Title>
              {emp.first_name} {emp.last_name}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{emp.position}</Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">{emp.department}</Card.Subtitle>
            <Button variant="primary" className="me-2">
              <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
            <Button variant="danger">
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </Card.Body>
        </Card>
      ))}
      <EmployeeDetailsModal
        employee={selectedEmployee}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};

export default Employee;
