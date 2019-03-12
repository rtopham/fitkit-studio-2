import React, {Component} from 'react'
import {Panel, Button} from "react-bootstrap"
import {update} from './../user/api-user'
import auth from '../auth/auth-helper'
import SubscriptionsModal from './SubscriptionsModal'
import ConfirmChangesModal from './ConfirmChangesModal'
import StripeStatus from './StripeStatus';
import SelectPlan from './SelectPlan';
import StripeElement from './StripeElement'
import ChangeSubscription from './ChangeSubscription';
//import "./Users.css"

class ManageSubscriptions extends Component {
  constructor(props){
    super(props);
  
this.state = {
      show:false,
      showConfirmationModal: false,
      confirmationModalProps: {title:"Confirm Changes", message: "Do you want to make these changes?", callBack:()=>{return null}},
      modalProps:{title:"Success",message: "Thank you for subscribing. You may now use Quick Size Plus."},
      expand:false,
      error: '',
      redirectToHome:false,
      upgradeSelected:false,
      purchaseSelected:false,
      changeSelected:false,
      reactivateSelected:false,
      plan:"Quick Size Plus (Yearly)",
      loading:false
    }
  }

//Panel Functions

clickCancel=()=>{
  this.setState({upgradeSelected:false,purchaseSelected:false,changeSelected:false,reactivateSelected:false,expand:false})
  this.props.toggleNewPlanSelected()
}

toggleExpand =() =>{
  this.setState({expand:!this.state.expand})
}

toggleChangeSelected=()=>{
  this.setState({changeSelected:true})
}

toggleUpgradeSelected =(e) =>{
  this.setState({upgradeSelected:!this.state.upgradeSelected})
}


toggleReactivateSubscription=()=>{
let currentStop = new Date (this.props.stripeSubscription.current_period_end*1000)
this.setState({showConfirmationModal:true, confirmationModalCallBack: this.reactivate,
  confirmationModalProps:{title:"Confirm Reactivation",
                          message: "This will reactivate your previously canceled subscription. Your subscription will automatically renew on "+currentStop.toDateString()+". Do you wish to continue?",
                          callBack:this.reactivate}})
}

//Modal Functions

handleClose = () => {
  this.setState({ show: false, changeSelected:false, expand:false });
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
//  console.log("Purchase Selected")
  this.setState({purchaseSelected:true})
}
completePurchase=()=>{
  this.setState({show:true, upgradeSelected:false, purchaseSelected:false, changeSelected:false,})
  }

//Change Subscription Functions

clickApplyChanges=()=>{

  if(this.props.user.service_level==="Quick Size Plus (Monthly)") this.setState({showConfirmationModal:true,
  confirmationModalProps:{title:"Confirm Changes",
                          message: "This will downgrade your subscription from an Annual plan to a Monthly plan, which is more expensive. Any balance from your Annual Plan will be applied to your monthly renewals. Do you wish to continue?",
                        callBack:this.makeChanges}})
  
  if(this.props.user.service_level==="Quick Size Plus (Yearly)") this.setState({showConfirmationModal:true,
    confirmationModalProps:{title:"Confirm Changes",
                            message: "This will upgrade your subscription from a Monthly plan to a Yearly plan, which is less expensive. Any balance from your Monthly Plan will be applied to your payment. Do you wish to continue?",
                            callBack:this.makeChanges}})                          

  if(this.props.user.service_level==="Quick Size") this.setState({showConfirmationModal:true,
    confirmationModalProps:{title:"Confirm Changes",
                            message: "This will cancel your subscription at the end of the current billing period. After the end of the current billing period, you will no longer have access to Quick Size Plus. Do you wish to continue?",
                            callBack:this.makeChanges}})

  }

makeChanges=()=>{
 this.setState({showConfirmationModal:false})
 this.props.updateSubscriptionData()
 this.updateServiceLevel()
}

reactivate=()=>{
  console.log("This is where we would reactivate")
  this.props.updateSubscriptionData(true)
}

//Mongo Update Functions  
updateServiceLevel = () => {
    let jwt = auth.isAuthenticated()
    const user = {
      service_level:this.props.user.service_level
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


currentView=()=>{
  if(this.state.changeSelected) return(<ChangeSubscription
     changeSubscription={this.props.changeSubscription}
     stripeSubscription={this.props.stripeSubscription}
     newPlanSelected={this.props.newPlanSelected}
     clickApplyChanges={this.clickApplyChanges}/>)

  if(!this.state.upgradeSelected) return(<StripeStatus
    user={this.props.user}
    stripeSubscription={this.props.stripeSubscription}
    toggleUpgradeSelected={this.toggleUpgradeSelected}
    upgradeSelected={this.props.upgradeSelected}
    toggleChangeSelected={this.toggleChangeSelected} toggleReactivateSubscription={this.toggleReactivateSubscription}/>)

  if(this.state.upgradeSelected&&!this.state.purchaseSelected) return(<SelectPlan
    selectPlan={this.selectPlan}
    plan={this.state.plan}
    purchaseSubscription={this.purchaseSubscription}/>)

  if(this.state.upgradeSelected&&this.state.purchaseSelected) return(<StripeElement
    completePurchase={this.completePurchase}
    existingCustomer={this.state.existingCustomer}
    user={this.props.user}
    plan={this.state.plan}/>)

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
        {this.currentView()}
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
