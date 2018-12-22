import React, { Component } from 'react'
import {InputGroup, OverlayTrigger, Glyphicon, FormControl} from "react-bootstrap"
import './QuickSize.css'

class QuickSizeInput extends Component{

  render(){



    return(
 
  <div className="column">
  <InputGroup className="qs-control-margin"><InputGroup.Addon>{this.props.label +": "}</InputGroup.Addon>
  <FormControl className="qs-input" type="number" value={this.props.value} onChange={this.props.onChange}
  min={this.props.min} max={this.props.max} step={this.props.step}></FormControl>
  <InputGroup.Addon className="qs-addon">{this.props.units+" "} 
  <OverlayTrigger trigger={["hover", "focus"]} placement="top" overlay={this.props.overlay}><Glyphicon glyph="info-sign"></Glyphicon>
   </OverlayTrigger>
  </InputGroup.Addon>
  </InputGroup>
   </div>

 
                 
        )
  }
  
}

export default QuickSizeInput
