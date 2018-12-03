import React, { Component } from 'react';
import api from '../api';
import Repo from './Repo'


class RepoList extends Component {
  constructor(props) {
        super(props)
        this.state = {
          repos: []
        }
      }
    
     
    
      componentDidMount() {
        // console.log("component did Mount")
        api.getRepos()
          .then(repos => this.setState({repos: repos}))
      }


      handleClick = (repo) => {
        this.props.click(repo)

        // console.log(name)
      }


  render() {
    return (
      <div className="RepoList">


        {this.state.repos.map((repo, index) => {
          return <Repo key={index} repo={repo} click={(repo) => this.handleClick(repo)}/>

        })}


        
    

   
 
      
      </div>
    );
  }
}

export default RepoList;