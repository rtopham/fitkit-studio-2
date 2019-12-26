import React, {Component} from 'react'
import {ListGroup, ListGroupItem} from "react-bootstrap"
import auth from './../auth/auth-helper'
import {read} from './api-user.js'
import {readStripeSubscription, updateStripeSubscription, readStripeCustomer, readStripeCard} from '../subscription/api-stripe'
import PreFitInterviewInfo from '../prefitinterview/PreFitInterviewInfo'
import {listByOwner} from './../shop/api-shop'
import {Redirect, Link} from 'react-router-dom'
import EditProfile from './../user/EditProfile'
import EditPreferences from './EditPreferences'
import EditShopStudio from '../shop/EditShopStudio'
import ManageSubscriptions from './../subscription/ManageSubscriptions'

import "./Users.css"
import NewShopStudio from '../shop/NewShopStudio';

class EditAccount extends Component {
  constructor({match}) {
    super()
    this.state = {
      user: {name: '', email: '', service_level:'', 
             preferences:{height_units:'Metric',weight_units:'Metric'},
             shop_owner: false
            },           
      originalUser: {name: '', email: '', service_level:'', preferences:{height_units:'Metric',weight_units:'Metric'},shop_owner: false},
      shop: {_id:'', active: false, name:'',address:'', address2:'', phone:'',website:'',logo: {},owner:''},
      password: '',
      confirmPassword: '',
      logoUrl: null,
      tempLogo: null,
      unsavedShopChanges:false,
      redirectToSignin: false,
      redirectToUnauthorized: false,
      stripeSubscription:{plan:{}},
      stripeCustomer:{},
      stripeCard:{}
    }
    this.match = match
  }

  componentDidMount = () => {
    this.init(this.match.params.userId)
  }


  init = (userId) => {
    const jwt = auth.isAuthenticated()
    read({
      userId: userId
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        this.setState({redirectToSignin: true})

      } else {
        this.setState({user: data, originalUser: data})
        if(data.shop_owner) this.loadShopData(userId, data.shop_owner)
        if(data.stripe_customer_id) this.loadCustomerData(userId)
        if(data.stripe_subscription_id) this.loadSubscriptionData(userId)

      }
    })
  }


  loadShopData=(userId)=>{
    const jwt = auth.isAuthenticated()
    listByOwner({
      userId: userId
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        if(!data.address2)data.address2=''
        this.setState({shop:data})
        const logoUrl = `/api/shops/logo/${data._id}?${new Date().getTime()}`
        this.setState({logoUrl})
      }
    })

  }

loadSubscriptionData=(userId)=>{
  let jwt = auth.isAuthenticated()
  readStripeSubscription({
    userId: userId
  }, {t: jwt.token}).then((data) => {
    if (data.error) {
      this.setState({error:data.error})
    } else {
      this.setState({stripeSubscription: data})

    }
  })
}

loadCustomerData=(userId)=>{
  let jwt = auth.isAuthenticated()
  readStripeCustomer({
    userId: userId
  }, {t: jwt.token}).then((data) => {
    if (data.error) {
      this.setState({error:data.error})

    } else {
      this.setState({stripeCustomer: data})
      this.loadCardData(userId,data.default_source)

    }
  })
}

loadCardData=(userId, default_source)=>{
  let jwt = auth.isAuthenticated()
  readStripeCard({
    userId: userId,
    sourceId: default_source
  }, {t: jwt.token}).then((data) => {
    if (data.error) {
      this.setState({error:data.error})

    } else {
      this.setState({stripeCard: data})

    }
  })
}

updateSubscriptionData=(reactivate, newPlan, mongoUpdateCallBack)=>{
let plan=newPlan
if(reactivate) plan="reactivate"
let jwt = auth.isAuthenticated()

updateStripeSubscription({
    userId: jwt.user._id
  }, {t: jwt.token}, plan).then((data) => {
    if (data.error) {
      this.setState({error:data.error})

    } else {
      this.setState({stripeSubscription: data})
      if(mongoUpdateCallBack) mongoUpdateCallBack(data)
    }
  })
}

  removeDeletedShopFromState=()=>{
    let user = Object.assign({},this.state.user)
    let originalUser = Object.assign({},this.state.user)
    user.shop_owner=false
    originalUser.shop_owner=false
//    this.setState({user, originalUser})
    let shop = Object.assign({},this.state.shop)
    shop._id=''
    shop.active=false
    shop.name=''
    shop.address=''
    shop.address2=''
    shop.phone=''
    shop.website=''
    shop.logo={}
    shop.owner=''
    this.setState({shop,user,originalUser,tempLogo: null,logoUrl:null})
  }

