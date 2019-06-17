import React, { Component } from 'react'
import {InputGroup, OverlayTrigger, FormControl, Well, Popover, Button, ButtonToolbar, Glyphicon, Table, Panel} from "react-bootstrap"
//import './QuickSize.css'
import BikeImageCanvas from '../quicksizing/BikeImageCanvas'
import {makePDF} from '../pdf/BikePdf'
import fksLogo from './../assets/fksicon.jpg'
import fksAnnotatedRoad from './../assets/fitkitannotatedroad.png'
import fksAnnotatedMTB from './../assets/fitkitannotatedmtb.png'
import fksAnnotatedTT from './../assets/fitkitannotatedtt.png'


class Bike extends Component{
state={
  activeMetric:'none',
  logo:{},
  fksLogo:{},
  bikeImage:{},
  editFields:false,
  unsavedChanges:false
 
}


componentDidMount(){
  let img = new Image()
  let img2 = new Image()
  let img3 = new Image()
  if(this.props.logoUrl!=='none'&&this.props.logoUrl!=='') img.src=this.props.logoUrl 
  else img.src=fksLogo
  img2.src=fksLogo
  
  if(this.props.bike.type==="Road Bike")img3.src=fksAnnotatedRoad
  if(this.props.bike.type==="Mountain Bike") img3.src=fksAnnotatedMTB
  if(this.props.bike.type==="TT/Tri Bike") img3.src=fksAnnotatedTT

  img.onload=()=>{
  this.setState({logo:img})
  }
  img2.onload=()=>{
    this.setState({fksLogo:img2})
  }
  img3.onload=()=>{
    this.setState({bikeImage:img3})
  }

}

componentDidUpdate(prevProps){
if(this.props.logoUrl!==prevProps.logoUrl){
  let img = new Image()
  if(this.props.logoUrl!=='none'&&this.props.logoUrl!=='') img.src=this.props.logoUrl 
  else img.src=fksLogo
  img.onload=()=>{this.setState({logo:img})}
}
}

handleChange = name => event => {
  //  let roadBikeActual = Object.assign({},this.props.bikeActual)
  //  roadBikeActual[name]=event.target.value
  //  this.setState({roadBikeActual, unsavedChanges:true})
  //console.log("Changing")
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
     let value = e.currentTarget.id
    this.setState({activeMetric:value})
  }

tableMouseLeave =(e) =>{
    this.setState({activeMetric:'none'})
  }

clickPDFButton=()=>{
  makePDF(this.props.bodyMeasurements,this.props.softScores, this.props.cyclistAge, this.props.bike, this.state.logo, this.state.bikeImage,
    this.props.user, this.props.shop, this.props.cyclistProfile, this.props.updated, this.props.notes, this.state.fksLogo)
}

canvasMouse =(canvas, e) =>{
      var rect = canvas.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      console.log("x: " + x + " y: " + y);
      
    }

