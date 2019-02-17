import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements'
import {Button,Well} from 'react-bootstrap'
import auth from './../auth/auth-helper'
import {charge, createStripeCustomer, update, createStripeSubscription} from './../user/api-user'
//import {refreshToken} from './../auth/api-auth'
import './Stripe.css'

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

//Note the following implements a one-time charge. Not used in Fit Kit for subscriptions.

async chargeSubmit(ev) {
  let jwt=auth.isAuthenticated()
  let {token} = await this.props.stripe.createToken({name: "Name"});
  charge({
    userId: this.props.user._id
  }, {
    t: jwt.token
  }, token).then((data) => {
    if (data.error) {
      this.setState({error: data.error})
    } else {
    }
  })
  }

//the following is used in Fit Kit to bill for subscriptions.

async submit(ev) {
  let jwt=auth.isAuthenticated()
  let {token} = await this.props.stripe.createToken({name: "Name"});
  let updatedUser={}

  createStripeCustomer({userId: this.props.user._id}, {t: jwt.token}, token)
  .then((data) => {
          if (data.error) {
          this.setState({error: data.error})
          } 
          else {
            console.log("Inside First Then")
            console.log(data)
            return data
          }
        })
  .then((data)=>{
    console.log("Inside Second Then")
    console.log(data)
    let today = new Date()
    let expiration = today.setDate(today.getDate() + 365)
    expiration = new Date(expiration).toISOString() 
    const user = {stripe_customer_id: data.id, subscription_status: {service_level:this.props.plan,expiration: expiration}}
    return update({userId: this.props.user._id}, {t: jwt.token}, user)
          .then((modifideUser)=>{
            console.log("Inside udate Then")
            console.log(modifideUser)
            updatedUser=modifideUser
          })
          
    })
    .then(()=>{
      console.log("Inside Third Then")
      return createStripeSubscription({userId: this.props.user._id}, {t: jwt.token}, this.props.plan)
      .then((subscriptionData) => {
            console.log("Inside Subscription Then")
            console.log(subscriptionData)
            return(subscriptionData)
      })
    })
    .then((subscriptionData)=>{
      console.log("Inside Fourth Then")
      const user = {stripe_subscription_id: subscriptionData.id}
      return update({userId: this.props.user._id}, {t: jwt.token}, user)
            .then((modifideUser)=>{
              console.log("Inside second udate Then")
              console.log(modifideUser)
              updatedUser=modifideUser
              this.props.completePurchase()
            })
            
      })    
/*    .then(()=>{
      console.log("Inside Fifth Then")
      return refreshToken(updatedUser)
      .then((refreshData) => {
            console.log("Inside Refresh Then")
            console.log(refreshData)
            auth.signout(() =>{
              auth.authenticate(refreshData, () => {
              //                    const logData={userId:this.props.user._id,action: "subscription created", description: "User "+this.props.user.name+" created a subscription."}
              //                    recordLogAction(logData)
              console.log("just reset jwt")
                })
              })
      })
    })*/


}


  render() {
    return (
      <div className="checkout">
        <p>Please enter a payment method to complete the purchase.</p>
        <Well>
        <CardElement className="cardElement"/>
        </Well>

        <Button className="stripeButton" onClick={this.submit}>Complete Purchase</Button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);