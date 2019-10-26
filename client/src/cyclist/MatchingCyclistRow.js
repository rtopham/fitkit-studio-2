import React, {Component} from 'react'
import {Button} from 'react-bootstrap'
import "./Cyclist.css"

class MatchingCyclistRow extends Component {
state={
    open: false,
  }


clickEdit =(e) =>{
  e.preventDefault()
this.setState({open:!this.state.open})
this.props.updateOpenCyclist (this.props.cyclist)
}

handleMatch=()=>{
  this.props.handleMatch(this.props.cyclist._id)
}

render() {

return (
    <tr>
      <td>
      {this.props.cyclist.cyclistProfile.lastName}
      </td>
      <td>
      {this.props.cyclist.cyclistProfile.firstName}
      </td>
      <td>{this.props.cyclist.cyclistProfile.email}</td>
      <td>{(new Date(this.props.cyclist.updated)).toDateString()}</td>
      <td>
      <Button bsStyle="link" bsSize="xsmall" onClick={this.handleMatch}><span className="glyphicon glyphicon-plus" aria-label="Add" aria-hidden="true" ></span> Add Interview</Button>
      </td>
    </tr>
    )
  }
}
export default MatchingCyclistRow
