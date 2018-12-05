import React, { Component } from 'react';
import PullDetail from './PullDetail'
import RepoList from './RepoList'
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
    console.log('DEBUG repo pull:', repo)
    this.setState({clickedRepo: repo})
  }


  handleClickPull = (id) => {
    console.log('DEBUG id pull:', id)
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

        {/* <RepoList click={(name) => this.handleClickRepo(name)}/>

        <div style={{width: '100%'}}>
         {this.state.clickedRepo && <PullsPage click={(id)=> this.handleClickPull(id)} user={this.state.user} repoName={this.state.clickedRepo}/>}
          {this.state.clickedPull &&  <PullDetail user={this.state.user} pull={this.state.clickedPull}/>} */}

        <RepoList click={(repo) => this.handleClickRepo(repo)}/>
        
        <Switch>
          <Route path="/:repo" render={props => <PullsList {...props} user={this.state.user}/>}/>      



        </Switch>

      </div>
    );
  }
}

export default Home;