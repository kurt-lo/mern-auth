import { Navbar, Container, Nav, NavDropdown, Badge } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'
import { useNavigate } from 'react-router-dom'

const Header = () => {

    //LinkContainer to='/' eto yung way para maging SPA, hindi na mag 
    // rereload yung website ng buo

    const { userInfo } = useSelector((state) => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [logoutApiCall] = useLogoutMutation()

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap()
            dispatch(logout())
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <header>
            <Navbar bg="dark" variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>MERN AUTH</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>
                            {userInfo ? (
                                <>
                                    <NavDropdown title={userInfo.name} id='username'>
                                        <LinkContainer to='/profile'>
                                            <NavDropdown.Item>
                                                Profile
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={ logoutHandler }>
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            ) : (
                                <>
                                    <LinkContainer to='/login'>
                                        <Nav.Link>Login</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to='/register'>
                                        <Nav.Link>Register</Nav.Link>
                                    </LinkContainer>
                                </>
                            )}

                        </Nav>
                    </Navbar.Collapse>
                </Container >
            </Navbar >
        </header >
    )
}

export default Header