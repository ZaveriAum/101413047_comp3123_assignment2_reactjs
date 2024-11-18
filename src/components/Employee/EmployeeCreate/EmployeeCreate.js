import {useState} from 'react'
import apiClient from '../../../client/apiClient'
import {useNavigate} from 'react-router-dom'

const EmployeeCreate = ()=>{

    const navigate = useNavigate();
    const [first_name, setFirstName] = useState()
    const [last_name, setLastName] = useState()
    const [email, setEmail] = useState()
    const [date_of_joining, setDateOfJoining] = useState()
    const [position, setPosition] = useState()
    const [department, setDepartment] = useState()
    const [salary, setSalary] = useState()

    const handleCreate = async (e)=>{
        e.preventDefault();

        const payload = {
            "first_name":first_name,
            "last_name":last_name,
            "email":email,
            "date_of_joining": date_of_joining,
            "position":position,
            "department":department,
            "salary":salary
        }
        console.log(payload)
        await apiClient.post(`/api/v1/emp/employees`, payload)
        .then((response)=>{
            alert(response.data.status)
            navigate('/employees')
        })
        .catch(e=>alert(e.status))
    }

  return (
    <form onSubmit={handleCreate}>
      <input type='text' value={first_name} name='first_name' placeholder='ex: Jack' onChange={(e) => setFirstName(e.target.value)}/>
      <input type='text' value={last_name} name='last_name' placeholder='ex: Ma' onChange={(e) => setLastName(e.target.value)} />
      <input type='email' value={email} name='email' placeholder='ex: jackma@gmail.com' onChange={(e) => setEmail(e.target.value)} />
      <input type='date' value={date_of_joining} name='date_of_joining' onChange={(e) => setDateOfJoining(e.target.value)} />
      <input type='text' value={position} name='position' placeholder='ex: Back-end developer' onChange={(e) => setPosition(e.target.value)} />
      <input type='text' value={department} name='department' placeholder='ex: Development'onChange={(e) => setDepartment(e.target.value)}/>
      <input type='quantity' value={salary} name='salary' placeholder='ex: 50000' onChange={(e) => setSalary(e.target.value)}/>
      <button>Create</button>
    </form>
  );
}

export default EmployeeCreate