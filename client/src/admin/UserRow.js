import React from 'react'

const UserRow=(props)=> {

  return (
      <tr>
      <td>{props.user.name}</td>
      <td>{props.user.email}</td>
      <td>{(new Date(props.user.created)).toDateString()}</td>
      <td>{props.user.service_level}</td>
      <td>{props.user.shop_owner?"Yes":"No"}</td>
      </tr>
    )
  }

export default UserRow
