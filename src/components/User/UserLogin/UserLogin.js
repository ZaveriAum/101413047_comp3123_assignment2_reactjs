import React from 'react'
import './UserLogin.css'
import emailIcon from '../../../assets/envelope-fill.svg'
import passwordIcon from '../../../assets/lock-fill.svg'


const UserLogin = () => {
    return (
        <div className="login-page">
            <div className="login-box">
                <h2 className="login-title">Welcome Back</h2>

                <div className="input-group">
                    <img src={emailIcon} alt="Email Icon" className="input-icon" />
                    <input
                        type="Email"
                        placeholder="Email"
                        className="input-field"
                    />
                </div>

                <div className="input-group">
                    <img src={passwordIcon} alt="Password Icon" className="input-icon" />
                    <input
                        type="password"
                        placeholder="Password"
                        className="input-field"
                    />
                </div>

                <button className="login-button">Continue</button>
            </div>
        </div>
    );
}

export default UserLogin