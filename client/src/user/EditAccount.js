import React, {Component} from 'react'
import {ListGroup, ListGroupItem} from "react-bootstrap"
import auth from './../auth/auth-helper'
import {read} from './api-user.js'
import {readStripeSubscription, updateStripeSubscription, readStripeCustomer} from './../stripe/api-stripe'
import {listByOwner} from './../shop/api-shop'
import {Redirect, Link} from 'react-router-dom'
import EditProfile from './../user/EditProfile'
import EditPreferences from './EditPreferences'
import EditShopStudio from '../shop/EditShopStudio'
import ManageSubscriptions from './../stripe/ManageSubscriptions'

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
      newPlanSelected:false
    }
    this.match = match
  }
  init = (userId) => {
    const jwt = auth.isAuthenticated()
    read({
      userId: userId
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        this.setState({redirectToSignin: true})

      } else {
        console.log(data)
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
//      console.log(data)
      this.setState({stripeCustomer: data})

    }
  })
}

updateSubscriptionData=(reactivate)=>{
//  console.log("attempting update")
let plan=this.state.user.service_level
if(reactivate) plan="reactivate"

let jwt = auth.isAuthenticated()

updateStripeSubscription({
    userId: jwt.user._id
  }, {t: jwt.token}, plan).then((data) => {
    if (data.error) {
      this.setState({error:data.error})
      

    } else {
      this.setState({stripeSubscription: data})
      
      
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


  componentWillReceiveProps = (props) => {
    this.init(props.match.params.userId)
  }
  componentDidMount = () => {
    this.init(this.match.params.userId)
  }

  oldchangeSubscription =(e) =>{

    console.log(this.state.originalUser)
    let user = Object.assign({},this.state.user)
    user.service_level=e.target.value
    this.setState({user})

  }

toggleNewPlanSelected=()=>{
  this.setState({newPlanSelected:!this.state.newPlanSelected})
}

  changeSubscription =(e) =>{
 
    let user = {...this.state.user}
    user.service_level=e.target.value
    this.setState({user,newPlanSelected:true})
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
//   console.log(e.target.value)
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
//  console.log(event.target.value)
  const value = event.target.value
  let shop = Object.assign({},this.state.shop)
  shop[name]=value
  this.setState({shop, unsavedShopChanges:true})
}


updateLogoState =(logo)=>{
//  let shop = Object.assign({},this.state.shop)
//  shop.logo=logo
  this.setState({tempLogo:logo,unsavedShopChanges:true})

}

updateProfileState =()=>{
  let originalUser = Object.assign({},this.state.user)
  this.setState({originalUser, password:'',confirmPassword:''})
}

updateDefaultSource=(source)=>{
console.log('getting here')
console.log(source)
this.setState({stripeCustomer:source})

}


  render() {
//  console.log(this.state.user)
//  console.log(this.state.shop)
console.log(this.state.stripeCustomer)
    const redirectToSignin = this.state.redirectToSignin
    if (redirectToSignin) return (<Redirect to='/signin'/>)
        
    return (
      <div className="Profile">
       <div>
        <ListGroup>
          <ListGroupItem header={this.state.originalUser.name}>{this.state.originalUser.email}</ListGroupItem>
            <ListGroupItem>{"Joined: " + (new Date(this.state.originalUser.created)).toDateString()}</ListGroupItem>
            <ListGroupItem>{"Current Service Level: " + this.state.originalUser.service_level} </ListGroupItem>
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
      <ManageSubscriptions changeSubscription={this.changeSubscription} user={this.state.user} toggleNewPlanSelected={this.toggleNewPlanSelected} stripeSubscription={this.state.stripeSubscription}
      stripeCustomer={this.state.stripeCustomer} updateSubscriptionData={this.updateSubscriptionData} newPlanSelected={this.state.newPlanSelected} updateDefaultSource={this.updateDefaultSource}/>
      {this.state.user.admin&&<Link to={"/admin/"+this.state.user._id}>Access Admin Page</Link>}
      </div>
    )
  }
}


export default EditAccount
