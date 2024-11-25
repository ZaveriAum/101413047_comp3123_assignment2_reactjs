import React, { useState } from 'react';
import './UserSignUp.css';
import emailIcon from '../../../assets/envelope-fill.svg';
import passwordIcon from '../../../assets/lock-fill.svg';
import userIcon from '../../../assets/person-circle.svg';
import UserService from '../../../service/UserService'
import { useNavigate } from 'react-router-dom';
import CusAlert from '../../Util/Alert'

const UserSignUp = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState({
        type: '',
        heading: '',
        message: '',
        show: false,
      });

      const handleSignUp = async (e) => {
        e.preventDefault();
    
        const userData = {
          username: name,
          email: email,
          password: password,
        };
    
        try {
          await UserService.signup(userData)
          .then((result)=>{
            console.log(result)
            if(result.data.status){
                setAlert({
                    type: 'success',
                    heading: 'Sign Up Successful',
                    message: `Hello ${result.data.user.username}, Welcome to Emage`,
                    show: true,
                });
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }else{
                setAlert({
                    type: 'danger',
                    heading: 'Sign Up Unsccessful',
                    message: `${result.data.message}`,
                    show: true,
                });
                setTimeout(() => {
                    navigate('/signup');
                }, 2000);
            }
            })
            .catch((e) => {
                const errorMessage =
                    e.response?.data?.message || e.response?.data?.errors[0]?.msg ||  e.message || 'An unexpected error occurred.';
                setAlert({
                    type: 'danger',
                    heading: 'Unsuccessful',
                    message: errorMessage,
                    show: true,
                });
            });
        }catch(e){
            const errorMessage =
                e.response?.data?.message || e.message || 'An unexpected error occurred.';
            setAlert({
                type: 'danger',
                heading: 'Unsuccessful',
                message: errorMessage,
                show: true,
            });
        }
    }
    return (
        <>
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
            <CusAlert
                type={alert.type}
                heading={alert.heading}
                message={alert.message}
                show={alert.show}
                onClose={() => setAlert({ ...alert, show: false })}
            />
        </>
    );
};

export default UserSignUp;
