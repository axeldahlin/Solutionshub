import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import api from '../api';
import Navbar from './Navbar'
import Home from './Home'
import Profile from './Profile'
import PullDetail from './PullDetail'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: api.syncLoadUser(),
    }
  }

  handleLogout = () => {
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
    return (
      <div className="App">
        <Navbar user={this.state.user} onLogout={this.handleLogout} /> 
        <Switch>
          {api.isLoggedIn() && <Route path="/user" exact render={props => <Profile {...props} user={this.state.user}/>} />}
          <Route path="/:repo/:pull" render={props => <PullDetail {...props} user={this.state.user}/>}/>    
          <Route path="/"  render={props => <Home {...props} user={this.state.user}/>} />          
        </Switch>
      </div>
    );
  }
}

export default App;