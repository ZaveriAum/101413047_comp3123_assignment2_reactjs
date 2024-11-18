import React, { useState } from 'react';
import './UserLogin.css';
import emailIcon from '../../../assets/envelope-fill.svg';
import passwordIcon from '../../../assets/lock-fill.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const UserLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        const userData = {
            email: email,
            password: password
        };

            await axios.post('http://localhost:5000/api/v1/user/login', userData)
            .then((res)=>{
                alert(res.message)
                navigate('/employees');
            })
            .catch((e)=>{
                alert(e.message)
            })};

    return (
        <>
            <div className="login-page">
                <div className="login-box">
                    <h2 className="login-title">Welcome Back</h2>

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

                    <button className="login-button" onClick={handleLogin}>Continue</button>
                </div>
            </div>
        </>
    );
}

export default UserLogin