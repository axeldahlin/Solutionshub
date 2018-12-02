
import React, { Link, Component } from 'react';
import api from '../../api';
import Repo from '../../components/Repo'



class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      repos: []
    }
  }


  componentDidMount() {
    console.log("component did mount")
    api.userData()
    .then(response => {
      console.log("response userData component did mount",response)
    })
    .catch(err => {
      console.log("err at componentdidmount",err)
    })

    api.isLoggedInNew()
    .then(response=>{
      console.log("response isLoggedInNew component did mount", response)
    })
    .catch(err=>{
      console.log("err at isLoggedInNew()",err)
    })
    
  }

  render() {
    console.log("IsLoggedInNew?", )
    return (
      <div className="LoginPage">
      <h1>This is the Login Component</h1>
      <button onClick={()=>api.newLogout()}>Logout</button>
      {/* <Link to='/auth/github'>Link to GitHub login</Link> */}
      <a href="https://github.com/login/oauth/authorize?client_id=ef51dc0616f91cc5207e">Link to GitHub login</a>
      </div>
    )
  }
}


export default LoginPage;