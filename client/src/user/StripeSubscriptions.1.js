import React, {Component} from 'react'
import {Modal, Well, FormGroup, ControlLabel, Radio, Panel, Button, ButtonToolbar} from "react-bootstrap"
import {Redirect} from 'react-router-dom'
import {update} from './api-user'
import auth from '../auth/auth-helper'
import {Elements, StripeProvider} from 'react-stripe-elements'
import CheckoutForm from './../stripe/CheckOutForm'
import clientconfig from './../clientconfig/config'
import "./Users.css"

class EditSubscriptions extends Component {
  constructor(props){
    super(props);
  
this.state = {
      show:false,
      expand:false,
      error: '',
      redirectToHome:false,
      upgradeSelected:false,
      purchaseSelected:false,
      changeSelected:false,
      plan:"Quick Size Plus (Yearly)",
      loading:false
    }
  }


clickCancel=()=>{
  this.setState({upgradeSelected:false,purchaseSelected:false,changeSelected:false,expand:false})
}

toggleChangeSelected=()=>{
  this.setState({changeSelected:true})
}

updateServiceLevel = () => {
    let jwt = auth.isAuthenticated()
//    let today = new Date()
//    let expiration = today.setDate(today.getDate() + 365)
//    expiration = new Date(expiration).toISOString() 
    const user = {
      service_level:this.props.user.service_level
    }
    update({
      userId: this.props.user._id
    }, {
      t: jwt.token
    }, user).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({show: true})
        console.log(data)
        if(data.status==="active"||data.status==="trialing") auth.storeFKSObject({qsp:{status:"valid"}},data.admin)
      }
    })
  }

clickApplyChanges=()=>{
  console.log("this is where we would change subscription")
  console.log("we would change to:")
  console.log(this.props.user.service_level)
  this.props.updateSubscriptionData()
  this.updateServiceLevel()

}

completePurchase=()=>{
this.setState({show:true, upgradeSelected:false, purchaseSelected:false, changeSelected:false,})
}

handleClose = () => {
    this.setState({ show: false, expand:false });
//    auth.signout(() => this.setState({redirectToHome:true}))

  }  

purchaseSubscription=()=>{
 this.setState({purchaseSelected:true})
}

selectplan=(e)=>{
 
this.setState({plan:e.target.value})
}

toggleExpand =() =>{
    this.setState({expand:!this.state.expand})
  }

toggleUpgradeSelected =() =>{
//    console.log("hey")
    this.setState({upgradeSelected:!this.state.upgradeSelected})
  }

subscriptionStatus=()=>{
let activeSubscription=false
if(this.props.stripeSubscription.status==='active'||this.props.stripeSubscription.status==='trialing') activeSubscription=true

//let epoch =new Date(1/1/1970)
//let billingAnchor = new Date(this.props.stripeSubscription.billing_cycle_anchor*1000)
//let currentStart = new Date(this.props.stripeSubscription.current_period_start*1000)
let currentStop = new Date (this.props.stripeSubscription.current_period_end*1000)

if(!activeSubscription&&!this.state.upgradeSelected)
return(<Well>You currently have access to the Quick Size calculator, which is free of charge. <p></p> 
  Upgrade to Quick Size Plus for the following additional features:<p></p>
    <ul>
      <li>Additional calculations based on shoulder width and sit bone width</li>
      <li>Cloud storage of sizing data, customer name, contact information, notes and recommendations</li>
      <li>Summary PDF reports for printing or emailing to customers</li>
      <li>Customized bike shop or fitting studio branding</li>
    </ul>
 </Well>)
if(activeSubscription)
return(<Well>You are currently subscribed to Quick Size Plus
  <p></p>Your payment frequency is: {this.props.stripeSubscription.plan.interval==="month"&&"Monthly"}{this.props.stripeSubscription.plan.interval==="year"&&"Yearly"}
  <br/>Your subscription will automatically renew on {currentStop.toDateString()}
  </Well>) 

}

