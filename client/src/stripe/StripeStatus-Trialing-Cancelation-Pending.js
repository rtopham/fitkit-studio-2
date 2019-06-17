import React, {Component} from 'react';
import {Well, Button} from "react-bootstrap"

class StripeStatusTrialingCancelationPending extends Component {

render() {

return(<Well>
  <Well>You are currently subscribed to Quick Size Plus and your 30-day trial is active.
  <p></p><span className="glyphicon glyphicon-exclamation-sign"></span> However, you previously canceled your subscription.
  <br/> Your subscription will be canceled automatically at the end of the trial period on {this.props.currentStop.toDateString()}
  <br/> You may reactivate your subscription at any time prior to cancelation.
  </Well>
  <Button onClick={this.props.toggleReactivateSubscription}>Reactivate Your Subscription</Button>
  </Well>
  )
  }
}

export default StripeStatusTrialingCancelationPending