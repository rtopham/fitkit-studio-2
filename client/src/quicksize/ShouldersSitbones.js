import React, { Component } from 'react'
import './QuickSize.css'
import QuickSizeSlider from './QuickSizeSlider'
import QuickSizeInput from './QuickSizeInput'
import {sitBonesHelp, shouldersHelp} from './HelpOverlays'

class ShouldersSitBones extends Component {


  render() {
 
    return (
      <div>
     <div className="row">
       <QuickSizeInput label="Shoulders" units="cm." value={this.props.bodyMeasurements.shoulders} overlay={shouldersHelp}  min={34} max={50} step={.5} onChange={this.props.changeShoulders} />
      <QuickSizeInput label="Sit Bones" units="mm." value={this.props.bodyMeasurements.sitBones} overlay={sitBonesHelp} min={90} max={150} step={1} onChange={this.props.changeSitBones} />
     </div>
     <div className="row">
      <QuickSizeSlider label="Shoulders" units="cm." value={this.props.bodyMeasurements.shoulders} overlay={shouldersHelp}  min={34} max={50} step={.5} onChange={this.props.changeShoulders} />
      <QuickSizeSlider label="Sit Bones" units="mm." value={this.props.bodyMeasurements.sitBones} overlay={sitBonesHelp} min={90} max={150} step={1} onChange={this.props.changeSitBones} />
     </div>
      </div>
    )
  }
}

export default ShouldersSitBones;  