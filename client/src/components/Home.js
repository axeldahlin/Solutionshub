import React, { Component } from 'react';
import PullDetail from './PullDetail'
import RepoList from './RepoList'
import PullsList from './PullsList';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      clickedRepo: null
    }
  }
  handleClickRepo = (repo) => {
    console.log(repo)
    this.setState({clickedRepo: repo})
  }



  handleClickPull = (id) => {
    // console.log('DEBUG id:', id)
    api.getPull(id)
      .then(pull => {

        console.log(pull)

   
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

        {/* <RepoList click={(name) => this.handleClickRepo(name)}/>

        <div style={{width: '100%'}}>
         {this.state.clickedRepo && <PullsPage click={(id)=> this.handleClickPull(id)} user={this.state.user} repoName={this.state.clickedRepo}/>}
          {this.state.clickedPull &&  <PullDetail user={this.state.user} pull={this.state.clickedPull}/>} */}

        <RepoList click={(repo) => this.handleClickRepo(repo)}/>
        <div style={{width: '100%'}}>
         {this.state.clickedRepo && <PullsList click={(pull)=> this.handleClickPull(pull)} user={this.state.user} repo={this.state.clickedRepo}/>}

          {this.state.clickedPull &&  <PullDetail pull={this.state.clickedPull}/>}

        </div>
      </div>
    );
  }
}

export default Home;