import React from 'react'
import './QuickSize.css'
import QuickSizeSlider from './QuickSizeSlider'
import QuickSizeInput from './QuickSizeInput'
import {inseamHelp, footLengthHelp, torsoHelp, armHelp} from './HelpOverlays'

const CoreMeasurements=(props)=> {
 
    return (
      <div>
      <div className="row">
      <QuickSizeInput label="Foot Length" units="cm." value={props.bodyMeasurements.footLength} overlay={footLengthHelp} min={21.5} max={31.8} step={.1} onChange={props.changeFootLength}/>
      <QuickSizeInput label="Inseam" units="cm. " value={props.bodyMeasurements.inseam} overlay={inseamHelp} min={70} max={99.9} step={.1} onChange={props.changeInseam} />      
      </div>
      <div className="row">
      <QuickSizeSlider label="Foot Length" units="cm." value={props.bodyMeasurements.footLength} overlay={footLengthHelp} min={21.5} max={31.8} step={.1} onChange={props.changeFootLength}/>
      <QuickSizeSlider inputClass="column" label="Inseam" units="cm." value={props.bodyMeasurements.inseam} overlay={inseamHelp} min={70} max={99.9} step={.1} onChange={props.changeInseam} />
      </div>
      <div className="row">
      <QuickSizeInput label="Torso" units="cm." value={props.bodyMeasurements.torso} overlay={torsoHelp} min={50} max={75} step={.1} onChange={props.changeTorso} />
      <QuickSizeInput label="Arm" units="cm." value={props.bodyMeasurements.arm} overlay={armHelp} min={50} max={70} step={.1} onChange={props.changeArm} />
      </div>       
      <div className="row">
      <QuickSizeSlider label="Torso" units="cm." value={props.bodyMeasurements.torso} overlay={torsoHelp} min={50} max={75} step={.1} onChange={props.changeTorso} />
      <QuickSizeSlider label="Arm" units="cm." value={props.bodyMeasurements.arm} overlay={armHelp} min={50} max={70} step={.1} onChange={props.changeArm} />
      </div>
      </div>
      
    )
  }

export default CoreMeasurements;  