import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import User from './components/User/User'
import Employee from './components/Employee/Employee'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<User />} />
          <Route exact path="/api/v1/emp" element={<Employee />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
