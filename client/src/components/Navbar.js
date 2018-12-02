import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Link } from 'reactstrap';
import api from '../api';

export default class MyNavbar extends React.Component {
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
        <Navbar color="primary" light>
          <NavbarBrand href="/" className="mr-auto">reactstrap</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
            <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/home/">Home</NavLink>
              </NavItem>
              <NavItem>
               {!this.props.user && <NavLink href="https://github.com/login/oauth/authorize?client_id=ef51dc0616f91cc5207e">Login</NavLink>}
              </NavItem>
              <NavItem>
                {this.props.user && <NavLink href="/home" onClick={()=>api.newLogout()}>Logout</NavLink>}
              </NavItem>
              <NavItem>
                {this.props.user && <p>Welcome, {this.props.user.githubName}</p>}
              </NavItem>
              {/* <NavItem>
                {this.props.user && <img src={this.props.user.githubUrl}></img>}
              </NavItem> */}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}


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