
import React, {Component} from 'react'

class UserName extends Component {

render() {
if (!this.props.user) return null
    return (
      <span>Logged in as: {this.props.user.name}</span>
    )
  }
}

export default UserName
