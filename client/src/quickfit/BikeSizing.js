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
  subKey:"1",
  tempDateUpdated:'',
  bikes:[{_id:null,
          make:"",
          model: "",
          type:"Road Bike",
          frameSize:0,
          frameReach:0,
          frameStack:0,
          effectiveTopTube:0,
          seatPostOffset:0,
          saddleMake:'',
          saddleModel:'',
          saddleWidth:0,
          crankLength:0,
          pedalType:'Road',
          pedalMakeModel:'',
          stemLength:0,
          stemType:'Standard',
          stemAngle:0,
          spacersBelow:0,
          spacersAbove:0,
          handlebarWidth:0,
          handlebarReach:0,
          shifterType:'Mechanical',
          brakeType:'Rim',
          saddleHeight:0,
          saddleHeightBB:0,
          saddleSetBack:0,
          saddleAngle:0,
          saddleNoseToBar:0,
          saddleNoseToHood:0,
          saddleToBarDrop:0,
          handlebarReachHX:0,
          handlebarStackHY:0,
          cleatModel:'',
          shoeBrand:'',
          shoeModel:'',
          shoeSize:0,
          insoles:'',
          cleatAdjustments:'',
          cleatModifications:'',
          bikeLength:0, 
          mtbWheelSize:'29',
          mtbSeatPostType:'Rigid',
          mtbSaddleNoseToGripEnd:0,
          mtbSaddleToGripCenterDropRise:0,
          ttBasebarWidth:0,
          ttAerobarType:'Integrated',
          ttAerobarMakeModel:'',
          ttExtensionsShape:'',
          ttRisers:'',
          ttPadsMakeModel:'',
          ttSaddleToPadCenterDrop:0,
          ttSaddleNoseToPadRear:0,
          ttSaddleNoseToEndOfExtensions:0,
          ttExtensionWidthAtClamps:0,
          ttExtensionWidthAtEnd:0,
          ttExtensionAngle:0,
          ttPadWidth:0,
          ttPadXReachRearOfPad:0,
          ttPadXReachCenterOfPad:0,
          ttPadYStackRearOfPad:0,
          ttBasebarReachX:0,
          ttBasebarStackY:0,
          notes:'',
          confidentialNotes:''}],
  originalBikes:[]
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
      data.push({_id:null,
        make:"",
        model: "",
        type:"Road Bike",
        frameSize:0,
        frameReach:0,
        frameStack:0,
        effectiveTopTube:0,
        seatPostOffset:0,
        saddleMake:'',
        saddleModel:'',
        saddleWidth:0,
        crankLength:0,
        pedalType:'Road',
        pedalMakeModel:'',
        stemLength:0,
        stemType:'Standard',
        stemAngle:0,
        spacersBelow:0,
        spacersAbove:0,
        handlebarWidth:0,
        handlebarReach:0,
        shifterType:'Mechanical',
        brakeType:'Rim',
        saddleHeight:0,
        saddleHeightBB:0,
        saddleSetBack:0,
        saddleAngle:0,
        saddleNoseToBar:0,
        saddleNoseToHood:0,
        saddleToBarDrop:0,
        handlebarReachHX:0,
        handlebarStackHY:0,
        cleatModel:'',
        shoeBrand:'',
        shoeModel:'',
        shoeSize:0,
        insoles:'',
        cleatAdjustments:'',
        cleatModifications:'',
        bikeLength:0, 
        mtbWheelSize:'29',
        mtbSeatPostType:'Rigid',
        mtbSaddleNoseToGripEnd:0,
        mtbSaddleToGripCenterDropRise:0,
        ttBasebarWidth:0,
        ttAerobarType:'Integrated',
        ttAerobarMakeModel:'',
        ttExtensionsShape:'',
        ttRisers:'',
        ttPadsMakeModel:'',
        ttSaddleToPadCenterDrop:0,
        ttSaddleNoseToPadRear:0,
        ttSaddleNoseToEndOfExtensions:0,
        ttExtensionWidthAtClamps:0,
        ttExtensionWidthAtEnd:0,
        ttExtensionAngle:0,
        ttPadWidth:0,
        ttPadXReachRearOfPad:0,
        ttPadXReachCenterOfPad:0,
        ttPadYStackRearOfPad:0,
        ttBasebarReachX:0,
        ttBasebarStackY:0,
        notes:'',
        confidentialNotes:''
      })

      this.setState({bikes:data, originalBikes:data, loading:false})

    }
  })
  
  }

