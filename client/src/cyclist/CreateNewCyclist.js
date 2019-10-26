import React, { Component } from 'react'
import {Panel, Radio, Button, Form, FormGroup, FormControl, ControlLabel, Glyphicon} from "react-bootstrap"
import {LinkContainer} from 'react-router-bootstrap'
import './Cyclist.css'
import {create, listByUserSearch} from './api-cyclist.js'
import {Redirect} from 'react-router-dom'
import auth from './../auth/auth-helper'
import {recordLogAction} from '../admin/api-admin'
import DuplicateCyclistWarningModal from './DuplicateCyclistWarningModal'
import {validateInputLength, validateBirthDate, validateEmail, validateZipCode, validatePhone} from '../lib/form-validation'

class CreateNewCyclist extends Component {
  constructor({match}) {
    super()
this.state={
error:'',
show:false,
showDuplicateWarning:false,
redirectToQuickSizePlus:false,
cyclistId:'',
cyclistProfile:{
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    zipCode:'',
    birthDate:'',
    gender:'Male'
},
softScores:{
    flexibility:'Good',
    ridingStyle:'Competitive',
    preconditions:'None'
  },
bodyMeasurements:{
  inseam: 86,
  footLength: 25,
  torso: 56,
  arm: 56,
  height: 183,
  shoulders: 40,
  sitBones: 120
  },
  duplicateCustomers:{}

}
this.match=match
  }

clickCreateCyclist= async (e)=>{
  e.preventDefault()
  await this.checkForExistingCustomer()
  .then((data)=>{
    if (data!==false){
       this.setState({duplicateCustomers:data, showDuplicateWarning:true})
     } else this.createCustomer()
 })
}

handleRequestClose=()=>{
 this.setState({showDuplicateWarning:false})
}

handleContinue=()=>{
  this.setState({showDuplicateWarning:false})
  this.createCustomer()
}

reloadCyclists=()=>{
  this.setState({showDuplicateWarning:false})
}


checkForExistingCustomer=()=>{
  
  return new Promise(resolve=>{
    const jwt = auth.isAuthenticated()  
    listByUserSearch({
          userId: jwt.user._id,
          search: `?lastName=${this.state.cyclistProfile.lastName}&birthDate=${this.state.cyclistProfile.birthDate}`
        }, {t: jwt.token}).then((data) => {
          if (data.error) {
            console.log(data.error)
          } else {
            if(data.length>0) resolve(data); else resolve(false)
         }
        })

  })
}


createCustomer = () =>{
const jwt = auth.isAuthenticated()
const cyclist={
  cyclistProfile: Object.assign({},this.state.cyclistProfile),
  bodyMeasurements: Object.assign({},this.state.bodyMeasurements),
  softScores: Object.assign({},this.state.softScores)
}

  create({userId:jwt.user._id},{t:jwt.token},cyclist).then((data) => {
    if (data.error) {
      this.setState({error: data.error})
    } else {
      this.setState({error: '', show: true, redirectToQuickSizePlus:true,cyclistId:data.newCyclistId})
      const logData={userId:jwt.user._id,action: "created cyclist", description: "User "+jwt.user.name+" created cyclist "+this.state.cyclistProfile.firstName+' '+this.state.cyclistProfile.lastName+".", documentId:data.newCyclistId}
      recordLogAction(logData)
    }
  })
}

  
    validateForm() {
      return (
        validateInputLength(this.state.cyclistProfile.firstName,1)==='success'&&
        (validateEmail(this.state.cyclistProfile.email)==='success'|validateEmail(this.state.cyclistProfile.email)===null)&&
        validateInputLength(this.state.cyclistProfile.lastName,1)==='success'&&
        (validatePhone(this.state.cyclistProfile.phone)==='success'|validatePhone(this.state.cyclistProfile.phone)===null)&&
        (validateZipCode(this.state.cyclistProfile.zipCode)==='success'|validateZipCode(this.state.cyclistProfile.zipCode)===null)&&
        validateBirthDate(this.state.cyclistProfile.birthDate)==='success'
  
      );
    }  
  
