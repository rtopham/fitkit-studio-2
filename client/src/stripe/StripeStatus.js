import React, {Component} from 'react';
import StripeStatusQS from './StripeStatus-QS'
import StripeStatusCanceled from './StripeStatus-Canceled'
import StripeStatusQSP from './StripeStatus-QSP'
import StripeStatusTrialing from './StripeStatusTrialing'
import StripeStatusCancelationPending from './StripeStatus-Cancelation-Pending'
import StripeStatusTrialingCancelationPending from './StripeStatus-Trialing-Cancelation-Pending'

class StripeStatus extends Component {

render() {
//console.log('getting here')
let subscriptionStatus='none'
if(this.props.stripeSubscription.status==='active') subscriptionStatus='active'
if(this.props.stripeSubscription.status==='trialing') subscriptionStatus='trialing'
if(this.props.stripeSubscription.status==='canceled') subscriptionStatus='canceled'
if(this.props.stripeSubscription.status==='active'&&this.props.stripeSubscription.cancel_at_period_end) subscriptionStatus='active and cancelation pending'
if(this.props.stripeSubscription.status==='trialing'&&this.props.stripeSubscription.cancel_at_period_end) subscriptionStatus='trialing and cancelation pending'
//console.log(subscriptionStatus)
let currentStop = new Date (this.props.stripeSubscription.current_period_end*1000)
let canceledAt=null
if(this.props.stripeSubscription.canceled_at!==null) canceledAt= new Date (this.props.stripeSubscription.canceled_at*1000)

if(subscriptionStatus==='none') return(<StripeStatusQS toggleUpgradeSelected={this.props.toggleUpgradeSelected}/>)
if(subscriptionStatus==='active and cancelation pending') return(<StripeStatusCancelationPending stripeSubscription={this.props.stripeSubscription} currentStop={currentStop} toggleReactivateSubscription={this.props.toggleReactivateSubscription}/>)
if(subscriptionStatus==='active') return(<StripeStatusQSP toggleChangePaymentMethod={this.props.toggleChangePaymentMethod} toggleChangeSelected={this.props.toggleChangeSelected} 
  user={this.props.user} stripeCustomer={this.props.stripeCustomer} stripeSubscription={this.props.stripeSubscription} currentStop={currentStop}/>)
if(subscriptionStatus==='trialing') return(<StripeStatusTrialing toggleChangePaymentMethod={this.props.toggleChangePaymentMethod} toggleChangeSelected={this.props.toggleChangeSelected} 
    user={this.props.user} stripeCustomer={this.props.stripeCustomer} stripeSubscription={this.props.stripeSubscription} currentStop={currentStop}/>)  
if(subscriptionStatus==='canceled') return(<StripeStatusCanceled stripeSubscription={this.props.stripeSubscription} toggleUpgradeSelected={this.props.toggleUpgradeSelected} canceledAt={canceledAt}/>)
//if(subscriptionStatus==='trialing and cancelation pending') return(<StripeStatusCanceled stripeSubscription={this.props.stripeSubscription} toggleUpgradeSelected={this.props.toggleUpgradeSelected} canceledAt={canceledAt}/>)
//if(subscriptionStatus==='trialing and cancelation pending') return(<StripeStatusTrialing toggleChangePaymentMethod={this.props.toggleChangePaymentMethod} toggleChangeSelected={this.props.toggleChangeSelected} 
//  user={this.props.user} stripeCustomer={this.props.stripeCustomer} stripeSubscription={this.props.stripeSubscription} currentStop={currentStop}/>)
if(subscriptionStatus==='trialing and cancelation pending') return(<StripeStatusTrialingCancelationPending stripeSubscription={this.props.stripeSubscription} currentStop={currentStop} toggleReactivateSubscription={this.props.toggleReactivateSubscription}/>)
  }
}

export default StripeStatus