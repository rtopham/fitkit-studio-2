import React, {Component} from 'react'
import {Button} from 'react-bootstrap'
import auth from './../auth/auth-helper'
import {remove} from './api-user.js'
import {deleteStripeCustomer} from './../stripe/api-stripe'
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
if(this.props.user.stripe_customer_id) this.deleteStripeCustomerAccountAndUserAccount()
else this.deleteUserAccount()
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
        auth.signout(() => console.log('deleted'))
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
                auth.signout(() => console.log('deleted'))
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
