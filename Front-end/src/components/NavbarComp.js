import React from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import { Link } from "react-router-dom";
// import { AuthContext } from '../context/AuthContext';
import { useHistory } from "react-router-dom";

export default function NavbarComp() {

  // const {user} = useContext(AuthContext)
  let history = useHistory();

  const getUserData = JSON.parse(localStorage.getItem('token'));

  const logOut = () => {
    alert('Log out successfuly');
    localStorage.removeItem('token');
    history.push('/');
    window.location.reload(false);
  }

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to={"/"}>Facework</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={"/login"}>About us</Nav.Link>
            </Nav>
            <Nav>
              <NavDropdown title={getUserData ? `Hello ${getUserData.firstname}` : "Hello Guest"} id="collasible-nav-dropdown">
                {
                  getUserData ? (
                    <>
                      <NavDropdown.Item as={Link} to={"/newbusiness"}>
                        Open a new bussiness
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
                    </>
                  )
                    :
                    (
                      <>
                        <NavDropdown.Item as={Link} to={"/login"}>Login</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={"/register"}>Register</NavDropdown.Item>
                      </>
                    )
                }
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

// export default class NavbarComp extends Component {
//   render() {
//     return (
//       <div>
//         <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
//             <Container>
//                 <Navbar.Brand as={Link} to={"/"}>Facework</Navbar.Brand>
//                 <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//                 <Navbar.Collapse id="responsive-navbar-nav">
//                 <Nav className="me-auto">
//                     <Nav.Link as={Link} to={"/login"}>About us</Nav.Link>
//                 </Nav>
//                 <Nav>
//                     <NavDropdown title="My Profile" id="collasible-nav-dropdown">
//                     <NavDropdown.Item as={Link} to={"/login"}>Login</NavDropdown.Item>
//                     <NavDropdown.Item as={Link} to={"/register"}>Register</NavDropdown.Item>
//                     <NavDropdown.Divider />
//                     <NavDropdown.Item>
//                         Open a new bussiness
//                     </NavDropdown.Item>
//                     </NavDropdown>
//                 </Nav>
//                 </Navbar.Collapse>
//             </Container>
//         </Navbar>
//       </div>
//     )
//   }
// }
