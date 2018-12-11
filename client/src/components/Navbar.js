import React from 'react';
import { withRouter } from "react-router";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { NavLink as ReactRouterDomNavLink } from 'react-router-dom';
import api from '../api';

class MyNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand tag={ReactRouterDomNavLink} to="/" className="mr-auto"><img height="60px" src="BrainBulb.png" alt="brain-logo"></img>Solutions Hub</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav className="navbar-nav ml-auto" >
              <NavItem>
                <NavLink tag={ReactRouterDomNavLink} exact to="/">Ironhack Repos</NavLink>
              </NavItem>
              {api.isLoggedIn() && 
                <NavItem>
                  <NavLink tag={ReactRouterDomNavLink} exact to="/user/">Profile</NavLink>
                </NavItem>
              }
              <NavItem>
                {this.props.user && <NavLink tag={ReactRouterDomNavLink} to="/" onClick={this.props.onLogout}>Logout</NavLink>}
              </NavItem>
              <NavItem>
                {!this.props.user && <NavLink><a className="github-login-link" href={api.service.defaults.baseURL + "/auth/github"}>Login with Github</a></NavLink>}
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(MyNavbar)