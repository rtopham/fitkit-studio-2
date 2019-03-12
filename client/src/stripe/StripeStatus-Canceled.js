import React, {Component} from 'react';
import {Well, Button} from "react-bootstrap"

class StripeStatusCanceled extends Component {


render() {

return(
<Well>
<Well>Your subscription to Quick Size Plus was canceled on {this.props.canceledAt.toDateString()} and is no longer active.<br/> But don't worry, all of your data is saved.<br/> To use Quick Size Plus again and restore access to your data, please purchase a new subscription.
</Well>
    <Button id="existing customer" onClick={this.props.toggleUpgradeSelected}>Purchase New Subscription</Button>
 </Well>
 
)
}
}

export default StripeStatusCanceled