import React, { Component } from 'react'
import {Panel, Radio, Button, Form, FormGroup, FormControl, Well, ControlLabel, Glyphicon} from "react-bootstrap"
import {LinkContainer} from 'react-router-bootstrap'
import './Cyclist.css'
import {create, listByUserSearch} from './api-cyclist.js'
import {create as createNewBike} from './../bike/api-bike'
import {update} from '../prefitinterview/api-prefitinterview'
import {Redirect} from 'react-router-dom'
import auth from './../auth/auth-helper'
import {recordLogAction} from '../admin/api-admin'
import DuplicateCyclistWarningModal from './DuplicateCyclistWarningModal'
import {validateInputLength, validateBirthDate, validateEmail, validateZipCode, validatePhone} from '../lib/form-validation'

class CreateNewCyclistFromInterview extends Component {
  constructor({match}) {
    super()
this.state={
error:'',
show:false,
createBike:'yes',
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
  weight: 68,
  shoulders: 40,
  sitBones: 120
  },
  duplicateCustomers:{},
  bikeType:'',
  bikeMake:'',
  bikeModel:'',
  bikeFrameSize:''

}
this.match=match
  }

componentDidMount=()=>{
  let cyclistProfile = Object.assign({},this.state.cyclistProfile)
  let bodyMeasurements= Object.assign({},this.state.bodyMeasurements)
  let softScores= Object.assign({},this.state.softScores)
  cyclistProfile.firstName=this.props.location.state.interview.firstName
  cyclistProfile.lastName=this.props.location.state.interview.lastName
  cyclistProfile.email=this.props.location.state.interview.email
  cyclistProfile.phone=this.props.location.state.interview.phone
  cyclistProfile.zipCode=this.props.location.state.interview.zipCode
  cyclistProfile.birthDate=this.props.location.state.interview.birthDate.substring(0,10)
  cyclistProfile.gender=this.props.location.state.interview.gender
  bodyMeasurements.height=this.props.location.state.interview.height
  bodyMeasurements.weight=this.props.location.state.interview.weight
  softScores.ridingStyle=this.props.location.state.interview.ridingStyle
  let bikeType=this.props.location.state.interview.bikeType
  let bikeMake=this.props.location.state.interview.bikeMake
  let bikeModel=this.props.location.state.interview.bikeModel
  let bikeFrameSize=this.props.location.state.interview.bikeFrameSize

  this.setState({cyclistProfile,bodyMeasurements,softScores,bikeType,bikeMake,bikeModel,bikeFrameSize})

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
  softScores: Object.assign({},this.state.softScores),
}

  create({userId:jwt.user._id},{t:jwt.token},cyclist).then((data) => {
    if (data.error) {
      this.setState({error: data.error})
    } else {
      this.setState({error: '', show: true, redirectToQuickSizePlus:true,cyclistId:data.newCyclistId})
      const logData={userId:jwt.user._id,action: "created cyclist", description: "User "+jwt.user.name+" created cyclist "+this.state.cyclistProfile.firstName+' '+this.state.cyclistProfile.lastName+".", documentId:data.newCyclistId}
      recordLogAction(logData)
      this.addCyclistIdToPreFitInterview(jwt,data.newCyclistId)
      if (this.state.createBike) this.createBike(jwt,data.newCyclistId)
    }
  })
}

addCyclistIdToPreFitInterview=(jwt,newCyclistId)=>{
  let interview=this.props.location.state.interview
  interview.createdForCyclist=newCyclistId
  update({userId:this.match.params.userId,interviewId:interview._id},{t:jwt.token},interview).then((data) => {
    if (data.error) {
      this.setState({error: data.error})
    } else {

    }
  })
}

