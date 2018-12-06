import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import api from '../api';





class Pull extends Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   likedByUser: false,
    //   numberVotes: 0
    // }
  }


  handleClick = () => {
    this.props.click(this.props.pull)
  }

  getFlagPNG = () => {
    let title = this.props.pull.title
    if (title.match(/BER/gm) || title.match(/berlin/gmi)) return 'ber' 
    if (title.match(/BCN/gm) || title.match(/barcelona/gmi)) return 'esp'  
    if (title.match(/MIA/gm) || title.match(/miami/gmi)) return 'usa'  
    if (title.match(/AMS/gm) || title.match(/amsterdam/gmi)) return 'ams'  
    if (title.match(/MAD/gm) || title.match(/madrid/gmi)) return 'esp'  
    if (title.match(/PAR/gm) || title.match(/paris/gmi)) return 'fra'  
    if (title.match(/MEX/gm) || title.match(/MX/gm) || title.match(/mexico/gmi)) return 'mex' 
    // If nothing matches so far here is the second round
    if (title.match(/ber/gmi)) return 'ber'
    if (title.match(/bcn/gmi)) return 'esp'
    if (title.match(/par/gmi)) return 'fra'  
    if (title.match(/mia/gmi)) return 'usa'  
    if (title.match(/mad/gmi)) return 'esp'  
    return ''
  }

  render() {
    let buttonImage = "light_off.svg"
    if (this.props.pull.likedByUser) buttonImage = "light_on.svg"
    let flagPNG = this.getFlagPNG()
    return (
      <tr className="Pull">
        <td>{flagPNG && <img src={require(`../flags/${flagPNG}.png`)} width="60" height="50" alt="flag"></img>}</td>
        <td>  <Link to={"/" + this.props.repo.name + "/" + this.props.pull.pullRequestID}>{this.props.pull.title}</Link></td>
        <td>{this.props.pull._githubUsername}</td>
        <td>{new Date(this.props.pull.updated_at).toUTCString()}</td>
        <td>{this.props.pull.nbOfVotes}</td>
        <td><img onClick={()=>this.props.handleLike()}src={buttonImage} alt="bulb"></img></td> 
      
        {/* <td><button onClick={() => this.handleClick()}>Details</button></td> */}
      </tr>
    )
  }
}


export default Pull;