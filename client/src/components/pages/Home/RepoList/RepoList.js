import React, { Component } from 'react';
import { Route, Link, NavLink, Switch } from 'react-router-dom';
import api from '../../../../api';
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


      handleClick = (name) => {
        this.props.click(name)

        // console.log(name)
      }


  render() {
    return (
      <div className="RepoList">


        {this.state.repos.map((repo, index) => {
          return <Repo key={index} name={repo.name} click={(name) => this.handleClick(name)} url={repo.url}/>

        })}


        
    

   
 
      
      </div>
    );
  }
}

export default RepoList;