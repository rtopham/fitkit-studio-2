import React from 'react';
import {Button} from 'react-bootstrap'

const PaymentMethod=(props)=> {

  return(<span>Billing info: Credit card ending in: <strong> {props.stripeCard.last4}</strong>
  <Button value="changePaymentMethod" bsStyle ="link" onClick={props.setSubscriptionView}>Update</Button>
   </span>
  )

}

export default PaymentMethod