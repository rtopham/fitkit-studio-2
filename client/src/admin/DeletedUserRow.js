import React from 'react'

const DeletedUserRow=(props)=> {

  return (
      <tr>
      <td>{props.deletedUser.email}</td>
      <td>{(new Date(props.deletedUser.created)).toDateString()}</td>
      <td>{(new Date(props.deletedUser.deleted)).toDateString()}</td>
      <td>{props.deletedUser.deletedUserId}</td> 
      </tr>
    )
  }

export default DeletedUserRow
