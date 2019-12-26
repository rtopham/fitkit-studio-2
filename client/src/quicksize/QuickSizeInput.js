import React from 'react'
import {InputGroup, OverlayTrigger, Glyphicon, FormControl} from "react-bootstrap"
import './QuickSize.css'

const QuickSizeInput=(props)=>{

     const unitSpan = props.toggleUnits ? (
      <span className="unit-toggle" onClick={props.toggleUnits}>{props.units+" "}</span>

      ): <span>{props.units+" "}</span>


  return(
 
  <div className="two-column">
  <InputGroup className="qs-control-margin"><InputGroup.Addon>{props.label +": "}</InputGroup.Addon>
  <FormControl className="qs-input" type="number" value={props.value} onChange={props.onChange}
  min={props.min} max={props.max} step={props.step}></FormControl>
  <InputGroup.Addon className="qs-addon">
  {unitSpan}
  <OverlayTrigger trigger={["hover", "focus"]} placement="left" overlay={props.overlay}><Glyphicon glyph="info-sign"></Glyphicon>
   </OverlayTrigger>
  </InputGroup.Addon>
  </InputGroup>
   </div>
                 
        )
  }


export default QuickSizeInput
