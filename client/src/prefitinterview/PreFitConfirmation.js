import React, { Component } from 'react'
import {Image, Panel, Well} from "react-bootstrap"
import fksLogo from './../assets/fksicon.jpg'

class PreFitConfirmation extends Component {
  
render() {
    let logo = fksLogo
    if(this.props.location.state.prefitState.logoUrl!=='none') logo=this.props.location.state.prefitState.logoUrl  

return (
<div className="globalCore-pre-fit-interview-header">
<Well >
<Image className="pre-fit-logo" src={logo}></Image>
{this.props.location.state.prefitState.logoUrl!=='none'&&this.props.location.state.prefitState.shop.name+' | '+this.props.location.state.prefitState.shop.address+' | '+this.props.location.state.prefitState.shop.phone}
          {this.props.location.state.prefitState.logoUrl==='none'&&<b>Fit Kit Studio (Pre Bike Fit Interview Form)</b>}
</Well>
<Panel>
  <Panel.Heading>
    <Panel.Title>Submission Confirmation</Panel.Title>
  </Panel.Heading>
  <Panel.Body>
    Thank you for completing your pre-fit interview. Your submission will be provided to your bike fitting professional.
  </Panel.Body>
</Panel>
</div>
    )
  }
}

export default PreFitConfirmation;  