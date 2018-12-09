import React, {Component} from 'react'
import {Well} from 'react-bootstrap'
import auth from './../auth/auth-helper'
import {remove} from './api-user.js'
import {Redirect} from 'react-router-dom'
import DeleteProfileModal from './DeleteProfileModal'

class SubscriptionStatus extends Component { 

  state = {
    redirect: false,
    open: false
  }

  clickButton = () => {
    this.setState({open: true})
  }
  deleteAccount = () => {

    const jwt = auth.isAuthenticated()
    remove({
      userId: this.props.userId
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        auth.signout(() => console.log('deleted'))
        this.setState({redirect: true})
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
      return <DeleteProfileModal container={this.props.container} handleRequestClose={this.handleRequestClose} handleDelete={this.deleteAccount}/>
    }
    else if(this.props.user.subscription_status.service_level==='Quick Size Plus')
    return (
      <Well>You already have Quick Size Plus</Well>
    )
    else return (
     
      <Well>You currently have acces to the Quick Size calculator, which is free of charge. <p></p> 
      Upgrade to Quick Size Plus for the following additional features:<p></p>
        <ul>
          <li>Additional calculations based on shoulder width and sit bone width</li>
          <li>Cloud storage of sizing data, customer name, contact information, notes and recommendations</li>
          <li>Summary PDF reports for printing or emailing to customers</li>
          <li>Customized fitting studio branding</li>
          <li>Two additional authorized users at no extra charge</li>
        </ul>
      </Well>
      
    )

  }
}

export default SubscriptionStatus
