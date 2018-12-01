
import React, { Component } from 'react';
import api from '../../api';
import Repo from '../../components/Repo'



class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      repos: []
    }
  }

  render() {
    return (
      <div className="LoginPage">
      <h1>This is the Login Component</h1>
      </div>
    )
  }
}