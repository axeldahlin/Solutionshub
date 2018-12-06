import React from 'react';
import { withRouter } from "react-router";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Link } from 'reactstrap';
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
          <NavbarBrand tag={ReactRouterDomNavLink} to="/" className="mr-auto">Solutions Hub</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink tag={ReactRouterDomNavLink} exact to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={ReactRouterDomNavLink} exact to="/user/">Profile</NavLink>
              </NavItem>
              <NavItem>
                {this.props.user && <NavLink tag={ReactRouterDomNavLink} to="/sign-in" onClick={this.props.onLogout}>Logout</NavLink>}
              </NavItem>
              {/* <NavItem>
              {this.props.user && <p>Welcome, {this.props.user.githubName}</p>}
              </NavItem> */}
            </Nav>
          </Collapse>
        
        </Navbar>
      </div>
    );
  }
}


export default withRouter(MyNavbar)


// import React, { Component } from 'react';
// import { Route, Link, NavLink, Switch } from 'react-router-dom';


// function Navbar (props) {
//   return (
//     <div className="Navbar">

//       <Link to="/repos">Repos</Link>

//       <Link to="/auth/github">Github</Link>




//     </div>

//   )
// }


// export default Navbar;





        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">MERN Boilerplate</h1>
          <NavLink to="/" exact>Home</NavLink>
          <NavLink to="/countries">Countries</NavLink>
          <NavLink to="/add-country">Add country</NavLink>
          {!api.isLoggedIn() && <NavLink to="/signup">Signup</NavLink>}
          {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
          {api.isLoggedIn() && <Link to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link>}
          <NavLink to="/secret">Secret</NavLink>
        </header> */}