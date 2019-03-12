import React, {Component} from 'react'
import {Button} from 'react-bootstrap'
import auth from './../auth/auth-helper'
import {remove} from './api-shop.js'
import {update} from './../user/api-user'
import {Redirect} from 'react-router-dom'
import DeleteShopModal from './DeleteShopModal'
import {recordLogAction} from '../admin/api-admin'

class DeleteShop extends Component {

  state = {
    redirect: false,
    open: false
  }

  clickButton = () => {
    this.setState({open: true})
  }


  deleteShop = () => {
    //delete shop record
    const jwt = auth.isAuthenticated()
    remove({
      shopId: this.props.shop._id
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.updateUserRecord(jwt)
        const logData={userId:this.props.user._id,action: "deleted shop", description: "User "+this.props.user.name+" deleted the shop "+this.props.shop.name+".", documentId:this.props.shop._id}
        recordLogAction(logData)
      }
    })

 //update user record to change shop_owner


  }

updateUserRecord=(jwt)=>{

  const user = {
    shop_owner: false
  }

  update({
    userId: this.props.user._id
  }, {
    t: jwt.token
  }, user).then((data) => {
    if (data.error) {
      this.setState({error: data.error})
    } else {
      jwt.user.shop_owner=user.shop_owner
      sessionStorage.setItem('jwt', JSON.stringify(jwt))
//        this.setState({show: true})
    this.handleRequestClose()
    this.props.closeShopStudioPanel()
    this.props.removeDeletedShopFromState()

    }
  })

}

  handleRequestClose = () => {
    this.setState({open: false})

  }

  render() {
    const redirect = this.state.redirect
    if (redirect) {
      return <Redirect to='/'/>
    }

    if (this.state.open){
      return <DeleteShopModal container={this.props.container} handleRequestClose={this.handleRequestClose}
      handleDelete={this.deleteShop}/>
    }
    else return (
     
      <Button bsStyle="link" className="pull-right" bsSize="small" onClick={this.clickButton}><span className="glyphicon glyphicon-trash" aria-label="Delete" aria-hidden="true" > </span></Button>
      
    )

  }
}

export default DeleteShop
