import React from 'react';
import {Well} from "react-bootstrap"
import {Elements, StripeProvider} from 'react-stripe-elements'
import clientconfig from '../clientconfig/config'
import CheckoutForm from './CheckOutForm'

const StripeElement=(props)=>{

return (
  <Well>
  <StripeProvider apiKey={clientconfig.stripeAPIKey}>
  <div className="example">
    <h2>Activate Subscription</h2>
    Service Level: Quick Fit
    <br/>
    Billing Frequency: {props.plan==="Quick Fit (Yearly)"&&"Yearly"} {props.plan==="Quick Fit (Monthly)"&&"Monthly"}
    <br/>
    Amount: {props.plan==="Quick Fit (Yearly)"&&"USD "+clientconfig.annualSubscriptionPrice} {props.plan==="Quick Fit (Monthly)"&&"USD $10.00"}
    <br/>
    <br/>
    {props.plan==="Quick Fit (Yearly)"&&props.trial&&"After your free trial period, your initial charge will be USD "+clientconfig.annualSubscriptionPrice+". and your subscription will automatically renew annually unless canceled."}
    {props.plan==="Quick Fit (Monthly)"&&props.trial&&"After your free trial period, your initial charge will be USD $10.00 and your subscription will automatically renew monthly unless canceled."}
    {props.plan==="Quick Fit (Yearly)"&&!props.trial&&"Your initial charge will be USD "+clientconfig.annualSubscriptionPrice+". and your subscription will automatically renew annually unless canceled."}
    {props.plan==="Quick Fit (Monthly)"&&!props.trial&&"Your initial charge will be USD $10.00 and your subscription will automatically renew monthly unless canceled."}
    <br/>You may cancel at any time. {props.trial&&"If you cancel your subscription before the end of your free trial period, you will not be charged."}
    <Elements>
      <CheckoutForm completePurchase={props.completePurchase} user={props.user} plan={props.plan} trial={props.trial} />
    </Elements>
  </div>
</StripeProvider>
</Well>
)
}

export default StripeElement