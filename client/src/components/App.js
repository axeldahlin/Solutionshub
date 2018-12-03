import React, { Component } from 'react';
import { Route, Link, NavLink, Switch } from 'react-router-dom';

import LoginPage from './pages/LoginPage/LoginPage';

import api from '../api';
import Navbar from './Navbar'
import Home from './pages/Home/Home.js'






class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
    }
    // api.loadUser();
  }

  handleLogoutClick(e) {
    api.logout()
  }

  componentDidMount() {
    api.userData()
    .then(user => {
      this.setState({
        user
      })
    })
    .catch(err => {
      console.log("err at App/componentDidMount",err)
    })
  }

  render() {
    console.log("this.state.user", this.state.user)
    let user = this.state.user
    return (
      <div className="App">
        <Navbar user={this.state.user} /> 





   
        <Switch>
{/*     
          <Route path="/repos" exact component={ReposPage} />
          <Route path="/pulls/:name" exact component={PullsPage} />
          <Route path="/user/signin/callback" exact component={PullsPage} />
          <Button color="primary">primary</Button>{' '}
          <Button color="primary">primary</Button>{' '} */}

          <Route path="/home" exact render={(props) => (
            <Home sample="sampleProp"/>)}></Route>
      
          <Route path="/" exact component={Home}  />


          
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;




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