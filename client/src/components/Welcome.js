import React, { Component } from 'react';
import PullDetail from './PullDetail'
import RepoList from './RepoList'
import PullsList from './PullsList';
import { Route, Switch } from 'react-router-dom';
import api from '../api'

class Welcome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clickedRepo: null,
      clickedPull: null
    }
  }



  render() {
    return (
      <div className="Welcome">
        <h1>Welcome to Solutions Hub</h1>
        <p>Select an Ironhack lab on the left to get started.</p>
        {/* <img className="speech-bubble" src="speechbubble.svg"></img>
        <img className="octocat" src="Octocat.png"></img> */}
            <div className="Img-container">
         <div>
            <img src="Octocat-low.png" alt="cat"/>
         </div>
         <div>
          <img src="ironhack.png" alt="iron"/>
         </div>
         <div>
            <img src="idea.png" alt="idea"/>
         </div>
       </div>
       <div className="main-text">
       <h2>What is Solutions Hub?</h2>
       <p>Solutions Hub is a tool for Ironhackers–students and teachers–to have access to good quality solutions to the Ironhack labs.  </p>
       </div>
      
      </div>
    );
  }
}

export default Welcome;