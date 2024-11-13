import React from 'react'
import './UserSignUp.css'
import emailIcon from '../../../assets/envelope-fill.svg'
import passwordIcon from '../../../assets/lock-fill.svg'
import userIcon from '../../../assets/person-circle.svg'

const UserSignUp = () => {
    return (
        <div className="signup-page">
            <div className="signup-box">
                <h2 className="signup-title">Sign Up</h2>

                <div className="input-group">
                    <img src={userIcon} alt="User Icon" className="input-icon" />
                    <input
                        type="text"
                        placeholder="Username"
                        className="input-field"
                    />
                </div>

                <div className="input-group">
                    <img src={emailIcon} alt="Email Icon" className="input-icon" />
                    <input
                        type="email"
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

                <button className="login-button">Sign Up</button>
            </div>
        </div>
    )
}

export default UserSignUp