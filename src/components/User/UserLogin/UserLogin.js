import React, { useState } from 'react';
import styles from './UserLogin.module.css';
import emailIcon from '../../../assets/envelope-fill.svg';
import passwordIcon from '../../../assets/lock-fill.svg';
import { useNavigate } from 'react-router-dom';
import UserService from '../../../service/UserService';
import CusAlert from '../../Util/Alert';
import {useAuth} from '../../../context/AuthContext'

const UserLogin = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState({
        type: '',
        heading: '',
        message: '',
        show: false,
      });

    const handleLogin = async (e) => {
        e.preventDefault();

        const userData = {
            email: email,
            password: password
        };

        try {
            await UserService.login(userData)
            .then((result)=>{
              if(result.data.status){
                const user = {
                    username: result.data.user.username,
                    email: result.data.user.email,
                  };
      
                  login(user);
                setAlert({
                    type: 'success',
                    heading: 'Logged in Successfully',
                    message: `Hello ${result.data.user.username}, Welcome to Emage`,
                    show: true,
                });
                setTimeout(() => {
                    navigate('/employees');
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
              e.response?.data?.message || e.response?.data?.errors[0]?.msg ||  e.message || 'An unexpected error occurred.';
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
            <div className={styles.loginPage}>
                <div className={styles.loginBox}>
                    <h2 className={styles.loginTitle}>Welcome Back</h2>

                    <div className={styles.inputGroup}>
                        <img src={emailIcon} alt="Email Icon" className={styles.inputIcon} />
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            className={styles.inputField}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <img src={passwordIcon} alt="Password Icon" className={styles.inputIcon} />
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            className={styles.inputField}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button className={styles.loginButton} onClick={handleLogin}>Continue</button>
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
}

export default UserLogin