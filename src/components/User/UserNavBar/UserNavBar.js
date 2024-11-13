import { Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function UserNavBar() {
    return (
        <Navbar className="container-fluid justify-content-between navbar" expand="lg">
            <LinkContainer to='/'>
                <Navbar.Brand className='brand'>
                    Emage
                </Navbar.Brand>
            </LinkContainer>
            <Nav>
                <LinkContainer to="/api/v1/login">
                    <Nav.Link className='logout'>
                        Login
                    </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/api/v1/signup">
                    <Nav.Link className='logout'>
                        SignUp
                    </Nav.Link>
                </LinkContainer>
            </Nav>
        </Navbar>
    )
}

export default UserNavBar