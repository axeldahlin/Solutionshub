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
      const script = document.createElement('script');

      script.src= "https://gist.github.com/axeldahlin/2de492f5aa0c289ef92678e87cea623e.js"
  
      script.async = true;


  }

  handleScriptCreate() {
    this.setState({ scriptLoaded: false })
  }
   
  handleScriptError() {
    this.setState({ scriptError: true })
  }
   
  handleScriptLoad() {
    this.setState({ scriptLoaded: true })
  }



  render() {

   

    // document.querySelector('.PullDetail').appendChild(script)
    

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

            <Helmet>
                <script src="https://gist.github.com/axeldahlin/54d8327ae49456398bc8f512cd6534e6.js"></script>
               
            </Helmet>
  

         
        <pre>{JSON.stringify(this.state.pull)}</pre>
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