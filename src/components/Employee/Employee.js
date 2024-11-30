import React, { useState, useEffect } from 'react';
import { Card, InputGroup, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faMagnifyingGlass, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../../service/EmployeeService';
import EmployeeDetailsModal from './EmployeeDetails/EmployeeDetails';
import EmployeeDeleteModal from './EmployeeDelete/EmployeeDelete';
import styles from './Employee.module.css';

const Employee = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  const [query, setQuery] = useState();
  const [selectedDetailsEmployee, setSelectedDetailsEmployee] = useState(null);
  const [modalDetailsShow, setModalDetailsShow] = useState(false);
  const [selectedDeleteEmployee, setSelectedDeleteEmployee] = useState(null);
  const [modalDeleteShow, setModalDeleteShow] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("token")
    EmployeeService.getEmployees(token)
      .then((res) => {
        setEmployee(res.data.employees);
      })
      .catch((e) => console.log(e));
  }, []);

  const search = (e) => {
    e.preventDefault();
    let token = localStorage.getItem("token")
    EmployeeService.searchEmployees(query, token)
      .then((res) => {
        setEmployee(res.data.employees);
      })
      .catch((e) => console.log(e));
  };

  const refreshEmployeeList = async () => {
    let token = localStorage.getItem("token")
    await EmployeeService.getEmployees(token)
      .then((res) => {
        setEmployee(res.data.employees);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className={styles.empBody}>
      <h1 className={styles.heading}>User Dashboard</h1>
      <div className={styles.searchContainer}>
        <button onClick={() => navigate(`/employees/create`)} className={styles.btnAdd}>
          <FontAwesomeIcon className={styles.addIcon} icon={faSquarePlus} />
        </button>
        <InputGroup className={styles.searchGroup}>
          <Form.Control
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search employees..."
            className={styles.searchInput}
          />
          <button onClick={(e) => search(e)} className={styles.btnSearch}>
            <FontAwesomeIcon className={styles.searchIcon} icon={faMagnifyingGlass} />
          </button>
        </InputGroup>
      </div>
      <div className={styles.employeeCards}>
        {employee.map((emp) => (
          <Card
            key={emp._id}
            className={styles.employeeCard}
            onClick={() => {
              setSelectedDetailsEmployee(emp);
              setModalDetailsShow(true);
            }}
          >            
            <Card.Body className={styles.cardBody}>
              <Card.Title className={styles.employeeName}>
                {emp.first_name} {emp.last_name}
              </Card.Title>
              <Card.Subtitle className={styles.employeePosition}>{emp.position}</Card.Subtitle>
              <Card.Subtitle className={styles.employeeDepartment}>{emp.department}</Card.Subtitle>
              <button
                variant="primary"
                className={styles.btnEdit}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/employees/${emp._id}`);
                }}
              >
                <FontAwesomeIcon className={styles.editIcon} icon={faPenToSquare} />
              </button>
              <button
                variant="danger"
                className={styles.btnDelete}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedDeleteEmployee(emp);
                  setModalDeleteShow(true);
                }}
              >
                <FontAwesomeIcon className={styles.deleteIcon} icon={faTrash} />
              </button>
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
