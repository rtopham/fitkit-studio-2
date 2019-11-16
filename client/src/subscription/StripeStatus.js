import React from 'react'
import {Well} from 'react-bootstrap'
import StripeStatusMessage from './StripeStatusMessage'

const StripeStatus=(props)=>{

let subscriptionStatus='none'
if(props.stripeSubscription.status==='active') subscriptionStatus='active'
if(props.stripeSubscription.status==='trialing') subscriptionStatus='trialing'
if(props.stripeSubscription.status==='canceled') subscriptionStatus='canceled'
if(props.stripeSubscription.status==='active'&&props.stripeSubscription.cancel_at_period_end) subscriptionStatus='active and cancelation pending'
if(props.stripeSubscription.status==='trialing'&&props.stripeSubscription.cancel_at_period_end) subscriptionStatus='trialing and cancelation pending'

let currentStop = new Date (props.stripeSubscription.current_period_end*1000)
let canceledAt=null

if(props.stripeSubscription.canceled_at!==null) canceledAt= new Date (props.stripeSubscription.canceled_at*1000)

return(<Well>
          <StripeStatusMessage
           status={subscriptionStatus}
           currentStop={currentStop}
           canceledAt={canceledAt}
           stripeSubscription={props.stripeSubscription}
           stripeCustomer={props.stripeCustomer}
           stripeCard={props.stripeCard}
           setSubscriptionView={props.setSubscriptionView}
           toggleReactivateSubscription={props.toggleReactivateSubscription}/>
        </Well>)
  }

export default StripeStatus