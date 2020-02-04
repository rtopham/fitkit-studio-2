import React, {Component} from 'react'

class BikeRow extends Component {

getCyclistName=()=>{
  for(let i=0;i<this.props.cyclists.length;i++){
    if(this.props.bike.ownedBy===this.props.cyclists[i]._id) return(this.props.cyclists[i].cyclistProfile.firstName+" "+this.props.cyclists[i].cyclistProfile.lastName)
  }
}

render() {

const cyclistName=this.getCyclistName()

  return (
      <tr>
      <td>{cyclistName}</td>
      <td>{this.props.bike.make}</td>
      <td>{this.props.bike.model}</td>
      <td>{this.props.bike.frameSize}</td>
      <td>{this.props.bike.fitHistory.length}</td>
      <td>{this.props.bike.createdBy.name}</td>
      <td>{(new Date(this.props.bike.created)).toDateString()}</td>
      <td>{(new Date(this.props.bike.updated)).toDateString()}</td>
      </tr>
    )
  }
}

export default BikeRow
