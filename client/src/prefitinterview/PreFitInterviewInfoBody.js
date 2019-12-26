import React from 'react'
import {FormGroup, FormControl, ControlLabel, Well} from "react-bootstrap"
import clientconfig from '../clientconfig/config'
import "./PreFit.css"

const PreFitInterviewInfoBody=(props)=> {
  if(!props.user.stripe_customer_id) return (
    <React.Fragment>
     <Well><p>Applicable to subscribers of Quick Fit only.</p>
     <p>Upgrade to Quick Fit to use Pre-Fit interviews.
        Pre-fit interviews can be used to collect customer data and automate the customer intake process. Completed customer interviews appear on the 
          main Quick Fit page, where the data can be imported to a new customer record or, alternatively, linked to an existing customer. The pre-fit interview 
          form will be customized with your shop or studio branding information if you have activated that feature.</p>
          
   </Well>
    </React.Fragment>
    )
    else return (
        <React.Fragment>
          <p>Pre-fit interviews can be used to collect customer data and automate the customer intake process. Completed customer interviews appear on the 
          main Quick Fit page, where the data can be imported to a new customer record or, alternatively, linked to an existing customer. The pre-fit interview 
          form will be customized with your shop or studio branding information if you have activated that feature.</p>
          <p>
          Use any of the links below to direct your customers to the pre-fit interview form linked to your account.
          </p>
          <FormGroup>
          <ControlLabel>URL for Customers to Complete Pre-Fit Interview</ControlLabel>
          <FormControl.Static>{clientconfig.appUrlBase}pre-fit-interview/{props.user._id}</FormControl.Static>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Pretty Links</ControlLabel>
          {/*<FormControl.Static><a href={`${clientconfig.appUrlBase}pre-fit-interview/${props.user._id}`}>Bike-Fit Interview</a></FormControl.Static>*/}
          <FormControl.Static><a href={`${clientconfig.appUrlBase}pre-fit-interview/${props.user._id}`}>Pre-Fit Interview</a></FormControl.Static>
          {props.shop.name&&
          <div>
          {/*<FormControl.Static><a href={`${clientconfig.appUrlBase}pre-fit-interview/${props.user._id}`}>{props.shop.name+' Bike-Fit Interview'}</a></FormControl.Static>*/}
          <FormControl.Static><a href={`${clientconfig.appUrlBase}pre-fit-interview/${props.user._id}`}>{props.shop.name+' Pre-Fit Interview'}</a></FormControl.Static>
          </div>
          }
        </FormGroup>   
        </React.Fragment>     
        )

  }


export default PreFitInterviewInfoBody