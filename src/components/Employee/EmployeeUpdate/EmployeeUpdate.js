import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../../../service/EmployeeService'


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
        EmployeeService.getEmployee(eid)
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
        console.log(payload)
        EmployeeService.updateEmployees(eid, payload)
        .then((response)=>{
            alert(response.data.status)
            navigate('/employees')
        })
        .catch(e=>alert(e.status))
    }

  return (
    <form onSubmit={handleUpdate}>
      <input type='text' value={first_name} name='first_name' placeholder='ex: Jack' onChange={(e) => setFirstName(e.target.value)}/>
      <input type='text' value={last_name} name='last_name' placeholder='ex: Ma' onChange={(e) => setLastName(e.target.value)} />
      <input type='email' value={email} name='email' placeholder='ex: jackma@gmail.com' onChange={(e) => setEmail(e.target.value)} />
      <input type='text' value={position} name='position' placeholder='ex: Back-end developer' onChange={(e) => setPosition(e.target.value)} />
      <input type='text' value={department} name='department' placeholder='ex: Development'onChange={(e) => setDepartment(e.target.value)}/>
      <input type='quantity' value={salary} name='salary' placeholder='ex: 50000' onChange={(e) => setSalary(e.target.value)}/>
      <button>Update</button>
    </form>
  );
}

export default EmployeeUpdate;