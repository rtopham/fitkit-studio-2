import React from 'react'
import {Link} from "react-router-dom"
import DeletePreFitInterview from './DeletePreFitInterview'
import "./PreFit.css"

const InterviewRow=(props)=> {

if(props.interview.createdForCyclist!==null) return null
return (
    <tr>
      <td>{props.interview.lastName}</td>
      <td>{props.interview.firstName}</td>
      <td>{props.interview.birthDate.substring(0,10)}</td>
      <td>{(new Date(props.interview.created)).toDateString()}</td>
      <td><Link to={{pathname:'/quickfit/from-interview/'+props.userId+'/'+props.interview._id, state:{interview:props.interview}}}>New Customer</Link></td>
      <td>{props.existingCustomer!==false&&<Link to={{pathname:'/quickfit/add-interview/'+props.userId+'/'+props.interview._id, state:{interview:props.interview}}}>Existing Customer</Link>}</td>
      <td><DeletePreFitInterview interview={props.interview} reloadInterviews={props.reloadInterviews}/></td>      
    </tr>
    )
  }


export default InterviewRow
