import React, {Component} from 'react';
import {Well, Radio, FormGroup, ControlLabel, Button} from "react-bootstrap"


class SelectPlan extends Component {

render() {
return( 

<Well>
  <Well>
<FormGroup>
   <ControlLabel>Select a Plan</ControlLabel>
   <Radio onChange={this.props.selectPlan} checked={this.props.plan==="Quick Size Plus (Yearly)"} value="Quick Size Plus (Yearly)" name="frequencyGroup">Quick Size Plus (Yearly) $100 per year ($20 annual savings over monthly plan)</Radio>
   <Radio onChange={this.props.selectPlan} checked={this.props.plan==="Quick Size Plus (Monthly)"} value="Quick Size Plus (Monthly)" name="frequencyGroup">Quick Size Plus (Monthly) $10 per month</Radio>
   </FormGroup>
  You will not be charged until your 30 day trial period ends. You may cancel at any time.
  </Well> 
<br/>
<Button onClick={this.props.purchaseSubscription}>Start Free Trial</Button>
</Well>

)
}
}

export default SelectPlan