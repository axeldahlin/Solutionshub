import React, { Component } from 'react';
import api from '../api';
import Script from 'react-load-script'
import {Helmet} from 'react-helmet'



class PullDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pull: null
    }
  }

  componentDidMount() {
    api.getPull(this.props.match.params.pull)
      .then(pull => {
        console.log("pull",pull)
        this.setState({
          pull
        })
      })
      .catch(err => {
        console.log("Error at apiGetPull",err)
      })


  }



  render() {

   

    

    if(this.state.pull) {
      return (
        <div id="test" className="PullDetail" >

          <iframe 
            src="https://gist.github.com/axeldahlin/54d8327ae49456398bc8f512cd6534e6.js"
          
          />

            {/* {this.state.script} */}
           <h1>Pull detail</h1>
           <p>{this.state.pull._id}</p>
           <p>{this.state.pull.repoName}</p>
           <p>{this.state.pull.title}</p>


           <div className="terminal">
             <div className="bar-terminal">

             </div>

             <div className="text-terminal">
                <p>
                $ git clone &lt;the repo link&gt;

                </p>
                <p>
                  $ cd &lt;the project&gt;

                </p>
                <p>
                  $ git fetch origin '+refs/pull/*/head:refs/remotes/origin/pr/*'

                </p>
                <p>
                  $ git checkout pr/999

                </p>

             </div>


           </div>

            
  <p>

        <pre>{JSON.stringify(this.state.pull)}</pre>

  </p>

         
        <h1>This is the pull details page</h1>
        <h2><a href={this.state.pull.url}>Find this solution on Github</a></h2>
        </div>
      )
    } else {
      return <h1>Loading...</h1>
    }

    

  }
}


export default PullDetail;