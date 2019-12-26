import React, {Component} from 'react'
import {Image} from 'react-bootstrap'
import "./Admin.css"
import auth from '../auth/auth-helper'
import {readUserName} from './../user/api-user'

class ShopRow extends Component {
constructor(){
  super()
this.state={
    loading: true,
    userName: ''
  }
}

componentDidMount=()=>{
  const jwt = auth.isAuthenticated()
  readUserName({
    userId: this.props.shop.owner
  }, {t: jwt.token}).then((data) => {
    if (data.error) {
      if(data.error==='User not found') this.setState({userName:"Deleted User"})
    } else {
      this.setState({userName: data.name, loading:false})
    }
  })
}
  render() {
   const logoUrl = `/api/shops/logo/${this.props.shop._id}?${new Date().getTime()}`
    if(this.state.loading) return null
   return (
      <tr>
      <td>{this.props.shop.name}</td>
      <td>{this.props.shop.address}<br/>{this.props.shop.address2}</td>
      <td>{this.props.shop.phone}</td>
      <td>{this.props.shop.website}</td>
      <td>{this.state.userName}</td>
      <td><Image className="ShopTableLogoImage" responsive src={logoUrl}></Image></td>
      </tr>
    )
  }
}

export default ShopRow
