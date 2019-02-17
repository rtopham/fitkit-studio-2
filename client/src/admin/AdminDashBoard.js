import React, {Component} from 'react'
import {Label, Tabs, Tab, Table, Panel, ListGroup, ListGroupItem} from "react-bootstrap"
import auth from '../auth/auth-helper'
import {list, read} from '../user/api-user.js'
import {listAllShops} from '../shop/api-shop'
import {listAllCyclists} from '../cyclist/api-cyclist'
import {listAllLogs, calculateStats} from '../log/api-log'
import {Redirect} from 'react-router-dom'
import UserRow from './UserRow'
import ShopRow from './ShopRow'
import CyclistRow from './CyclistRow'
import Unauthorized from './Unauthorized'
import LogRow from './LogRow'

//import "./Users.css"


class AdminDashBoard extends Component {
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
      users: [],
      shops: [],
      logs: [],
      stats:[],
      loadingUsers:true,
      loadingShops:true,
      loadingCyclists:true,
      loadingLogs:true,
      loadingStats:true,
      unauthorizedUser:false
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
//        console.log(data)
        this.setState({user: data})
        if(data.admin) this.loadAdminData(userId,jwt); else this.setState({unauthorizedUser:true})
      }
    })
  }


loadAdminData=(userId, jwt)=>{
  this.loadUserData(userId, jwt)
  this.loadShopData(jwt)
  this.loadCyclistData(jwt)
  this.loadLogData(jwt)
  this.loadStats(jwt)
}

  loadUserData=(userId, jwt)=>{

    list({t: jwt.token}).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({users:data,loadingUsers:false})
//        console.log(data)
        }
    })
  }

  loadShopData=(jwt)=>{

    listAllShops({t: jwt.token}).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({shops:data, loadingShops:false})
//        console.log(data)
        }
    })
  }

  loadCyclistData=(jwt)=>{

    listAllCyclists({t: jwt.token}).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({cyclists:data, loadingCyclists:false})
//        console.log(data)
        }
    })
  }

  loadLogData=(jwt)=>{

  calculateStats({t: jwt.token}).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({stats:data,loadingStats:false})
//        console.log(data)
        }
    })
  }

  loadStats=(jwt)=>{

    listAllLogs({t: jwt.token}).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({logs:data,loadingLogs:false})
//        console.log(data)
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
    user.service_level=e.target.value
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


count=(data,field,criteria)=>{

  let total=0
  for(let i=0;i<data.length;i++){
    if(data[i][field]===criteria)total++
    console.log(data[i][field])
  }
  return total
}

countObjectValue=(data,object,key,criteria)=>{

  let total=0
  for(let i=0;i<data.length;i++){
    if(data[i][object][key]===criteria)total++
//    console.log(data[i][object][key])
  }
  return total

}


  render() {
    if(this.state.unauthorizedUser) return (<Unauthorized/>)
    if(this.state.loadingUsers||this.state.loadingShops||this.state.loadingCyclists||this.state.loadingStats) return null
//  console.log(this.state.user)
//  console.log(this.state.shop)
    const redirectToSignin = this.state.redirectToSignin
    if (redirectToSignin) {
      return <Redirect to='/signin'/>
    }
    return (
      <div className="Profile">
       <div>
        <ListGroup>
          <ListGroupItem header={this.state.user.name}>{this.state.user.email}</ListGroupItem>
            <ListGroupItem>{"Joined: " + (new Date(this.state.user.created)).toDateString()}</ListGroupItem>
            <ListGroupItem>{"Current Service Level: " + this.state.user.service_level} </ListGroupItem>
            <ListGroupItem>{"Admin Status: " + this.state.user.admin+' (only Administrators are authorized to view this page.)'} </ListGroupItem>
        </ListGroup>

      </div>
      <Tabs defaultActiveKey={1}  id="controlled-tabs">
      <Tab eventKey={1} title={"Users ("+this.state.users.length+")"}>
      <Table striped bordered>
        <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Joined</th>
          <th>Service Level</th>
          <th>Expires</th>
          <th>Shop Owner</th>
        </tr>
        </thead>
        <tbody>
      {this.state.users.map((item, i) => {return <UserRow user={item} key={i} container={this} />})}
        </tbody>
        </Table>
      </Tab>
  
     <Tab eventKey={2} title={"Shops ("+this.state.shops.length+")"}>
     <Table striped bordered>
        <thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Phone</th>
          <th>Website</th>
          <th>Owner</th>
          <th>Logo</th>
        </tr>
        </thead>
        <tbody>
      {this.state.shops.map((item, i) => {return <ShopRow shop={item} key={i} container={this} />})}
        </tbody>
        </Table>
     </Tab>
     <Tab eventKey={3} title={"Cyclists ("+this.state.cyclists.length+")"}>
     <Table striped bordered>
        <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Gender</th>
          <th>Age</th>
          <th>Created By</th>
          <th>Created</th>         
          <th>Last Updated</th>
        </tr>
        </thead>
        <tbody>
      {this.state.cyclists.map((item, i) => {return <CyclistRow cyclist={item} key={i} container={this} />})}
        </tbody>
        </Table>
     </Tab>
     <Tab eventKey={4} title={"Stats"}>
      <Panel>
        <Panel.Heading><Panel.Title>Stats</Panel.Title></Panel.Heading>
        <Panel.Body>
          <Label>Totals</Label>
         <ListGroup>
           <ListGroupItem>Total Users: {this.state.users.length}</ListGroupItem>
           <ListGroupItem>Total Shops: {this.state.shops.length}</ListGroupItem>
           <ListGroupItem>Total Cyclists: {this.state.cyclists.length}</ListGroupItem>
           <ListGroupItem>Total Paying Customers: {this.state.users.length-this.countObjectValue(this.state.users,"subscription_status","service_level","Quick Size")}</ListGroupItem>
         </ListGroup>
         <Label>Today</Label>
         <ListGroup>
           <ListGroupItem>Users Created: {this.state.stats.today.usersCreated}</ListGroupItem>
           <ListGroupItem>Users Deleted: {this.state.stats.today.usersDeleted}</ListGroupItem>
           <ListGroupItem>Cyclists Created: {this.state.stats.today.cyclistsCreated}</ListGroupItem>
           <ListGroupItem>Cyclists Deleted: {this.state.stats.today.cyclistsDeleted}</ListGroupItem>
           <ListGroupItem>Unique Users: {this.state.stats.today.uniqueUsersSignedIn}</ListGroupItem>           
           <ListGroupItem>Sign Ins: {this.state.stats.today.usersSignedIn}</ListGroupItem>                      
           <ListGroupItem>Sign Outs: {this.state.stats.today.usersSignedOut}</ListGroupItem>           
         </ListGroup>
         <Label>Last Seven Days</Label>         
         <ListGroup>
           <ListGroupItem>Users Created:    {this.state.stats.lastSevenDays.usersCreated}</ListGroupItem>
           <ListGroupItem>Users Deleted:    {this.state.stats.lastSevenDays.usersDeleted}</ListGroupItem>
           <ListGroupItem>Cyclists Created: {this.state.stats.lastSevenDays.cyclistsCreated}</ListGroupItem>
           <ListGroupItem>Cyclists Deleted: {this.state.stats.lastSevenDays.cyclistsDeleted}</ListGroupItem>
           <ListGroupItem>Unique Users:     {this.state.stats.lastSevenDays.uniqueUsersSignedIn}</ListGroupItem>           
           <ListGroupItem>Sign Ins:         {this.state.stats.lastSevenDays.usersSignedIn}</ListGroupItem>                      
           <ListGroupItem>Sign Outs:        {this.state.stats.lastSevenDays.usersSignedOut}</ListGroupItem>           
         </ListGroup>
         <Label>Last Thirty Days</Label>         
         <ListGroup>
           <ListGroupItem>Users Created:    {this.state.stats.lastThirtyDays.usersCreated}</ListGroupItem>
           <ListGroupItem>Users Deleted:    {this.state.stats.lastThirtyDays.usersDeleted}</ListGroupItem>
           <ListGroupItem>Cyclists Created: {this.state.stats.lastThirtyDays.cyclistsCreated}</ListGroupItem>
           <ListGroupItem>Cyclists Deleted: {this.state.stats.lastThirtyDays.cyclistsDeleted}</ListGroupItem>
           <ListGroupItem>Unique Users:     {this.state.stats.lastThirtyDays.uniqueUsersSignedIn}</ListGroupItem>           
           <ListGroupItem>Sign Ins:         {this.state.stats.lastThirtyDays.usersSignedIn}</ListGroupItem>                      
           <ListGroupItem>Sign Outs:        {this.state.stats.lastThirtyDays.usersSignedOut}</ListGroupItem>           
         </ListGroup>
         <Label>Year to Date</Label>         
         <ListGroup>
           <ListGroupItem>Users Created:    {this.state.stats.yearToDate.usersCreated}</ListGroupItem>
           <ListGroupItem>Users Deleted:    {this.state.stats.yearToDate.usersDeleted}</ListGroupItem>
           <ListGroupItem>Cyclists Created: {this.state.stats.yearToDate.cyclistsCreated}</ListGroupItem>
           <ListGroupItem>Cyclists Deleted: {this.state.stats.yearToDate.cyclistsDeleted}</ListGroupItem>
           <ListGroupItem>Unique Users:     {this.state.stats.yearToDate.uniqueUsersSignedIn}</ListGroupItem>           
           <ListGroupItem>Sign Ins:         {this.state.stats.yearToDate.usersSignedIn}</ListGroupItem>                      
           <ListGroupItem>Sign Outs:        {this.state.stats.yearToDate.usersSignedOut}</ListGroupItem>           
         </ListGroup>
         <Label>All Time</Label>         
         <ListGroup>
           <ListGroupItem>Users Created:    {this.state.stats.allTime.usersCreated}</ListGroupItem>
           <ListGroupItem>Users Deleted:    {this.state.stats.allTime.usersDeleted}</ListGroupItem>
           <ListGroupItem>Cyclists Created: {this.state.stats.allTime.cyclistsCreated}</ListGroupItem>
           <ListGroupItem>Cyclists Deleted: {this.state.stats.allTime.cyclistsDeleted}</ListGroupItem>
           <ListGroupItem>Unique Users:     {this.state.stats.allTime.uniqueUsersSignedIn}</ListGroupItem>           
           <ListGroupItem>Sign Ins:         {this.state.stats.allTime.usersSignedIn}</ListGroupItem>                      
           <ListGroupItem>Sign Outs:        {this.state.stats.allTime.usersSignedOut}</ListGroupItem>           
         </ListGroup>
        </Panel.Body>
        
      </Panel>

     </Tab>
     <Tab eventKey={5} title={"Logs"}>
     <Table striped bordered>
        <thead>
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
      {this.state.logs.map((item, i) => {return <LogRow log={item} key={i} container={this} />})}
        </tbody>
        </Table>
     </Tab>

     </Tabs>
      </div>
    )
  }
}


export default AdminDashBoard