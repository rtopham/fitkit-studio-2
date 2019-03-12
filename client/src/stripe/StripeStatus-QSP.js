import React, {Component} from 'react';
import {Well, Button} from "react-bootstrap"

class StripeStatusQSP extends Component {

render() {

return(<Well>
  <Well>You are currently subscribed to Quick Size Plus
  <p></p>Your payment frequency is: 
  {this.props.stripeSubscription.plan.interval==="month"&&" Monthly"}
  {this.props.stripeSubscription.plan.interval==="year"&&" Yearly"}
  <br/>
  Your subscription will automatically renew on {this.props.currentStop.toDateString()}
  </Well>
  <Button onClick={this.props.toggleChangeSelected}>Change Your Subscription</Button>
  </Well>
  )
  }
}

export default StripeStatusQSP