import React, { Component } from 'react'
import {Panel, Tabs, Tab} from "react-bootstrap"
import auth from './../auth/auth-helper'
import SizingRecommendations from './SizingRecommendations'
import Bike from '../bike/Bike'
import {listByCyclist, create, update} from './../bike/api-bike'
import './QuickSize.css'

class BikeSizing extends Component {
state={
  loading:true,
  key:1,
  bikes:[{_id:null, make:"", model: "", type:"", frameSize:0,saddleHeight:0,standoverHeight:0,handlebarWidth:0,saddleWidth:0, bikeLength:0}],
  originalBikes:[],

//  originalBikes:[],
//  bikesActual:[{make:"", model: "", type:"",
//  frameSize:0,saddleHeight:0,standoverHeight:0,handlebarWidth:0,saddleWidth:0, bikeLength:0,adjustedBikeLength:0},
//  {make:"", model: "", type:"",
//  frameSize:0,saddleHeight:0,standoverHeight:0,handlebarWidth:0,saddleWidth:0, bikeLength:0,adjustedBikeLength:0},
//  {make:"", model: "", type:"",
//  frameSize:0,saddleHeight:0,standoverHeight:0,handlebarWidth:0,saddleWidth:0, bikeLength:0,adjustedBikeLength:0}],
//  originalBikesActual:[]
}

componentDidMount=()=>{

  this.loadBikeData()
//if(this.props.bikes.length>0){
//   let originalBikes = JSON.parse(JSON.stringify(this.props.bikes))
//   let bikesActual = JSON.parse(JSON.stringify(this.props.bikes))

//   this.setState({bikesActual, originalBikesActual})
//}
//else{
//  let originalBikesActual = JSON.parse(JSON.stringify(this.state.bikesActual))
//  this.setState({originalBikesActual})
//}

}

loadBikeData=()=>{
  console.log("loading bike data")
  const jwt = auth.isAuthenticated()
  listByCyclist({
    userId:this.props.user.userId, cyclistId: this.props.cyclistId
  }, {t: jwt.token}).then((data) => {
    if (data.error) {
      this.setState({error: data.error})
    } else {
      data.push({_id:null, make:"", model: "", type:"Road Bike", frameSize:0,saddleHeight:0,standoverHeight:0,handlebarWidth:0,saddleWidth:0, bikeLength:0})
      this.setState({bikes:data, loading:false})
      //else this.setState({loading:false})
      console.log("Data is:",data)
    }
  })
  
  }

saveBikeChanges=(bike)=>{
//  console.log("here is where we would save the changes to the applicable bike which is:", bike)
  if(bike._id===null) this.createBike(bike)
  else this.updateBike(bike)
  let originalBikes = Object.assign({},this.state.bikesActual)
  this.setState({originalBikes})
}

createBike=(bike) =>{

const jwt = auth.isAuthenticated()
  create({userId:jwt.user._id,cyclistId:this.props.cyclistId}, {t:jwt.token},bike).then((data) => {
    if (data.error) {
      this.setState({error: data.error})
    } else {
      this.loadBikeData()
//      this.setState({error: '', show: true, redirectToQuickSizePlus:true,cyclistId:data.newCyclistId})
//      const logData={userId:jwt.user._id,action: "created cyclist", description: "User "+jwt.user.name+" created cyclist "+this.state.cyclistProfile.firstName+' '+this.state.cyclistProfile.lastName+".", documentId:data.newCyclistId}
//      recordLogAction(logData)
    }
  })
}


updateBike =(bike) =>{

const jwt = auth.isAuthenticated()

update({userId:jwt.user._id,cyclistId:this.props.cyclistId,bikeId:bike._id},{t:jwt.token},bike).then((data) => {
    if (data.error) {
      this.setState({error: data.error})
    } else {
      this.loadBikeData()
//      this.setState({error: '',updated: Date.now(), editProfile:false, originalCyclistProfile, unsavedChanges:false, unsavedProfileChanges:false})
//      console.log(data)
    }
  })
}

handleCancel=()=>{
  console.log("Bikes Actual", this.state.bikesActual)
  console.log("Original", this.state.originalBikesActual)
  let bikesActual = JSON.parse(JSON.stringify(this.state.originalBikesActual))
//  Object.assign({},this.state.originalBikesActual)
  this.setState({bikesActual})
}

oldhandleChange = name => value => {
//  let BikeActual = Object.assign({},this.state.bikesActual[bike])
//  console.log(BikeActual)
//  BikeActual[name]=value
//  this.setState({bikesActual[bike]})
//console.log("Changing")
}

handleChange=(bike, name, value)=>{
//  let bikes = Object.assign({},this.state.bikes)
let bikes = JSON.parse(JSON.stringify(this.state.bikes))
  
  bikes[bike][name]=value
//  console.log(BikeActual)
  this.setState({bikes})
}

handleSelectTab=(key)=>{
  this.setState({key})
}

  render() {
if(this.state.loading)return null
    return (

    <Panel>
      <Panel.Heading>
        <Panel.Title>Bike Sizing</Panel.Title>
      </Panel.Heading>
      <Panel.Body className="" >
      <Tabs defaultActiveKey={1} activeKey={this.state.key} onSelect={this.handleSelectTab} id="controlled-tabs">
      <Tab eventKey={1} title="Sizing Recommendations">
      <SizingRecommendations updated={this.props.updated} user={this.props.user} cyclistAge={this.props.cyclistAge} 
      cyclistProfile={this.props.cyclistProfile} notes={this.props.notes} softScores={this.props.softScores}
      bodyMeasurements={this.props.bodyMeasurements} shop={this.props.shop} logoUrl={this.props.logoUrl} />
      </Tab>

      {this.state.bikes.map((item, i) => {
          
          if(i<this.state.bikes.length-1) return (<Tab eventKey={i+2} key={i} title={this.state.bikes[i].model}><Bike index={i} cyclistId={this.props.cyclistId}
          bodyMeasurements={this.props.bodyMeasurements} cyclistAge={this.props.cyclistAge} cyclistProfile={this.props.cyclistProfile} notes={this.props.notes}
          softScores={this.props.softScores} user={this.props.user} shop={this.props.shop} updated={this.props.updated} logoUrl={this.props.logoUrl}
          handleChange={this.handleChange} saveBikeChanges={this.saveBikeChanges} userId={this.props.user.userId} bike={item} container={this}/>
          </Tab>
          )
          else return (<Tab eventKey={i+2} key={i} title={"Add Bike"}><Bike index={i} cyclistId={this.props.cyclistId}
          handleChange={this.handleChange} saveBikeChanges={this.saveBikeChanges} userId={this.props.user.userId} bike={item} container={this}/>
          </Tab>
          )               
              })
    
           }


</Tabs>
      </Panel.Body>
    </Panel>
      
      
    )
  }
}

export default BikeSizing  