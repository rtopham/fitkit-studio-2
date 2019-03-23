import React, {Component} from 'react'
import {Link} from "react-router-dom"
import DeleteCyclist from './DeleteCyclist'
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
 

      <tr>

      <td>
        
      <Link to={'/quicksize-plus/'+this.props.userId+'/'+this.props.cyclist._id}>{this.props.cyclist.cyclistProfile.lastName}</Link>
      
      </td>
      <td>

      <Link to={'/quicksize-plus/'+this.props.userId+'/'+this.props.cyclist._id}>{this.props.cyclist.cyclistProfile.firstName}</Link>

      </td>

      <td>{this.props.cyclist.cyclistProfile.email}</td>
      <td>{(new Date(this.props.cyclist.updated)).toDateString()}</td>
      <td><DeleteCyclist container={this.props.container} cyclist={this.props.cyclist} reloadCyclists={this.props.reloadCyclists}/></td>
      
    </tr>



    )
  }


}

export default CyclistRow
