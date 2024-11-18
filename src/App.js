import './App.css';
import UserLogin from './components/User/UserLogin/UserLogin'
import UserSignUp from './components/User/UserSignUp/UserSignUp'
import 'bootstrap/dist/css/bootstrap.min.css';
import Employee from './components/Employee/Employee'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import UserNavBar from './components/User/UserNavBar/UserNavBar'
import EmployeeNavBar from './components/Employee/EmployeeNavBar/EmployeeNavBar';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/login' element={<><UserNavBar /><UserLogin /></>} />
        <Route exact path='/signup' element={<><UserNavBar /><UserSignUp /></>} />
        <Route exact path='/employees' element={<><EmployeeNavBar /><Employee /> </>} />
      </Routes>
    </Router>
  );
}

export default App;
