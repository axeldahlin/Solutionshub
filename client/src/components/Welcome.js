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
        <h1>This is the Welcome component</h1>
        <img className="speech-bubble" src="speechbubble.svg"></img>
        <img className="octocat" src="Octocat.png"></img>
      </div>
    );
  }
}

export default Welcome;