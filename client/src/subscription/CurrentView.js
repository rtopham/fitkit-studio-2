import React from 'react'
import StripeStatus from './StripeStatus'
import SelectPlan from './SelectPlan'
import SelectNewPlan from './SelectNewPlan'
import StripeElement from './StripeElement'
import UpdatePaymentStripeElement from './UpdatePaymentStripeElement'
import ChangeSubscription from './ChangeSubscription'


const CurrentView=(props)=>{

switch(props.subscriptionView){

case "stripeStatus":
return(<StripeStatus
      user={props.user}
      stripeCustomer={props.stripeCustomer}
      stripeSubscription={props.stripeSubscription}
      stripeCard={props.stripeCard}
      setSubscriptionView={props.setSubscriptionView}
      toggleReactivateSubscription={props.toggleReactivateSubscription}
  />)


case "changePaymentMethod":
return(<UpdatePaymentStripeElement
    completeUpdatePaymentMethod={props.completeUpdatePaymentMethod}
    stripeCustomer={props.stripeCustomer}
    user={props.user}
//    plan={this.state.plan}
    />)

case 'newCustomer':
 return(<SelectPlan
  plan={props.plan}
  selectPlan={props.selectPlan}
  setSubscriptionView={props.setSubscriptionView}/>)


case 'existingCustomer':
 return(<SelectNewPlan
  plan={props.plan}
//  newPlan={props.newPlan}
  selectPlan={props.selectPlan}
//  purchaseSubscription={props.purchaseSubscription}
  setSubscriptionView={props.setSubscriptionView}/>)

case 'purchaseSelected':
 return(<StripeElement
  completePurchase={props.completePurchase}
  user={props.user}
  plan={props.plan}
  trial={true}/>)

case 'purchaseSelected-existingCustomer':
 return(<StripeElement
  completePurchase={props.completePurchase}
  user={props.user}
  plan={props.plan}
  trial={false}/>)

case 'changeSubscription':
return(<ChangeSubscription
      changeSubscription={props.changeSubscription}
      stripeSubscription={props.stripeSubscription}
      newPlan={props.newPlan}
      clickApplyChanges={props.clickApplyChanges}/>)

default: return null

}

  
}


export default CurrentView
