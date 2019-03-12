import React, {Component} from 'react';
import {Well, Radio, FormGroup, ControlLabel, Button} from "react-bootstrap"


class ChangeSubscription extends Component {

render() {
return( 

  
  <Well>
    <Well>
   <FormGroup>
     <ControlLabel>Change Subscription Type</ControlLabel>
     {this.props.stripeSubscription.plan.interval==="month"&&
     <Radio onChange={this.props.changeSubscription} value="Quick Size Plus (Yearly)" name="changeSubscriptionGroup">Swicth to a Yearly Subscription ($40 per year--$20 annual savings compared to monthly plan)</Radio>}
     {this.props.stripeSubscription.plan.interval==="year"&&
     <Radio onChange={this.props.changeSubscription} value="Quick Size Plus (Monthly)" name="changeSubscriptionGroup">Swicth to a Monthly Subscription ($5 per month --annual increase of $20 compared to yearly plan)</Radio>}
     <Radio onChange={this.props.changeSubscription} value="Quick Size" name="changeSubscriptionGroup">Quick Size (This will cancel your Quick Size Plus subscription at the end of the current billing period.)</Radio>
     </FormGroup>
  </Well>
     <Button disabled={!this.props.newPlanSelected} color="primary" onClick={this.props.clickApplyChanges} className="">Apply Changes</Button>
  </Well>     


)
}
}

export default ChangeSubscription