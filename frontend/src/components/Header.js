import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAction } from '../actions/userAction'

const Header = () => {

  const dispatch = useDispatch()
  const {userInfo} = useSelector(state => state.userLogin)
  
   const logoutHandler = () => {
     dispatch(logoutAction())
  }

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Proshop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </LinkContainer>
              {
                userInfo ? 
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/profile">
                         <NavDropdown.Item>
                             Profile
                         </NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                         Logout
                    </NavDropdown.Item>
                  </NavDropdown> :
                  <LinkContainer to='/login'>
                    <Nav.Link>
                    <i className='fas fa-user'></i> Sign-Up
                    </Nav.Link>
                </LinkContainer>
              }
             
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
