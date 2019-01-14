import React, { Component } from 'react'
import {InputGroup, OverlayTrigger, Glyphicon, FormControl} from "react-bootstrap"
import './QuickSize.css'

class QuickSizeInput extends Component{

  render(){
    
    const unitSpan = this.props.toggleUnits ? (
      <span className="unit-toggle" onClick={this.props.toggleUnits}>{this.props.units+" "}</span>

      ): <span>{this.props.units+" "}</span>


    return(
 
  <div className="two-column">
  <InputGroup className="qs-control-margin"><InputGroup.Addon>{this.props.label +": "}</InputGroup.Addon>
  <FormControl className="qs-input" type="number" value={this.props.value} onChange={this.props.onChange}
  min={this.props.min} max={this.props.max} step={this.props.step}></FormControl>
  <InputGroup.Addon className="qs-addon">
  {unitSpan}
  <OverlayTrigger trigger={["hover", "focus"]} placement="top" overlay={this.props.overlay}><Glyphicon glyph="info-sign"></Glyphicon>
   </OverlayTrigger>
  </InputGroup.Addon>
  </InputGroup>
   </div>

 
                 
        )
  }
  
}

export default QuickSizeInput
