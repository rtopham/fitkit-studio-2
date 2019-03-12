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
    console.log(token)
    this.setState({error:''})
    if(!this.props.user.stripe_customer_id) this.transmitTokenNewCustomer(token)
    else this.transmitTokenExistingCustomer(token)
  }
  else this.setState({error:"Invalid Credit Card Data"})
}

transmitTokenNewCustomer(token) {
  let jwt=auth.isAuthenticated()

  let updatedUser={}

  createStripeCustomer({userId: this.props.user._id}, {t: jwt.token}, token)
  .then((data) => {
    console.log(data)
          if (data.error) {
          this.setState({error: data.error})
          return data
          } 
          else {
            return data
          }
        })
  .then((data)=>{
    if(!data.error){
    const user = {stripe_customer_id: data.id, service_level:this.props.plan}
    return update({userId: this.props.user._id}, {t: jwt.token}, user)
          .then((modifideUser)=>{
            updatedUser=modifideUser
          })
        }
        return data
    })
    .then((data)=>{
      if(!data.error){
      return createStripeSubscription({userId: this.props.user._id}, {t: jwt.token}, this.props.plan)
      .then((subscriptionData) => {
            return(subscriptionData)
      })
    }
    return data
    })
    .then((subscriptionData)=>{
      if(!subscriptionData.error){
      const user = {stripe_subscription_id: subscriptionData.id}
      return update({userId: this.props.user._id}, {t: jwt.token}, user)
            .then((modifideUser)=>{
              updatedUser=modifideUser
              auth.storeFKSObject({qsp:{status:"valid"}},updatedUser.admin)
              this.props.completePurchase()
            })
          }
      }).catch((error)=>{console.log(error)})    

}

transmitTokenExistingCustomer(token) {
  let jwt=auth.isAuthenticated()
  let updatedUser={}

  updateStripeCustomer({userId: this.props.user._id}, {t: jwt.token}, token)
  .then((data) => {
          if (data.error) {
          this.setState({error: data.error})
          } 
          else {
            return data
          }
        })
  .then((data)=>{
    const user = {service_level:this.props.plan}
    return update({userId: this.props.user._id}, {t: jwt.token}, user)
          .then((modifideUser)=>{
            updatedUser=modifideUser
          })
          
    })
    .then(()=>{
      return createStripeSubscription({userId: this.props.user._id}, {t: jwt.token}, this.props.plan)
      .then((subscriptionData) => {
            return(subscriptionData)
      })
    })
    .then((subscriptionData)=>{
      const user = {stripe_subscription_id: subscriptionData.id}
      return update({userId: this.props.user._id}, {t: jwt.token}, user)
            .then((modifideUser)=>{
              updatedUser=modifideUser
              auth.storeFKSObject({qsp:{status:"valid"}},updatedUser.admin)
              this.props.completePurchase()
            })
            
      })    

}

validateForm=(ev)=>{

  if(ev.error) this.setState({error:ev.error.message,disableSubmit:true})
  if(ev.complete===true) this.setState({error: '',disableSubmit:false})
}


  render() {
//if(this.props.user.stripe_customer_id) console.log ("This is an existing Customer")
//else console.log("This is a new customer")
    return (
      <div className="checkout">
        <p>Please enter a payment method to complete the purchase.</p>
        <Well>
        <CardElement onChange={this.validateForm} className="cardElement"/>
        </Well>

        <Button disabled={this.state.disableSubmit} className="stripeButton" onClick={this.submit}>Complete Purchase</Button> <span className="errorMessage">{this.state.error}</span>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);