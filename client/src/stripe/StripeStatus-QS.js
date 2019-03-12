import React, {Component} from 'react';
import {Well, Button} from "react-bootstrap"

class StripeStatusQS extends Component {

render() {

return(
<Well>
<Well>You currently have access to the Quick Size calculator, which is free of charge. <p></p> 
  Upgrade to Quick Size Plus for the following additional features:<p></p>
    <ul>
      <li>Additional calculations based on shoulder width and sit bone width</li>
      <li>Cloud storage of sizing data, customer name, contact information, notes and recommendations</li>
      <li>Summary PDF reports for printing or emailing to customers <a href="/FKS_Sample.pdf">(Sample Custom PDF Report)</a></li>
      <li>Customized bike shop or fitting studio branding</li>
    </ul>
    </Well>
    <Button id="new customer" onClick={this.props.toggleUpgradeSelected}>Upgrade to Quick Size Plus</Button>
 </Well>
 
)
}
}

export default StripeStatusQS