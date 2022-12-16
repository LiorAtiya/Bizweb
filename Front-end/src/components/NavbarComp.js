import React, { useState } from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import { Link } from "react-router-dom";
// import { AuthContext } from '../context/AuthContext';
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function NavbarComp() {

  // const {user} = useContext(AuthContext)
  let history = useHistory();

  const getUserData = JSON.parse(localStorage.getItem('token'));

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const logOut = () => {
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
              {/* <Nav.Link as={Link} to={"/login"}>About us</Nav.Link> */}
            </Nav>
            <Nav>
              <NavDropdown title={getUserData ? `Hello ${getUserData.firstname}` : "Hello Guest"} id="collasible-nav-dropdown">
                {
                  getUserData ? (
                    <>
                      <NavDropdown.Item as={Link} to={"/newbusiness"}>
                        My appointments
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item as={Link} to={"/newbusiness"}>
                        Open a new bussiness
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={handleShow}>Logout</NavDropdown.Item>
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

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <h5>Are you sure you want to log out?</h5>
        </Modal.Header>
        {/* <Modal.Body>

        </Modal.Body> */}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="btn btn-success" onClick={logOut}>Yes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

