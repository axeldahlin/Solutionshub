import React, { Component } from 'react';
import PullDetail from './PullDetail'
import RepoList from './RepoList'
import PullsList from './PullsList';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clickedRepo: null
    }
  }
  handleClickRepo = (repo) => {
    console.log(repo)
    this.setState({clickedRepo: repo})
  }
  handleClickPull = (pull) => {



    console.log(pull)

   
        this.setState({
          clickedPull: pull,
          clickedRepo: null

        })
    
  }
  render() {
    console.log("props.user", this.props.sample)
    return (
      <div className="Home">
        <RepoList click={(repo) => this.handleClickRepo(repo)}/>
        <div style={{width: '100%'}}>
         {this.state.clickedRepo && <PullsList click={(pull)=> this.handleClickPull(pull)} repo={this.state.clickedRepo}/>}

          {this.state.clickedPull &&  <PullDetail pull={this.state.clickedPull}/>}

        </div>
      </div>
    );
  }
}

export default Home;