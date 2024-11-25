import { Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import './EmployeeNavBar.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const EmployeeNavBar = () => {
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await axios.get('http://localhost:5000/api/v1/user/logout');
        } catch (err) {
            console.log(err)
        } finally {
            navigate('/');
        }
    };

    return (
        <Navbar className="container-fluid justify-content-between navbar" expand="lg">
            <LinkContainer className='brand_c' to='/employees'>
                <Navbar.Brand className='brand'>
                    Emage
                </Navbar.Brand>
            </LinkContainer>
            <Nav className='logt'>
                <LinkContainer to="/">
                    <Nav.Link onClick={handleLogin} className='logout'>
                        Logout
                    </Nav.Link>
                </LinkContainer>
            </Nav>
        </Navbar>
    );
}

export default EmployeeNavBar