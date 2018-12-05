import React, { Component } from 'react';
import api from '../api';




class PullDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pull: null
  
    }
  }

  componentDidMount() {
    // api.getPull(this.props.match.params.pull)
    //   .then(pull=> {
    //     this.setState({pull})

    //   })
  }




  render() {
    console.log("this.props.user PULL DETAIL",this.props.user)
    return <h1>hh</h1>
  }
}


export default PullDetail;