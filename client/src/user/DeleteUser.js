import React, {Component} from 'react'
import {Button} from 'react-bootstrap'
import auth from './../auth/auth-helper'
import {remove} from './api-user.js'
import {remove as removeShop} from './../shop/api-shop'
import {deleteStripeCustomer} from '../subscription/api-stripe'
import {Redirect} from 'react-router-dom'
import DeleteProfileModal from './DeleteProfileModal'
import {recordLogAction} from '../admin/api-admin'

class DeleteUser extends Component {


state = {
    redirect: false,
    open: false
  }


  clickButton = () => {
    this.setState({open: true})
  }


deleteAccount=()=>{
if(this.props.shop._id!==null) this.deleteShop()
if(this.props.user.stripe_customer_id) this.deleteStripeCustomerAccountAndUserAccount()
else this.deleteUserAccount()
  }

deleteShop=()=>{
//  console.log("Deleting Shop")
      //delete shop record
      const jwt = auth.isAuthenticated()
      removeShop({
        shopId: this.props.shop._id
      }, {t: jwt.token}).then((data) => {
        if (data.error) {
          console.log(data.error)
        } else {
          const logData={userId:this.props.user._id,action: "deleted shop", description: "User "+this.props.user.name+" deleted the shop "+this.props.shop.name+".", documentId:this.props.shop._id}
          recordLogAction(logData)
        }
      })
}

deleteUserAccount = () => {

    const jwt = auth.isAuthenticated()

    remove({
      userId: this.props.userId
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        const logData={userId:this.props.userId,action: "deleted account", description: "User "+jwt.user.name+" deleted his or her user account."}
        recordLogAction(logData)
        auth.signout(() => console.log('Account deleted.'))
        this.setState({redirect: true})
      }
    })
  }

deleteStripeCustomerAccountAndUserAccount=()=>{
  const jwt = auth.isAuthenticated()
    deleteStripeCustomer({userId: this.props.user._id}, {t: jwt.token})
    .then((data) => {
            if (data.error) {
            this.setState({error: data.error})
            } 
            else {
              return data
            }
          })
    .then((data)=>{
//      const user = {service_level:this.props.plan}
      return remove({userId: this.props.user._id}, {t: jwt.token})
            .then((data)=>{
              if (data.error) {
                console.log(data.error)
              } else {
                const logData={userId:this.props.userId,action: "deleted account", description: "User "+jwt.user.name+" deleted his or her user account."}
                recordLogAction(logData)
                auth.signout(() => console.log('user profile deleted'))
                this.setState({redirect: true})
              }


            })
            
      })

  }

  handleRequestClose = () => {
    this.setState({open: false})
  }
  render() {
//    if(this.props.user.stripe_customer_id) console.log(this.props.user.stripe_customer_id)
    const redirect = this.state.redirect
    if (redirect) {
      return <Redirect to='/'/>
    }

    if (this.state.open){
      return <DeleteProfileModal container={this.props.container} handleRequestClose={this.handleRequestClose} handleDelete={this.deleteAccount}/>
    }
    else return (
     
      <Button bsStyle="link" className="pull-right" bsSize="small" onClick={this.clickButton}><span className="glyphicon glyphicon-trash" aria-label="Delete" aria-hidden="true" > </span></Button>
      
    )

  }
}

export default DeleteUser
