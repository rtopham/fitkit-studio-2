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
     <Radio onChange={this.props.changeSubscription} value="Quick Size Plus (Yearly)" name="changeSubscriptionGroup">Upgrade to a yearly plan ($40 per year--$20 annual savings compared to monthly plan)</Radio>}
     {this.props.stripeSubscription.plan.interval==="year"&&
     <Radio onChange={this.props.changeSubscription} value="Quick Size Plus (Monthly)" name="changeSubscriptionGroup">Downgrade to a monthly plan ($5 per month --annual increase of $20 compared to yearly plan)</Radio>}
     <Radio onChange={this.props.changeSubscription} value="Quick Size" name="changeSubscriptionGroup">Downgrade to the free plan (This will cancel your Quick Size Plus subscription at the end of the current billing period.)</Radio>
     Changes will take effect on {new Date (this.props.stripeSubscription.current_period_end*1000).toDateString()}.
     </FormGroup>
  </Well>
     <Button disabled={!this.props.newPlanSelected} color="primary" onClick={this.props.clickApplyChanges} className="">Apply Changes</Button>
  </Well>     


)
}
}

export default ChangeSubscription