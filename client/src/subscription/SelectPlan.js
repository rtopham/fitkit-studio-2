import React from 'react';
import {Well, Radio, FormGroup, ControlLabel, Button} from "react-bootstrap"
import clientconfig from './../clientconfig/config'

const SelectPlan=(props)=>{

return( 
<Well>
  <Well>
<FormGroup>
   <ControlLabel>Select a Plan</ControlLabel>
   <Radio onChange={props.selectPlan} checked={props.plan==="Quick Fit (Yearly)"} value="Quick Fit (Yearly)" name="frequencyGroup">Quick Fit Annual Subscription: {clientconfig.annualSubscriptionPrice} per year.</Radio>
{/*    <Radio onChange={props.selectPlan} checked={props.plan==="Quick Fit (Monthly)"} value="Quick Fit (Monthly)" name="frequencyGroup">Quick Fit (Monthly) $10 per month</Radio> */}
   </FormGroup>
  You will not be charged until your {clientconfig.trialPeriod} day trial period ends. You may cancel at any time.
  </Well> 
<br/>
<Button value="purchaseSelected" onClick={props.setSubscriptionView}>Start Free Trial</Button>
</Well>

)
}

export default SelectPlan