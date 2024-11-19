import React, { useState, useEffect } from 'react';
import { Button, Card, InputGroup, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faMagnifyingGlass, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../../service/EmployeeService';
import EmployeeDetailsModal from './EmployeeDetails/EmployeeDetails';
import EmployeeDeleteModal from './EmployeeDelete/EmployeeDelete';
import './Employee.css';

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
      <div className="search-container">
        <Button onClick={() => navigate(`/employees/create`)} className="btn-add">
          <FontAwesomeIcon className="add-icon" icon={faSquarePlus} />
        </Button>
        <InputGroup className="search-group">
          <Form.Control
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search employees..."
            className="search-input"
          />
          <Button onClick={(e) => search(e)} className="btn-search">
            <FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass} />
          </Button>
        </InputGroup>
      </div>
      <div className="employee-cards">
        {employee.map((emp) => (
          <Card
            key={emp._id}
            className="employee-card"
            onClick={() => {
              setSelectedDetailsEmployee(emp);
              setModalDetailsShow(true);
            }}
          >
            <Card.Body className="emp-body">
              <Card.Title className="employee-name">
                {emp.first_name} {emp.last_name}
              </Card.Title>
              <Card.Subtitle className="employee-position">{emp.position}</Card.Subtitle>
              <Card.Subtitle className="employee-department">{emp.department}</Card.Subtitle>
              <Button
                variant="primary"
                className="me-2 btn-edit"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/employees/${emp._id}`);
                }}
              >
                <FontAwesomeIcon className='edit-icon' icon={faPenToSquare} />
              </Button>
              <Button
                variant="danger"
                className="btn-delete"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedDeleteEmployee(emp);
                  setModalDeleteShow(true);
                }}
              >
                <FontAwesomeIcon className='delete-icon' icon={faTrash} />
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
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
