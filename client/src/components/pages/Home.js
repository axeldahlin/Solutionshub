import React, { Component } from 'react';
import api from '../../api';
import Repo from '../../components/Repo'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      repos: []
    }
  }

 

  componentDidMount() {
    console.log("component did Mount")
    api.getRepos()
      .then(repos => this.setState({repos: repos}))
  }


  render() {  
    console.log("rendering Home")     
    console.log(this.state.repos)         
    return (
      <div className="Home">
        <h2>Welcome to the Front End</h2>
        
        {this.state.repos.map((repo, index) => {
          return <Repo key={index} name={repo.name} url={repo.url}/>

        })}

       
      </div>
    );
  }
}

export default Home;
