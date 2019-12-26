
import React from 'react'

const UserName=(props)=> {

if (!props.user) return null
    return (
      <span>Logged in as: {props.user.name}</span>
    )
  }

export default UserName
