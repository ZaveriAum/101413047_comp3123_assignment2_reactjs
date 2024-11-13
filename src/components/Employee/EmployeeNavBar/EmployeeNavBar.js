import { Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import './EmployeeNavBar.css'
const EmployeeNavBar = () => {
    return (
        <Navbar className="container-fluid justify-content-between navbar" expand="lg">
            <LinkContainer to='/api/v1/employees'>
                <Navbar.Brand className='brand'>
                    Emage
                </Navbar.Brand>
            </LinkContainer>
            <Nav>
                <LinkContainer to="/">
                    <Nav.Link className='logout'>
                        Logout
                    </Nav.Link>
                </LinkContainer>
            </Nav>
        </Navbar>
    );
}

export default EmployeeNavBar