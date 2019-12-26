import React, { Component } from 'react'
import {InputGroup, OverlayTrigger, Tabs, Tab, FormControl, Well, Popover, Button, ButtonToolbar, Glyphicon, Table, Panel} from "react-bootstrap"
import './Bike.css'
import DeleteBike from './DeleteBike'
import {bikePDF} from '../pdf/BikePdf'
//import RoadBikeImage from './../assets/FitKit3Rd.png'
//import MTBbikeImage from './../assets/FitKit3MTB.png'  
//import TTbikeImage from './../assets/FitKit3TT.png'
//import handlebarImage from './../assets/handlebar.png'
//import saddleImage from './../assets/saddle.png'
//import {drawSVGLineArrow, drawSVGHorizontalLineArrow,drawSVGHorizontalLineArrowText, drawSVGVerticalLineArrowText, drawSVGVerticalLineDashed, drawSVGHorizontalLineDashed, drawAngledLineDashed, drawSVGAngledLineArrowText, drawSVGText, drawSVGVerticalLineArrow} from './../lib/svg-functions'
import RoadBikeSVG from './RoadBikeSVG'
import TTBikeSVG from './TTBikeSVG'
import MTBBikeSVG from './MTBBikeSVG'


class Bike extends Component{
state={
//  activeMetric:'none',
  editFields:false,
  unsavedChanges:false,
  showPrinterIcon:true,
 
}

handleChange = name => event => {
  if(!this.state.unsavedChanges)this.setState({unsavedChanges:true})
  this.props.handleChange(this.props.index,name,event.target.value)
  }
  
saveBikeChanges=()=>{
  this.props.saveBikeChanges(this.props.bike)
  this.setState({unsavedChanges:false,editFields:false})
}

clickEdit=()=>{
  this.setState({editFields:true})
}

clickCancel=()=>{
  this.setState({unsavedChanges:false, editFields:false})
  this.props.handleCancel()
}

rowMouseEnter = (e) =>{
//  console.log(e.currentTarget.id)
     let value = e.currentTarget.id
    this.setState({activeMetric:value})
  }

tableMouseLeave =(e) =>{
    this.setState({activeMetric:'none'})
  }

clickPDFButton=()=>{
      bikePDF(this.props.bodyMeasurements,this.props.softScores, this.props.cyclistAge, this.props.bike, 
      this.props.user, this.props.shop, this.props.cyclistProfile, this.props.updated, this.props.notes, this.props.logoImage)
  
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
       Horizontal distance from nose of saddle to bottom bracket.
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
       Add Description
      </Popover>
    );

