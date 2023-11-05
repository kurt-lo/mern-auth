import { Navbar, Container, Nav, NavbarBrand } from 'react-bootstrap'


const Header = () => {
    return (
        <header>
            <Navbar bg="dark" variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <Navbar.Brand href='/'>MERN AUTH</Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>
                            <Nav.Link href='/login'>
                                Sign In
                            </Nav.Link>
                            <Nav.Link href='/register'>
                                Sign Out
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header