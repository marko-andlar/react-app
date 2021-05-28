import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import { Nav, Navbar, NavItem, Container } from "react-bootstrap";
import Categories from "./Categories";
import Posts from "./Posts";
import Post from "./Post";
import LogIn from "./LogIn";
import Register from "./Register";
import jwt from "jsonwebtoken";
const accessTokenSecret = "myAccessTokenSecret";

class Navigation extends Component {
  state = { username: null };
  displayUsername() {
    if (this.state.username)
      return (
        <Nav className="mr-auto">
          <NavItem>
            <Nav.Link as={Link} to="/login">
              {this.state.username}
            </Nav.Link>
          </NavItem>
        </Nav>
      );
  }
  async componentDidMount() {
    const token = localStorage.getItem("token");
    if (!token) return;
    const decoded = await jwt.verify(token, accessTokenSecret);
    if (!decoded) return;
    this.setState({ username: decoded.username });
  }
  render() {
    return (
      <React.Fragment>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand as={Link} to="/">
              Forum
            </Navbar.Brand>
            <Nav className="mr-auto">
              <NavItem>
                <Nav.Link as={Link} to="/login">
                  Log In
                </Nav.Link>
              </NavItem>
              <NavItem>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </NavItem>
            </Nav>
            {this.displayUsername()}
          </Container>
        </Navbar>

        <Container>
          <Switch>
            <Route exact path="/" component={Categories} />
            <Route exact path="/posts/:category" component={Posts}></Route>
            <Route exact path="/posts/:category/:post" component={Post}></Route>
            <Route exact path="/login" component={LogIn}></Route>
            <Route exact path="/register" component={Register}></Route>
            <Route
              render={function () {
                return <p>Not found</p>;
              }}
            />
          </Switch>
        </Container>
      </React.Fragment>
    );
  }
}

export default Navigation;
