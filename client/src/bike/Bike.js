import React, { Component } from 'react'
import {InputGroup, OverlayTrigger, Tabs, Tab, Image, FormGroup, FormControl, ControlLabel, Popover, Button, ButtonToolbar, Glyphicon, Table, Panel} from "react-bootstrap"
import './Bike.css'
import DeleteBike from './DeleteBike'
import {bikePDF} from '../pdf/BikePdf'
import {validateMeasurement, validateMeasurementWithNegativeValues} from './../lib/form-validation'
import BikeMeasurement from './BikeMeasurement'
//import RoadBikeImage from './../assets/FitKit3Rd.png'
//import MTBbikeImage from './../assets/FitKit3MTB.png'  
//import TTbikeImage from './../assets/FitKit3TT.png'
//import handlebarImage from './../assets/handlebar.png'
//import saddleImage from './../assets/saddle.png'
//import {drawSVGLineArrow, drawSVGHorizontalLineArrow,drawSVGHorizontalLineArrowText, drawSVGVerticalLineArrowText, drawSVGVerticalLineDashed, drawSVGHorizontalLineDashed, drawAngledLineDashed, drawSVGAngledLineArrowText, drawSVGText, drawSVGVerticalLineArrow} from './../lib/svg-functions'
//import RoadBikeSVG from './RoadBikeSVG'
//import TTBikeSVG from './TTBikeSVG'
//import MTBBikeSVG from './MTBBikeSVG'
import roadBikeImage from './../assets/Bikes/roadannotated64'
import ttBikeImage from './../assets/Bikes/ttannotated64'
import mtbBikeImage from './../assets/Bikes/mtbannotated64'
import FitHistory from './FitHistory'


class Bike extends Component{
state={
//  activeMetric:'none',
  editFields:false,
  unsavedChanges:false,
  unsavedDateChanges:false,
  showPrinterIcon:true,
  tempUpdatedDate:''
 
}

/* handleSelectTab=(key)=>{
  this.setState({key})
}
 */

validateInputs=()=>{
const keys =  Object.keys(this.props.bike)

let allValid=true


  const checkInput=(item,index)=>{
    if(item==='mtbSaddleToGripCenterDropRise'&&validateMeasurementWithNegativeValues(this.props.bike[item])==='error') allValid=false
    if(item==='saddleSetBack'&&validateMeasurementWithNegativeValues(this.props.bike[item])==='error') allValid=false
    if(item==='saddleToBarDrop'&&validateMeasurementWithNegativeValues(this.props.bike[item])==='error') allValid=false
    if(item.includes("Angle")===false&&item!=='mtbSaddleToGripCenterDropRise'&&item!=='saddleSetBack'&&item!=='saddleToBarDrop'&&typeof this.props.originalBike[item]==="number" &&validateMeasurement(this.props.bike[item])==='error') allValid=false
    if(item.includes("Angle")===true&&typeof this.props.originalBike[item]==="number" &&validateMeasurementWithNegativeValues(this.props.bike[item])==='error') allValid=false
    
  }

  keys.forEach(checkInput)
  
  return allValid
}

handleChange = name => event => {
  if(!this.state.unsavedChanges)this.setState({unsavedChanges:true})
  this.props.handleChange(this.props.index,name,event.target.value)
  
  }

triggerUnsavedDateChanges=()=>{
  if(!this.state.unsavedDateChanges)this.setState({unsavedDateChanges:true})
}

/* handleDateChange = (newDateString) => {
//  console.log(event.currentTarget.dataset)
  if(!this.state.unsavedChanges)this.setState({unsavedChanges:true})
  this.props.handleDateChange(this.props.index,event.currentTarget.dataset.history,event.target.value)
  } */


handleDateLastUpdated=(value)=>{
//  console.log(value)
//    console.log("Bike JS Date Last Updated "+ value)
     if(!this.state.unsavedDateChanges)this.setState({unsavedDateChanges:true})
    const date=new Date(value+this.props.bike.updated.substring(10,23)).toISOString()
//    console.log(date)
    this.setState({tempUpdatedDate:date}) 
  }

saveBikeChanges=(e)=>{
  e.preventDefault()
  this.props.saveBikeChanges(e, this.props.bike, this.props.index,this.state.unsavedChanges,this.state.unsavedDateChanges,this.state.tempUpdatedDate)
  this.setState({unsavedChanges:false,unsavedDateChanges:false,editFields:false,tempUpdatedDate:''})
}

clickEdit=()=>{
  this.setState({editFields:true})
}

clickCancel=()=>{
  this.setState({unsavedChanges:false,tempUpdatedDate:'', unsavedDateChanges:false, editFields:false})
  this.props.handleCancel()
}

/* rowMouseEnter = (e) =>{
//  console.log(e.currentTarget.id)
     let value = e.currentTarget.id
    this.setState({activeMetric:value})
  }

tableMouseLeave =(e) =>{
    this.setState({activeMetric:'none'})
  } */

clickPDFButton=()=>{
 
      bikePDF(this.props.bodyMeasurements,this.props.softScores, this.props.cyclistAge, this.props.bike, 
      this.props.user, this.props.shop, this.props.cyclistProfile, this.props.bike.updated, this.props.notes, this.props.logoImage)
  
}

togglePrinterIcon=()=>{

this.setState({showPrinterIcon:!this.state.showPrinterIcon})

}

/*
canvasMouse =(canvas, e) =>{
      var rect = canvas.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
//      console.log("x: " + x + " y: " + y);
      
    }
*/

onMouseDownTown =(e) =>{
  let rect = e.currentTarget.getBoundingClientRect()
  let x= e.clientX - rect.left
  let y= e.clientY - rect.top
  console.log(x)
  console.log(y)

}

