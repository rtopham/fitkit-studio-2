import React, {Component} from 'react';
import {Well, Button, ButtonToolbar} from "react-bootstrap"
import PaymentMethod from './PaymentMethod';

class StripeStatusTrialing extends Component {

render() {

return(<Well>
  <Well>You are currently subscribed to Quick Size Plus and your 30-day trial is active.
  <p></p>Your 30-day trial will expire on {this.props.currentStop.toDateString()}. Unless you cancel your subscription before {this.props.currentStop.toDateString()}, your subscription will automatically renew on such date, and you will be charged based on your selected payment frequency.
  <p></p>Your payment frequency is: 
  {this.props.stripeSubscription.plan.interval==="month"&&" Monthly"}
  {this.props.stripeSubscription.plan.interval==="year"&&" Yearly"}
  <br/>
  Your subscription will automatically renew on {this.props.currentStop.toDateString()}
  <br/>
  <br/>
  <PaymentMethod user={this.props.user} stripeCustomer={this.props.stripeCustomer}/> <Button bsStyle ="link" onClick={this.props.toggleChangePaymentMethod}>Update</Button>
  </Well>
  <ButtonToolbar>
  <Button onClick={this.props.toggleChangeSelected}>Change Your Subscription</Button>
  
  </ButtonToolbar>
  </Well>
  )
  }
}

export default StripeStatusTrialing