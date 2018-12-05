import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// import LoginPage from './LoginPage';

import api from '../api';
import Navbar from './Navbar'
import Home from './Home'
import Profile from './Profile'
import PullDetail from './PullDetail'
import SignIn from './SignIn'






class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: api.syncLoadUser(),
    }
    // api.loadUser();
  }

  handleLogout = (e) => {
    api.newLogout()
    this.setState({
      user: null
    })
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
    console.log("this.state.user APP", this.state.user)
    return (
      <div className="App">
        <Navbar user={this.state.user} onLogout={this.handleLogout} /> 

        <Switch>





{/*     
          <Route path="/signed-out" component={SignedOutPage}>} />
          <Route path="/repos" exact component={ReposPage} />
          <Route path="/pulls/:name" exact component={PullsPage} />
          <Route path="/user/signin/callback" exact component={PullsPage} />
          <Button color="primary">primary</Button>{' '}
          <Button color="primary">primary</Button>{' '} */}

          {/* <Route path="/home" exact render={props => <Home {...props} user={this.state.user}/>} /> */}

          <Route path="/user" exact render={props => <Profile {...props} user={this.state.user}/>} />
          <Route path="/sign-in" component={SignIn}/>
          <Route path="/:repo/:pull" render={props => <PullDetail {...props} user={this.state.user}/>}/>    
          <Route path="/"  render={props => <Home {...props} user={this.state.user}/>} />





          {/* <Route path="/" exact render={props => <Home {...props} user={this.state.user}/>} /> */}



       
        

          {/* <Route path="/" exact component={Home}  /> */}


          
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