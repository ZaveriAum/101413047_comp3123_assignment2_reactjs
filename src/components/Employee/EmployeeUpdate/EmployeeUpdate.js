import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EmployeeService from '../../../service/EmployeeService';
import './EmployeeUpdate.css';
import CusAlert from '../../Util/Alert'

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
    const [alert, setAlert] = useState({
      type: '',
      heading: '',
      message: '',
      show: false,
    });


    const getEmployeeDetails = async ()=>{
      let token = localStorage.getItem("token")
      await EmployeeService.getEmployee(eid, token)
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
        try{
        let token = localStorage.getItem("token")
        EmployeeService.updateEmployees(eid, payload, token)
        .then((response)=>{
          if(response.data.status){
              setAlert({
                  type: 'Success',
                  heading: 'Update Successful',
                  message: `${response.data.employee.first_name} updated successfully signed up.`,
                  show: true,
              });
              setTimeout(() => {
                  navigate('/employees');
              }, 2000);
          }else{
              setAlert({
                  type: 'danger',
                  heading: 'Update Unsccessful',
                  message: `${response.data.message}`,
                  show: true,
              });
              setTimeout(() => {
                  navigate('/employees');
              }, 2000);
          }
        })
        .catch(e=>{
          const errorMessage =
                e.response?.data?.message || e.response?.data?.errors[0]?.msg ||  e.message || 'An unexpected error occurred.';
                setAlert({
                    type: 'danger',
                    heading: 'Unsuccessful',
                    message: errorMessage,
                    show: true,
                });
        })
      }catch(e){
        const errorMessage =
          e.response?.data?.message || e.response?.data?.errors[0]?.msg ||  e.message || 'An unexpected error occurred.';
          setAlert({
              type: 'danger',
              heading: 'Unsuccessful',
              message: errorMessage,
              show: true,
          });
      }
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
      <CusAlert
                type={alert.type}
                heading={alert.heading}
                message={alert.message}
                show={alert.show}
                onClose={() => setAlert({ ...alert, show: false })}
      />
    </div>
  );
}

export default EmployeeUpdate;
