import React from 'react'

const LogRow=(props)=>{
return (
      <tr>
      <td>{(new Date(props.log.date)).toDateString()}</td>
      <td>{(new Date(props.log.date)).toLocaleTimeString()}</td>
      <td>{props.log.description}</td>
      </tr>
    )
  }

export default LogRow