subscriptionActions=()=>{
  let activeSubscription=false
  if(this.props.stripeSubscription.status==='active'||this.props.stripeSubscription.status==='trialing') activeSubscription=true

  if(!activeSubscription&&!this.state.upgradeSelected&&!this.state.purchaseSelected)
  return(<Button onClick={this.toggleUpgradeSelected}>Upgrade to Quick Size Plus</Button>)
  else if (this.state.upgradeSelected&&!this.state.purchaseSelected) return(
  <div>
  <Well>
  <FormGroup>
     <ControlLabel>Select a Payment Frequency</ControlLabel>
     <Radio onChange={this.selectplan} checked={this.state.plan==="Quick Size Plus (Yearly)"} value="Quick Size Plus (Yearly)" name="frequencyGroup">Quick Size Plus (Yearly)</Radio>
     <Radio onChange={this.selectplan} checked={this.state.plan==="Quick Size Plus (Monthly)"} value="Quick Size Plus (Monthly)" name="frequencyGroup">Quick Size Plus (Monthly)</Radio>
     </FormGroup>
    
    </Well> 
  <br/>
  <ButtonToolbar><Button onClick={this.purchaseSubscription}>Purchase Subscription</Button><Button onClick={this.toggleUpgradeSelected}>Cancel</Button></ButtonToolbar>
  </div>
  )
  if(!activeSubscription&&this.state.upgradeSelected&&this.state.purchaseSelected)
  return(
    <StripeProvider apiKey={clientconfig.stripeAPIKey}>
    <div className="example">
      <h1>Purchase Subscription</h1>
      <Elements>
        <CheckoutForm completePurchase={this.completePurchase} user={this.props.user} plan={this.state.plan} />
      </Elements>
    </div>
  </StripeProvider>
  )
  if(activeSubscription&&!this.state.changeSelected)
  return(<Button onClick={this.toggleChangeSelected}>Change Your Subscription</Button>)
  if(this.state.changeSelected)
  return(
    this.changeRadioButtons()
  )
  
  }


changeRadioButtons=()=>{
    return(
    <div className="row">
    <div className="">
     <FormGroup>
       <ControlLabel>Change Subscription Type</ControlLabel>
       {this.props.stripeSubscription.plan.interval==="month"&&
       <Radio onChange={this.props.changeSubscription} value="Quick Size Plus (Yearly)" name="changeSubscriptionGroup">Swicth to a Yearly Subscription ($40 per year--$20 annual savings compared to monthly plan)</Radio>}
       {this.props.stripeSubscription.plan.interval==="year"&&
       <Radio onChange={this.props.changeSubscription} value="Quick Size Plus (Monthly)" name="changeSubscriptionGroup">Swicth to a Monthly Subscription ($5 per month --annual increase of $20 compared to yearly plan)</Radio>}
       <Radio onChange={this.props.changeSubscription} value="Quick Size" name="changeSubscriptionGroup">Quick Size (This will cancel your Quick Size Plus subscription)</Radio>
       </FormGroup>
       </div>
       <Button color="primary" disabled={false} onClick={this.clickApplyChanges} className="">Apply Changes</Button>
       </div>
    )
      }  


radioButtons=()=>{
  return(
  <div className="row">
  <div className="preferencesColumn">
   <FormGroup>
     <ControlLabel>Subscription Type</ControlLabel>
     <Radio onChange={this.props.changeSubscription} checked={this.props.user.service_level==="Quick Size"} value="Quick Size" name="oldsubscriptionGroup">Quick Size</Radio>
     <Radio onChange={this.props.changeSubscription} checked={this.props.user.service_level==="Quick Size Plus (Monthly)"} value="Quick Size Plus (Monthly)" name="oldsubscriptionGroup">Quick Size Plus (Monthly)</Radio>
     <Radio onChange={this.props.changeSubscription} checked={this.props.user.service_level==="Quick Size Plus (Yearly)"} value="Quick Size Plus (Yearly)" name="oldsubscriptionGroup">Quick Size Plus (Yearly)</Radio>
     </FormGroup>
     </div>
     </div>
  )
    }  





  render() {
//    console.log(this.props.stripeSubscription)
    if(this.state.redirectToHome)return(<Redirect to="/signin"/>)
    return (<div className="modal-container">
      <Panel id="editProfile" onToggle={this.toggleExpand} expanded={this.state.expand}>
      <Panel.Heading><Panel.Title>
        <Panel.Toggle href="#" componentClass="a">
        Subscriptions (Stripe Development--John Don't Use this Yet. Use the one above instead.)
        </Panel.Toggle>
        </Panel.Title></Panel.Heading>
      <Panel.Collapse>
        <Panel.Body>
        <Well className="preferencesWell">
     {this.subscriptionStatus()}
     {this.subscriptionActions()}
        </Well>

              </Panel.Body>

      <Panel.Footer>
        <Button color="primary" disabled={false} onClick={this.clickCancel} className="">Cancel</Button>
      </Panel.Footer>

      </Panel.Collapse>
      </Panel>

      <Modal container={this} show={this.state.show} onHide={this.handleClose} >
        <Modal.Header closeButton>
         <Modal.Title>Subscription</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Thank you for subscribing. You may now use Quick Size Plus.</h4>
        </Modal.Body>
        <Modal.Footer>

            <Button bsStyle="primary" onClick={this.handleClose}>
              Ok
            </Button>

        </Modal.Footer>
      </Modal>

  </div>)
  }
}

export default EditSubscriptions
