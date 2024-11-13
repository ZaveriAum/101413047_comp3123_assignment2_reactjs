import { Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import './UserNavBar.css'

function UserNavBar() {
    return (
        <Navbar className="container-fluid justify-content-between navbar" expand="lg">
            <LinkContainer to='/'>
                <Navbar.Brand className='brand'>
                    Emage
                </Navbar.Brand>
            </LinkContainer>
            <Nav className='navlinks'>
                <LinkContainer to="/login">
                    <Nav.Link className='login'>
                        Login
                    </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/signup">
                    <Nav.Link className='signup'>
                        SignUp
                    </Nav.Link>
                </LinkContainer>
            </Nav>
        </Navbar>
    )
}

export default UserNavBar