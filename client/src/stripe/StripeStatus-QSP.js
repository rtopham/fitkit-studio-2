import React, {Component} from 'react';
import {Well, Button, ButtonToolbar} from "react-bootstrap"
import PaymentMethod from './PaymentMethod';

class StripeStatusQSP extends Component {

render() {

return(<Well>
  <Well>You are currently subscribed to Quick Size Plus
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

export default StripeStatusQSP