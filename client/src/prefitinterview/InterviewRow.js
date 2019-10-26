import React, {Component} from 'react'
import {Link} from "react-router-dom"
import DeletePreFitInterview from './DeletePreFitInterview'
import "./PreFit.css"

class InterviewRow extends Component {

render() {
if(this.props.interview.createdForCyclist!==null) return null
return (
    <tr>
      <td>{this.props.interview.lastName}</td>
      <td>{this.props.interview.firstName}</td>
      <td>{this.props.interview.birthDate.substring(0,10)}</td>
      <td>{(new Date(this.props.interview.created)).toDateString()}</td>
      <td><Link to={{pathname:'/quickfit/from-interview/'+this.props.userId+'/'+this.props.interview._id, state:{interview:this.props.interview}}}>New Customer</Link></td>
      <td>{this.props.existingCustomer!==false&&<Link to={{pathname:'/quickfit/add-interview/'+this.props.userId+'/'+this.props.interview._id, state:{interview:this.props.interview}}}>Existing Customer</Link>}</td>
      <td><DeletePreFitInterview interview={this.props.interview} reloadInterviews={this.props.reloadInterviews}/></td>      
    </tr>
    )
  }
}

export default InterviewRow
