import React from "react";
import {
  Container,
  Row,
  Col,
  Nav,
  Navbar,
  NavDropdown,
  Form,
  Button,
  FormControl,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { AuthStatus } from "../../redux/reducers/auth.reducer";
import { AuthActions } from "../../redux/actions/auth.actions";
const Navigation = (props) => {
  const auth = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  return (
    <Container fluid>
      <Row>
        <Col>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Przepisy</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                {auth.status == AuthStatus.LOGOUTED ? (
                  <React.Fragment>
                    <Nav.Link href="/login">Logowanie</Nav.Link>
                    <Nav.Link href="/register">Rejestracja</Nav.Link>
                  </React.Fragment>
                ) : (
                  <Nav.Link onClick={() => dispatch(AuthActions.logout())}>
                    Wyloguj
                  </Nav.Link>
                )}
                <Nav.Link href="/create">Dodaj</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Col>
      </Row>
    </Container>
  );
};

export default Navigation;
