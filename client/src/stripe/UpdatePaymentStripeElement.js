import React, {Component} from 'react';
import {Well} from "react-bootstrap"
import {Elements, StripeProvider} from 'react-stripe-elements'
import clientconfig from '../clientconfig/config'
import UpdatePaymentMethodForm from './UpdatePaymentMethodForm'

class UpdatePaymentStripeElement extends Component {

render() {
return (
  <Well>
  <StripeProvider apiKey={clientconfig.stripeAPIKey}>
  <div className="example">
    <h2>Update Payment Method</h2>
    <Elements>
      <UpdatePaymentMethodForm completeUpdatePaymentMethod={this.props.completeUpdatePaymentMethod} user={this.props.user}/>
    </Elements>
  </div>
</StripeProvider>
</Well>
)
}
}

export default UpdatePaymentStripeElement