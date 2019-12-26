import React from 'react'
import {Image, Panel, Well} from "react-bootstrap"
import fksLogo from './../assets/fksicon.jpg'

const PreFitConfirmation=(props)=>{
  
    let logo = fksLogo
    if(props.location.state.prefitState.logoUrl!=='none') logo=props.location.state.prefitState.logoUrl  

return (
<div className="globalCore-pre-fit-interview-header">
<Well >
<Image className="pre-fit-logo" src={logo}></Image>
{props.location.state.prefitState.logoUrl!=='none'&&props.location.state.prefitState.shop.name+' | '+props.location.state.prefitState.shop.address+' | '+props.location.state.prefitState.shop.phone}
          {props.location.state.prefitState.logoUrl==='none'&&<b>Fit Kit Studio (Pre Bike Fit Interview Form)</b>}
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

export default PreFitConfirmation;  