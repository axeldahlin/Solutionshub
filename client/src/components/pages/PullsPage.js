import React, { Component } from 'react';
import api from '../../api';
import Pull from '../Pull'





class PullsPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pulls: []
  
    }
  }

 

  componentDidMount() {


    const repoName = this.props.match.params.name

    console.log('DEBUG this.props.params:', this.props.match.params.name)


    // api.updatePulls(repoName)
    // .then(_ => {
    //   console.log('I m here')
    //     api.getPulls(repoName)
    //       .then(pulls => {
    //         console.log('DEBUG pulls:', pulls)
    //       })
    //   })

    api.getPulls(repoName)
    .then(pulls => {
      this.setState({pulls})
    })
    .then(res => {
      api.updatePulls(repoName)
        .then(res => {
              api.getPulls(repoName)
            .then(pulls => {
              this.setState({pulls})
            })
            .catch(err => console.log('DEBUG err:', err))
        })
        .catch(err => console.log(err))
    })




    // api.getPulls(repoName)
    //       .then(pulls => {
    //         this.setState({pulls})
    //       })
    //       .catch(err => console.log('DEBUG err:', err))

  }


  render() {          
    return (
      <div className="PullsPage">

        <h1>Pulls Page</h1>

        <h2>{this.props.match.params.name}</h2>

       
          {this.state.pulls.map((pull, index) => {
            return <Pull
              key={index} 
              title={pull.title}
              url={pull.url}
              repoName={pull.repoName}
              
              
              />

          })}

  



       
      </div>
    );
  }
}

export default PullsPage;