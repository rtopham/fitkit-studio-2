import React from 'react';
import {Well, Radio, FormGroup, ControlLabel, Button} from "react-bootstrap"

const ChangeSubscription=(props)=> {

return( 
  <Well>
    <Well>
   <FormGroup>
     <ControlLabel>Change Subscription Type</ControlLabel>
     {props.stripeSubscription.plan.interval==="month"&&
     <Radio onChange={props.changeSubscription} value="Quick Fit (Yearly)" name="changeSubscriptionGroup">Upgrade to a yearly plan ($100 per year--$20 annual savings compared to monthly plan)</Radio>}
     {props.stripeSubscription.plan.interval==="year"&&
     <Radio onChange={props.changeSubscription} value="Quick Fit (Monthly)" name="changeSubscriptionGroup">Downgrade to a monthly plan ($10 per month --annual increase of $20 compared to yearly plan)</Radio>}
     <Radio onChange={props.changeSubscription} value="Quick Size" name="changeSubscriptionGroup">Downgrade to the free plan (This will cancel your Quick Fit subscription at the end of the current billing period.)</Radio>
     Changes will take effect on {new Date (props.stripeSubscription.current_period_end*1000).toDateString()}.
     </FormGroup>
  </Well>
     <Button disabled={props.newPlan==='none'} color="primary" onClick={props.clickApplyChanges} className="">Apply Changes</Button>
  </Well>     
)
}

export default ChangeSubscription