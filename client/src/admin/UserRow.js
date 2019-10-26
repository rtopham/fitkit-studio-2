import React, {Component} from 'react'

class UserRow extends Component {

  render() {

  return (

      <tr>
      <td>{this.props.user.name}</td>
      <td>{this.props.user.email}</td>
      <td>{(new Date(this.props.user.created)).toDateString()}</td>
      <td>{this.props.user.service_level}</td>
      <td>{this.props.user.shop_owner?"Yes":"No"}</td>
      </tr>
    )
  }
}

export default UserRow
