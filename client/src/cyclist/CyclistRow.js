import React from 'react'
import {Link} from "react-router-dom"
import DeleteCyclist from './DeleteCyclist'
import "./Cyclist.css"

const CyclistRow=(props)=> {

return (
      <tr>
      <td>
      <Link to={'/quickfit/'+props.userId+'/'+props.cyclist._id}>{props.cyclist.cyclistProfile.lastName}</Link>
      </td>
      <td>
      <Link to={'/quickfit/'+props.userId+'/'+props.cyclist._id}>{props.cyclist.cyclistProfile.firstName}</Link>
      </td>
      <td>{props.cyclist.cyclistProfile.email}</td>
      <td>{(new Date(props.cyclist.updated)).toDateString()}</td>
      <td><DeleteCyclist container={props.container} cyclist={props.cyclist} reloadCyclists={props.reloadCyclists}/></td>
      </tr>
    )
  }

export default CyclistRow
