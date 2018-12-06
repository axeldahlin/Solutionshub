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
          .then(repos => {
            this.setState({
              repos: repos
            })
            return
          })
          .then(_ => {
            api.updateRepos()
          })
      }


      handleClick = (repo) => {
        this.props.click(repo)

        // console.log(name)
      }


  render() {
    let filteredRepos;
    if (this.state.repos) {
      filteredRepos = this.state.repos.filter(repo=>{
        return repo.name.toUpperCase().includes(this.state.searchValue.toUpperCase())
      }); 
    }  
    return (
      <div className="RepoList">
      <InputGroup className="pull-input">
            
            <Input style={{boxShadow: 'none'}} 
            className="search-input"
            placeholder="Filter repos..."
            name="searchValue" onChange={e => this.handleChange(e)}
             value={this.state.searchValue} />
            <img className="input-img"src="zoom-tool.png" alt="search"/>
          </InputGroup>


         <Table hover>
        <thead>
          <tr>
            <th>Ironhack Repos</th>
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