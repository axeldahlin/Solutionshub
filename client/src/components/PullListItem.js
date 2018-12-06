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

  getDate(date) {
    let formatedDate = new Date(date)
    let day = formatedDate.getDate();
    let month = formatedDate.getMonth();
    
    let year = formatedDate.getFullYear();
    if (month < 10) month = '0' + month
    if (day < 10) day = '0' + day
    formatedDate = `${day}-${month}-${year}`
    return formatedDate
  }

  render() {
    let buttonImage = "light_off.svg"
    if (this.props.pull.likedByUser) buttonImage = "light_on.svg"
    let flagPNG = this.getFlagPNG()
    return (
      <tr className="Pull">
        <td className="pull-table-cell">{flagPNG && <img src={`flags/${flagPNG}.png`} width="40" height="30" alt="flag"></img>}</td>
        <td className="table-title pull-table-cell"><Link to={"/" + this.props.repo.name + "/" + this.props.pull.pullRequestID}>{this.props.pull.title}</Link></td>
        <td className="table-name pull-table-cell">{this.props.pull._githubUsername}</td>
        <td className="pull-table-cell">{this.getDate(this.props.pull.updated_at)}</td>
        <td className="pull-table-cell table-img">{this.props.pull.nbOfVotes} <img className="table-bulb" onClick={()=>this.props.handleLike()}src={buttonImage} alt="bulb"></img></td> 
        
        {/* <td><button onClick={() => this.handleClick()}>Details</button></td> */}
      </tr>
    )
  }
}


export default Pull;