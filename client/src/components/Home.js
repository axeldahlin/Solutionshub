import React, { Component } from 'react';
import RepoList from './RepoList'
import Welcome from './Welcome'
import PullsList from './PullsList';
import { Route, Switch } from 'react-router-dom';
import api from '../api'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clickedRepo: null,
      clickedPull: null
    }
  }

  handleClickRepo = (repo) => {
    this.setState({clickedRepo: repo})
  }

  handleClickPull = (id) => {
    api.getPull(id)
      .then(pull => {
        this.setState({
          clickedPull: pull,
          clickedRepo: null
        })
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
      <div className="Home">
        <RepoList click={(repo) => this.handleClickRepo(repo)}/>
        <Switch>
          <Route path="/:repo" render={props => <PullsList {...props} user={this.state.user}/>}/>  
          <Route path="/" render={props => <Welcome {...props} user={this.state.user}/>}/>      
        </Switch>
      </div>
    );
  }
}

export default Home;