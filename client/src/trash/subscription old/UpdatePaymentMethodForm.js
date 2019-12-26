import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements'
import {Button,Well} from 'react-bootstrap'
import auth from './../auth/auth-helper'
import {updateStripeCustomer} from './api-stripe'
import './Stripe.css'


class UpdatePaymentMethodForm extends Component {
  constructor(props) {
    super(props);
    this.state={
      error:'',
      disableSubmit:true
    }
    this.submit = this.submit.bind(this);
  }

async submit(ev){

  let {token} = await this.props.stripe.createToken({name: this.props.user.name});
  if(token){

    this.setState({error:''})
    this.transmitTokenExistingCustomer(token)
  }
  else this.setState({error:"Invalid Credit Card Data"})
}

transmitTokenExistingCustomer=(token)=>{
  let jwt=auth.isAuthenticated()
  updateStripeCustomer({userId: this.props.user._id}, {t: jwt.token}, token)
  .then((data) => {
     if (data.error) this.setState({error: data.error, disableSubmit:true})
     else this.props.completeUpdatePaymentMethod(data)
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
        <p>Please enter a new payment method.</p>
        <Well>
        <CardElement onChange={this.validateForm} className="cardElement"/>
        </Well>
        <div className="buttonErrorBox">
        <div className="buttonDiv">
        <Button id="stripeButton" disabled={this.state.disableSubmit} className="stripeButton" onClick={this.submit}>Update Payment Method</Button></div>
        <div className="errorMessage">{this.state.error}</div>
        </div>
      </div>
    );
  }
}

export default injectStripe(UpdatePaymentMethodForm);