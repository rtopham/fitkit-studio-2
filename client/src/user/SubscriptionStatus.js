import React, {Component} from 'react'
import {Well} from 'react-bootstrap'
import auth from './../auth/auth-helper'
import {remove} from './api-user.js'
import {Redirect} from 'react-router-dom'
import DeleteProfileModal from './DeleteProfileModal'

subscriptionStatus=()=>{
  let activeSubscription=false
  if(this.props.stripeSubscription.status==='active'||this.props.stripeSubscription.status==='trialing') activeSubscription=true
  
  //let epoch =new Date(1/1/1970)
  //let billingAnchor = new Date(this.props.stripeSubscription.billing_cycle_anchor*1000)
  //let currentStart = new Date(this.props.stripeSubscription.current_period_start*1000)
  let currentStop = new Date (this.props.stripeSubscription.current_period_end*1000)
  
  if(!activeSubscription&&!this.state.upgradeSelected)
  return(<Well>You currently have access to the Quick Size calculator, which is free of charge. <p></p> 
    Upgrade to Quick Size Plus for the following additional features:<p></p>
      <ul>
        <li>Additional calculations based on shoulder width and sit bone width</li>
        <li>Cloud storage of sizing data, customer name, contact information, notes and recommendations</li>
        <li>Summary PDF reports for printing or emailing to customers</li>
        <li>Customized bike shop or fitting studio branding</li>
      </ul>
   </Well>)
  if(activeSubscription)
  return(<Well>You are currently subscribed to Quick Size Plus
    <p></p>Your payment frequency is: {this.props.stripeSubscription.plan.interval==="month"&&"Monthly"}{this.props.stripeSubscription.plan.interval==="year"&&"Yearly"}
    <br/>Your subscription will automatically renew on {currentStop.toDateString()}
    </Well>) 
  
  }

export default SubscriptionStatus
