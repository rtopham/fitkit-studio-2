import React, {Component} from 'react'
import {Panel, Button} from "react-bootstrap"
import {update} from './../user/api-user'
import auth from '../auth/auth-helper'
import CurrentView from './CurrentView'
import SubscriptionsModal from './SubscriptionsModal'
import ConfirmChangesModal from './ConfirmChangesModal'

class ManageSubscriptions extends Component {
state = {
      show:false,
      showConfirmationModal: false,
      confirmationModalProps: {title:"Confirm Changes", message: "Do you want to make these changes?", callBack:()=>{return null}},
      modalProps:{title:"Success",message: "Thank you for subscribing. You may now use Quick Fit."},
      expand:false,
      error: '',
      redirectToHome:false,
      plan:"Quick Fit (Yearly)",
      newPlan:'none',
      subscriptionView:'stripeStatus',
      reload:false
    }

//Panel Functions

setSubscriptionView = event => {
          this.setState({
            subscriptionView:event.target.value
          })
        }

clickCancel=()=>{
  this.setState({subscriptionView:'stripeStatus', newPlan:'none', plan:"Quick Fit (Yearly)", expand:false})  
}

toggleExpand =() =>{
  this.setState({expand:!this.state.expand})
}

//Modal Functions

handleClose = () => {
//  this.setState({ show: false, changeSelected:false, changePaymentMethod:false, expand:false });
if(this.state.reload) this.props.reloadStripeData(this.props.user._id)
this.setState({show:false, reload:false, expand: false, subscriptionView:'stripeStatus'})
}

handleCloseConfirmationModal=()=>{
  this.setState({showConfirmationModal:false})
  this.clickCancel()

}

//Purchase Functions

selectPlan=(e)=>{
  this.setState({plan:e.target.value})
  }
  
purchaseSubscription=()=>{
  this.setState({purchaseSelected:true})
}

completePurchase=()=>{
  this.setState({show:true, reload: true, modalProps:{title:"Success",message: "Thank you for subscribing. You may now use Quick Fit."}})
  }

completeUpdatePaymentMethod=(source)=>{
  this.setState({show: true, modalProps:{title:"Success",message: "Your payment method has been updated."}})
  this.props.updateDefaultSource(source)
}

//Change Subscription Functions

changeSubscription =(e) =>{
  this.setState({newPlan:e.target.value})
}

clickApplyChanges=()=>{

  if(this.state.newPlan==="Quick Fit (Monthly)") this.setState({showConfirmationModal:true,
  confirmationModalProps:{title:"Confirm Changes",
                          message: "This will downgrade your subscription from an Annual plan to a Monthly plan, which is more expensive. Any balance from your Annual Plan will be applied to your monthly renewals. Do you wish to continue?",
                        callBack:this.makeChanges}})
  
  if(this.state.newPlan==="Quick Fit (Yearly)") this.setState({showConfirmationModal:true,
    confirmationModalProps:{title:"Confirm Changes",
                            message: "This will upgrade your subscription from a Monthly plan to a Yearly plan, which is less expensive. Any balance from your Monthly Plan will be applied to your payment. Do you wish to continue?",
                            callBack:this.makeChanges}})                          

  if(this.state.newPlan==="Quick Size") this.setState({showConfirmationModal:true,
    confirmationModalProps:{title:"Confirm Changes",
                            message: "This will cancel your subscription at the end of the current billing period. After the end of the current billing period, you will no longer have access to Quick Fit. Do you wish to continue?",
                            callBack:this.makeChanges}})

  }

makeChanges=()=>{
 this.setState({showConfirmationModal:false})
 this.props.updateSubscriptionData(false,this.state.newPlan)
 this.updateServiceLevel()
}

//Reactivate Functions

toggleReactivateSubscription=()=>{
  let currentStop = new Date (this.props.stripeSubscription.current_period_end*1000)
  this.setState({showConfirmationModal:true, confirmationModalCallBack: this.reactivate,
    confirmationModalProps:{title:"Confirm Reactivation",
                            message: "This will reactivate your previously canceled subscription. Your subscription will automatically renew on "+currentStop.toDateString()+". Do you wish to continue?",
                            callBack:this.reactivate}})
  }

reactivate=()=>{
  this.setState({showConfirmationModal:false})
  this.props.updateSubscriptionData(true,this.state.newPlan, this.updateServiceLevelAfterReactivate)
//  this.updateServiceLevelAfterReactivate()
}


//Mongo Update Functions  
updateServiceLevel = () => {
    let jwt = auth.isAuthenticated()
    const user = {
      service_level:this.state.newPlan
    }
    update({
      userId: this.props.user._id
    }, {
      t: jwt.token
    }, user).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({show: true, modalProps:{title:"Success",message: "Your Subscription has been changed."}})
        
        if(data.status==="active"||data.status==="trialing") auth.storeFKSObject({qsp:{status:"valid"}},data.admin)
        
      }
    })
  }

  updateServiceLevelAfterReactivate = (subscriptionData) => {
    let jwt = auth.isAuthenticated()
    let service_level='Quick Fit (Monthly)'
    if(subscriptionData.plan.nickname==='Yearly')service_level='Quick Fit (Yearly)'
    const user = {
      service_level:service_level
    }
    update({
      userId: this.props.user._id
    }, {
      t: jwt.token
    }, user).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({show: true, modalProps:{title:"Success",message: "Your Subscription has been changed."}})
        
        if(data.status==="active"||data.status==="trialing") auth.storeFKSObject({qsp:{status:"valid"}},data.admin)
        
      }
    })
  }

  render() {
    
    return (<div className="modal-container">
      <Panel id="editProfile" onToggle={this.toggleExpand} expanded={this.state.expand}>
      <Panel.Heading><Panel.Title>
        <Panel.Toggle href="#" componentClass="a">
        Manage Subscriptions
        </Panel.Toggle>
        </Panel.Title></Panel.Heading>
      <Panel.Collapse>

        <Panel.Body>
        <CurrentView
          user={this.props.user}
          stripeCustomer={this.props.stripeCustomer}
          stripeSubscription={this.props.stripeSubscription} 
          stripeCard={this.props.stripeCard}
          subscriptionView={this.state.subscriptionView}
          setSubscriptionView={this.setSubscriptionView}
          completeUpdatePaymentMethod={this.completeUpdatePaymentMethod}
          completePurchase={this.completePurchase}
          changeSubscription={this.changeSubscription}
          plan={this.state.plan}
          newPlan={this.state.newPlan}
          selectPlan={this.selectPlan}
          clickApplyChanges={this.clickApplyChanges}
          toggleReactivateSubscription={this.toggleReactivateSubscription}
          />
        </Panel.Body>

      <Panel.Footer>
        <Button color="primary" disabled={false} onClick={this.clickCancel} className="">Cancel</Button>
      </Panel.Footer>

      </Panel.Collapse>
      </Panel>
      <SubscriptionsModal container={this} show={this.state.show} onHide={this.handleClose} title={this.state.modalProps.title} message={this.state.modalProps.message}/>
      <ConfirmChangesModal container={this} show={this.state.showConfirmationModal} onHide={this.handleCloseConfirmationModal}
                           title={this.state.confirmationModalProps.title} message={this.state.confirmationModalProps.message}
                           callBack={this.state.confirmationModalProps.callBack}/>

  </div>)
  }
}

export default ManageSubscriptions
