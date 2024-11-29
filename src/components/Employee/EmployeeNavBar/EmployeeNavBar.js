import {useState} from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import styles from './EmployeeNavBar.module.css'
import { useNavigate } from 'react-router-dom';
import CusAlert from '../../Util/Alert'
import { useAuth } from '../../../context/AuthContext';

const EmployeeNavBar = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [alert, setAlert] = useState({
        type: '',
        heading: '',
        message: '',
        show: false,
      });

    const handleLogout = async (e) => {
        e.preventDefault();

        try {
            logout()
            localStorage.removeItem("token")
            setAlert({
                type: 'success',
                heading: 'Logout Successful',
                message: `Thank you for using EmagePro`,
                show: true,
            });
            setTimeout(() => {
                navigate('/');
            }, 2000);
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
    };

    return (
        <Navbar className={styles.navbar} expand="lg">
            <LinkContainer className={styles.brandC} to='/employees'>
                <Navbar.Brand className={styles.brand}>
                    EmagePro
                </Navbar.Brand>
            </LinkContainer>
            <Nav className={styles.logt}>
                <LinkContainer to="/">
                    <Nav.Link onClick={handleLogout} className={styles.logout}>
                        Logout
                    </Nav.Link>
                </LinkContainer>
            </Nav>
            <CusAlert
                type={alert.type}
                heading={alert.heading}
                message={alert.message}
                show={alert.show}
                onClose={() => setAlert({ ...alert, show: false })}
            />
        </Navbar>
    );
}

export default EmployeeNavBar