import React, { Component } from 'react'
import {Panel} from "react-bootstrap"
import './QuickSize.css'
import CoreMeasurements from './CoreMeasurements'
import HeightWeight from './HeightWeight'
import ShouldersSitBones from './ShouldersSitbones'


class BodyMeasurements extends Component {


  render() {
 
    return (
      <Panel>
        <Panel.Body className="input-panel">
        <HeightWeight preferences={this.props.preferences} imperialHeight={this.props.imperialHeight} imperialWeight={this.props.imperialWeight} bodyMeasurements={this.props.bodyMeasurements} updateHeight={this.props.updateHeight} updateWeight={this.props.updateWeight}/>
        <CoreMeasurements bodyMeasurements={this.props.bodyMeasurements} changeInseam={this.props.changeInseam} changeFootLength={this.props.changeFootLength} changeTorso={this.props.changeTorso}
      changeArm={this.props.changeArm}/>
        <ShouldersSitBones bodyMeasurements={this.props.bodyMeasurements} changeShoulders={this.props.changeShoulders} changeSitBones={this.props.changeSitBones}/>
     </Panel.Body>
     </Panel>
      
    )
  }
}

export default BodyMeasurements;  