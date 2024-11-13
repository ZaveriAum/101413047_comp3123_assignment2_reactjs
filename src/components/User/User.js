import UserNavBar from './UserNavBar/UserNavBar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import UserLogin from './UserLogin/UserLogin';
import UserSignUp from './UserSignUp/UserSignUp';

const User = () => {
    return (
        <Router>
            <UserNavBar />
            <Routes>
                <Route exact path='/login' element={<UserLogin />} />
                <Route exact path='/signup' element={<UserSignUp />} />
            </Routes>
        </Router>
    );
}

export default User