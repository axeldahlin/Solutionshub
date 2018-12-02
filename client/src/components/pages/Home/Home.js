import React, { Component } from 'react';
import { Route, Link, NavLink, Switch } from 'react-router-dom';

// import LoginPage from './pages/LoginPage/LoginPage';
// import ReposPage from './RepoList/';
// import PullsPage from './pages/PullsPage/PullsPage';
// import api from '../api';
// import Navbar from './Navbar'

// import { Button } from 'reactstrap';

import RepoList from './RepoList/RepoList'
import PullsPage from './PullsPage/PullsPage';




class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }

  }



  handleClickRepo = (name) => {

    this.setState({clickedRepo: name})

    console.log(name)


  }



  render() {
    return (
      <div className="Home">

        <RepoList click={(name) => this.handleClickRepo(name)}/>

        

        <div>
         {this.state.clickedRepo && <PullsPage repoName={this.state.repoName}/>}

        </div>





      





    

   
 
      
      </div>
    );
  }
}

export default Home;