    const popoverSaddleToBarDrop = (
      <Popover id="popover-saddleToBarDrop" title="Saddle To Bar Drop">
       Vertical distance from nose of saddle to handlebar.
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
       Vertical distance (positive or negative) from nose of saddle to center of handlebar grip.
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
    
/*    const popoverStandoverHeight = (
      <Popover id="popover-standoverheight" title="Maximum Standover Height">
       The maximum distance from the ground to the top of the top tube that will be safe and comfortable for a cyclist based on their inseam.
      </Popover>
    );
*/
    const popoverHandlebarWidth = (
      <Popover id="popover-handlebarwidth" title="Handlebar Width">
      Handlebar size measured from the center of the hoods (drop bar) or end to end (flat bar).
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


/*
    const popoverBikeLength = (
      <Popover id="popover-bikelength" title="Bike Length">
      Effective (horizontal) top tube length plus stem length.  
      To arrive at the starting stem to be used, subtract the bicylce top tube measurement from this value. 
      </Popover>
    );
*/
/*
    const popoverAdjustedBikeLength = (
      <Popover id="popover-adjusted-bikelength" title="Adjusted Bike Length">
      Effective (horizontal) top tube length plus stem length (as adusted for soft scores). 
      To arrive at the starting stem to be used, subtract the bicylce top tube measurement from this value. 
      </Popover>
    );
*/
let addClass=""

let addClassTwo=""
//let barText="Handlebar Width"
let dateString=''
//let dateCreated=''
//if(this.props.bike.type==="TT/Tri Bike") barText="Aerobar Pad Width"

if(this.state.unsavedChanges)addClassTwo="fks-color"
if(this.props.bike.updated) dateString= new Date(this.props.bike.updated).toDateString(); else dateString=new Date().toDateString()

if(this.state.editFields) addClass="actualPadding"

let markerId=this.props.bike._id
if(markerId===null) markerId=Math.floor(Math.random()*100)+1

return(
      <div className="">
      <Panel >
        <Panel.Heading>
          <Panel.Title >
           {this.props.bike.make+' '+this.props.bike.model+' (Last updated: '+dateString+')'} <DeleteBike bike={this.props.bike} reloadBikes={this.props.reloadBikes} cyclistProfile={this.props.cyclistProfile} cyclistId={this.props.cyclistId} togglePrinterIcon={this.togglePrinterIcon}/>

            {this.state.showPrinterIcon&&printerIcon}

          </Panel.Title>
        </Panel.Heading>
        <Panel.Body>

{/*<BikeImageCanvas godMode={false} bikeType={this.props.bike.type} onMouseMove={this.canvasMouse} activeMetric={this.state.activeMetric}/>*/}

{this.props.bike.type!=="Mountain Bike"&&this.props.bike.type!=="TT/Tri Bike"&&<RoadBikeSVG markerId={markerId} onMouseDown={this.onMouseDownTown}/>} {/*<Image className="bikeTabImage" src={RoadBikeImage}/>}*/}
{this.props.bike.type==="Mountain Bike"&&<MTBBikeSVG markerId={markerId} onMouseDown={this.onMouseDownTown}/>} {/*<Image className="bikeTabImage" src={MTBbikeImage}/>}*/}
{this.props.bike.type==="TT/Tri Bike"&&<TTBikeSVG markerId={markerId} onMouseDown={this.onMouseDownTown}/>}{/*<Image className="bikeTabImage" src={TTbikeImage}/>}*/}

<Well>
<ButtonToolbar className='pull-right'>
      <Button className={addClassTwo} disabled={!this.state.unsavedChanges} onClick={this.saveBikeChanges}>Save Changes</Button>
      {!this.state.editFields&&<Button onClick={this.clickEdit}>Edit</Button>}
      {this.state.editFields&&<Button onClick={this.clickCancel}>Cancel</Button>}
      </ButtonToolbar>
  <Tabs className="fks-tabs" id="controlled-tabs">
  <Tab eventKey={1} title="Equipment">
<Table className={addClass} bordered striped hover responsive onMouseLeave={this.tableMouseLeave}>
  <tbody>
  <tr name="type" id="none" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td><FormControl.Static className="form-control-static">Type:</FormControl.Static></td>
      <td>{this.state.editFields&&
          <InputGroup className="actualInput">
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
          <InputGroup className="actualInput">
          <FormControl bsSize="sm" value={this.props.bike.make} onChange={this.handleChange("make")}/>
          
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static className="form-control-static">{this.props.bike.make}</FormControl.Static>}
      </td>
    </tr>
    <tr name="model" id="none" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td><FormControl.Static className="form-control-static">Model:</FormControl.Static></td>
      <td>{this.state.editFields&&
          <InputGroup className="actualInput">
          <FormControl bsSize="sm" value={this.props.bike.model} onChange={this.handleChange("model")}/>
          
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static className="form-control-static">{this.props.bike.model}</FormControl.Static>}
      </td>
    </tr>

{this.props.bike.type==="Mountain Bike"&& <tr name="type" id="none" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td><FormControl.Static className="form-control-static">Wheel Size:</FormControl.Static></td>
      <td>{this.state.editFields&&
          <InputGroup className="actualInput">
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
          <InputGroup className="actualInput">
          <FormControl bsSize="sm" value={this.props.bike.frameSize} onChange={this.handleChange("frameSize")}/>
{/*          <InputGroup.Addon>cm.</InputGroup.Addon>*/}
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static className="form-control-static">{this.props.bike.frameSize}</FormControl.Static>}
      </td>

    </tr>
    </OverlayTrigger>

    <OverlayTrigger trigger={['hover','focus']}
    placement="bottom"
    overlay={popoverFrameReach}>
    <tr name="fReach" id="frameReach" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td><FormControl.Static className="form-control-static">Frame Reach:</FormControl.Static></td>
      <td>{this.state.editFields&&
          <InputGroup className="actualInput">
          <FormControl bsSize="sm" value={this.props.bike.frameReach} onChange={this.handleChange("frameReach")}/>
          <InputGroup.Addon className="addOn">mm.</InputGroup.Addon>
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static className="form-control-static">{this.props.bike.frameReach+" mm."}</FormControl.Static>}
      </td>

    </tr>
    </OverlayTrigger>

    <OverlayTrigger trigger={['hover','focus']}
    placement="bottom"
    overlay={popoverFrameStack}>
    <tr name="fStack" id="frameStack" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td><FormControl.Static className="form-control-static">Frame Stack:</FormControl.Static></td>
      <td>{this.state.editFields&&
          <InputGroup className="actualInput">
          <FormControl bsSize="sm" value={this.props.bike.frameStack} onChange={this.handleChange("frameStack")}/>
          <InputGroup.Addon className="addOn">mm.</InputGroup.Addon>
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static className="form-control-static">{this.props.bike.frameStack+" mm."}</FormControl.Static>}
      </td>

    </tr>
    </OverlayTrigger>


    <OverlayTrigger trigger={['hover','focus']}
    placement="bottom"
    overlay={popoverEffectiveTopTube}>
    <tr name="eTopTube" id="effectiveTopTube" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td><FormControl.Static className="form-control-static">Effective Top Tube:</FormControl.Static></td>
      <td>{this.state.editFields&&
          <InputGroup className="actualInput">
          <FormControl bsSize="sm" value={this.props.bike.effectiveTopTube} onChange={this.handleChange("effectiveTopTube")}/>
          <InputGroup.Addon className="addOn">mm.</InputGroup.Addon>
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static className="form-control-static">{this.props.bike.effectiveTopTube+" mm."}</FormControl.Static>}
      </td>

    </tr>
    </OverlayTrigger>


{this.props.bike.type==="TT/Tri Bike"&&

<tr name="ttBasebar" id="ttBasebar" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
  <td><FormControl.Static className="form-control-static">Basebar Width:</FormControl.Static></td>
  <td>{this.state.editFields&&
      <InputGroup className="actualInput">
      <FormControl bsSize="sm" value={this.props.bike.ttBasebarWidth} onChange={this.handleChange("ttBasebarWidth")}/>
      <InputGroup.Addon className="addOn">cm.</InputGroup.Addon>
      </InputGroup>}
      {!this.state.editFields&&
      <FormControl.Static className="form-control-static">{this.props.bike.ttBasebarWidth+" cm."}</FormControl.Static>}
  </td>

</tr>

} 

{this.props.bike.type==="TT/Tri Bike"&& <tr name="type" id="none" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
<td><FormControl.Static className="form-control-static">Aerobar Type:</FormControl.Static></td>
<td>{this.state.editFields&&
    <InputGroup className="actualInput">
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
          <InputGroup className="actualInput">
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
          <InputGroup className="actualInput">
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
          <InputGroup className="actualInput">
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
          <InputGroup className="actualInput">
          <FormControl bsSize="sm" value={this.props.bike.ttPadsMakeModel} onChange={this.handleChange("ttPadsMakeModel")}/>
          
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static className="form-control-static">{this.props.bike.ttPadsMakeModel}</FormControl.Static>}
      </td>
    </tr>
}
{/*
{this.props.bike.type==="TT/Tri Bike"&&
    <OverlayTrigger trigger={['hover','focus']}
    placement="top"
    overlay={popoverAeroBarPadWidth}>
    <tr id="handlebarWidth" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td><FormControl.Static>Aerobar Pad Width:</FormControl.Static></td>
      <td>
      {this.state.editFields&&
          <InputGroup className="actualInput">
          <FormControl bsSize="sm" value={this.props.bike.ttAeroBarPadWidth} onChange={this.handleChange("ttAeroBarPadWidth")}/>
          <InputGroup.Addon className="addOn">cm.</InputGroup.Addon>
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static>{this.props.bike.ttAeroBarPadWidth+" cm."}</FormControl.Static>}        
      </td>
    </tr>
    </OverlayTrigger>
    }
  */}

{this.props.bike.type==="TT/Tri Bike"&& <tr name="type" id="none" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
<td><FormControl.Static className="form-control-static">Stem Type:</FormControl.Static></td>
<td>{this.state.editFields&&
    <InputGroup className="actualInput">
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

    <OverlayTrigger trigger={['hover','focus']}
    placement="top"
    overlay={popoverStemLength}>
    <tr name="sLength" id="stemLength" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td><FormControl.Static className="form-control-static">Stem Length:</FormControl.Static></td>
      <td>{this.state.editFields&&
          <InputGroup className="actualInput">
          <FormControl bsSize="sm" value={this.props.bike.stemLength} onChange={this.handleChange("stemLength")}/>
          <InputGroup.Addon className="addOn">mm.</InputGroup.Addon>
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static className="form-control-static">{this.props.bike.stemLength+" mm."}</FormControl.Static>}
      </td>

    </tr>
    </OverlayTrigger>

    <OverlayTrigger trigger={['hover','focus']}
    placement="top"
    overlay={popoverStemAngle}>
    <tr name="sAngle" id="none" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td><FormControl.Static className="form-control-static">Stem Angle:</FormControl.Static></td>
      <td>{this.state.editFields&&
          <InputGroup className="actualInput">
          <FormControl bsSize="sm" value={this.props.bike.stemAngle} onChange={this.handleChange("stemAngle")}/>
          <InputGroup.Addon className="addOn">deg.</InputGroup.Addon>
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static className="form-control-static">{this.props.bike.stemAngle+" deg."}</FormControl.Static>}
      </td>

    </tr>
    </OverlayTrigger>

    <tr name="sBelow" id="none" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td><FormControl.Static className="form-control-static">Spacers Below Stem:</FormControl.Static></td>
      <td>{this.state.editFields&&
          <InputGroup className="actualInput">
          <FormControl bsSize="sm" value={this.props.bike.spacersBelow} onChange={this.handleChange("spacersBelow")}/>
          <InputGroup.Addon className="addOn">mm.</InputGroup.Addon>
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static className="form-control-static">{this.props.bike.spacersBelow+" mm."}</FormControl.Static>}
      </td>

    </tr>

    <tr name="sAbove" id="none" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td><FormControl.Static className="form-control-static">Spacers Above Stem:</FormControl.Static></td>
      <td>{this.state.editFields&&
          <InputGroup className="actualInput">
          <FormControl bsSize="sm" value={this.props.bike.spacersAbove} onChange={this.handleChange("spacersAbove")}/>
          <InputGroup.Addon className="addOn">mm.</InputGroup.Addon>
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static className="form-control-static">{this.props.bike.spacersAbove+" mm."}</FormControl.Static>}
      </td>

    </tr>

    {this.props.bike.type!=="TT/Tri Bike"&&
    <OverlayTrigger trigger={['hover','focus']}
    placement="top"
    overlay={popoverHandlebarWidth}>
    <tr id="handlebarWidth" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td><FormControl.Static>Handlebar Width:</FormControl.Static></td>
      <td>
      {this.state.editFields&&
          <InputGroup className="actualInput">
          <FormControl bsSize="sm" value={this.props.bike.handlebarWidth} onChange={this.handleChange("handlebarWidth")}/>
          <InputGroup.Addon className="addOn">cm.</InputGroup.Addon>
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static>{this.props.bike.handlebarWidth+" cm."}</FormControl.Static>}        
      </td>
    </tr>
    </OverlayTrigger>
    }


{this.props.bike.type!=="Mountain Bike"&&this.props.bike.type!=="TT/Tri Bike"&&
<OverlayTrigger trigger={['hover','focus']}
    placement="top"
    overlay={popoverHandlebarReach}>
    <tr id="handlebarReach" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td><FormControl.Static>Handlebar Reach:</FormControl.Static></td>
      <td>
      {this.state.editFields&&
          <InputGroup className="actualInput">
          <FormControl bsSize="sm" value={this.props.bike.handlebarReach} onChange={this.handleChange("handlebarReach")}/>
          <InputGroup.Addon className="addOn">mm.</InputGroup.Addon>
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static>{this.props.bike.handlebarReach+" mm."}</FormControl.Static>}        
      </td>
    </tr>
    </OverlayTrigger>
}

{this.props.bike.type==="Mountain Bike"&& <tr name="type" id="none" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
<td><FormControl.Static className="form-control-static">Seat Post Type:</FormControl.Static></td>
<td>{this.state.editFields&&
    <InputGroup className="actualInput">
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

{this.props.bike.type!=="TT/Tri Bike"&&
    <OverlayTrigger trigger={['hover','focus']}
    placement="bottom"
    overlay={popoverSeatPostOffset}>
    <tr name="sPostOffsest" id="seatPostOffset" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td><FormControl.Static className="form-control-static">Seat Post Offset:</FormControl.Static></td>
      <td>{this.state.editFields&&
          <InputGroup className="actualInput">
          <FormControl bsSize="sm" value={this.props.bike.seatPostOffset} onChange={this.handleChange("seatPostOffset")}/>
          <InputGroup.Addon className="addOn">mm.</InputGroup.Addon>
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static className="form-control-static">{this.props.bike.seatPostOffset+" mm."}</FormControl.Static>}
      </td>

    </tr>
    </OverlayTrigger>
}


    <tr name="sMake" id="none" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td><FormControl.Static className="form-control-static">Saddle Make:</FormControl.Static></td>
      <td>{this.state.editFields&&
          <InputGroup className="actualInput">
          <FormControl bsSize="sm" value={this.props.bike.saddleMake} onChange={this.handleChange("saddleMake")}/>
          
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static className="form-control-static">{this.props.bike.saddleMake}</FormControl.Static>}
      </td>
    </tr>
    <tr name="sModel" id="none" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td><FormControl.Static className="form-control-static">Saddle Model:</FormControl.Static></td>
      <td>{this.state.editFields&&
          <InputGroup className="actualInput">
          <FormControl bsSize="sm" value={this.props.bike.saddleModel} onChange={this.handleChange("saddleModel")}/>
          
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static className="form-control-static">{this.props.bike.saddleModel}</FormControl.Static>}
      </td>
    </tr>

    {this.props.bike.type!=="TT/Tri Bike"&&
    <OverlayTrigger trigger={['hover','focus']}
    placement="top"
    overlay={popoverSaddleWidth}>
    <tr id="saddleWidth" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td><FormControl.Static>Saddle Width:</FormControl.Static></td>
      <td>
      {this.state.editFields&&
          <InputGroup className="actualInput">
          <FormControl bsSize="sm" value={this.props.bike.saddleWidth} onChange={this.handleChange("saddleWidth")}/>
          <InputGroup.Addon className="addOn">mm.</InputGroup.Addon>
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static>{this.props.bike.saddleWidth+" mm."}</FormControl.Static>}        
      </td>
    </tr>
    </OverlayTrigger>
    }

<OverlayTrigger trigger={['hover','focus']}
    placement="top"
    overlay={popoverCrankLength}>
    <tr name="cLength" id="crankLength" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td><FormControl.Static className="form-control-static">Crank Length:</FormControl.Static></td>
      <td>{this.state.editFields&&
          <InputGroup className="actualInput">
          <FormControl bsSize="sm" value={this.props.bike.crankLength} onChange={this.handleChange("crankLength")}/>
          <InputGroup.Addon className="addOn">mm.</InputGroup.Addon>
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static className="form-control-static">{this.props.bike.crankLength+" mm."}</FormControl.Static>}
      </td>

    </tr>
    </OverlayTrigger>

    <tr name="pedal type" id="none" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td><FormControl.Static className="form-control-static">Pedal Type:</FormControl.Static></td>
      <td>{this.state.editFields&&
          <InputGroup className="actualInput">
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
          <InputGroup className="actualInput">
          <FormControl bsSize="sm" value={this.props.bike.pedalMakeModel} onChange={this.handleChange("pedalMakeModel")}/>
          
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static className="form-control-static">{this.props.bike.pedalMakeModel}</FormControl.Static>}
      </td>
    </tr>



    <tr name="shifter type" id="none" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td><FormControl.Static className="form-control-static">Shifters:</FormControl.Static></td>
      <td>{this.state.editFields&&
          <InputGroup className="actualInput">
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
          <InputGroup className="actualInput">
          <FormControl componentClass="select" placeholder="Rim" bsSize="sm" value={this.props.bike.brakeType} onChange={this.handleChange("brakeType")}>
          <option value="Rim">Rim</option>
          <option value="Disc">Disc</option>
          </FormControl>
          
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static className="form-control-static">{this.props.bike.brakeType}</FormControl.Static>}
      </td>
    </tr>



    {/*
    <OverlayTrigger trigger={['hover','focus']}
    placement="bottom"
    overlay={popoverStandoverHeight}>
    <tr id="standoverHeight" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td><FormControl.Static>Standover Height:</FormControl.Static></td>
      <td>
      {this.state.editFields&&
          <InputGroup className="actualInput">
          <FormControl bsSize="sm" value={this.props.bike.standoverHeight} onChange={this.handleChange("standoverHeight")}/>
          <InputGroup.Addon>cm.</InputGroup.Addon>
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static>{this.props.bike.standoverHeight+" cm."}</FormControl.Static>}
      </td>
    </tr>
    </OverlayTrigger>
          */}

{/*
    <OverlayTrigger trigger={['hover','focus']}
    placement="top"
    overlay={popoverBikeLength}>
    <tr id="bikeLength" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td><FormControl.Static>Bike Length (top tube + stem):</FormControl.Static></td>
      <td>
      {this.state.editFields&&
          <InputGroup className="actualInput">
          <FormControl bsSize="sm" value={this.props.bike.bikeLength} onChange={this.handleChange("bikeLength")}/>
          <InputGroup.Addon className="addOn">cm.</InputGroup.Addon>
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static>{this.props.bike.bikeLength+" cm."}</FormControl.Static>}        
      </td>
    </tr>
    </OverlayTrigger>
    */}
    {/*
    <OverlayTrigger trigger={['hover','focus']}
    placement="top"
    overlay={popoverAdjustedBikeLength}>
    <tr id="adjustedBikeLength" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td><FormControl.Static>Adjusted Bike Length (top tube + stem):</FormControl.Static></td>
      <td>
      {this.state.editFields&&
          <InputGroup className="actualInput">
          <FormControl bsSize="sm" value={this.props.bike.adjustedBikeLength} onChange={this.handleChange("adjustedBikeLength")}/>
          <InputGroup.Addon>cm.</InputGroup.Addon>
          </InputGroup>}
          {!this.state.editFields&&
          <InputGroup className="actualInput"><FormControl.Static>{this.props.bike.adjustedBikeLength+" cm."}</FormControl.Static></InputGroup>}
      </td>
    </tr>
          </OverlayTrigger>*/}
  </tbody>
</Table>
</Tab>
<Tab eventKey={2} title="Fit Position">
<Table className={addClass} bordered striped hover responsive onMouseLeave={this.tableMouseLeave}>
<tbody>
<OverlayTrigger trigger={['hover','focus']}
    placement="bottom"
    overlay={popoverSaddleHeight}>
    <tr id="saddleHeight" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td className="bikeCol1"><FormControl.Static>Saddle Height (saddle to pedal spindle):</FormControl.Static></td>
      <td>
        {this.state.editFields&&
          <InputGroup className="actualInput">
          <FormControl bsSize="sm" value={this.props.bike.saddleHeight} onChange={this.handleChange("saddleHeight")}/>
          <InputGroup.Addon className="addOn">mm.</InputGroup.Addon>
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static>{this.props.bike.saddleHeight+" mm."}</FormControl.Static>}
      </td>

    </tr>
    </OverlayTrigger>

    <OverlayTrigger trigger={['hover','focus']}
    placement="bottom"
    overlay={popoverSaddleHeightBB}>
    <tr id="saddleHeightBB" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td><FormControl.Static>Saddle Height (saddle to bottom bracket):</FormControl.Static></td>
      <td>
        {this.state.editFields&&
          <InputGroup className="actualInput">
          <FormControl bsSize="sm" value={this.props.bike.saddleHeightBB} onChange={this.handleChange("saddleHeightBB")}/>
          <InputGroup.Addon className="addOn">mm.</InputGroup.Addon>
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static>{this.props.bike.saddleHeightBB+" mm."}</FormControl.Static>}
      </td>

    </tr>
    </OverlayTrigger>

    <OverlayTrigger trigger={['hover','focus']}
    placement="bottom"
    overlay={popoverSaddleSetBack}>
    <tr id="saddleSetBack" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td><FormControl.Static>Saddle Setback (from bottom bracket):</FormControl.Static></td>
      <td>
        {this.state.editFields&&
          <InputGroup className="actualInput">
          <FormControl bsSize="sm" value={this.props.bike.saddleSetBack} onChange={this.handleChange("saddleSetBack")}/>
          <InputGroup.Addon className="addOn">mm.</InputGroup.Addon>
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static>{this.props.bike.saddleSetBack+" mm."}</FormControl.Static>}
      </td>

    </tr>
    </OverlayTrigger>

    <OverlayTrigger trigger={['hover','focus']}
    placement="bottom"
    overlay={popoverSaddleAngle}>
    <tr id="none" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td><FormControl.Static>Saddle Angle:</FormControl.Static></td>
      <td>
        {this.state.editFields&&
          <InputGroup className="actualInput">
          <FormControl bsSize="sm" value={this.props.bike.saddleAngle} onChange={this.handleChange("saddleAngle")}/>
          <InputGroup.Addon className="addOn">deg.</InputGroup.Addon>
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static>{this.props.bike.saddleAngle+" deg."}</FormControl.Static>}
      </td>

    </tr>
    </OverlayTrigger>

{this.props.bike.type!=="TT/Tri Bike"&&
    <OverlayTrigger trigger={['hover','focus']}
    placement="top"
    overlay={popoverSaddleNoseToBar}>
    <tr id="saddleNoseToBar" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td><FormControl.Static>Saddle Nose To Bar Center:</FormControl.Static></td>
      <td>
        {this.state.editFields&&
          <InputGroup className="actualInput">
          <FormControl bsSize="sm" value={this.props.bike.saddleNoseToBar} onChange={this.handleChange("saddleNoseToBar")}/>
          <InputGroup.Addon className="addOn">mm.</InputGroup.Addon>
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static>{this.props.bike.saddleNoseToBar+" mm."}</FormControl.Static>}
      </td>

    </tr>
    </OverlayTrigger>
}

{this.props.bike.type==="TT/Tri Bike"&&
<OverlayTrigger trigger={['hover','focus']}
placement="top"
overlay={popoverSaddleToPadCenterDrop}>
<tr id="saddleToPad" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
  <td><FormControl.Static>Saddle To Pad (center) Drop:</FormControl.Static></td>
  <td>
    {this.state.editFields&&
      <InputGroup className="actualInput">
      <FormControl bsSize="sm" value={this.props.bike.ttSaddleToPadCenterDrop} onChange={this.handleChange("ttSaddleToPadCenterDrop")}/>
      <InputGroup.Addon className="addOn">mm.</InputGroup.Addon>
      </InputGroup>}
      {!this.state.editFields&&
      <FormControl.Static>{this.props.bike.ttSaddleToPadCenterDrop+" mm."}</FormControl.Static>}
  </td>

</tr>
</OverlayTrigger>
}


{this.props.bike.type==="TT/Tri Bike"&&
<OverlayTrigger trigger={['hover','focus']}
placement="top"
overlay={popoverSaddleNoseToPadRear}>
<tr id="saddleNoseToPadRear" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
  <td><FormControl.Static>Saddle Nose To Pad Rear:</FormControl.Static></td>
  <td>
    {this.state.editFields&&
      <InputGroup className="actualInput">
      <FormControl bsSize="sm" value={this.props.bike.ttSaddleNoseToPadRear} onChange={this.handleChange("ttSaddleNoseToPadRear")}/>
      <InputGroup.Addon className="addOn">mm.</InputGroup.Addon>
      </InputGroup>}
      {!this.state.editFields&&
      <FormControl.Static>{this.props.bike.ttSaddleNoseToPadRear+" mm."}</FormControl.Static>}
  </td>

</tr>
</OverlayTrigger>
}

{this.props.bike.type==="TT/Tri Bike"&&
<OverlayTrigger trigger={['hover','focus']}
placement="top"
overlay={popoverSaddleNoseToEndOfExtensions}>
<tr id="saddleNoseToEndOfExtensions" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
  <td><FormControl.Static>Saddle Nose To End of Extentions:</FormControl.Static></td>
  <td>
    {this.state.editFields&&
      <InputGroup className="actualInput">
      <FormControl bsSize="sm" value={this.props.bike.ttSaddleNoseToEndOfExtensions} onChange={this.handleChange("ttSaddleNoseToEndOfExtensions")}/>
      <InputGroup.Addon className="addOn">mm.</InputGroup.Addon>
      </InputGroup>}
      {!this.state.editFields&&
      <FormControl.Static>{this.props.bike.ttSaddleNoseToEndOfExtensions+" mm."}</FormControl.Static>}
  </td>

</tr>
</OverlayTrigger>
}

{this.props.bike.type==="TT/Tri Bike"&&
<OverlayTrigger trigger={['hover','focus']}
placement="top"
overlay={popoverExtensionWidthAtClamps}>
<tr id="extensionWidthAtClamps" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
  <td><FormControl.Static>Extension Width At Clamps:</FormControl.Static></td>
  <td>
    {this.state.editFields&&
      <InputGroup className="actualInput">
      <FormControl bsSize="sm" value={this.props.bike.ttExtensionWidthAtClamps} onChange={this.handleChange("ttExtensionWidthAtClamps")}/>
      <InputGroup.Addon className="addOn">mm.</InputGroup.Addon>
      </InputGroup>}
      {!this.state.editFields&&
      <FormControl.Static>{this.props.bike.ttExtensionWidthAtClamps+" mm."}</FormControl.Static>}
  </td>

</tr>
</OverlayTrigger>
}

{this.props.bike.type==="TT/Tri Bike"&&
<OverlayTrigger trigger={['hover','focus']}
placement="top"
overlay={popoverExtensionWidthAtEnd}>
<tr id="extensionWidthAtEnd" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
  <td><FormControl.Static>Extension Width At End:</FormControl.Static></td>
  <td>
    {this.state.editFields&&
      <InputGroup className="actualInput">
      <FormControl bsSize="sm" value={this.props.bike.ttExtensionWidthAtEnd} onChange={this.handleChange("ttExtensionWidthAtEnd")}/>
      <InputGroup.Addon className="addOn">mm.</InputGroup.Addon>
      </InputGroup>}
      {!this.state.editFields&&
      <FormControl.Static>{this.props.bike.ttExtensionWidthAtEnd+" mm."}</FormControl.Static>}
  </td>

</tr>
</OverlayTrigger>
}

{this.props.bike.type==="TT/Tri Bike"&&
<OverlayTrigger trigger={['hover','focus']}
placement="top"
overlay={popoverExtensionAngle}>
<tr id="extensionAngle" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
  <td><FormControl.Static>Extension Angle:</FormControl.Static></td>
  <td>
    {this.state.editFields&&
      <InputGroup className="actualInput">
      <FormControl bsSize="sm" value={this.props.bike.ttExtensionAngle} onChange={this.handleChange("ttExtensionAngle")}/>
      <InputGroup.Addon className="addOn">deg.</InputGroup.Addon>
      </InputGroup>}
      {!this.state.editFields&&
      <FormControl.Static>{this.props.bike.ttExtensionAngle+" deg."}</FormControl.Static>}
  </td>

</tr>
</OverlayTrigger>
}

{this.props.bike.type==="TT/Tri Bike"&&
<OverlayTrigger trigger={['hover','focus']}
placement="top"
overlay={popoverPadWidth}>
<tr id="padWidth" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
  <td><FormControl.Static>Pad Width:</FormControl.Static></td>
  <td>
    {this.state.editFields&&
      <InputGroup className="actualInput">
      <FormControl bsSize="sm" value={this.props.bike.ttPadWidth} onChange={this.handleChange("ttPadWidth")}/>
      <InputGroup.Addon className="addOn">mm.</InputGroup.Addon>
      </InputGroup>}
      {!this.state.editFields&&
      <FormControl.Static>{this.props.bike.ttPadWidth+" mm."}</FormControl.Static>}
  </td>

</tr>
</OverlayTrigger>
}

{this.props.bike.type==="TT/Tri Bike"&&
<OverlayTrigger trigger={['hover','focus']}
placement="top"
overlay={popoverPadXReachRear}>
<tr id="padXReachRear" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
  <td><FormControl.Static>Pad X Reach (rear of pad):</FormControl.Static></td>
  <td>
    {this.state.editFields&&
      <InputGroup className="actualInput">
      <FormControl bsSize="sm" value={this.props.bike.ttPadXReachRearOfPad} onChange={this.handleChange("ttPadXReachRearOfPad")}/>
      <InputGroup.Addon className="addOn">mm.</InputGroup.Addon>
      </InputGroup>}
      {!this.state.editFields&&
      <FormControl.Static>{this.props.bike.ttPadXReachRearOfPad+" mm."}</FormControl.Static>}
  </td>

</tr>
</OverlayTrigger>
}

{this.props.bike.type==="TT/Tri Bike"&&
<OverlayTrigger trigger={['hover','focus']}
placement="top"
overlay={popoverPadXReachCenter}>
<tr id="padXReachCenter" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
  <td><FormControl.Static>Pad X Reach (center of pad):</FormControl.Static></td>
  <td>
    {this.state.editFields&&
      <InputGroup className="actualInput">
      <FormControl bsSize="sm" value={this.props.bike.ttPadXReachCenterOfPad} onChange={this.handleChange("ttPadXReachCenterOfPad")}/>
      <InputGroup.Addon className="addOn">mm.</InputGroup.Addon>
      </InputGroup>}
      {!this.state.editFields&&
      <FormControl.Static>{this.props.bike.ttPadXReachCenterOfPad+" mm."}</FormControl.Static>}
  </td>

</tr>
</OverlayTrigger>
}

{this.props.bike.type==="TT/Tri Bike"&&
<OverlayTrigger trigger={['hover','focus']}
placement="top"
overlay={popoverPadYStackRear}>
<tr id="padYStackRear" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
  <td><FormControl.Static>Pad Y Stack (rear of pad):</FormControl.Static></td>
  <td>
    {this.state.editFields&&
      <InputGroup className="actualInput">
      <FormControl bsSize="sm" value={this.props.bike.ttPadYStackRearOfPad} onChange={this.handleChange("ttPadYStackRearOfPad")}/>
      <InputGroup.Addon className="addOn">mm.</InputGroup.Addon>
      </InputGroup>}
      {!this.state.editFields&&
      <FormControl.Static>{this.props.bike.ttPadYStackRearOfPad+" mm."}</FormControl.Static>}
  </td>

</tr>
</OverlayTrigger>
}

{this.props.bike.type==="TT/Tri Bike"&&
<OverlayTrigger trigger={['hover','focus']}
placement="top"
overlay={popoverBasebarReachX}>
<tr id="basebarReachX" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
  <td><FormControl.Static>Basebar Reach (X):</FormControl.Static></td>
  <td>
    {this.state.editFields&&
      <InputGroup className="actualInput">
      <FormControl bsSize="sm" value={this.props.bike.ttBasebarReachX} onChange={this.handleChange("ttBasebarReachX")}/>
      <InputGroup.Addon className="addOn">mm.</InputGroup.Addon>
      </InputGroup>}
      {!this.state.editFields&&
      <FormControl.Static>{this.props.bike.ttBasebarReachX+" mm."}</FormControl.Static>}
  </td>

</tr>
</OverlayTrigger>
}

{this.props.bike.type==="TT/Tri Bike"&&
<OverlayTrigger trigger={['hover','focus']}
placement="top"
overlay={popoverBasebarStackY}>
<tr id="basebarReachX" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
  <td><FormControl.Static>Basebar Stack (Y):</FormControl.Static></td>
  <td>
    {this.state.editFields&&
      <InputGroup className="actualInput">
      <FormControl bsSize="sm" value={this.props.bike.ttBasebarStackY} onChange={this.handleChange("ttBasebarStackY")}/>
      <InputGroup.Addon className="addOn">mm.</InputGroup.Addon>
      </InputGroup>}
      {!this.state.editFields&&
      <FormControl.Static>{this.props.bike.ttBasebarStackY+" mm."}</FormControl.Static>}
  </td>

</tr>
</OverlayTrigger>
}



{this.props.bike.type!=='Mountain Bike'&&this.props.bike.type!=='TT/Tri Bike'&&
    <OverlayTrigger trigger={['hover','focus']}
    placement="top"
    overlay={popoverSaddleNoseToHood}>
    <tr id="saddleNoseToHood" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td><FormControl.Static>Saddle Nose To Hood Trough:</FormControl.Static></td>
      <td>
        {this.state.editFields&&
          <InputGroup className="actualInput">
          <FormControl bsSize="sm" value={this.props.bike.saddleNoseToHood} onChange={this.handleChange("saddleNoseToHood")}/>
          <InputGroup.Addon className="addOn">mm.</InputGroup.Addon>
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static>{this.props.bike.saddleNoseToHood+" mm."}</FormControl.Static>}
      </td>

    </tr>
    </OverlayTrigger>
}

{this.props.bike.type==='Mountain Bike'&&
<OverlayTrigger trigger={['hover','focus']}
placement="top"
overlay={popoverSaddleNoseToGripEnd}>
<tr id="saddleNoseToGripEnd" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
  <td><FormControl.Static>Saddle Nose To Grip End:</FormControl.Static></td>
  <td>
    {this.state.editFields&&
      <InputGroup className="actualInput">
      <FormControl bsSize="sm" value={this.props.bike.mtbSaddleNoseToGripEnd} onChange={this.handleChange("mtbSaddleNoseToGripEnd")}/>
      <InputGroup.Addon className="addOn">mm.</InputGroup.Addon>
      </InputGroup>}
      {!this.state.editFields&&
      <FormControl.Static>{this.props.bike.mtbSaddleNoseToGripEnd+" mm."}</FormControl.Static>}
  </td>

</tr>
</OverlayTrigger>
}

{this.props.bike.type==='Mountain Bike'&&
<OverlayTrigger trigger={['hover','focus']}
placement="top"
overlay={popoverSaddleToGripCenterDropRise}>
<tr id="saddleToGripCenterDropRise" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
  <td><FormControl.Static>Saddle To Grip Center Drop/Rise:</FormControl.Static></td>
  <td>
    {this.state.editFields&&
      <InputGroup className="actualInput">
      <FormControl bsSize="sm" value={this.props.bike.mtbSaddleToGripCenterDropRise} onChange={this.handleChange("mtbSaddleToGripCenterDropRise")}/>
      <InputGroup.Addon className="addOn">mm.</InputGroup.Addon>
      </InputGroup>}
      {!this.state.editFields&&
      <FormControl.Static>{this.props.bike.mtbSaddleToGripCenterDropRise+" mm."}</FormControl.Static>}
  </td>

</tr>
</OverlayTrigger>
}


{this.props.bike.type!=="Mountain Bike"&&this.props.bike.type!=="TT/Tri Bike"&&
    <OverlayTrigger trigger={['hover','focus']}
    placement="top"
    overlay={popoverSaddleToBarDrop}>
    <tr id="saddleToBarDrop" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td><FormControl.Static>Saddle To Bar Drop:</FormControl.Static></td>
      <td>
        {this.state.editFields&&
          <InputGroup className="actualInput">
          <FormControl bsSize="sm" value={this.props.bike.saddleToBarDrop} onChange={this.handleChange("saddleToBarDrop")}/>
          <InputGroup.Addon className="addOn">mm.</InputGroup.Addon>
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static>{this.props.bike.saddleToBarDrop+" mm."}</FormControl.Static>}
      </td>

    </tr>
    </OverlayTrigger>
}

{this.props.bike.type!=="TT/Tri Bike"&&
    <OverlayTrigger trigger={['hover','focus']}
    placement="top"
    overlay={popoverHandlebarReachHX}>
    <tr id="handlebarReachHX" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td><FormControl.Static>Handlebar Reach (HX):</FormControl.Static></td>
      <td>
        {this.state.editFields&&
          <InputGroup className="actualInput">
          <FormControl bsSize="sm" value={this.props.bike.handlebarReachHX} onChange={this.handleChange("handlebarReachHX")}/>
          <InputGroup.Addon className="addOn">mm.</InputGroup.Addon>
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static>{this.props.bike.handlebarReachHX+" mm."}</FormControl.Static>}
      </td>

    </tr>
    </OverlayTrigger>
}


{this.props.bike.type!=="TT/Tri Bike"&&
    <OverlayTrigger trigger={['hover','focus']}
    placement="top"
    overlay={popoverHandlebarStackHY}>
    <tr id="handlebarStackHY" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td><FormControl.Static>Handlebar Stack (HY):</FormControl.Static></td>
      <td>
        {this.state.editFields&&
          <InputGroup className="actualInput">
          <FormControl bsSize="sm" value={this.props.bike.handlebarStackHY} onChange={this.handleChange("handlebarStackHY")}/>
          <InputGroup.Addon className="addOn">mm.</InputGroup.Addon>
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static>{this.props.bike.handlebarStackHY+" mm."}</FormControl.Static>}
      </td>

    </tr>
    </OverlayTrigger>
}

</tbody>
</Table>
  </Tab>

  <Tab eventKey={3} title="Shoes/Cleats">
<Table className={addClass} bordered striped hover responsive onMouseLeave={this.tableMouseLeave}>
<tbody>
    <tr name="shoeBrand" id="shoeBrand">
      <td><FormControl.Static className="form-control-static">Shoe Brand:</FormControl.Static></td>
      <td>{this.state.editFields&&
          <InputGroup className="actualInput">
          <FormControl bsSize="sm" value={this.props.bike.shoeBrand} onChange={this.handleChange("shoeBrand")}/>
          
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static className="form-control-static">{this.props.bike.shoeBrand}</FormControl.Static>}
      </td>
    </tr>

    <tr name="shoeModel" id="shoeModel">
      <td><FormControl.Static className="form-control-static">Shoe Model:</FormControl.Static></td>
      <td>{this.state.editFields&&
          <InputGroup className="actualInput">
          <FormControl bsSize="sm" value={this.props.bike.shoeModel} onChange={this.handleChange("shoeModel")}/>
          
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static className="form-control-static">{this.props.bike.shoeModel}</FormControl.Static>}
      </td>
    </tr>

    <tr name="shoeSize" id="shoeSize">
      <td><FormControl.Static className="form-control-static">Shoe Size:</FormControl.Static></td>
      <td>{this.state.editFields&&
          <InputGroup className="actualInput">
          <FormControl bsSize="sm" value={this.props.bike.shoeSize} onChange={this.handleChange("shoeSize")}/>
          
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static className="form-control-static">{this.props.bike.shoeSize}</FormControl.Static>}
      </td>
    </tr>

    <tr name="insoles" id="insoles">
      <td><FormControl.Static className="form-control-static">Insoles:</FormControl.Static></td>
      <td>{this.state.editFields&&
          <InputGroup className="actualInput">
          <FormControl bsSize="sm" value={this.props.bike.insoles} onChange={this.handleChange("insoles")}/>
          
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static className="form-control-static">{this.props.bike.insoles}</FormControl.Static>}
      </td>
    </tr>
    <tr name="cleatModel" id="cleatModel">
      <td><FormControl.Static className="form-control-static">Cleat Model:</FormControl.Static></td>
      <td>{this.state.editFields&&
          <InputGroup className="actualInput">
          <FormControl bsSize="sm" value={this.props.bike.cleatModel} onChange={this.handleChange("cleatModel")}/>
          
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static className="actualInput form-control-static">{this.props.bike.cleatModel}</FormControl.Static>}
      </td>
    </tr>
    <tr name="cleatAdjustments" id="cleatAdjustments">
      <td><FormControl.Static className="form-control-static">Cleat Adjustments:</FormControl.Static></td>
      <td>{this.state.editFields&&
          <InputGroup className="actualInput">
 {/*         <FormControl bsSize="sm" value={this.props.bike.cleatAdjustments} onChange={this.handleChange("cleatAdjustments")}/>*/}
          <FormControl componentClass="textarea" rows="8" spellCheck placeholder="Enter notes here." value={this.props.bike.cleatAdjustments} onChange={this.handleChange("cleatAdjustments")}></FormControl>
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static componentClass="textarea" rows="8" disabled={true} className="form-control-static bikeTextArea" value={this.props.bike.cleatAdjustments}></FormControl.Static>}
      </td>
    </tr>

    <tr name="cleatModifications" id="cleatModifications">
      <td><FormControl.Static className="form-control-static">Cleat Modifications:</FormControl.Static></td>
      <td>{this.state.editFields&&
          <InputGroup className="actualInput">
{/*          <FormControl bsSize="sm" value={this.props.bike.cleatModifications} onChange={this.handleChange("cleatModifications")}/>*/}
          <FormControl componentClass="textarea" rows="8" spellCheck placeholder="Enter notes here." value={this.props.bike.cleatModifications} onChange={this.handleChange("cleatModifications")}></FormControl>          
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static componentClass="textarea" rows="8" disabled={true} className="form-control-static bikeTextArea"value={this.props.bike.cleatModifications}></FormControl.Static>}
      </td>
    </tr>

</tbody>
</Table>
</Tab>
<Tab eventKey={4} title="Notes">
{this.state.editFields&&
<FormControl componentClass="textarea" disabled={false} rows="8" spellCheck placeholder="Enter notes here." value={this.props.bike.notes} onChange={this.handleChange("notes")}></FormControl>}
{!this.state.editFields&&
<FormControl componentClass="textarea"  className="bikeTextArea" disabled={true} rows="8" value={this.props.bike.notes} onChange={this.handleChange("notes")}></FormControl>}  
</Tab>

</Tabs>

</Well>
<ButtonToolbar className='pull-right'>
      <Button className={addClassTwo} disabled={!this.state.unsavedChanges} onClick={this.saveBikeChanges}>Save Changes</Button>
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
