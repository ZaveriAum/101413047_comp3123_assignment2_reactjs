import './App.css';
import UserLogin from './components/User/UserLogin/UserLogin';
import UserSignUp from './components/User/UserSignUp/UserSignUp';
import 'bootstrap/dist/css/bootstrap.min.css';
import Employee from './components/Employee/Employee';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserNavBar from './components/User/UserNavBar/UserNavBar';
import EmployeeNavBar from './components/Employee/EmployeeNavBar/EmployeeNavBar';
import EmployeeUpdate from './components/Employee/EmployeeUpdate/EmployeeUpdate';
import EmployeeCreate from './components/Employee/EmployeeCreate/EmployeeCreate';
import Home from './components/Util/Home';
import ProtectedRoutes from './components/Util/ProtectedRoutes';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path='/' element={<><UserNavBar /><Home /></>} />
          <Route exact path='/login' element={<><UserNavBar /><UserLogin /></>} />
          <Route exact path='/signup' element={<><UserNavBar /><UserSignUp /></>} />
          <Route exact element={<ProtectedRoutes />}>
            <Route exact path='/employees' element={<><EmployeeNavBar /><Employee /></>} />
            <Route exact path='/employees/:eid' element={<><EmployeeNavBar /><EmployeeUpdate /></>} />
            <Route exact path='/employees/create' element={<><EmployeeNavBar /><EmployeeCreate /></>} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