createBike=(jwt,cyclistId) =>{

const bike={
  type:this.state.bikeType,
  make:this.state.bikeMake,
  model: this.state.bikeModel,
  frameSize: this.state.framesize,
  createdBy: this.match.params.userId,
  ownedBy: cyclistId
}

    createNewBike({userId:jwt.user._id,cyclistId:cyclistId}, {t:jwt.token},bike).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        
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

    handleBikeChange = name => event => {
      this.setState({[name]:event.target.value})
    }


render() {
  if(this.state.redirectToQuickSizePlus) return <Redirect to={'/quickfit/'+this.match.params.userId+'/'+this.state.cyclistId}/>
  
    return (
      <div className="globalCore">



    <Panel className="modal-container">
      <Panel.Heading>
        <Panel.Title>New Customer From Pre-Fit Interview<LinkContainer to={"/quickfit/"+this.match.params.userId}><Button className="pull-right" bsStyle="link"><Glyphicon glyph="arrow-left"></Glyphicon></Button></LinkContainer></Panel.Title>
      </Panel.Heading>
      <Panel.Body>
{this.state.showDuplicateWarning&&
  <div>
  <DuplicateCyclistWarningModal cyclistProfile={this.state.cyclistProfile}  userId={this.match.params.userId} duplicateCustomers={this.state.duplicateCustomers} handleRequestClose={this.handleRequestClose} handleContinue={this.handleContinue}
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
                <FormGroup>
                <Radio inline onChange={this.handleChange("gender")} checked={this.state.cyclistProfile.gender==="Male"} value="Male" name="gender">Male</Radio>
                <Radio inline onChange={this.handleChange("gender")} checked={this.state.cyclistProfile.gender==="Female"} value="Female" name="gender">Female</Radio>
                <Radio inline onChange={this.handleChange("gender")} checked={this.state.cyclistProfile.gender==="Non-Binary"} value="Non-Binary" name="gender">Non-Binary</Radio>
                </FormGroup>
                {!this.props.location.state.interview.objectiveMeasureAndAdvise&&
                <Well>
                <FormGroup>
                <FormControl.Static><b>Current Bike Details</b></FormControl.Static>
                </FormGroup>
                <ControlLabel>Create bike from currrent bike details?&nbsp; </ControlLabel>
                <FormGroup>
                
                <Radio inline onChange={this.handleBikeChange("createBike")} checked={this.state.createBike==="yes"} value={"yes"} name="createBike">Yes</Radio>
                <Radio inline onChange={this.handleBikeChange("createBike")} checked={this.state.createBike==="no"} value={"no"} name="createBike">No</Radio>
                </FormGroup>
                <FormGroup hidden={this.state.createBike==="no"}>
               <ControlLabel>Type of Bike</ControlLabel>
                <FormControl 
                className="pre-fit-input"
                componentClass="select" bsSize="sm"
                value={this.state.bikeType}
                onChange={this.handleBikeChange('bikeType')}
                disabled={this.state.createBike==="no"}>

                <option value="Road Bike">Road Bike</option>
                <option value="Mountain Bike">Mountain</option>
                <option value="TT/Tri Bike">Triathalon or Time Trial</option>
               <option value="Gravel">Gravel</option>
               <option value="Cyclocross">Cyclocross</option>
                <option value="Touring or Commuting">Touring or Commuting</option>
               <option value="Tandem">Tandem</option>
               </FormControl>
               </FormGroup>

                <FormGroup hidden={this.state.createBike==="no"} validationState={validateInputLength(this.state.bikeMake,1)}>
                  <ControlLabel>Make</ControlLabel>
                  <FormControl
                  value={this.state.bikeMake}
                  onChange={this.handleBikeChange("bikeMake")}
                  name="bikeMake"
                  disabled={this.state.createBike==="no"}/>
                </FormGroup>
                <FormGroup hidden={this.state.createBike==="no"} validationState={validateInputLength(this.state.bikeModel,1)}>
                  <ControlLabel>Model</ControlLabel>
                  <FormControl
                  value={this.state.bikeModel}
                  onChange={this.handleBikeChange("bikeModel")}
                  name="bikeModel"
                  disabled={this.state.createBike==="no"}/>
                </FormGroup>
                <FormGroup hidden={this.state.createBike==="no"} validationState={validateInputLength(this.state.bikeFrameSize,1)}>
                  <ControlLabel>Frame Size</ControlLabel>
                  <FormControl
                  value={this.state.bikeFrameSize}
                  onChange={this.handleBikeChange("bikeFrameSize")}
                  name="bikeFrameSize"
                  disabled={this.state.createBike==="no"}/>
                </FormGroup>
                </Well>
                }
    
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

export default CreateNewCyclistFromInterview;  