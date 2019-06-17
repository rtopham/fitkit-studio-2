import React, { Component } from 'react'
import './QuickSize.css'
import QuickSizeSlider from './QuickSizeSlider'
import QuickSizeInput from './QuickSizeInput'
import {inseamHelp, footLengthHelp, torsoHelp, armHelp} from './HelpOverlays'

class CoreMeasurements extends Component {


  render() {
 
    return (
      <div>
      <div className="row">
      <QuickSizeInput label="Foot Length" units="cm." value={this.props.bodyMeasurements.footLength} overlay={footLengthHelp} min={21.5} max={31.8} step={.1} onChange={this.props.changeFootLength}/>
      <QuickSizeInput label="Inseam" units="cm. " value={this.props.bodyMeasurements.inseam} overlay={inseamHelp} min={70} max={99.9} step={.1} onChange={this.props.changeInseam} />      
      </div>
      <div className="row">
      <QuickSizeSlider label="Foot Length" units="cm." value={this.props.bodyMeasurements.footLength} overlay={footLengthHelp} min={21.5} max={31.8} step={.1} onChange={this.props.changeFootLength}/>
      <QuickSizeSlider inputClass="column" label="Inseam" units="cm." value={this.props.bodyMeasurements.inseam} overlay={inseamHelp} min={70} max={99.9} step={.1} onChange={this.props.changeInseam} />
      </div>
      <div className="row">
      <QuickSizeInput label="Torso" units="cm." value={this.props.bodyMeasurements.torso} overlay={torsoHelp} min={34} max={75} step={.1} onChange={this.props.changeTorso} />
      <QuickSizeInput label="Arm" units="cm." value={this.props.bodyMeasurements.arm} overlay={armHelp} min={75} max={96} step={.1} onChange={this.props.changeArm} />
      </div>       
      <div className="row">
      <QuickSizeSlider label="Torso" units="cm." value={this.props.bodyMeasurements.torso} overlay={torsoHelp} min={34} max={75} step={.1} onChange={this.props.changeTorso} />
      <QuickSizeSlider label="Arm" units="cm." value={this.props.bodyMeasurements.arm} overlay={armHelp} min={75} max={96} step={.1} onChange={this.props.changeArm} />
      </div>
      </div>
      
    )
  }
}

export default CoreMeasurements;  