import React from 'react';
import {Well} from "react-bootstrap"
import {Elements, StripeProvider} from 'react-stripe-elements'
import clientconfig from '../clientconfig/config'
import UpdatePaymentMethodForm from './UpdatePaymentMethodForm'

const UpdatePaymentStripeElement=(props)=> {

return (
  <Well>
  <StripeProvider apiKey={clientconfig.stripeAPIKey}>
  <div className="example">
    <h2>Update Payment Method</h2>
    <Elements>
      <UpdatePaymentMethodForm completeUpdatePaymentMethod={props.completeUpdatePaymentMethod} user={props.user}/>
    </Elements>
  </div>
</StripeProvider>
</Well>
)
}

export default UpdatePaymentStripeElement