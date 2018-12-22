import React, {Component} from 'react'
import {Tooltip, OverlayTrigger, Glyphicon} from "react-bootstrap"
import {LinkContainer} from 'react-router-bootstrap'
//import icupLogo from './../assets/logos/icup.jpg'
//import mwLogo from './../assets/logos/midweek.jpg'
//import USACLogo from './../assets/logos/USAC.png'
//import USCSLogo from './../assets/logos/uscs.jpg'
//import chainRing from './../assets/logos/chainring.jpg'
//import stravaLogo from './../assets/logos/stravaicon.jpg'
//import EditRace from './EditRace'
import "./Cyclist.css"

class CyclistRow extends Component {
state={

    open: false,
    class:"editRacePanel"
  }


clickEdit =(e) =>{
  e.preventDefault()
this.setState({open:!this.state.open})

this.props.updateOpenCyclist (this.props.cyclist)

}

  render() {

return (
 
<tbody id={this.props.cyclist._id}>
      <tr>

      <td> <a href={'/quicksize-plus/'+this.props.userId+'/'+this.props.cyclist._id}>
      {this.props.cyclist.cyclistProfile.lastName}</a>
      
      </td>
      <td>{this.props.cyclist.cyclistProfile.firstName}</td>

      <td>{this.props.cyclist.cyclistProfile.email}</td>
      <td>{'Last updated: '+(new Date(this.props.cyclist.updated)).toDateString()}</td>
      
    </tr>
 
</tbody> 

    )
  }


}

export default CyclistRow
