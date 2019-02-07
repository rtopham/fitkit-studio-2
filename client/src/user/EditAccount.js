import React, {Component} from 'react'
import {ListGroup, ListGroupItem} from "react-bootstrap"
import auth from './../auth/auth-helper'
import {read} from './api-user.js'
import {listByOwner} from './../shop/api-shop'
import {Redirect, Link} from 'react-router-dom'
import EditProfile from './../user/EditProfile'
import EditSubscriptions from './EditSubscriptions'
import EditPreferences from './EditPreferences'
import EditShopStudio from '../shop/EditShopStudio'

import "./Users.css"
import NewShopStudio from '../shop/NewShopStudio';

class EditAccount extends Component {
  constructor({match}) {
    super()
    this.state = {
      user: {name: '', email: '', subscription_status:{service_level:'Quick Size', expiration: null},
             preferences:{height_units:'Metric',weight_units:'Metric'},
             shop_owner: false
            },           
      originalUser: {name: '', email: '', subscription_status:{},preferences:{height_units:'Metric',weight_units:'Metric'},shop_owner: false},
      shop: {_id:'', active: false, name:'',address:'', address2:'', phone:'',website:'',logo: {},owner:''},
      password: '',
      confirmPassword: '',
      logoUrl: null,
      tempLogo: null,
      unsavedShopChanges:false,
      redirectToSignin: false,
      redirectToUnauthorized: false
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
        this.setState({user: data, originalUser: data})
        if(data.shop_owner) this.loadShopData(userId, data.shop_owner)

        
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

  changeSubscription =(e) =>{
    let user = Object.assign({},this.state.user)
    user.subscription_status.service_level=e.target.value
    this.setState({user})
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


  render() {
//  console.log(this.state.user)
//  console.log(this.state.shop)
    const redirectToSignin = this.state.redirectToSignin
    if (redirectToSignin) return (<Redirect to='/signin'/>)
        
    return (
      <div className="Profile">
       <div>
        <ListGroup>
          <ListGroupItem header={this.state.originalUser.name}>{this.state.originalUser.email}</ListGroupItem>
            <ListGroupItem>{"Joined: " + (new Date(this.state.originalUser.created)).toDateString()}</ListGroupItem>
            <ListGroupItem>{"Current Service Level: " + this.state.originalUser.subscription_status.service_level} </ListGroupItem>
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
      <EditSubscriptions changeSubscription={this.changeSubscription} user={this.state.user}/>
      {this.state.user.admin&&<Link to={"/admin/"+this.state.user._id}>Access Admin Page</Link>}
      </div>
    )
  }
}


export default EditAccount
