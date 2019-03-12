import React, {Component} from 'react';
import {Well} from "react-bootstrap"
import {Elements, StripeProvider} from 'react-stripe-elements'
import clientconfig from '../clientconfig/config'
import CheckoutForm from './CheckOutForm'

class StripeElement extends Component {

render() {
return (
  <Well>
  <StripeProvider apiKey={clientconfig.stripeAPIKey}>
  <div className="example">
    <h2>Purchase Subscription</h2>
    Service Level: Quick Size Plus
    <br/>
    Billing Frequency: {this.props.plan==="Quick Size Plus (Yearly)"&&"Yearly"} {this.props.plan==="Quick Size Plus (Monthly)"&&"Monthly"}
    <br/>
    Amount: {this.props.plan==="Quick Size Plus (Yearly)"&&"USD $40.00"} {this.props.plan==="Quick Size Plus (Monthly)"&&"USD $5.00"}
    <br/>
    <br/>
    {this.props.plan==="Quick Size Plus (Yearly)"&&"Your initial charge will be USD $40.00 and your subscription will automatically renew annually unless canceled."}
    {this.props.plan==="Quick Size Plus (Monthly)"&&"Your initial charge will be USD $5.00 and your subscription will automatically renew monthly unless canceled."}
    <Elements>
      <CheckoutForm completePurchase={this.props.completePurchase} existingCustomer={this.props.existingCustomer} user={this.props.user} plan={this.props.plan} />
    </Elements>
  </div>
</StripeProvider>
</Well>
)
}
}

export default StripeElement