  render(){
 
    const printerIcon = (
      <Button className="pull-right" bsStyle="link" bsSize="xsmall" onClick={this.clickPDFButton}>
        <Glyphicon glyph="print"/>
      </Button>
    )   

    const popoverFrameSize = (
      <Popover id="popover-framesize" title="Frame Size">
       Virtual seat tube length from center to center. (Based solely on inseam and may not reflect optimal size. For more detailed frame size information 
       refer to the Fit Kit instructional materials available from fitkitsystems.com)
      </Popover>
    );    

    const popoverSaddleHeight = (
      <Popover id="popover-saddleheight" title="Saddle Height">
       Distance from pedal spindle center to saddle top with crank in line with seat tube.
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
      Recommended handlebar size measured from the center of the hoods.
      </Popover>
    );

    const popoverSaddleWidth = (
      <Popover id="popover-saddlewidth" title="Saddle Width">
      Recommended saddle width at the saddle's widest point based on sit bone measurement. 
      </Popover>
    );

    const popoverBikeLength = (
      <Popover id="popover-bikelength" title="Bike Length">
      Effective (horizontal) top tube length plus stem length.  
      To arrive at the starting stem to be used, subtract the bicylce top tube measurement from this value. 
      </Popover>
    );
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
let barText="Handlebar Width"
if(this.props.bike.type==="TT/Tri Bike") barText="Aerobar Pad Width"

if(this.state.unsavedChanges)addClassTwo="fks-color"

if(this.state.editFields) addClass="actualPadding"
    return(
      <div>
      <Panel>
        <Panel.Heading>
          <Panel.Title>
            &nbsp; {!this.props.quickSize&&printerIcon}
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body>

<BikeImageCanvas godMode={true} bikeType={this.props.bike.type} onMouseMove={this.canvasMouse} activeMetric={this.state.activeMetric}/>

<Well>
<Table className={addClass} bordered striped hover responsive onMouseLeave={this.tableMouseLeave}>
  <tbody>
  <tr name="brand" id="brand">
      <td><FormControl.Static className="form-control-static">Make:</FormControl.Static></td>
      <td>{this.state.editFields&&
          <InputGroup className="actualInput">
          <FormControl bsSize="sm" value={this.props.bike.make} onChange={this.handleChange("make")}/>
          
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static className="form-control-static">{this.props.bike.make}</FormControl.Static>}
      </td>
    </tr>
    <tr name="model" id="model">
      <td><FormControl.Static className="form-control-static">Model:</FormControl.Static></td>
      <td>{this.state.editFields&&
          <InputGroup className="actualInput">
          <FormControl bsSize="sm" value={this.props.bike.model} onChange={this.handleChange("model")}/>
          
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static className="form-control-static">{this.props.bike.model}</FormControl.Static>}
      </td>
    </tr>
    <tr name="type" id="type">
      <td><FormControl.Static className="form-control-static">Type:</FormControl.Static></td>
      <td>{this.state.editFields&&
          <InputGroup className="actualInput">
          <FormControl componentClass="select" placeholder="Road Bike" bsSize="sm" value={this.props.bike.type} onChange={this.handleChange("type")}>
          <option value="Road Bike">Road Bike</option>
          <option value="Mountain Bike">Mountain Bike</option>
          <option value="TT/Tri Bike">TT/Tri Bike</option>
          </FormControl>
          
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static className="form-control-static">{this.props.bike.type}</FormControl.Static>}
      </td>
    </tr>

    <OverlayTrigger trigger={['hover','focus']}
    placement="bottom"
    overlay={popoverFrameSize}>
    <tr name="fSize" id="frameSize" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td><FormControl.Static className="form-control-static">Frame Size (virtual seat tube):</FormControl.Static></td>
      <td>{this.state.editFields&&
          <InputGroup className="actualInput">
          <FormControl bsSize="sm" value={this.props.bike.frameSize} onChange={this.handleChange("frameSize")}/>
          <InputGroup.Addon>cm.</InputGroup.Addon>
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static className="form-control-static">{this.props.bike.frameSize+" cm."}</FormControl.Static>}
      </td>

    </tr>
    </OverlayTrigger>
    <OverlayTrigger trigger={['hover','focus']}
    placement="bottom"
    overlay={popoverSaddleHeight}>
    <tr id="saddleHeight" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td><FormControl.Static>Saddle Height (saddle to pedal spindle):</FormControl.Static></td>
      <td>
        {this.state.editFields&&
          <InputGroup className="actualInput">
          <FormControl bsSize="sm" value={this.props.bike.saddleHeight} onChange={this.handleChange("saddleHeight")}/>
          <InputGroup.Addon>cm.</InputGroup.Addon>
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static>{this.props.bike.saddleHeight+" cm."}</FormControl.Static>}
      </td>

    </tr>
    </OverlayTrigger>
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
    {!this.props.quickSize&&
    <OverlayTrigger trigger={['hover','focus']}
    placement="bottom"
    overlay={popoverHandlebarWidth}>
    <tr id="handlebarWidth" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td><FormControl.Static>{barText}:</FormControl.Static></td>
      <td>
      {this.state.editFields&&
          <InputGroup className="actualInput">
          <FormControl bsSize="sm" value={this.props.bike.handlebarWidth} onChange={this.handleChange("handlebarWidth")}/>
          <InputGroup.Addon>cm.</InputGroup.Addon>
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static>{this.props.bike.handlebarWidth+" cm."}</FormControl.Static>}        
      </td>
    </tr>
    </OverlayTrigger>
    }
    {!this.props.quickSize&&
    <OverlayTrigger trigger={['hover','focus']}
    placement="top"
    overlay={popoverSaddleWidth}>
    <tr id="saddleWidth" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td><FormControl.Static>Saddle Width:</FormControl.Static></td>
      <td>
      {this.state.editFields&&
          <InputGroup className="actualInput">
          <FormControl bsSize="sm" value={this.props.bike.saddleWidth} onChange={this.handleChange("saddleWidth")}/>
          <InputGroup.Addon>mm.</InputGroup.Addon>
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static>{this.props.bike.saddleWidth+" mm."}</FormControl.Static>}        
      </td>
    </tr>
    </OverlayTrigger>
    }
    <OverlayTrigger trigger={['hover','focus']}
    placement="top"
    overlay={popoverBikeLength}>
    <tr id="bikeLength" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td><FormControl.Static>Bike Length (top tube + stem):</FormControl.Static></td>
      <td>
      {this.state.editFields&&
          <InputGroup className="actualInput">
          <FormControl bsSize="sm" value={this.props.bike.bikeLength} onChange={this.handleChange("bikeLength")}/>
          <InputGroup.Addon>cm.</InputGroup.Addon>
          </InputGroup>}
          {!this.state.editFields&&
          <FormControl.Static>{this.props.bike.bikeLength+" cm."}</FormControl.Static>}        
      </td>
    </tr>
    </OverlayTrigger>
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
</Well>

        </Panel.Body>
       
      </Panel>
      <ButtonToolbar className='pull-right'>
      <Button className={addClassTwo} disabled={!this.state.unsavedChanges} onClick={this.saveBikeChanges}>Save Changes</Button>
      {!this.state.editFields&&<Button onClick={this.clickEdit}>Edit</Button>}
      {this.state.editFields&&<Button onClick={this.clickCancel}>Cancel</Button>}
      </ButtonToolbar>
</div>
        );
  }
  
}

export default Bike
