import React, { Component } from 'react';
import api from '../api';
import Repo from './Repo'
import { Table, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';


class RepoList extends Component {
  constructor(props) {
        super(props)
        this.state = {
          repos: null,
          searchValue: ""
        }
      }
    
      handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({[name]: value});
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
    let filteredRepos;
    if (this.state.repos) {
      console.log(this.state.repos.length)
      filteredRepos = this.state.repos.filter(repo=>{
        return repo.name.toUpperCase().includes(this.state.searchValue.toUpperCase())
      }); 
    }  
    return (
      <div className="RepoList">
     <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Search</InputGroupText>
        </InputGroupAddon>
        <Input name="searchValue" onChange={e => this.handleChange(e)} value={this.state.searchValue} />
      </InputGroup>


         <Table>
        <thead>
          <tr>
            <th>Repos</th>
          </tr>
          </thead>
          <tbody>

      
        {!this.state.repos && <div>Loading...</div>}

        {filteredRepos && filteredRepos.map((repo, index) => {
          return <Repo key={index} repo={repo} click={(repo) => this.handleClick(repo)}/>
        })}


        </tbody>
        </Table>
      </div>
    );
  }
}

export default RepoList;