import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../../../service/EmployeeService';
import './EmployeeCreate.css';

const EmployeeCreate = () => {
  const navigate = useNavigate();
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [date_of_joining, setDateOfJoining] = useState('');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');
  const [salary, setSalary] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();

    const payload = {
      first_name:first_name,
      last_name:last_name,
      email:email,
      date_of_joining:date_of_joining,
      position:position,
      department:department,
      salary:salary,
    };

    try {
      let token = localStorage.getItem("token")
      const res = await EmployeeService.createEmployees(payload, token);
      alert(res.data.status);
      navigate('/employees');
    } catch (e) {
      alert(e.data.status);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleCreate} className="employee-form">
        <h2 className="heading">Create Employee</h2>

        <div className="form-group">
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
          type="date"
          value={date_of_joining}
          name="date_of_joining"
          onChange={(e) => setDateOfJoining(e.target.value)}
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
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default EmployeeCreate;
