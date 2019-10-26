import React, { Component } from 'react'
import {Panel, Tabs, Tab} from "react-bootstrap"
import auth from './../auth/auth-helper'
import SizingRecommendations from './SizingRecommendations'
import Bike from '../bike/Bike'
import {listByCyclist, create, update} from './../bike/api-bike'

import './QuickFit.css'

class BikeSizing extends Component {

state={
  loading:true,
  key:1,
  bikes:[{_id:null, make:"", model: "", type:"Road Bike", frameSize:0,mtbWheelSize:'',saddleHeight:0,standoverHeight:0,handlebarWidth:0,saddleWidth:0, bikeLength:0}],
  originalBikes:[],
}

componentDidMount=()=>{
  
  this.loadBikeData()
}


loadBikeData=()=>{

  const jwt = auth.isAuthenticated()
  listByCyclist({
    userId:this.props.user.userId, cyclistId: this.props.cyclistId
  }, {t: jwt.token}).then((data) => {
    if (data.error) {
      this.setState({error: data.error})
    } else {
      data.push({_id:null, make:"", model: "", type:"Road Bike", frameSize:0,frameReach:0,frameStack:0,effectiveTopTube:0,
      seatPostOffset:0,crankLength:0,stemLength:0,stemAngle:0,handlebarReach:0,saddleHeight:0,standoverHeight:0,handlebarWidth:0,
      saddleWidth:0, bikeLength:0,saddleHeightBB:0,saddleSetBack:0,saddleAngle:0,saddleNoseToBar:0,saddleNoseToHood:0,saddleToBarDrop:0,
      handlebarReachHX:0,handlebarStackHY:0,mtbWheelSize:'29'})
      
      this.setState({bikes:data, originalBikes:data, loading:false})
    }
  })
  
  }

saveBikeChanges=(bike)=>{
  if(bike._id===null) this.createBike(bike)
  else this.updateBike(bike)
  let originalBikes = Object.assign({},this.state.bikes)
  this.setState({originalBikes})
}

createBike=(bike) =>{

const jwt = auth.isAuthenticated()
  create({userId:jwt.user._id,cyclistId:this.props.cyclistId}, {t:jwt.token},bike).then((data) => {
    if (data.error) {
      this.setState({error: data.error})
    } else {
      this.loadBikeData()
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
    }
  })
}

handleCancel=()=>{
  let bikes = JSON.parse(JSON.stringify(this.state.originalBikes))
  this.setState({bikes})
}

handleChange=(bike, name, value)=>{
let bikes = JSON.parse(JSON.stringify(this.state.bikes))

  bikes[bike][name]=value
  this.setState({bikes})
}

handleSelectTab=(key)=>{
  this.setState({key})
}

  render() {
if(this.state.loading)return null

let logoImage=this.props.fksLogoImage
if(this.props.logoUrl&&this.props.logoUrl!=='')logoImage=this.props.logoImage
    return (
<div className="modal-container">


    <Panel>
      <Panel.Heading>
        <Panel.Title>Bike Sizing and Fitting</Panel.Title>
      </Panel.Heading>
      <Panel.Body>
      <Tabs className="fks-tabs" defaultActiveKey={1} activeKey={this.state.key} onSelect={this.handleSelectTab} id="controlled-tabs">
      <Tab eventKey={1} title="Sizing Recommendations">
      <SizingRecommendations updated={this.props.updated} user={this.props.user} cyclistAge={this.props.cyclistAge} 
      cyclistProfile={this.props.cyclistProfile} notes={this.props.notes} softScores={this.props.softScores}
      bodyMeasurements={this.props.bodyMeasurements} shop={this.props.shop} logoImage={logoImage} />
      </Tab>

      

      {this.state.bikes.map((item, i) => {
          
          if(i<this.state.bikes.length-1) return (<Tab eventKey={i+2} key={i} title={this.state.bikes[i].model}><Bike index={i} selectedTab={this.state.key} cyclistId={this.props.cyclistId}
          bodyMeasurements={this.props.bodyMeasurements} cyclistAge={this.props.cyclistAge} cyclistProfile={this.props.cyclistProfile} notes={this.props.notes}
          softScores={this.props.softScores} user={this.props.user} shop={this.props.shop} updated={this.props.updated} logoUrl={this.props.logoUrl}
          handleChange={this.handleChange} handleCancel={this.handleCancel} saveBikeChanges={this.saveBikeChanges} userId={this.props.user.userId} bike={item} reloadBikes={this.loadBikeData}
          logoImage={this.props.logoImage}/>
          </Tab>
          )
          else return (<Tab eventKey={i+2} key={i} title={"Add Bike"}><Bike index={i} cyclistId={this.props.cyclistId}
          handleChange={this.handleChange} handleCancel={this.handleCancel} saveBikeChanges={this.saveBikeChanges} userId={this.props.user.userId} bike={item} />
          </Tab>
          )               
              })
    
           }


</Tabs>
      </Panel.Body>
    </Panel>

      </div>
      
    )
  }
}

export default BikeSizing  