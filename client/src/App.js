import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Navigation, RecipeReviewCard } from "./components";
import { Home, Create, Register, Login } from "./pages";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PrivateRoute from "./components/HOC/PrivateRoute";
const App = () => {
  return (
    <Router>
      <Navigation />

      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Container>
        <Row>
          <Col>
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <PrivateRoute path="/create" component={Create} />
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Col>
        </Row>
      </Container>
    </Router>
  );
};

export default App;
