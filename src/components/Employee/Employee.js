import apiClient from '../../client/apiClient';
import { useState, useEffect } from 'react';
import { Button, Card, Modal, Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Employee = () => {

  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  const [query, setQuery] = useState()
  const [selectedDetailsEmployee, setSelectedDetailsEmployee] = useState(null);
  const [modalDetailsShow, setModalDetailsShow] = useState(false);
  const [selectedDeleteEmployee, setSelectedDeleteEmployee] = useState(null);
  const [modalDeleteShow, setModalDeleteShow] = useState(false);

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

  const deleteEmployee = async (eid)=>{
    setModalDeleteShow(false);
    await apiClient
    .delete(`/api/v1/emp/employees?eid=${eid}`)
    .then((res)=>{
        getEmployees();
    }).catch(e=>console.log(e))
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

  const EmployeeDeleteModal = ({ employee, show, onHide }) => {
    if (!employee) return null;

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
          <Button variant="danger" onClick={(e) => 
            {
                e.stopPropagation();
                deleteEmployee(employee._id)
            }
          }>Delete</Button>
        </Modal.Footer>
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
            setSelectedDetailsEmployee(emp);
            setModalDetailsShow(true);
          }}
        >
          <Card.Body>
            <Card.Title>
              {emp.first_name} {emp.last_name}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{emp.position}</Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">{emp.department}</Card.Subtitle>
            <Button variant="primary" className="me-2" onClick={(e)=>
            {
                e.stopPropagation();
                navigate(`/employees/${emp._id}`)
            }
                }>
              <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
            <Button variant="danger" onClick={(e)=>{
                e.stopPropagation();
                setSelectedDeleteEmployee(emp);
                setModalDeleteShow(true);
            }}>
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </Card.Body>
        </Card>
      ))}
      <EmployeeDetailsModal
        employee={selectedDetailsEmployee}
        show={modalDetailsShow}
        onHide={() => setModalDetailsShow(false)}
      />
      <EmployeeDeleteModal
      employee={selectedDeleteEmployee}
      show={modalDeleteShow}
      onHide={() => setModalDeleteShow(false)}
      />
    </div>
  );
};

export default Employee;
