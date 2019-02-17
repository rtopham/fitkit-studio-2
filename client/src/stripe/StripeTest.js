import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements'
import InjectedCheckoutForm from './../stripe/CheckOutForm'

class StripeTest extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    let {token} = await this.props.stripe.createToken({name: "Name"});
  let response = await fetch("/charge", {
    method: "POST",
    headers: {"Content-Type": "text/plain"},
    body: token.id
  });

  if (response.ok) console.log("Purchase Complete!")
  }

  render() {
    return (
      <div>
        <br/>
        <br/>      <br/>      <br/>      <br/>      <br/>
      <StripeProvider apiKey="pk_test_0vcUzhimBNZs7qlLw3W6pAdI">
      <div className="example">
        <h1>React Stripe Elements Example</h1>
        <Elements>
          <InjectedCheckoutForm autocomplete="off"/>
        </Elements>
      </div>
    </StripeProvider>
    </div>
    );
  }
}

export default StripeTest