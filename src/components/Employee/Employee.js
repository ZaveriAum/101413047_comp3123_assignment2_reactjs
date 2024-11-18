import React, { useState, useEffect } from 'react';
import { Button, Card, InputGroup, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faMagnifyingGlass, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../../service/EmployeeService';
import EmployeeDetailsModal from './EmployeeDetails/EmployeeDetails';
import EmployeeDeleteModal from './EmployeeDelete/EmployeeDelete';

const Employee = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  const [query, setQuery] = useState();
  const [selectedDetailsEmployee, setSelectedDetailsEmployee] = useState(null);
  const [modalDetailsShow, setModalDetailsShow] = useState(false);
  const [selectedDeleteEmployee, setSelectedDeleteEmployee] = useState(null);
  const [modalDeleteShow, setModalDeleteShow] = useState(false);

  useEffect(() => {
    EmployeeService.getEmployees()
      .then((res) => {
        setEmployee(res.data.employees);
      })
      .catch((e) => console.log(e));
  }, []);

  const search = (e) => {
    e.preventDefault();
    EmployeeService.searchEmployees(query)
      .then((res) => {
        setEmployee(res.data.employees);
      })
      .catch((e) => console.log(e));
  };

  const refreshEmployeeList = () => {
    EmployeeService.getEmployees()
      .then((res) => {
        setEmployee(res.data.employees);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="empBody">
      <Button onClick={() => navigate(`/employees/create`)}>
        <FontAwesomeIcon icon={faSquarePlus} />
      </Button>
      <InputGroup>
        <Form.Control type="text" onChange={(e) => setQuery(e.target.value)} />
        <Button onClick={(e) => search(e)}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Button>
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
            <Button
              variant="primary"
              className="me-2"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/employees/${emp._id}`);
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
            <Button
              variant="danger"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedDeleteEmployee(emp);
                setModalDeleteShow(true);
              }}
            >
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
        onEmployeeDeleted={refreshEmployeeList}
      />
    </div>
  );
};

export default Employee;
