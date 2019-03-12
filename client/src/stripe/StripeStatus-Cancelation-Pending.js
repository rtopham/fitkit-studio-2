import React, {Component} from 'react';
import {Well, Button} from "react-bootstrap"

class StripeStatusCancelationPending extends Component {

render() {

return(<Well>
  <Well>You are currently subscribed to Quick Size Plus
  <p></p><span className="glyphicon glyphicon-exclamation-sign"></span> You previously canceled your subscription.
  <br/> Your subscription will be canceled automatically at the end of the current billing period on {this.props.currentStop.toDateString()}
  <br/> You may reactivate your subscription at any time prior to cancelation.
  </Well>
  <Button onClick={this.props.toggleReactivateSubscription}>Reactivate Your Subscription</Button>
  </Well>
  )
  }
}

export default StripeStatusCancelationPending