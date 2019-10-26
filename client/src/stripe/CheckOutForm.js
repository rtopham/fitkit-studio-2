import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements'
import {Button,Well} from 'react-bootstrap'
import auth from './../auth/auth-helper'
import {update} from './../user/api-user'
import {createStripeCustomer, updateStripeCustomer, createStripeSubscription} from './api-stripe'
import './Stripe.css'


class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state={
      error:'',
      disableSubmit:true
    }
    this.submit = this.submit.bind(this);
  }

async submit(ev){
//  console.log(this.props.stripe)
  let {token} = await this.props.stripe.createToken({name: this.props.user.name});
  if(token){

    this.setState({error:''})
    if(!this.props.user.stripe_customer_id) this.transmitTokenNewCustomer(token)
    else this.transmitTokenExistingCustomer(token)
  }
  else this.setState({error:"Invalid Credit Card Data"})
}

transmitTokenNewCustomer=(token)=>{
let jwt=auth.isAuthenticated()
createStripeCustomer({userId: this.props.user._id}, {t: jwt.token}, token)
.then((data)=>{
//    console.log(data)
    if(data.error) this.setState({error: data.error, disableSubmit:true})
    else this.saveStripeCustomerIdAndPlan(data,jwt,false)
  })
.catch((reason)=>{this.setState({error:reason})})

}

transmitTokenExistingCustomer=(token)=>{
  let jwt=auth.isAuthenticated()
  updateStripeCustomer({userId: this.props.user._id}, {t: jwt.token}, token)
  .then((data) => {
     if (data.error) this.setState({error: data.error, disableSubmit:true})
     else this.saveStripeCustomerIdAndPlan(data,jwt,true)
        })
  .catch((reason)=>{this.setState({error:reason})})
}

saveStripeCustomerIdAndPlan=(stripeCustomer,jwt,existingCustomer)=>{
let user
if(existingCustomer) user={service_level:this.props.plan}
else user =  {stripe_customer_id: stripeCustomer.id, service_level:this.props.plan}
update({userId: this.props.user._id}, {t: jwt.token}, user)
.then((data)=>{
  if(data.error) this.setState({error: data.error}) 
  else this.addStripeSubscription(data,jwt)
})
.catch((reason)=>{this.setState({error:reason})})
}

addStripeSubscription=(user,jwt)=>{

  createStripeSubscription({userId: this.props.user._id}, {t: jwt.token}, this.props.plan)
  .then((data) => {
    if(data.error) this.setState({error: data.error}) 
    else this.saveStripeSubscriptionId(data,jwt)
  })  
  .catch((reason)=>{this.setState({error:reason})}) 
}

saveStripeSubscriptionId=(stripeSubscription,jwt)=>{

  const user = {stripe_subscription_id: stripeSubscription.id}
  update({userId: this.props.user._id}, {t: jwt.token}, user)
        .then((data)=>{
          auth.storeFKSObject({qsp:{status:"valid"}},data.admin)
          this.props.completePurchase()
        }) 
  .catch((reason)=>{this.setState({error:reason})}) 
}


validateForm=(ev)=>{
  if(!ev.error) this.setState({error:''})
  if(ev.error) this.setState({error:ev.error.message,disableSubmit:true})
  if(ev.complete===true) this.setState({error: '',disableSubmit:false})
}


  render() {
    return (
      <div className="checkout">
        <p>Please enter a payment method to complete the purchase.</p>
        <Well>
        <CardElement onChange={this.validateForm} className="cardElement"/>
        </Well>
        <div className="buttonErrorBox">
        <div className="buttonDiv">
        <Button id="stripeButton" disabled={this.state.disableSubmit} className="stripeButton" onClick={this.submit}>Activate Subscription</Button></div>
        <div className="errorMessage">{this.state.error}</div>
        </div>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);