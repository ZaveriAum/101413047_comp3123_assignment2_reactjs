import React, { useState } from 'react';
import './UserSignUp.css';
import emailIcon from '../../../assets/envelope-fill.svg';
import passwordIcon from '../../../assets/lock-fill.svg';
import userIcon from '../../../assets/person-circle.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserSignUp = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();

        const userData = {
            username: name,
            email: email,
            password: password
        };

        try {
            let result = await axios.post('http://localhost:5000/api/v1/user/signup', userData);
            handleSignUpRes(result.data);
        } catch (err) {
            handleSignUpRes(err.response?.data || { message: 'Error occurred' });
        }
    };

    const handleSignUpRes = (result) => {
        if (result.message === 'User created successfully') {
            alert(result.message)
            navigate('/login');
        } else {
            alert(result.message)
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-box">
                <h2 className="signup-title">Create your account</h2>

                <div className="input-group">
                    <img src={userIcon} alt="User Icon" className="input-icon" />
                    <input
                        name="name"
                        type="text"
                        placeholder="Username"
                        className="input-field"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <img src={emailIcon} alt="Email Icon" className="input-icon" />
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="input-field"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <img src={passwordIcon} alt="Password Icon" className="input-icon" />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="input-field"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button className="login-button" onClick={handleSignUp}>
                    Continue
                </button>
            </div>
        </div>
    );
};

export default UserSignUp;
