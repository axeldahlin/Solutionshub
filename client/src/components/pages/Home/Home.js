import React, { Component } from 'react';
import { Route, Link, NavLink, Switch } from 'react-router-dom';

// import LoginPage from './pages/LoginPage/LoginPage';
// import ReposPage from './RepoList/';
// import PullsPage from './pages/PullsPage/PullsPage';
// import api from '../api';
// import Navbar from './Navbar'

// import { Button } from 'reactstrap';


import Pull from './PullsPage/PullListItem'

import RepoList from './RepoList/RepoList'
import PullsPage from './PullsPage/PullsList';




class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clickedRepo: null

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
         {this.state.clickedRepo && <PullsPage repoName={this.state.clickedRepo}/>}


        </div>





      





    

   
 
      
      </div>
    );
  }
}

export default Home;