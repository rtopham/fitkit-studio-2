import React, { Component } from 'react'
import {Panel} from "react-bootstrap"
import './QuickSize.css'
import QuickSizeSlider from './QuickSizeSlider'
import QuickSizeInput from './QuickSizeInput'
import {inseamHelp, footLengthHelp, torsoHelp, armHelp, sitBonesHelp, shouldersHelp, heightHelp} from './HelpOverlays'

class BodyMeasurements extends Component {


  render() {
 
    return (
      <Panel>
        <Panel.Body className="input-panel">
      <div className="row">
      <QuickSizeInput label="Inseam" units="cm. " value={this.props.bodyMeasurements.inseam} overlay={inseamHelp} min={70} max={99.9} step={.1} onChange={this.props.changeInseam} />

      </div>
       <div className="bigcolumn">
       <QuickSizeSlider inputClass="column" label="Inseam" units="cm." value={this.props.bodyMeasurements.inseam} overlay={inseamHelp} min={70} max={99.9} step={.1} onChange={this.props.changeInseam} />
      
             </div>
      <div className="row">
      <QuickSizeInput label="Foot Length" units="cm." value={this.props.bodyMeasurements.footLength} overlay={footLengthHelp} min={21.5} max={31.8} step={.1} onChange={this.props.changeFootLength}/>
      <QuickSizeInput label="Torso" units="cm." value={this.props.bodyMeasurements.torso} overlay={torsoHelp} min={34} max={75} step={.1} onChange={this.props.changeTorso} />
      <QuickSizeInput label="Arm" units="cm." value={this.props.bodyMeasurements.arm} overlay={armHelp} min={34} max={75} step={.1} onChange={this.props.changeArm} />
      </div>       
      <div className="row">
      <div className="column">
      <QuickSizeSlider label="Foot Length" units="cm." value={this.props.bodyMeasurements.footLength} overlay={footLengthHelp} min={21.5} max={31.8} step={.1} onChange={this.props.changeFootLength}/>
      </div>
      <div className="column">
      <QuickSizeSlider label="Torso" units="cm." value={this.props.bodyMeasurements.torso} overlay={torsoHelp} min={34} max={75} step={.1} onChange={this.props.changeTorso} />
     </div>
     <div className="column">
     <QuickSizeSlider label="Arm" units="cm." value={this.props.bodyMeasurements.arm} overlay={armHelp} min={34} max={75} step={.1} onChange={this.props.changeArm} />
     </div>
     <div className="row">
       <QuickSizeInput label="Height" units="cm." value={this.props.bodyMeasurements.height} overlay={heightHelp} min={122} max={215} step={.1} onChange={this.props.changeHeight} />
       <QuickSizeInput label="Shoulders" units="cm." value={this.props.bodyMeasurements.shoulders} overlay={shouldersHelp}  min={34} max={50} step={.5} onChange={this.props.changeShoulders} />
      <QuickSizeInput label="Sit Bones" units="mm." value={this.props.bodyMeasurements.sitBones} overlay={sitBonesHelp} min={90} max={140} step={1} onChange={this.props.changeSitBones} />
     </div>
     <div className="row">
     <div className="column">
       <QuickSizeSlider label="Height" units="cm." value={this.props.bodyMeasurements.height} overlay={heightHelp} min={122} max={215} step={.1} onChange={this.props.changeHeight} />
      </div>
      <div className="column">
       <QuickSizeSlider label="Shoulders" units="cm." value={this.props.bodyMeasurements.shoulders} overlay={shouldersHelp}  min={34} max={50} step={.5} onChange={this.props.changeShoulders} />
     </div>
     <div className="column">
      <QuickSizeSlider label="Sit Bones" units="mm." value={this.props.bodyMeasurements.sitBones} overlay={sitBonesHelp} min={90} max={140} step={1} onChange={this.props.changeSitBones} />
     </div>
     </div>
     </div>
     </Panel.Body>
     </Panel>
      
    )
  }
}

export default BodyMeasurements;  