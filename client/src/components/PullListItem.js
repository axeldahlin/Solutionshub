import React, { Component } from 'react';
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


    // if (title.match(/BER/gm)) return 'ber'
    // if (title.match(/berlin/gmi)) return 'ber'  
    
    // if (title.match(/BCN/gm)) return 'esp'  
    // if (title.match(/barcelona/gmi)) return 'esp'



    // if (title.match(/MIA/gm)) return 'usa'  
    // if (title.match(/miami/gmi)) return 'usa'


     // if (title.match(/AMS/gm)) return 'ams'  
    // if (title.match(/amsterdam/gmi)) return 'ams'


         // if (title.match(/MAD/gm)) return 'esp'  
    // if (title.match(/madrid/gmi)) return 'esp'


    // if (title.match(/PAR/gm)) return 'fra'  
    // if (title.match(/paris/gmi)) return 'fra'
    
    
    // if (title.match(/BER/gm)) return 'ber'   
    // if (title.match(/BER/gm)) return 'ber'  
    
    
    // Last catcher


    if (title.match(/ber/gmi)) return 'ber'
    // if (title.match(/bcn/gmi)) return 'esp'




    

    return ''

  }





  render() {
    let buttonText = "Like"
    if (this.props.pull.likedByUser) buttonText = "Unlike"

    let flagPNG = this.getFlagPNG()

  
    return (
      <tr className="Pull">
        <td>{flagPNG && <img src={require(`../${flagPNG}.png`)} width="60" height="50" alt="flag"></img>}</td>
        <td>{this.props.pull.title}</td>
        <td>{new Date(this.props.pull.updated_at).toUTCString()}</td>
        <td><button onClick={()=> this.props.handleLike()}>{buttonText}</button></td>
        <td><button onClick={() => this.handleClick()}>Details</button></td>
        <td>{this.props.pull.nbOfVotes}</td>
      </tr>
    )
  }
}


export default Pull;