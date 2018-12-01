
import React, { Link, Component } from 'react';
import api from '../../api';
import Repo from '../../components/Repo'



class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      repos: []
    }
  }

  githubLogin() {
    api.loginGithub()
    .then(response => {
      console.log(response)
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <div className="LoginPage">
      <h1>This is the Login Component</h1>
      <button onClick={()=>this.githubLogin()}>Login with GitHub</button>
      {/* <Link to='/auth/github'>Link to GitHub login</Link> */}
      <a href="http://localhost:5000/auth/github">Link to GitHub login</a>
      </div>
    )
  }
}


export default LoginPage;