  render(){
 if(!this.props.bike||!this.props.originalBike) return null
//console.log(this.props.bike.updated)
    const popoverPrinterIcon = (
      <Popover id="popover-printer-icon">
       PDF Report.
      </Popover>
    );  

    const printerIcon = (
      <OverlayTrigger trigger={['hover','focus']}
      placement="bottom"
      overlay={popoverPrinterIcon}>
      <Button className="pull-right" bsStyle="link" bsSize="xsmall" onClick={this.clickPDFButton}>
        <Glyphicon glyph="print"/>
      </Button>
      </OverlayTrigger>
    )   

 
    const popoverFrameSize = (
      <Popover id="popover-framesize" title="Frame Size">
       Frame Size as stated by manufacturer.
      </Popover>
    );  
    
    const popoverFrameReach = (
      <Popover id="popover-framereach" title="Frame Reach">
       Horizontal distance from the middle of bottom bracket to middle of the top of the head tube. 
      </Popover>
    );      

    const popoverFrameStack = (
      <Popover id="popover-frameStack" title="Frame Stack">
       Vertical distance from the middle of bottom bracket to the top of the head tube. 
      </Popover>
    );    
    
    const popoverEffectiveTopTube = (
      <Popover id="popover-effectiveTopTube" title="Effective Top Tube">
       Horizontal distance from the center of the intersection of the top tube and head tube, to the centerline of the seat tube or seat post. 
      </Popover>
    );

    const popoverSeatPostOffset = (
      <Popover id="popover-seatPostOffset" title="Seat Post Offset">
       Horizontal distance from the center of the seat post to the center of the rail clamp. 
      </Popover>
    );

    const popoverCrankLength = (
      <Popover id="popover-crankLength" title="Crank Length">
       Length of cranks measured from center of bottom bracket axle to the center of the pedal spindle.  
      </Popover>
    );

    const popoverStemLength = (
      <Popover id="popover-stemLength" title="Stem Length">
       Length of stem measured from center of handlebar clamp to center of steerer tube.  
      </Popover>
    );

    const popoverStemAngle = (
      <Popover id="popover-stemAngle" title="Stem Angle">
       Angle of stem relative to steerer tube. Angle can be postive (rise) or negative (drop).   
      </Popover>
    );    

    const popoverSpacersBelow = (
      <Popover id="popover-spacersBelow" title="Spacers Below">
       Spacers below stem measured in millimeters.   
      </Popover>
    );    

    const popoverSpacersAbove = (
      <Popover id="popover-spacersAbove" title="Spacers Above">
       Spacers above stem measured in millimeters.   
      </Popover>
    );

    const popoverSaddleHeight = (
      <Popover id="popover-saddleheight" title="Saddle Height">
       Distance from pedal spindle center to saddle top with crank in line with seat tube.
      </Popover>
    );

    const popoverSaddleHeightBB = (
      <Popover id="popover-saddleheightBB" title="Saddle Height to BB">
       Distance from center of bottom bracket to saddle top.
      </Popover>
    );

    const popoverSaddleSetBack = (
      <Popover id="popover-saddleSetBack" title="Saddle Setback">
       Horizontal distance from nose of saddle to bottom bracket (positive values = saddle behind bottom bracket; negative values = saddle forward of bottom bracket).
      </Popover>
    );

    const popoverSaddleAngle = (
      <Popover id="popover-saddleAngle" title="Saddle Angle">
       Angle of saddle relative to level. Angle can be zero (level) positive (nose up) or negative (nose down).
      </Popover>
    );
    
    const popoverSaddleNoseToBar = (
      <Popover id="popover-saddleNoseToBar" title="Saddle Nose to Handlebar Center">
       Horizontal distance from nose of saddle to center of handlebars.
      </Popover>
    );

    const popoverSaddleNoseToGripEnd = (
      <Popover id="popover-saddleNoseToGripEnd" title="Saddle Nose to Grip End">
       Horizontal distance from nose of saddle to end of handlebar grips.
      </Popover>
    );

    const popoverSaddleNoseToHood = (
      <Popover id="popover-saddleNoseToHood" title="Saddle Nose to Hood Trough">
       Distance from nose of saddle to middle of hood trough--measured directly to account for any distance added by drop or rise.
      </Popover>
    );

    const popoverSaddleToBarDrop = (
      <Popover id="popover-saddleToBarDrop" title="Saddle To Bar Drop">
       Vertical distance from nose of saddle to handlebar (positive values = drop; negative values = rise).
      </Popover>
    );

    const popoverSaddleToPadCenterDrop = (
      <Popover id="popover-saddleToPadCenterDrop" title="Saddle To Pad (center) Drop">
       Vertical distance from nose of saddle to center of aerobar pads. 
      </Popover>
    );

    const popoverSaddleNoseToPadRear = (
      <Popover id="popover-saddleNoseToPadRear" title="Saddle Nose To Pad Rear">
       Distance from nose of saddle to rear of aerobar pads. 
      </Popover>
    );

    const popoverSaddleNoseToEndOfExtensions = (
      <Popover id="popover-saddleNoseToEndExtensions" title="Saddle Nose To End of Extensions">
       Distance from nose of saddle to end of aerobar extensions. 
      </Popover>
    );    

    const popoverExtensionWidthAtClamps = (
      <Popover id="popover-extensionWidthAtClamps" title="Extension Width At Clamps">
       Distance between areobar extensions at clamps. 
      </Popover>
    );    

    const popoverExtensionWidthAtEnd = (
      <Popover id="popover-extensionWidthAtEnd" title="Extension Width At End">
       Distance between areobar extensions at end of aerobar extensions. 
      </Popover>
    );        

    const popoverExtensionAngle = (
      <Popover id="popover-extensionAngle" title="Extension Angle">
       Angle of extensions relative to level.
      </Popover>
    );    
    
    const popoverSaddleToGripCenterDropRise = (
      <Popover id="popover-saddleToGripCenterDropRise" title="Saddle To Grip Center Drop/Rise">
       Vertical distance (positive or negative) from nose of saddle to center of handlebar grip (positive values = drop; negative values = rise).
      </Popover>
    );    

    const popoverHandlebarReachHX = (
      <Popover id="popover-handlebarReachHX" title="Handlebar Reach (HX)">
       Horizontal distance from bottom bracket to handlebar.
      </Popover>
    );

    const popoverHandlebarStackHY = (
      <Popover id="popover-handlebarStackHY" title="Handlebar Stack (HY)">
      Vertical distance from bottom bracket to handlebar.
      </Popover>
    );
    
    const popoverHandlebarWidth = (
      <Popover id="popover-handlebarwidth" title="Handlebar Width">
      Handlebar size measured from the center of the hoods (drop bar) or end to end (flat bar).
      </Popover>
    );

    const popoverBaseBarWidth = (
      <Popover id="popover-basebarwidth" title="Basebar Width">
      Distance between center point of the aerobar basebars.
      </Popover>
    );    

    const popoverPadWidth = (
      <Popover id="popover-aerobarpadwidth" title="Aerobar Pad Width">
      Distance between center point of the aerobar pads.
      </Popover>
    );

    const popoverPadXReachRear = (
      <Popover id="popover-padXReachRear" title="Pad X Reach to Rear of Pad">
      Distance from saddle nose to rear of aerobar pads.
      </Popover>
    );

    const popoverPadXReachCenter = (
      <Popover id="popover-padXReachCenter" title="Pad X Reach to Center of Pad">
      Distance from saddle nose to center of aerobar pads.
      </Popover>
    );    
    
    const popoverPadYStackRear = (
      <Popover id="popover-padYStackRear" title="Pad Y Stack to Rear of Pad">
      Vertical distance from bottom bracket to rear of aerobar pads.
      </Popover>
    );

    const popoverBasebarReachX = (
      <Popover id="popover-basebarReachX" title="Basebar Reach X">
      Distance from saddle nose to basebar.
      </Popover>
    );    

    const popoverBasebarStackY = (
      <Popover id="popover-basebarStackY" title="Basebar Stack Y">
      Vertical distance from bottom bracket to basebar.
      </Popover>
    );        
    
    const popoverBasebarAngle = (
      <Popover id="popover-basebarAngle" title="Basebar Angle">
      Angle of basebar relative to level.
      </Popover>
    );      

    const popoverHandlebarReach = (
      <Popover id="popover-handlebarreach" title="Handlebar Reach">
      Horizontal distance from center of handlebar to center of drops at longest point.
      </Popover>
    );

    const popoverSaddleWidth = (
      <Popover id="popover-saddlewidth" title="Saddle Width">
      Saddle width at the saddle's widest point. 
      </Popover>
    );

    const popoverHandlebarAngle = (
      <Popover id="popover-handlebarAngle" title="Handlebar Angle">
      Angle of handlebars relative to level. 
      </Popover>
    );

    const popoverHoodAngle = (
      <Popover id="popover-hoodAngle" title="Hood Angle">
      Angle of hoods relative to level. 
      </Popover>
    );

    const popoverShoeSize = (
      <Popover id="popover-shoeSize" title="Shoe Size">
      Cycling shoe size. 
      </Popover>
    );

    const popoverLastUpdated = (
      <Popover id="popover-lastUpdated">
      This date is automatically generated any time changes are made to this bike, but it can be set manually in Fit History after saving all other changes. 
      </Popover>
    );

let addClass=""

let addClassTwo=""
//let barText="Handlebar Width"
let dateString=''
//let dateCreated=''
//if(this.props.bike.type==="TT/Tri Bike") barText="Aerobar Pad Width"

if(this.state.unsavedChanges||this.state.unsavedDateChanges)addClassTwo="fks-color"

//if(this.props.bike.updated) dateString= new Date(this.props.bike.updated).toDateString(); else dateString=new Date().toDateString()
//let date
//const days=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

//const days=["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
//const months=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
//console.log(this.props.bike.updated)
//let myDate=new Date().toISOString()
//console.log(myDate)
//if(this.props.bike.updated) dateString= new Date(this.props.bike.updated).toISOString(); else date=new Date()

if(this.props.bike.updated) {
//  console.log( new Date(this.props.bike.updated).toDateString())
//  console.log(this.props.bike.updated)
  dateString=new Date(this.props.bike.updated).toDateString()
}

//console.log(date.getTimezoneOffset()/60)
//dateString=new Date(date.getTime()+date.getTimezoneOffset()/60)
//dateString=days[date.getDay()]+' '+months[date.getMonth()]+' '+date.getDate()+' '+date.getFullYear()

if(this.state.editFields) addClass="actualPadding"

let markerId=this.props.bike._id
if(markerId===null) markerId=Math.floor(Math.random()*100)+1
//if(this.props.bike.model==='Super Six EVO') console.log(this.props.bike.updated+' '+dateString)
let fitHistory=[]


if(this.props.bike._id!==null){
  let updatedValue= new Date(this.props.bike.updated).toISOString()
//  console.log(updatedValue)

  if(this.props.bike.fitHistory.length>0) fitHistory=this.props.bike.fitHistory.slice(0)

 
  if(this.state.tempUpdatedDate!==''){
 
     updatedValue=this.state.tempUpdatedDate
     dateString=new Date(updatedValue).toDateString()

  }

  fitHistory.push({
    date:                             updatedValue,  
    saddleHeight:                     this.props.bike.saddleHeight,
    saddleHeightBB:                   this.props.bike.saddleHeightBB,                                                                       
    saddleSetBack:                    this.props.bike.saddleSetBack,                                                                        
    saddleAngle:                      this.props.bike.saddleAngle,                                                                          
    saddleNoseToBar:                  this.props.bike.saddleNoseToBar,                                                                      
    saddleNoseToHood:                 this.props.bike.saddleNoseToHood,                                                                     
    saddleToBarDrop:                  this.props.bike.saddleToBarDrop,                                                                      
    handlebarReachHX:                 this.props.bike.handlebarReachHX,                                                                     
    handlebarStackHY:                 this.props.bike.handlebarStackHY,
    handlebarAngle:                   this.props.bike.handlebarAngle,
    hoodAngle:                        this.props.bike.hoodAngle,                                                                     
    seatPostOffset:                   this.props.bike.seatPostOffset,                                                                       
    saddleMake:                       this.props.bike.saddleMake,                                                                           
    saddleModel:                      this.props.bike.saddleModel,                                                                          
    saddleWidth:                      this.props.bike.saddleWidth,                                                                          
    crankLength:                      this.props.bike.crankLength,                                                                          
    pedalType:                        this.props.bike.pedalType,                                                                            
    pedalMakeModel:                   this.props.bike.pedalMakeModel,
    stemLength:                       this.props.bike.stemLength,                                                                           
    stemType:                         this.props.bike.stemType,                                                                            
    stemAngle:                        this.props.bike.stemAngle,                                                                            
    spacersBelow:                     this.props.bike.spacersBelow,                                                                         
    spacersAbove:                     this.props.bike.spacersAbove,                                                                         
    handlebarWidth:                   this.props.bike.handlebarWidth,                                                                       
    handlebarReach:                   this.props.bike.handlebarReach,                                                                         
    ttBasebarWidth:                   this.props.bike.ttBasebarWidth,                                                                         
    ttAerobarType:                    this.props.bike.ttAerobarType,                                                                         
    ttAerobarMakeModel:               this.props.bike.ttAerobarMakeModel,                                                                     
    ttExtensionsShape:                this.props.bike.ttExtensionsShape,                                                                     
    ttRisers:                         this.props.bike.ttRisers,                                                                      
    ttPadsMakeModel:                  this.props.bike.ttPadsMakeModel,                                                                        
    ttSaddleToPadCenterDrop:          this.props.bike.ttSaddleToPadCenterDrop,
    ttSaddleNoseToPadRear:            this.props.bike.ttSaddleNoseToPadRear,                                                                 
    ttSaddleNoseToEndOfExtensions:    this.props.bike.ttSaddleNoseToEndOfExtensions,
    ttExtensionWidthAtClamps:         this.props.bike.ttExtensionWidthAtClamps,                                                            
    ttExtensionWidthAtEnd:            this.props.bike.ttExtensionWidthAtEnd,                                                                     
    ttExtensionAngle:                 this.props.bike.ttExtensionAngle,                                                                           
    ttPadWidth:                       this.props.bike.ttPadWidth,                                                                                         
    ttPadXReachRearOfPad:             this.props.bike.ttPadXReachRearOfPad,
    ttPadXReachCenterOfPad:           this.props.bike.ttPadXReachCenterOfPad,                                                                                 
    ttPadYStackRearOfPad:             this.props.bike.ttPadYStackRearOfPad,                                                                               
    ttBasebarReachX:                  this.props.bike.ttBasebarReachX,                                                                                      
    ttBasebarStackY:                  this.props.bike.ttBasebarStackY,   
    ttBasebarAngle:                   this.props.bike.ttBasebarAngle,                                                                                          
    mtbSaddleNoseToGripEnd:           this.props.bike.mtbSaddleNoseToGripEnd,                                                                                       
    mtbSaddleToGripCenterDropRise:    this.props.bike.mtbSaddleToGripCenterDropRise,                                                                          
  })

}

let saveDisabled=true
if(this.state.unsavedChanges||this.state.unsavedDateChanges) saveDisabled=false
if(this.validateInputs()===false) saveDisabled=true

return(
      <div className="">
      <Panel >
        <Panel.Heading>
          <Panel.Title >
          <OverlayTrigger trigger={['hover','focus']}
          placement="bottom"
          overlay={popoverLastUpdated}>
            <span>
           {this.props.bike.make+' '+this.props.bike.model+' (Last updated: '+dateString+')'}
           </span>
           </OverlayTrigger>
            <DeleteBike bike={this.props.bike} reloadBikes={this.props.reloadBikes} cyclistProfile={this.props.cyclistProfile} cyclistId={this.props.cyclistId} togglePrinterIcon={this.togglePrinterIcon}/>

            {this.state.showPrinterIcon&&printerIcon}

          </Panel.Title>
        </Panel.Heading>
        <Panel.Body>

{/*<BikeImageCanvas godMode={false} bikeType={this.props.bike.type} onMouseMove={this.canvasMouse} activeMetric={this.state.activeMetric}/>*/}

{/* {this.props.bike.type!=="Mountain Bike"&&this.props.bike.type!=="TT/Tri Bike"&&<RoadBikeSVG markerId={markerId} onMouseDown={this.onMouseDownTown}/>}  */}
{/* {this.props.bike.type==="Mountain Bike"&&<MTBBikeSVG markerId={markerId} onMouseDown={this.onMouseDownTown}/>} {/*<Image className="bikeTabImage" src={MTBbikeImage}/>}*/} 
{/* {this.props.bike.type==="TT/Tri Bike"&&<TTBikeSVG markerId={markerId} onMouseDown={this.onMouseDownTown}/>}{/*<Image className="bikeTabImage" src={TTbikeImage}/>}*/} 

{this.props.bike.type!=="Mountain Bike"&&this.props.bike.type!=="TT/Tri Bike"&&<Image responsive className="bikeTabImage" src={roadBikeImage.src}/>}
{this.props.bike.type==="Mountain Bike"&&<Image responsive className="bikeTabImage" src={mtbBikeImage.src}/>}
{this.props.bike.type==="TT/Tri Bike"&&<Image responsive className="bikeTabImage" src={ttBikeImage.src}/>}



<ButtonToolbar className='saveEditPullRight'>
      <Button type="button" className={addClassTwo} disabled={saveDisabled} onClick={this.saveBikeChanges}>Save Changes</Button>
      {!this.state.editFields&&<Button onClick={this.clickEdit}>Edit</Button>}
      {this.state.editFields&&<Button onClick={this.clickCancel}>Cancel</Button>}
      </ButtonToolbar>

  <Tabs className="fks-tabs" id="controlled-tabs2" activeKey={this.props.subKey} onSelect={this.props.handleSelectSubTab}>
  <Tab eventKey={"1"} title="Equipment">
<Table className={addClass} bordered striped hover responsive onMouseLeave={this.tableMouseLeave}>
  <tbody>
  <tr name="type" id="none" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td><FormControl.Static className="form-control-static">Type:</FormControl.Static></td>
      <td>{this.state.editFields&&
          <InputGroup className="bikeActualInput">
          <FormControl componentClass="select" placeholder="Road Bike" bsSize="sm" value={this.props.bike.type} onChange={this.handleChange("type")}>
          <option value="Road Bike">Road Bike</option>
          <option value="Mountain Bike">Mountain Bike</option>
          <option value="TT/Tri Bike">TT/Tri Bike</option>
          <option value="Gravel">Gravel</option>
          <option value="Cyclocross">Cyclocross</option>
          <option value="Touring or Commuting">Touring or Commuting</option>
          <option value="Tandem">Tandem</option>
          </FormControl>
          
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static className="form-control-static">{this.props.bike.type}</FormControl.Static>}
      </td>
    </tr>
  <tr name="brand" id="none" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td className="bikeCol1"><FormControl.Static className="form-control-static">Make:</FormControl.Static></td>
      <td>{this.state.editFields&&
          <InputGroup className="bikeActualInput">
          <FormControl bsSize="sm" value={this.props.bike.make} onChange={this.handleChange("make")}/>
          
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static className="form-control-static">{this.props.bike.make}</FormControl.Static>}
      </td>
    </tr>
    <tr name="model" id="none" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td><FormControl.Static className="form-control-static">Model:</FormControl.Static></td>
      <td>{this.state.editFields&&
          <InputGroup className="bikeActualInput">
          <FormControl bsSize="sm" value={this.props.bike.model} onChange={this.handleChange("model")}/>
          
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static className="form-control-static">{this.props.bike.model}</FormControl.Static>}
      </td>
    </tr>

{this.props.bike.type==="Mountain Bike"&& <tr name="type" id="none" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td><FormControl.Static className="form-control-static">Wheel Size:</FormControl.Static></td>
      <td>{this.state.editFields&&
          <InputGroup className="bikeActualInput">
          <FormControl componentClass="select" bsSize="sm" value={this.props.bike.mtbWheelSize} onChange={this.handleChange("mtbWheelSize")}>
          <option value="29">29</option>
          <option value="27.5">27.5</option>
          <option value="26">26</option>
          </FormControl>
          
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static className="form-control-static">{this.props.bike.mtbWheelSize}</FormControl.Static>}
      </td>
    </tr>
}





    <OverlayTrigger trigger={['hover','focus']}
    placement="bottom"
    overlay={popoverFrameSize}>
    <tr name="fSize" id="frameSize" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td><FormControl.Static className="form-control-static">Frame Size (manufacturer):</FormControl.Static></td>
      <td>{this.state.editFields&&
          <InputGroup className="bikeActualInput">
          <FormControl bsSize="sm" value={this.props.bike.frameSize} onChange={this.handleChange("frameSize")}/>
{/*          <InputGroup.Addon>cm.</InputGroup.Addon>*/}
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static className="form-control-static">{this.props.bike.frameSize}</FormControl.Static>}
      </td>

    </tr>
    </OverlayTrigger>


<BikeMeasurement  show={this.props.bike.type}                  title="Frame Reach"         id="frameReach"        overlay={popoverFrameReach}        editFields={this.state.editFields}  bike={this.props.bike}  originalBike={this.props.originalBike}  handleChange={this.handleChange}/> 
<BikeMeasurement  show={this.props.bike.type}                  title="Frame Stack"         id="frameStack"        overlay={popoverFrameStack}        editFields={this.state.editFields}  bike={this.props.bike}  originalBike={this.props.originalBike}  handleChange={this.handleChange}/> 
<BikeMeasurement  show={this.props.bike.type}                  title="Effective Top Tube"  id="effectiveTopTube"  overlay={popoverEffectiveTopTube}  editFields={this.state.editFields}  bike={this.props.bike}  originalBike={this.props.originalBike}  handleChange={this.handleChange}/> 
<BikeMeasurement  show={this.props.bike.type==="TT/Tri Bike"}  title="Basebar Width"       id="ttBasebarWidth"    overlay={popoverBaseBarWidth}      editFields={this.state.editFields}  bike={this.props.bike}  originalBike={this.props.originalBike}  handleChange={this.handleChange}/> 

 

{this.props.bike.type==="TT/Tri Bike"&& <tr name="type" id="none" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
<td><FormControl.Static className="form-control-static">Aerobar Type:</FormControl.Static></td>
<td>{this.state.editFields&&
    <InputGroup className="bikeActualInput">
    <FormControl componentClass="select" bsSize="sm" value={this.props.bike.ttAerobarType} onChange={this.handleChange("ttAerobarType")}>
    <option value="Clip-on">Clip-on</option>
    <option value="Integrated">Integrated</option>
    </FormControl>
    
    </InputGroup>}
    {!this.state.editFields&&
    <FormControl.Static className="form-control-static">{this.props.bike.ttAerobarType}</FormControl.Static>}
</td>
</tr>
}

{this.props.bike.type==='TT/Tri Bike'&&
<tr name="aerobrand" id="none" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td className="bikeCol1"><FormControl.Static className="form-control-static">Aerobar Make/Model</FormControl.Static></td>
      <td>{this.state.editFields&&
          <InputGroup className="bikeActualInput">
          <FormControl bsSize="sm" value={this.props.bike.ttAerobarMakeModel} onChange={this.handleChange("ttAerobarMakeModel")}/>
          
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static className="form-control-static">{this.props.bike.ttAerobarMakeModel}</FormControl.Static>}
      </td>
    </tr>
}

{this.props.bike.type==='TT/Tri Bike'&&
<tr name="extensions" id="none" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td className="bikeCol1"><FormControl.Static className="form-control-static">Extensions--Shape</FormControl.Static></td>
      <td>{this.state.editFields&&
          <InputGroup className="bikeActualInput">
          <FormControl bsSize="sm" value={this.props.bike.ttExtensionsShape} onChange={this.handleChange("ttExtensionsShape")}/>
          
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static className="form-control-static">{this.props.bike.ttExtensionsShape}</FormControl.Static>}
      </td>
    </tr>
}

{this.props.bike.type==='TT/Tri Bike'&&
<tr name="risers" id="none" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td className="bikeCol1"><FormControl.Static className="form-control-static">Risers</FormControl.Static></td>
      <td>{this.state.editFields&&
          <InputGroup className="bikeActualInput">
          <FormControl bsSize="sm" value={this.props.bike.ttRisers} onChange={this.handleChange("ttRisers")}/>
          
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static className="form-control-static">{this.props.bike.ttRisers}</FormControl.Static>}
      </td>
    </tr>
}

{this.props.bike.type==='TT/Tri Bike'&&
<tr name="pads" id="none" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td className="bikeCol1"><FormControl.Static className="form-control-static">Pads Make/Model</FormControl.Static></td>
      <td>{this.state.editFields&&
          <InputGroup className="bikeActualInput">
          <FormControl bsSize="sm" value={this.props.bike.ttPadsMakeModel} onChange={this.handleChange("ttPadsMakeModel")}/>
          
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static className="form-control-static">{this.props.bike.ttPadsMakeModel}</FormControl.Static>}
      </td>
    </tr>
}

{this.props.bike.type==="TT/Tri Bike"&& <tr name="type" id="none" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
<td><FormControl.Static className="form-control-static">Stem Type:</FormControl.Static></td>
<td>{this.state.editFields&&
    <InputGroup className="bikeActualInput">
    <FormControl componentClass="select" bsSize="sm" value={this.props.bike.stemType} onChange={this.handleChange("stemType")}>
    <option value="Standard">Standard</option>
    <option value="Integrated">Integrated</option>
    </FormControl>
    
    </InputGroup>}
    {!this.state.editFields&&
    <FormControl.Static className="form-control-static">{this.props.bike.stemType}</FormControl.Static>}
</td>
</tr>
}


<BikeMeasurement  show={this.props.bike.type}                  title="Stem Length"        id="stemLength"     overlay={popoverStemLength}     editFields={this.state.editFields}  bike={this.props.bike}  originalBike={this.props.originalBike}  handleChange={this.handleChange}/> 
<BikeMeasurement  show={this.props.bike.type}                  title="Stem Angle"         id="stemAngle"      overlay={popoverStemAngle}      editFields={this.state.editFields}  bike={this.props.bike}  originalBike={this.props.originalBike}  handleChange={this.handleChange}/> 
<BikeMeasurement  show={this.props.bike.type}                  title="Spacers Below Stem" id="spacersBelow"   overlay={popoverSpacersBelow}   editFields={this.state.editFields}  bike={this.props.bike}  originalBike={this.props.originalBike}  handleChange={this.handleChange}/> 
<BikeMeasurement  show={this.props.bike.type}                  title="Spacers Above Stem" id="spacersAbove"   overlay={popoverSpacersAbove}   editFields={this.state.editFields}  bike={this.props.bike}  originalBike={this.props.originalBike}  handleChange={this.handleChange}/> 

<BikeMeasurement  show={this.props.bike.type!=="TT/Tri Bike"}  title="Handlebar Width"    id="handlebarWidth" overlay={popoverHandlebarWidth} editFields={this.state.editFields}  bike={this.props.bike}  originalBike={this.props.originalBike}  handleChange={this.handleChange}/> 

<BikeMeasurement  show={this.props.bike.type!=="Mountain Bike"&&this.props.bike.type!=="TT/Tri Bike"}  title="Handlebar Reach"    id="handlebarReach" overlay={popoverHandlebarReach} editFields={this.state.editFields}  bike={this.props.bike}  originalBike={this.props.originalBike}  handleChange={this.handleChange}/> 


{this.props.bike.type==="Mountain Bike"&& <tr name="type" id="none" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
<td><FormControl.Static className="form-control-static">Seat Post Type:</FormControl.Static></td>
<td>{this.state.editFields&&
    <InputGroup className="bikeActualInput">
    <FormControl componentClass="select" bsSize="sm" value={this.props.bike.mtbSeatPostType} onChange={this.handleChange("mtbSeatPostType")}>
    <option value="Rigid">Rigid</option>
    <option value="Suspension">Suspension</option>
    <option value="Dropper">Dropper</option>
    </FormControl>
    
    </InputGroup>}
    {!this.state.editFields&&
    <FormControl.Static className="form-control-static">{this.props.bike.mtbSeatPostType}</FormControl.Static>}
</td>
</tr>
}

<BikeMeasurement  show={this.props.bike.type!=="TT/Tri Bike"}  title="Seat Post Offset"    id="seatPostOffset" overlay={popoverSeatPostOffset} editFields={this.state.editFields}  bike={this.props.bike}  originalBike={this.props.originalBike}  handleChange={this.handleChange}/> 


    <tr name="sMake" id="none" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td><FormControl.Static className="form-control-static">Saddle Make:</FormControl.Static></td>
      <td>{this.state.editFields&&
          <InputGroup className="bikeActualInput">
          <FormControl bsSize="sm" value={this.props.bike.saddleMake} onChange={this.handleChange("saddleMake")}/>
          
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static className="form-control-static">{this.props.bike.saddleMake}</FormControl.Static>}
      </td>
    </tr>
    <tr name="sModel" id="none" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td><FormControl.Static className="form-control-static">Saddle Model:</FormControl.Static></td>
      <td>{this.state.editFields&&
          <InputGroup className="bikeActualInput">
          <FormControl bsSize="sm" value={this.props.bike.saddleModel} onChange={this.handleChange("saddleModel")}/>
          
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static className="form-control-static">{this.props.bike.saddleModel}</FormControl.Static>}
      </td>
    </tr>


<BikeMeasurement  show={this.props.bike.type!=="TT/Tri Bike"}  title="Saddle Width"    id="saddleWidth" overlay={popoverSaddleWidth} editFields={this.state.editFields}  bike={this.props.bike}  originalBike={this.props.originalBike}  handleChange={this.handleChange}/> 

<BikeMeasurement  show={this.props.bike.type}                  title="Crank Length" id="crankLength"    overlay={popoverCrankLength} editFields={this.state.editFields}  bike={this.props.bike}  originalBike={this.props.originalBike}  handleChange={this.handleChange}/> 

    <tr name="pedal type" id="none" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td><FormControl.Static className="form-control-static">Pedal Type:</FormControl.Static></td>
      <td>{this.state.editFields&&
          <InputGroup className="bikeActualInput">
          <FormControl componentClass="select" placeholder="Road" bsSize="sm" value={this.props.bike.pedalType} onChange={this.handleChange("pedalType")}>
          <option value="Road">Road</option>
          <option value="MTB">MTB</option>
          <option value="Flat">Flat</option>
          </FormControl>
          
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static className="form-control-static">{this.props.bike.pedalType}</FormControl.Static>}
      </td>
    </tr>


    <tr name="pSystem" id="none" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td><FormControl.Static className="form-control-static">Pedal Make/Model:</FormControl.Static></td>
      <td>{this.state.editFields&&
          <InputGroup className="bikeActualInput">
          <FormControl bsSize="sm" value={this.props.bike.pedalMakeModel} onChange={this.handleChange("pedalMakeModel")}/>
          
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static className="form-control-static">{this.props.bike.pedalMakeModel}</FormControl.Static>}
      </td>
    </tr>



    <tr name="shifter type" id="none" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td><FormControl.Static className="form-control-static">Shifters:</FormControl.Static></td>
      <td>{this.state.editFields&&
          <InputGroup className="bikeActualInput">
          <FormControl componentClass="select" placeholder="Mechanical" bsSize="sm" value={this.props.bike.shifterType} onChange={this.handleChange("shifterType")}>
          <option value="Mechanical">Mechanical</option>
          <option value="Electronic">Electronic</option>
          </FormControl>
          
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static className="form-control-static">{this.props.bike.shifterType}</FormControl.Static>}
      </td>
    </tr>

    <tr name="brake type" id="none" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td><FormControl.Static className="form-control-static">Brakes:</FormControl.Static></td>
      <td>{this.state.editFields&&
          <InputGroup className="bikeActualInput">
          <FormControl componentClass="select" placeholder="Rim" bsSize="sm" value={this.props.bike.brakeType} onChange={this.handleChange("brakeType")}>
          <option value="Rim">Rim</option>
          <option value="Disc">Disc</option>
          </FormControl>
          
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static className="form-control-static">{this.props.bike.brakeType}</FormControl.Static>}
      </td>
    </tr>


  </tbody>
</Table>
</Tab>
<Tab eventKey={"2"} title="Fit Position">
<Table className={addClass} bordered striped hover responsive onMouseLeave={this.tableMouseLeave}>
<tbody>

<BikeMeasurement  show={this.props.bike.type}   title="Saddle Height (saddle to pedal spindle)"  id="saddleHeight"      overlay={popoverSaddleHeight}    editFields={this.state.editFields}  bike={this.props.bike}  originalBike={this.props.originalBike}  handleChange={this.handleChange}/> 
<BikeMeasurement  show={this.props.bike.type}   title="Saddle Height (saddle to bottom bracket)" id="saddleHeightBB"    overlay={popoverSaddleHeightBB}  editFields={this.state.editFields}  bike={this.props.bike}  originalBike={this.props.originalBike}  handleChange={this.handleChange}/> 
<BikeMeasurement  show={this.props.bike.type}   title="Saddle Setback (from bottom bracket)"     id="saddleSetBack"     overlay={popoverSaddleSetBack}   editFields={this.state.editFields}  bike={this.props.bike}  originalBike={this.props.originalBike}  handleChange={this.handleChange}/> 
<BikeMeasurement  show={this.props.bike.type}   title="Saddle Angle"                             id="saddleAngle"       overlay={popoverSaddleAngle}     editFields={this.state.editFields}  bike={this.props.bike}  originalBike={this.props.originalBike}  handleChange={this.handleChange}/> 

<BikeMeasurement  show={this.props.bike.type!=="TT/Tri Bike"}   title="Saddle Nose To Bar Center"                id="saddleNoseToBar"                   overlay={popoverSaddleNoseToBar}               editFields={this.state.editFields}  bike={this.props.bike}  originalBike={this.props.originalBike}  handleChange={this.handleChange}/> 
        
<BikeMeasurement  show={this.props.bike.type==="TT/Tri Bike"}   title="Saddle To Pad (center) Drop"              id="ttSaddleToPadCenterDrop"           overlay={popoverSaddleToPadCenterDrop}         editFields={this.state.editFields}  bike={this.props.bike}  originalBike={this.props.originalBike}  handleChange={this.handleChange}/> 
<BikeMeasurement  show={this.props.bike.type==="TT/Tri Bike"}   title="Saddle Nose To Pad Rear"                  id="ttSaddleNoseToPadRear"             overlay={popoverSaddleNoseToPadRear}           editFields={this.state.editFields}  bike={this.props.bike}  originalBike={this.props.originalBike}  handleChange={this.handleChange}/> 
<BikeMeasurement  show={this.props.bike.type==="TT/Tri Bike"}   title="Saddle Nose To End of Extentions"         id="ttSaddleNoseToEndOfExtensions"     overlay={popoverSaddleNoseToEndOfExtensions}   editFields={this.state.editFields}  bike={this.props.bike}  originalBike={this.props.originalBike}  handleChange={this.handleChange}/> 
<BikeMeasurement  show={this.props.bike.type==="TT/Tri Bike"}   title="Extension Width At Clamps"                id="ttExtensionWidthAtClamps"          overlay={popoverExtensionWidthAtClamps}        editFields={this.state.editFields}  bike={this.props.bike}  originalBike={this.props.originalBike}  handleChange={this.handleChange}/> 
<BikeMeasurement  show={this.props.bike.type==="TT/Tri Bike"}   title="Extension Width At End"                   id="ttExtensionWidthAtEnd"             overlay={popoverExtensionWidthAtEnd}           editFields={this.state.editFields}  bike={this.props.bike}  originalBike={this.props.originalBike}  handleChange={this.handleChange}/> 
<BikeMeasurement  show={this.props.bike.type==="TT/Tri Bike"}   title="Extension Angle"                          id="ttExtensionAngle"                  overlay={popoverExtensionAngle}                editFields={this.state.editFields}  bike={this.props.bike}  originalBike={this.props.originalBike}  handleChange={this.handleChange}/> 
<BikeMeasurement  show={this.props.bike.type==="TT/Tri Bike"}   title="Pad Width"                                id="ttPadWidth"                        overlay={popoverPadWidth}                      editFields={this.state.editFields}  bike={this.props.bike}  originalBike={this.props.originalBike}  handleChange={this.handleChange}/> 
<BikeMeasurement  show={this.props.bike.type==="TT/Tri Bike"}   title="Pad X Reach (rear of pad)"                id="ttPadXReachRearOfPad"              overlay={popoverPadXReachRear}                 editFields={this.state.editFields}  bike={this.props.bike}  originalBike={this.props.originalBike}  handleChange={this.handleChange}/> 
<BikeMeasurement  show={this.props.bike.type==="TT/Tri Bike"}   title="Pad X Reach (center of pad)"              id="ttPadXReachCenterOfPad"            overlay={popoverPadXReachCenter}               editFields={this.state.editFields}  bike={this.props.bike}  originalBike={this.props.originalBike}  handleChange={this.handleChange}/> 
<BikeMeasurement  show={this.props.bike.type==="TT/Tri Bike"}   title="Pad Y Stack (rear of pad)"                id="ttPadYStackRearOfPad"              overlay={popoverPadYStackRear}                 editFields={this.state.editFields}  bike={this.props.bike}  originalBike={this.props.originalBike}  handleChange={this.handleChange}/> 
<BikeMeasurement  show={this.props.bike.type==="TT/Tri Bike"}   title="Basebar Reach (X)"                        id="ttBasebarReachX"                   overlay={popoverBasebarReachX}                 editFields={this.state.editFields}  bike={this.props.bike}  originalBike={this.props.originalBike}  handleChange={this.handleChange}/> 
<BikeMeasurement  show={this.props.bike.type==="TT/Tri Bike"}   title="Basebar Stack (Y)"                        id="ttBasebarStackY"                   overlay={popoverBasebarStackY}                 editFields={this.state.editFields}  bike={this.props.bike}  originalBike={this.props.originalBike}  handleChange={this.handleChange}/> 
<BikeMeasurement  show={this.props.bike.type==="TT/Tri Bike"}   title="Basebar Angle"                            id="ttBasebarAngle"                    overlay={popoverBasebarAngle}                  editFields={this.state.editFields}  bike={this.props.bike}  originalBike={this.props.originalBike}  handleChange={this.handleChange}/> 

<BikeMeasurement  show={this.props.bike.type!=='Mountain Bike'&&this.props.bike.type!=='TT/Tri Bike'}   title="Saddle Nose To Hood Trough"      id="saddleNoseToHood"    overlay={popoverSaddleNoseToHood}   editFields={this.state.editFields}  bike={this.props.bike}  originalBike={this.props.originalBike}  handleChange={this.handleChange}/> 

<BikeMeasurement  show={this.props.bike.type==='Mountain Bike'}   title="Saddle Nose To Grip End"              id="mtbSaddleNoseToGripEnd"           overlay={popoverSaddleNoseToGripEnd}          editFields={this.state.editFields}  bike={this.props.bike}  originalBike={this.props.originalBike}  handleChange={this.handleChange}/> 
<BikeMeasurement  show={this.props.bike.type==='Mountain Bike'}   title="Saddle To Grip Center Drop/Rise"      id="mtbSaddleToGripCenterDropRise"    overlay={popoverSaddleToGripCenterDropRise}   editFields={this.state.editFields}  bike={this.props.bike}  originalBike={this.props.originalBike}  handleChange={this.handleChange}/> 

<BikeMeasurement  show={this.props.bike.type!=="Mountain Bike"&&this.props.bike.type!=="TT/Tri Bike"}   title="Saddle To Bar Drop"      id="saddleToBarDrop"    overlay={popoverSaddleToBarDrop}   editFields={this.state.editFields}  bike={this.props.bike}  originalBike={this.props.originalBike}  handleChange={this.handleChange}/> 

<BikeMeasurement  show={this.props.bike.type!=="TT/Tri Bike"}   title="Handlebar Reach (HX)"   id="handlebarReachHX"  overlay={popoverHandlebarReachHX}   editFields={this.state.editFields}  bike={this.props.bike}  originalBike={this.props.originalBike}  handleChange={this.handleChange}/> 
<BikeMeasurement  show={this.props.bike.type!=="TT/Tri Bike"}   title="Handlebar Stack (HY)"   id="handlebarStackHY"  overlay={popoverHandlebarStackHY}   editFields={this.state.editFields}  bike={this.props.bike}  originalBike={this.props.originalBike}  handleChange={this.handleChange}/> 

<BikeMeasurement  show={this.props.bike.type!=='Mountain Bike'&&this.props.bike.type!=='TT/Tri Bike'}   title="Handlebar Angle"      id="handlebarAngle"    overlay={popoverHandlebarAngle}   editFields={this.state.editFields}  bike={this.props.bike}  originalBike={this.props.originalBike}  handleChange={this.handleChange}/> 
<BikeMeasurement  show={this.props.bike.type!=='Mountain Bike'&&this.props.bike.type!=='TT/Tri Bike'}   title="Hood Angle"           id="hoodAngle"         overlay={popoverHoodAngle}        editFields={this.state.editFields}  bike={this.props.bike}  originalBike={this.props.originalBike}  handleChange={this.handleChange}/> 


</tbody>
</Table>
  </Tab>

  <Tab eventKey={"3"} title="Shoes/Cleats">
<Table className={addClass} bordered striped hover responsive onMouseLeave={this.tableMouseLeave}>
<tbody>
    <tr name="shoeBrand" id="shoeBrand">
      <td><FormControl.Static className="form-control-static">Shoe Brand:</FormControl.Static></td>
      <td>{this.state.editFields&&
          <InputGroup className="bikeActualInput">
          <FormControl bsSize="sm" value={this.props.bike.shoeBrand} onChange={this.handleChange("shoeBrand")}/>
          
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static className="form-control-static">{this.props.bike.shoeBrand}</FormControl.Static>}
      </td>
    </tr>

    <tr name="shoeModel" id="shoeModel">
      <td><FormControl.Static className="form-control-static">Shoe Model:</FormControl.Static></td>
      <td>{this.state.editFields&&
          <InputGroup className="bikeActualInput">
          <FormControl bsSize="sm" value={this.props.bike.shoeModel} onChange={this.handleChange("shoeModel")}/>
          
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static className="form-control-static">{this.props.bike.shoeModel}</FormControl.Static>}
      </td>
    </tr>

    <BikeMeasurement  show={this.props.bike.type}   title="Shoe Size"  id="shoeSize"   overlay={popoverShoeSize}     editFields={this.state.editFields}  bike={this.props.bike}  originalBike={this.props.originalBike}  handleChange={this.handleChange}/> 


    <tr name="insoles" id="insoles">
      <td><FormControl.Static className="form-control-static">Insoles:</FormControl.Static></td>
      <td>{this.state.editFields&&
          <InputGroup className="bikeActualInput">
          <FormControl bsSize="sm" value={this.props.bike.insoles} onChange={this.handleChange("insoles")}/>
          
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static className="form-control-static">{this.props.bike.insoles}</FormControl.Static>}
      </td>
    </tr>
    <tr name="cleatModel" id="cleatModel">
      <td><FormControl.Static className="form-control-static">Cleat Model:</FormControl.Static></td>
      <td>{this.state.editFields&&
          <InputGroup className="bikeActualInput">
          <FormControl bsSize="sm" value={this.props.bike.cleatModel} onChange={this.handleChange("cleatModel")}/>
          
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static className="bikeActualInput form-control-static">{this.props.bike.cleatModel}</FormControl.Static>}
      </td>
    </tr>
    <tr name="cleatAdjustments" id="cleatAdjustments">
      <td><FormControl.Static className="form-control-static">Cleat Adjustments:</FormControl.Static></td>
      <td>{this.state.editFields&&
          <InputGroup className="bikeActualInput">
 {/*         <FormControl bsSize="sm" value={this.props.bike.cleatAdjustments} onChange={this.handleChange("cleatAdjustments")}/>*/}
          <FormControl componentClass="textarea" rows="8" spellCheck placeholder="Enter notes here." value={this.props.bike.cleatAdjustments} onChange={this.handleChange("cleatAdjustments")}></FormControl>
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static componentClass="textarea" rows="8" placeholder="" disabled={true} className="form-control-static bikeTextArea" value={this.props.bike.cleatAdjustments}></FormControl.Static>}
      </td>
    </tr>

    <tr name="cleatModifications" id="cleatModifications">
      <td><FormControl.Static className="form-control-static">Foot/Pedal Notes:</FormControl.Static></td>
      <td>{this.state.editFields&&
          <InputGroup className="bikeActualInput">
{/*          <FormControl bsSize="sm" value={this.props.bike.cleatModifications} onChange={this.handleChange("cleatModifications")}/>*/}
          <FormControl componentClass="textarea" rows="8" spellCheck placeholder="Enter notes here." value={this.props.bike.cleatModifications} onChange={this.handleChange("cleatModifications")}></FormControl>          
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static componentClass="textarea" rows="8" placeholder="" disabled={true} className="form-control-static bikeTextArea"value={this.props.bike.cleatModifications}></FormControl.Static>}
      </td>
    </tr>

</tbody>
</Table>
</Tab>
<Tab eventKey={"4"} title="Notes">
{this.state.editFields&&
  <React.Fragment>
<Panel>
  <Panel.Body className="input-panel">
<FormGroup>
<ControlLabel>Shared Notes</ControlLabel>
<FormControl componentClass="textarea" disabled={false} rows="8" spellCheck placeholder="Enter shared notes here (these notes appear on PDF Bike Fit Report)." value={this.props.bike.notes} onChange={this.handleChange("notes")}></FormControl>
</FormGroup>
<FormGroup>
<ControlLabel>Confidential Notes</ControlLabel>
<FormControl componentClass="textarea" disabled={false} rows="8" spellCheck placeholder="Enter confidential notes here (these notes will not appear on PDF reports)." value={this.props.bike.confidentialNotes} onChange={this.handleChange("confidentialNotes")}></FormControl>
</FormGroup>
</Panel.Body>
</Panel>
</React.Fragment>}
{!this.state.editFields&&
<React.Fragment>
<Panel>
  <Panel.Body className="input-panel">
<FormGroup>
<ControlLabel>Shared Notes</ControlLabel>
<FormControl componentClass="textarea"  className="bikeTextArea" disabled={true} rows="8" value={this.props.bike.notes} onChange={this.handleChange("notes")}>
</FormControl>
</FormGroup>
<FormGroup>
<ControlLabel>Confidential Notes</ControlLabel>
<FormControl componentClass="textarea"  className="bikeTextArea" disabled={true} rows="8" value={this.props.bike.confidentialNotes} onChange={this.handleChange("confidentialNotes")}>
</FormControl>
</FormGroup>
</Panel.Body>
</Panel>
</React.Fragment> } 



</Tab>
{this.props.bike._id!==null&&
<Tab eventKey={"5"} title="Fit History">
<FitHistory 
bike={this.props.bike}
fitHistory={fitHistory} 
originalBike={this.props.originalBike} 
bikeIndex={this.props.index} 
onChange={this.props.handleDateChange}
handleDateLastUpdated={this.handleDateLastUpdated} 
triggerUnsavedDateChanges={this.triggerUnsavedDateChanges}
editFields={this.state.editFields} 
deleteFitHistory={this.props.deleteFitHistory}/>
</Tab>}

</Tabs>


<ButtonToolbar className='pull-right'>
      <Button type="button" className={addClassTwo} disabled={saveDisabled} onClick={this.saveBikeChanges}>Save Changes</Button>
      {!this.state.editFields&&<Button onClick={this.clickEdit}>Edit</Button>}
      {this.state.editFields&&<Button onClick={this.clickCancel}>Cancel</Button>}
      </ButtonToolbar>
        </Panel.Body>
       
      </Panel>
<img alt="" hidden={true} ref="logoImage" src={this.props.logoUrl} />
</div>
        );
  }
  
}

export default Bike
