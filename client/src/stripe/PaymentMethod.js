import React, {Component} from 'react';
import auth from './../auth/auth-helper'
import {readStripeCard} from './../stripe/api-stripe'

class PaymentMethod extends Component {
  state={
    stripeCard:{last4:'****'}
  }


componentDidMount=()=>{
  
}

componentDidUpdate=(prevProps)=>{
//  console.log(this.props.stripeCustomer.default_source)
  if(this.state.stripeCard.last4==='****'||this.props.stripeCustomer.default_source !==prevProps.stripeCustomer.default_source) this.loadCardData(this.props.user._id)
}


loadCardData=(userId)=>{
  let jwt = auth.isAuthenticated()
  readStripeCard({
    userId: userId,
    sourceId: this.props.stripeCustomer.default_source
  }, {t: jwt.token}).then((data) => {
    if (data.error) {
      this.setState({error:data.error})

    } else {
//      console.log(data)
      this.setState({stripeCard: data})

    }
  })
}


render() {
  if(!this.props.stripeCustomer.default_source) return null
  return(<span>Billing info: Credit card ending in: <strong> {this.state.stripeCard.last4}</strong> </span>)

}
}

export default PaymentMethod