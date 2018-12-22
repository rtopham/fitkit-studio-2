import React, { Component } from 'react'
import {Panel, Radio, Button, Form, FormGroup, FormControl, ControlLabel} from "react-bootstrap"
import './Cyclist.css'
import {create} from './api-cyclist.js'
import {Redirect} from 'react-router-dom'
import auth from './../auth/auth-helper'

class CreateNewCyclist extends Component {
  constructor({match}) {
    super()
this.state={
error:'',
show:false,
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
  }

}
this.match=match
  }

clickCreateCyclist = (e) =>{
  e.preventDefault()

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
      console.log(data)
    }
  })
}

  validateInputLength(input, min){
    const length = input.length
      if(length>min) return 'success';
      else if (length>0) return 'error';
      return null;
   }
  
   validateBirthDate(date){
    const regex = /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/ 
    if(regex.test(date)) return 'success'; else if (date.length>0) return 'error'
   }
  
   validateTime(time){
    const regex = /^([0-9][0-9]):([0-5][0-9]):([0-5][0-9])$/
    if(regex.test(time)) return 'success'; else if (time.length>0) return 'error'
   }
   
   validateEmail(email){
    const regex =  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g 
    if(regex.test(email)) return 'success'; else if (email.length>0) return 'error'
   } 

   validatePhone(phone){
    const regex =  /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm 
    if(regex.test(phone)) return 'success'; else if (phone.length>0) return 'error'
   } 

   validateZipCode(zipCode){
    const regex =  /(^\d{5}(\d{4})?$)|(^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1}\d{1}[A-Z]{1}\d{1}$)(^\d{5}(\d{4})?$)|(^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1}\d{1}[A-Z]{1}\d{1}$)/g 
    if(regex.test(zipCode)) return 'success'; else if (zipCode.length>0) return 'error'
   } 

  
  
    validateForm() {
      return (
        this.validateInputLength(this.state.cyclistProfile.firstName,2)==='success'&&
        this.validateEmail(this.state.cyclistProfile.email)==='success'&&
        this.validateInputLength(this.state.cyclistProfile.lastName,2)==='success'&&
        this.validatePhone(this.state.cyclistProfile.phone)==='success'&&
        this.validateZipCode(this.state.cyclistProfile.zipCode)==='success'&&
        this.validateBirthDate(this.state.cyclistProfile.birthDate)==='success'
  
      );
    }  
  
    handleChange = name => event => {
      let cyclistProfile = Object.assign({},this.state.cyclistProfile)
      cyclistProfile[name]=event.target.value
      this.setState({cyclistProfile})
    }

render() {
  if(this.state.redirectToQuickSizePlus) return <Redirect to={'/quicksize-plus/'+this.match.params.userId+'/'+this.state.cyclistId}/>
    return (
      <div className="globalCore">
    <Panel>
      <Panel.Heading>
        <Panel.Title>Create New Cyclist</Panel.Title>
      </Panel.Heading>
      <Panel.Body>
      <Form>
                <FormGroup validationState={this.validateInputLength(this.state.cyclistProfile.firstName,2)}>
                  <ControlLabel>First Name</ControlLabel>
                  <FormControl
                  value={this.state.cyclistProfile.firstName}
                  onChange={this.handleChange("firstName")}
                  name="firstName" autoFocus />
                </FormGroup>
                <FormGroup validationState={this.validateInputLength(this.state.cyclistProfile.lastName,2)}>
                  <ControlLabel>Last Name</ControlLabel>
                  <FormControl
                  value={this.state.cyclistProfile.lastName}
                  onChange={this.handleChange("lastName")}
                  name="lastName"/>
                </FormGroup>                
                <FormGroup validationState={this.validateEmail(this.state.cyclistProfile.email)}>
                  <ControlLabel>Email</ControlLabel>
                  <FormControl
                  type="email"
                  value={this.state.cyclistProfile.email}
                  onChange={this.handleChange("email")}                  
                  name="email" />
                </FormGroup>
                <FormGroup validationState={this.validatePhone(this.state.cyclistProfile.phone)}>
                  <ControlLabel>Phone</ControlLabel>
                  <FormControl
                  type="tel"
                  value={this.state.cyclistProfile.phone}
                  onChange={this.handleChange("phone")}                  
                  name="phone" />
                </FormGroup>
                <FormGroup validationState={this.validateZipCode(this.state.cyclistProfile.zipCode)}>
                  <ControlLabel>Zip Code</ControlLabel>
                  <FormControl
                  type="zipcode"
                  value={this.state.cyclistProfile.zipCode}
                  onChange={this.handleChange("zipCode")}                  
                  name="zipCode" />
                </FormGroup>
                <FormGroup validationState={this.validateBirthDate(this.state.cyclistProfile.birthDate)}>
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
                

    
              </Form>
      </Panel.Body>
      <Panel.Footer>
        <Button color="primary" disabled={!this.validateForm()} onClick={this.clickCreateCyclist}>Create Cyclist</Button>
      </Panel.Footer>
    </Panel>
      </div>
      
    )
  }
}

export default CreateNewCyclist;  