    handleChange = name => event => {
      let cyclistProfile = Object.assign({},this.state.cyclistProfile)
      cyclistProfile[name]=event.target.value
      this.setState({cyclistProfile})
    }

render() {
  if(this.state.redirectToQuickSizePlus) return <Redirect to={'/quickfit/'+this.match.params.userId+'/'+this.state.cyclistId}/>
  
    return (
      <div className="globalCore">
    <Panel className="modal-container">
      <Panel.Heading>
        <Panel.Title>New Customer<LinkContainer to={"/quickfit/"+this.match.params.userId}><Button className="pull-right" bsStyle="link"><Glyphicon glyph="arrow-left"></Glyphicon></Button></LinkContainer></Panel.Title>
      </Panel.Heading>
      <Panel.Body>
{this.state.showDuplicateWarning&&
  <div>
  <DuplicateCyclistWarningModal cyclistProfile={this.state.cyclistProfile} userId={this.match.params.userId} duplicateCustomers={this.state.duplicateCustomers} handleRequestClose={this.handleRequestClose} handleContinue={this.handleContinue}
  reloadCyclists={this.reloadCyclists}/>
  <div className="centerthis">
  <Button bsStyle="link" bsSize="xsmall" onClick={this.clickButton}><span className="glyphicon glyphicon-trash" aria-label="Delete" aria-hidden="true" > </span></Button>
  </div>
  </div>
}

      <Form>

                <FormGroup validationState={validateInputLength(this.state.cyclistProfile.firstName,1)}>
                  <ControlLabel>First Name</ControlLabel>
                  <FormControl
                  value={this.state.cyclistProfile.firstName}
                  onChange={this.handleChange("firstName")}
                  name="firstName" autoFocus />
                </FormGroup>
                <FormGroup validationState={validateInputLength(this.state.cyclistProfile.lastName,1)}>
                  <ControlLabel>Last Name</ControlLabel>
                  <FormControl
                  value={this.state.cyclistProfile.lastName}
                  onChange={this.handleChange("lastName")}
                  name="lastName"/>
                </FormGroup>                
                <FormGroup validationState={validateEmail(this.state.cyclistProfile.email)}>
                  <ControlLabel>Email</ControlLabel>
                  <FormControl
                  type="email"
                  value={this.state.cyclistProfile.email}
                  onChange={this.handleChange("email")}                  
                  name="email" />
                </FormGroup>
                <FormGroup validationState={validatePhone(this.state.cyclistProfile.phone)}>
                  <ControlLabel>Phone</ControlLabel>
                  <FormControl
                  type="tel"
                  value={this.state.cyclistProfile.phone}
                  onChange={this.handleChange("phone")}                  
                  name="phone" />
                </FormGroup>
                <FormGroup validationState={validateZipCode(this.state.cyclistProfile.zipCode)}>
                  <ControlLabel>Zip Code</ControlLabel>
                  <FormControl
                  type="zipcode"
                  value={this.state.cyclistProfile.zipCode}
                  onChange={this.handleChange("zipCode")}                  
                  name="zipCode" />

                </FormGroup>
                <FormGroup validationState={validateBirthDate(this.state.cyclistProfile.birthDate)}>
                  <ControlLabel>Birth Date</ControlLabel>
                  <FormControl
                  type="date"
                  value={this.state.cyclistProfile.birthDate}
                  onChange={this.handleChange("birthDate")}                  
                  name="birthDate" />
                </FormGroup>
                <FormGroup>
                <ControlLabel>Gender</ControlLabel>
                </FormGroup>
                <Radio inline onChange={this.handleChange("gender")} defaultChecked value="Male" name="gender">Male</Radio>
                <Radio inline onChange={this.handleChange("gender")} value="Female" name="gender">Female</Radio>
                <Radio inline onChange={this.handleChange("gender")} value="None-Binary" name="gender">Non-Binary</Radio>

    
              </Form>
      </Panel.Body>

      <Panel.Footer>
        <Button color="primary" disabled={!this.validateForm()} onClick={this.clickCreateCyclist}>Save New Customer</Button>
      </Panel.Footer>

    </Panel>
      </div>
      
    )
  }
}

export default CreateNewCyclist;  