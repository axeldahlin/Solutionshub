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
    api.getRepos()
      .then(repos => this.setState({repos: repos}))
  }


  render() {                
    return (
      <div className="Home">
        <h2>Home</h2>
        
        {this.state.repos.map((repo, index) => {
          return <Repo key={index} name={repo.name} url={repo.url}/>

        })}

       
      </div>
    );
  }
}

export default Home;
