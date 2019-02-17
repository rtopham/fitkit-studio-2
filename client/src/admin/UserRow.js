import React, {Component} from 'react'
//import DeleteCyclist from './DeleteCyclist'
//import "./Cyclist.css"

class UserRow extends Component {
state={

    open: false,

  }



  render() {

return (


      <tr>

      <td>{this.props.user.name}</td>
      <td>{this.props.user.email}</td>
      <td>{(new Date(this.props.user.created)).toDateString()}</td>
      <td>{this.props.user.service_level}</td>
{/*      <td>{(new Date(this.props.user.subscription_status.expiration)).toDateString()}</td>*/}
      <td>{this.props.user.shop_owner?"Yes":"No"}</td>
    </tr>



    )
  }


}

export default UserRow
