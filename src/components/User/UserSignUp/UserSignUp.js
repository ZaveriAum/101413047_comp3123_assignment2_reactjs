import React, { useState } from 'react';
import styles from './UserSignUp.module.css';
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
                    message: `Hello ${result.data.user.username} you have successfully signed up.`,
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
            <div className={styles.signupPage}>
            
                <div className={styles.signupBox}>
                    <h2 className={styles.signupTitle}>Create your account</h2>

                    <div className={styles.inputGroup}>
                        <img src={userIcon} alt="User Icon" className={styles.inputIcon} />
                        <input
                            required
                            name="name"
                            type="text"
                            placeholder="Username"
                            className={styles.inputField}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <img src={emailIcon} alt="Email Icon" className={styles.inputIcon} />
                        <input
                            required
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
                            required
                            name="password"
                            type="password"
                            placeholder="Password"
                            className={styles.inputField}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button className={styles.signupButton} onClick={handleSignUp}>
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
