import React from 'react';
import {Well, Radio, FormGroup, ControlLabel, Button} from "react-bootstrap"

const SelectNewPlan=(props)=>{

return( 
<Well>
  <Well>
<FormGroup>
   <ControlLabel>Select a New Plan</ControlLabel>
   <Radio onChange={props.selectPlan} checked={props.plan==="Quick Fit (Yearly)"} value="Quick Fit (Yearly)" name="frequencyGroup">Quick Fit (Yearly) $100 per year ($20 annual savings over monthly plan)</Radio>
   <Radio onChange={props.selectPlan} checked={props.plan==="Quick Fit (Monthly)"} value="Quick Fit (Monthly)" name="frequencyGroup">Quick Fit (Monthly) $10 per month</Radio>
   </FormGroup>
   </Well> 
<br/>
<Button value="purchaseSelected-existingCustomer" onClick={props.setSubscriptionView}>Purchase New Subscription</Button>
</Well>
)
}

export default SelectNewPlan