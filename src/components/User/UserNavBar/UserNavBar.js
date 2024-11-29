import { Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import styles from './UserNavBar.module.css'

function UserNavBar() {
    return (
        <Navbar className={styles.navbar} expand="lg">
            <LinkContainer to='/'>
                <Navbar.Brand className={styles.brand}>
                    EmagePro
                </Navbar.Brand>
            </LinkContainer>
            <Nav className={styles.navlinks}>
                <LinkContainer to="/login">
                    <Nav.Link className={styles.login}>
                        Login
                    </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/signup">
                    <Nav.Link className={styles.signup}>
                        SignUp
                    </Nav.Link>
                </LinkContainer>
            </Nav>
        </Navbar>
    )
}

export default UserNavBar