import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EmployeeService from '../../../service/EmployeeService';
import './EmployeeUpdate.css';

function EmployeeUpdate() {
    const {eid} = useParams()
    const navigate = useNavigate();
    const [detailsAdded, setDetailsAdded] = useState(false)
    const [first_name, setFirstName] = useState()
    const [last_name, setLastName] = useState()
    const [email, setEmail] = useState()
    const [position, setPosition] = useState()
    const [department, setDepartment] = useState()
    const [salary, setSalary] = useState()


    const getEmployeeDetails = async ()=>{
      let token = localStorage.getItem("token")
      EmployeeService.getEmployee(eid, token)
      .then((employee)=>{
          const emp = employee.data.employee
          setFirstName(emp.first_name)
          setLastName(emp.last_name)
          setEmail(emp.email)
          setPosition(emp.position)
          setDepartment(emp.department)
          setSalary(emp.salary)
          setDetailsAdded(true)
      })
      .catch(e=>console.log(e))
    }

    useEffect(()=>{
        if(!detailsAdded)
            getEmployeeDetails()
    })

    const handleUpdate = async (e)=>{
        e.preventDefault();

        const payload = {
            "first_name":first_name,
            "last_name":last_name,
            "email":email,
            "position":position,
            "department":department,
            "salary":salary
        }
        let token = localStorage.getItem("token")
        EmployeeService.updateEmployees(eid, payload, token)
        .then((response)=>{
            alert(response.data.status)
            navigate('/employees')
        })
        .catch(e=>alert(e.status))
    }


  return (
    <div className="form-container">
      <form onSubmit={handleUpdate} className="employee-form">
        <h2 className='header'>Update Employee</h2>

        <div className="input-group">
          <input
            type="text"
            value={first_name}
            name="first_name"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            value={last_name}
            name="last_name"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <input
          type="email"
          value={email}
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          value={position}
          name="position"
          placeholder="Position"
          onChange={(e) => setPosition(e.target.value)}
        />
        <input
          type="text"
          value={department}
          name="department"
          placeholder="Department"
          onChange={(e) => setDepartment(e.target.value)}
        />
        <input
          type="number"
          value={salary}
          name="salary"
          placeholder="Salary"
          onChange={(e) => setSalary(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EmployeeUpdate;