changeHeightUnits = (e) => {
      let user = Object.assign({},this.state.user)
      user.preferences.height_units=e.target.value
      this.setState({user})
   }

   changeWeightUnits = (e) => {
    let user = Object.assign({},this.state.user)
    user.preferences.weight_units=e.target.value
    this.setState({user})
 }

 changeShopStatus = (e) => {
  let shop = Object.assign({},this.state.shop)
  shop.active=JSON.parse(e.target.value)
  this.setState({shop})
}

 handleProfileChange = name => event => {
  const value = event.target.value
  let user = Object.assign({},this.state.user)
  user[name]=value
  this.setState({user})
}

handlePasswordChange = name => event => {
  const value = event.target.value
  this.setState({ [name]: value })
}

changeShopStudio=name=>event=>{
  const value = event.target.value
  let shop = Object.assign({},this.state.shop)
  shop[name]=value
  this.setState({shop, unsavedShopChanges:true})
}


updateLogoState =(logo)=>{

  this.setState({tempLogo:logo,unsavedShopChanges:true})

}

updateProfileState =()=>{
  let jwt=auth.isAuthenticated()
  jwt.user.name=this.state.user.name
  sessionStorage.setItem('jwt', JSON.stringify(jwt))
  let originalUser = Object.assign({},this.state.user)
  this.setState({originalUser, password:'',confirmPassword:''})
  
}

updateDefaultSource=(source)=>{
this.setState({stripeCustomer:source})
this.loadCardData(this.match.params.userId,source.default_source)
}


  render() {
    const redirectToSignin = this.state.redirectToSignin
    if (redirectToSignin) return (<Redirect to='/signin'/>)

    let serviceLevel=''
    if(this.state.stripeSubscription.plan.interval==='month')serviceLevel ="Quick Fit (Monthly)"
    if(this.state.stripeSubscription.plan.interval==='year')serviceLevel ="Quick Fit (Yearly)"
    if(this.state.stripeSubscription.plan.interval===undefined)serviceLevel="Quick Size"


    return (
      <div className="Profile">
       <div>
        <ListGroup>
          <ListGroupItem header={this.state.originalUser.name}>{this.state.originalUser.email}</ListGroupItem>
            <ListGroupItem>{"Joined: " + (new Date(this.state.originalUser.created)).toDateString()}</ListGroupItem>
            <ListGroupItem>{"Current Service Level: " + serviceLevel} </ListGroupItem>
        </ListGroup>
      </div>
      <EditProfile handlePasswordChange={this.handlePasswordChange} handleProfileChange={this.handleProfileChange}
       updateProfileState={this.updateProfileState} user={this.state.user} password={this.state.password} confirmPassword={this.state.confirmPassword}/>
      <EditPreferences changeHeightUnits={this.changeHeightUnits} changeWeightUnits={this.changeWeightUnits} user={this.state.user}/>
      {(this.state.user.shop_owner&&
      <EditShopStudio unsavedShopChanges={this.state.unsavedShopChanges} updateLogoState={this.updateLogoState} changeShopStatus={this.changeShopStatus}
      changeShopStudio={this.changeShopStudio} tempLogo={this.state.tempLogo} logoUrl={this.state.logoUrl} shop={this.state.shop}
      removeDeletedShopFromState={this.removeDeletedShopFromState} user={this.state.user}/>)}      
      {(!this.state.user.shop_owner&&
      <NewShopStudio updateLogoState={this.updateLogoState} changeShopStatus={this.changeShopStatus} changeShopStudio={this.changeShopStudio}
      tempLogo={this.state.tempLogo} logoUrl={this.state.logoUrl} shop={this.state.shop} user={this.state.user}/>)}
      <PreFitInterviewInfo shop={this.state.shop} user={this.state.user}/>
      <ManageSubscriptions 
      user={this.state.user}
      stripeSubscription={this.state.stripeSubscription}
      stripeCustomer={this.state.stripeCustomer}
      stripeCard={this.state.stripeCard}
      updateDefaultSource={this.updateDefaultSource}
      updateSubscriptionData={this.updateSubscriptionData}
      reloadStripeData={this.init}
      />
      
      {this.state.user.admin&&<Link to={"/admin/"+this.state.user._id}>Access Admin Page</Link>}
      </div>
    )
  }
}


export default EditAccount