saveBikeChanges=(e, bike, index,unsavedChanges,unsavedDateChanges, tempDateUpdated)=>{
  e.preventDefault()
  if(bike._id===null) this.createBike(bike)
  else this.updateBike(bike, index,unsavedChanges,unsavedDateChanges, tempDateUpdated)
  let originalBikes = Object.assign({},this.state.bikes)
  this.setState({originalBikes})
}

createBike=(bike) =>{

const jwt = auth.isAuthenticated()
  create({userId:jwt.user._id,cyclistId:this.props.cyclistId}, {t:jwt.token},bike).then((data) => {
    if (data.error) {
      this.setState({error: data.error})
    } else {
      this.setState({loading:true})
      this.loadBikeData()
    }
  })
}


deleteFitHistory=(bike, id)=>{

const jwt = auth.isAuthenticated()
bike.fitHistory.splice(id,1)


update({userId:jwt.user._id,cyclistId:this.props.cyclistId,bikeId:bike._id,updateLastUpdated:false},{t:jwt.token},bike)
.then((data) => {
    if (data.error) {
      this.setState({error: data.error})
    } else {
      this.setState({loading:true})
      this.loadBikeData()
    }
  })

}

updateBike =(bike, index,unsavedChanges,unsavedDateChanges,tempUpdatedDate) =>{

if(tempUpdatedDate!=='') bike.updated=tempUpdatedDate


const jwt = auth.isAuthenticated()
let today= new Date().toISOString().substring(0,10)
let updateLastUpdated=true

if(!unsavedChanges&&unsavedDateChanges)updateLastUpdated=false

if (unsavedChanges&&today!==bike.updated.substring(0,10)) {

  bike.updated=today
  

bike.fitHistory.push({

  date:                            new Date(this.state.originalBikes[index].updated).toISOString(),  
  saddleHeight:                    this.state.originalBikes[index].saddleHeight,
  saddleHeightBB:                  this.state.originalBikes[index].saddleHeightBB,                                                                       
  saddleSetBack:                   this.state.originalBikes[index].saddleSetBack,                                                                        
  saddleAngle:                     this.state.originalBikes[index].saddleAngle,                                                                          
  saddleNoseToBar:                 this.state.originalBikes[index].saddleNoseToBar,                                                                      
  saddleNoseToHood:                this.state.originalBikes[index].saddleNoseToHood,                                                                     
  saddleToBarDrop:                 this.state.originalBikes[index].saddleToBarDrop,                                                                      
  handlebarReachHX:                this.state.originalBikes[index].handlebarReachHX,                                                                     
  handlebarStackHY:                this.state.originalBikes[index].handlebarStackHY,                                                                     
  seatPostOffset:                  this.state.originalBikes[index].seatPostOffset,                                                                       
  saddleMake:                      this.state.originalBikes[index].saddleMake,                                                                           
  saddleModel:                     this.state.originalBikes[index].saddleModel,                                                                          
  saddleWidth:                     this.state.originalBikes[index].saddleWidth,                                                                          
  crankLength:                     this.state.originalBikes[index].crankLength,                                                                          
  pedalType:                       this.state.originalBikes[index].pedalType,                                                                            
  pedalMakeModel:                  this.state.originalBikes[index].pedalMakeModel,
  stemLength:                      this.state.originalBikes[index].stemLength,                                                                           
  stemType:                        this.state.originalBikes[index].stemType,                                                                            
  stemAngle:                       this.state.originalBikes[index].stemAngle,                                                                            
  spacersBelow:                    this.state.originalBikes[index].spacersBelow,                                                                         
  spacersAbove:                    this.state.originalBikes[index].spacersAbove,                                                                         
  handlebarWidth:                  this.state.originalBikes[index].handlebarWidth,                                                                       
  handlebarReach:                  this.state.originalBikes[index].handlebarReach,                                                                         
  ttBasebarWidth:                  this.state.originalBikes[index].ttBasebarWidth,                                                                         
  ttAerobarType:                   this.state.originalBikes[index].ttAerobarType,                                                                         
  ttAerobarMakeModel:              this.state.originalBikes[index].ttAerobarMakeModel,                                                                     
  ttExtensionsShape:               this.state.originalBikes[index].ttExtensionsShape,                                                                     
  ttRisers:                        this.state.originalBikes[index].ttRisers,                                                                      
  ttPadsMakeModel:                 this.state.originalBikes[index].ttPadsMakeModel,                                                                        
  ttSaddleToPadCenterDrop:         this.state.originalBikes[index].ttSaddleToPadCenterDrop,
  ttSaddleNoseToPadRear:           this.state.originalBikes[index].ttSaddleNoseToPadRear,                                                                 
  ttSaddleNoseToEndOfExtensions:   this.state.originalBikes[index].ttSaddleNoseToEndOfExtensions,
  ttExtensionWidthAtClamps:        this.state.originalBikes[index].ttExtensionWidthAtClamps,                                                            
  ttExtensionWidthAtEnd:           this.state.originalBikes[index].ttExtensionWidthAtEnd,                                                                     
  ttExtensionAngle:                this.state.originalBikes[index].ttExtensionAngle,                                                                           
  ttPadWidth:                      this.state.originalBikes[index].ttPadWidth,                                                                                         
  ttPadXReachRearOfPad:            this.state.originalBikes[index].ttPadXReachRearOfPad,
  ttPadXReachCenterOfPad:          this.state.originalBikes[index].ttPadXReachCenterOfPad,                                                                                 
  ttPadYStackRearOfPad:            this.state.originalBikes[index].ttPadYStackRearOfPad,                                                                               
  ttBasebarReachX:                 this.state.originalBikes[index].ttBasebarReachX,                                                                                      
  ttBasebarStackY:                 this.state.originalBikes[index].ttBasebarStackY,                                                                                             
  mtbSaddleNoseToGripEnd:          this.state.originalBikes[index].mtbSaddleNoseToGripEnd,                                                                                       
  mtbSaddleToGripCenterDropRise:   this.state.originalBikes[index].mtbSaddleToGripCenterDropRise,                                                                          
})
}

update({userId:jwt.user._id,cyclistId:this.props.cyclistId,bikeId:bike._id,updateLastUpdated:updateLastUpdated},{t:jwt.token},bike)
.then((data) => {
    if (data.error) {
      this.setState({error: data.error})
    } else {
      this.setState({loading:true})
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

handleDateChange=(bike, historyIndex, newDateString)=>{

let bikes = JSON.parse(JSON.stringify(this.state.bikes))

  bikes[bike].fitHistory[historyIndex].date=newDateString

  this.setState({bikes}) 

}


handleSelectTab=(key)=>{
  this.setState({key})
}

handleSelectSubTab=(subKey)=>{
  this.setState({subKey})
}

  render() {
//if(this.state.loading)return null

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
          
          if(i<this.state.bikes.length-1) return (
          <Tab eventKey={i+2} key={i} title={this.state.bikes[i].model || 'Unspecified'}>
          <Bike index={i}  cyclistId={this.props.cyclistId}
          bodyMeasurements={this.props.bodyMeasurements} cyclistAge={this.props.cyclistAge}
          cyclistProfile={this.props.cyclistProfile} notes={this.props.notes}
          softScores={this.props.softScores} user={this.props.user} shop={this.props.shop}
          updated={this.props.updated} logoUrl={this.props.logoUrl} handleChange={this.handleChange}
          handleCancel={this.handleCancel} saveBikeChanges={this.saveBikeChanges}
          userId={this.props.user.userId} bike={item} reloadBikes={this.loadBikeData}
          logoImage={this.props.logoImage} deleteFitHistory={this.deleteFitHistory} 
          handleDateChange={this.handleDateChange}
          handleDateLastUpdated={this.handleDateLastUpdated}
          handleSelectSubTab={this.handleSelectSubTab} subKey={this.state.subKey}
          originalBike={this.state.originalBikes[i]}/>
          </Tab>
          )
          else return (<Tab eventKey={i+2} key={i} title={"Add Bike"}><Bike index={i} cyclistId={this.props.cyclistId}
          bodyMeasurements={this.props.bodyMeasurements} cyclistAge={this.props.cyclistAge} cyclistProfile={this.props.cyclistProfile} notes={this.props.notes}
          softScores={this.props.softScores} user={this.props.user} shop={this.props.shop} updated={this.props.updated} logoUrl={this.props.logoUrl}
          handleChange={this.handleChange} handleCancel={this.handleCancel} saveBikeChanges={this.saveBikeChanges} userId={this.props.user.userId} bike={item}
          reloadBikes={this.loadBikeData}
          logoImage={this.props.logoImage} />
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