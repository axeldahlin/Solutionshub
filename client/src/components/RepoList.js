import React, { Component } from 'react';
import api from '../api';
import Repo from './Repo'
import { Table } from 'reactstrap';


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


      handleClick = (repo) => {
        this.props.click(repo)

        // console.log(name)
      }


  render() {
    return (
      <div className="RepoList">



         <Table>
        <thead>
          <tr>
            <th>Repos</th>
       
          </tr>
          </thead>
          <tbody>


        {this.state.repos.map((repo, index) => {
          return <Repo key={index} repo={repo} click={(repo) => this.handleClick(repo)}/>
        })}


        </tbody>
        </Table>

        
    

   
 
      
      </div>
    );
  }
}

export default RepoList;