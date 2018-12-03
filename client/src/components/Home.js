import React, { Component } from 'react';
import { Route, Link, NavLink, Switch } from 'react-router-dom';

// import LoginPage from './pages/LoginPage/LoginPage';
// import ReposPage from './RepoList/';
// import PullsPage from './pages/PullsPage/PullsPage';
// import api from '../api';
// import Navbar from './Navbar'

// import { Button } from 'reactstrap';

import api from '../api'


import PullDetail from './PullDetail'


import Pull from './PullListItem'

import RepoList from './RepoList'
import PullsPage from './PullsList';




class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      clickedRepo: null
    }
  }



  handleClickRepo = (name) => {
    this.setState({clickedRepo: name})
    console.log(name)
  }


  handleClickPull = (id) => {
    // console.log('DEBUG id:', id)
    api.getPull(id)
      .then(pull => {
        this.setState({
          clickedPull: pull,
          clickedRepo: null

        })
        console.log(pull)
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
    console.log("this.state.user HOME.js", this.state.user)
    return (
      <div className="Home">
        <RepoList click={(name) => this.handleClickRepo(name)}/>
        <div style={{width: '100%'}}>
         {this.state.clickedRepo && <PullsPage click={(id)=> this.handleClickPull(id)} user={this.state.user} repoName={this.state.clickedRepo}/>}
          {this.state.clickedPull &&  <PullDetail user={this.state.user} pull={this.state.clickedPull}/>}
        </div>
      </div>
    );
  }
}

export default Home;