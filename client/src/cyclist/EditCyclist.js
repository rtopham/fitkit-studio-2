import React, { Component } from 'react'
import {Tabs, Tab, Panel, Button, Glyphicon, ButtonGroup, Popover, OverlayTrigger, ButtonToolbar, Row, Col} from "react-bootstrap"
import {LinkContainer} from 'react-router-bootstrap'
import auth from './../auth/auth-helper'
import {read, update} from './api-cyclist.js'
import {listByCyclist} from '../prefitinterview/api-prefitinterview'
import CyclistProfile from './CyclistProfile'
import CyclistNotes from './CyclistNotes'
import PreFitInterviewTabs from '../prefitinterview/PreFitInterviewTabs'
import './Cyclist.css'
import BodyMeasurements from './../quicksize/BodyMeasurements'
import BikeSizing from '../quickfit/BikeSizing'
import SoftScores from './../quicksize/SoftScores'
import {listByOwner} from './../shop/api-shop'
import {validateInputLength, validateBirthDate, validateEmail, validatePhone, validateZipCode} from '../lib/form-validation'
import fksLogo from './../assets/fksicon.jpg'

class EditCyclist extends Component {
  constructor({match}) {
    super()
    this.state = {
      error:'',
      editProfile:false,
      key:1,
      unsavedChanges:false,
      unsavedProfileChanges:false,
      cyclistAge:25,
      user:{},
      updated:'',
      notes:'',
      originalNotes:'',
      logoUrl:'',
      loading:true,
      cyclistProfile:{
          firstName:'',
          lastName:'',
          email:'',
          phone:'',
          zipCode:'',
          birthDate:'',
          gender:'Male'
      },
      originalCyclistProfile:{
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
      originalSoftScores:{
          flexibility:'Good',
          ridingStyle:'Competitive',
          preconditions:'None'
        },      
      bodyMeasurements:{
        inseam: 0,
        footLength: 0,
        torso: 0,
        arm: 0,
        height: 0,
        weight: 0,
        shoulders: 0,
        sitBones: 0
        },
        originalBodyMeasurements:{
          inseam: 0,
          footLength: 0,
          torso: 0,
          arm: 0,
          height: 0,
          weight: 0,
          shoulders: 0,
          sitBones: 0
          },
        shop: {_id:'', active: false, name:'Fit Kit Systems',address:'1549 S. 1100 East, Suite D', address2:'Salt Lake City, UT', phone:'1-800-434-8548',website:'www.fitkitsystems.com',logo: {},owner:''},
        imperialHeight: 0,
        imperialWeight: 0,
        prefitInterviews:['none']

      }

    this.match = match


  }


componentDidMount(){

  const jwt = auth.isAuthenticated()
  read({
    userId:this.match.params.userId, cyclistId: this.match.params.cyclistId
  }, {t: jwt.token}).then((data) => {
    if (data.error) {
      this.setState({error: data.error})
    } else {

      let ageDifMs = Date.now() - new Date(data.cyclistProfile.birthDate).getTime()
      let ageDate = new Date(ageDifMs)
      let age = Math.abs(ageDate.getUTCFullYear() - 1970)
      let imperialHeight = (data.bodyMeasurements.height/2.54).toFixed(1)
      let imperialWeight = (data.bodyMeasurements.weight*2.205).toFixed(1)
      this.setState({originalCyclistProfile: data.cyclistProfile, cyclistProfile: data.cyclistProfile, updated:data.updated, cyclistAge:age, bodyMeasurements: data.bodyMeasurements, originalBodyMeasurements:data.bodyMeasurements, softScores:data.softScores,
      originalSoftscores:data.softScores, notes:data.notes, originalNotes:data.notes, imperialHeight, imperialWeight, user:jwt.user})
      if(jwt.user.shop_owner) this.loadShopData(jwt); else this.setState({logoUrl:'none'})
      this.loadPreFitInterviews(jwt)
    }
  })
}

reloadInterviews=()=>{
  const jwt = auth.isAuthenticated()
  this.loadPreFitInterviews(jwt)
}


loadPreFitInterviews=(jwt)=>{
  listByCyclist({
    userId: jwt.user._id, cyclistId: this.match.params.cyclistId
  }, {t: jwt.token}).then((data) => {
    if (data.error) {
      this.setState({error: data.error})
      console.log(data.error)
    } else {
      this.setState({prefitInterviews: data, loading:false})
    }
  })
}


loadShopData=(jwt)=>{
  listByOwner({
    userId: jwt.user._id
  }, {t: jwt.token}).then((data) => {
    if (data.error) {
      this.setState({error: data.error})
    } else {
      
      const logoUrl = `/api/shops/logo/${data._id}?${new Date().getTime()}`
           
      this.setState({shop:data, logoUrl,loading:false})
    }
  })
}

clickSaveChanges = (e) =>{
  e.preventDefault()

const jwt = auth.isAuthenticated()
const cyclist={
  cyclistProfile: Object.assign({},this.state.cyclistProfile),
  bodyMeasurements: Object.assign({},this.state.bodyMeasurements),
  softScores: Object.assign({},this.state.softScores),
  notes:this.state.notes
}

const   originalCyclistProfile = Object.assign({},this.state.cyclistProfile)
const   originalBodyMeasurements = Object.assign({},this.state.bodyMeasurements)
const   originalSoftScores = Object.assign({},this.state.originalSoftScores)
const   originalNotes = this.state.notes 

  update({userId:this.match.params.userId,cyclistId:this.match.params.cyclistId},{t:jwt.token},cyclist).then((data) => {
    if (data.error) {
      this.setState({error: data.error})
    } else {
      this.setState({error: '',updated: Date.now(), editProfile:false, originalCyclistProfile, originalBodyMeasurements, originalSoftScores, originalNotes, unsavedChanges:false, unsavedProfileChanges:false})
    }
  })
}


handleSelectTab=(key)=>{
  this.setState({key})
}

clickEditProfile=()=>{
  this.setState({editProfile:true})
}

clickCancelEditProfile=()=>{
  let cyclistProfile = Object.assign({},this.state.originalCyclistProfile)
  let bodyMeasurements = Object.assign({},this.state.originalBodyMeasurements)
  let imperialHeight = (bodyMeasurements.height/2.54).toFixed(1)
  let imperialWeight = (bodyMeasurements.weight*2.205).toFixed(1)
  let softScores = Object.assign({},this.state.originalSoftScores)
  let notes = this.state.originalNotes 
  this.setState({cyclistProfile, bodyMeasurements, imperialHeight, imperialWeight, softScores, notes, unsavedChanges:false, unsavedProfileChanges:false, editProfile:false})
}

clickNewCyclist = (e) =>{
this.setState({createNewCyclist:true})
}

clickLoadCyclist = (e) =>{
  this.setState({loadCyclist:true})
  }


handleChange = name => event => {
    let cyclistProfile = Object.assign({},this.state.cyclistProfile)
    cyclistProfile[name]=event.target.value
    this.setState({cyclistProfile, unsavedProfileChanges:true})
  }

changeInseam = (e) => {
  let value=parseFloat(e.target.value)
  let bodyMeasurements = Object.assign({},this.state.bodyMeasurements)
  bodyMeasurements.inseam=value
  this.setState({bodyMeasurements,unsavedChanges:true})
}

changeFootLength = (e) => {
  let value=parseFloat(e.target.value)
  let bodyMeasurements = Object.assign({},this.state.bodyMeasurements)
  bodyMeasurements.footLength=value
  this.setState({bodyMeasurements,unsavedChanges:true})
}

changeTorso = (e) => {
  let value=parseFloat(e.target.value)
  let bodyMeasurements = Object.assign({},this.state.bodyMeasurements)
  bodyMeasurements.torso=value
  this.setState({bodyMeasurements,unsavedChanges:true})
}

updateHeight = (metricHeight, imperialHeight) => {
  let bodyMeasurements = Object.assign({},this.state.bodyMeasurements)
//  let imperialHeight = (metricHeight/2.54).toFixed(1)
  bodyMeasurements.height=metricHeight
  this.setState({bodyMeasurements, imperialHeight, unsavedChanges:true})
  
}

updateWeight = (metricWeight, imperialWeight) => {

  let bodyMeasurements = Object.assign({},this.state.bodyMeasurements)
//  let imperialWeight = (value*2.205).toFixed(1)
  bodyMeasurements.weight=metricWeight
  this.setState({bodyMeasurements, imperialWeight, unsavedChanges:true})
}

changeShoulders = (e) => {
  let value=parseFloat(e.target.value)
  let bodyMeasurements = Object.assign({},this.state.bodyMeasurements)
  bodyMeasurements.shoulders=value
  this.setState({bodyMeasurements,unsavedChanges:true})
}

changeArm = (e) => {
  let value=parseFloat(e.target.value)
  let bodyMeasurements = Object.assign({},this.state.bodyMeasurements)
  bodyMeasurements.arm=value
  this.setState({bodyMeasurements,unsavedChanges:true})
}

changeSitBones = (e) => {
  let value=parseFloat(e.target.value)
  let bodyMeasurements = Object.assign({},this.state.bodyMeasurements)
  bodyMeasurements.sitBones=value
  this.setState({bodyMeasurements,unsavedChanges:true})
}

changeAge = (e) => {
  let value=parseInt(e.target.value)
  let softScores = Object.assign({},this.state.softScores)
  softScores.age=value
  this.setState({softScores,unsavedChanges:true})
}

changeFlexibility = (e) => {
  let softScores = Object.assign({},this.state.softScores)
  softScores.flexibility=e.target.value
  this.setState({softScores,unsavedChanges:true})
}

changeRidingStyle = (e) => {
  let softScores = Object.assign({},this.state.softScores)
  softScores.ridingStyle=e.target.value
  this.setState({softScores,unsavedChanges:true})
}

changeConditions = (e) => {
  let softScores = Object.assign({},this.state.softScores)
  softScores.preconditions=e.target.value
  this.setState({softScores,unsavedChanges:true})
}

changeNotes = (e) => {

  this.setState({notes:e.target.value, unsavedChanges:true})
}

validateProfileForm() {
  return (
    validateInputLength(this.state.cyclistProfile.firstName,2)==='success'&&
    (validateEmail(this.state.cyclistProfile.email)==='success'|validateEmail(this.state.cyclistProfile.email)===null)&&
    validateInputLength(this.state.cyclistProfile.lastName,2)==='success'&&
    (validatePhone(this.state.cyclistProfile.phone)==='success'|validatePhone(this.state.cyclistProfile.phone)===null)&&
    (validateZipCode(this.state.cyclistProfile.zipCode)==='success'|validateZipCode(this.state.cyclistProfile.zipCode)===null)&&
    validateBirthDate(this.state.cyclistProfile.birthDate.substring(0,10))==='success'

  );
}  

  render() {
if(this.props.location.state&&this.state.prefitInterviews.length===0){
  if(this.props.location.state.fromPreFit) this.reloadInterviews()
} 

    if(this.state.loading) return ( <div className="globalCore"> <Panel defaultExpanded> <Panel.Heading></Panel.Heading></Panel></div>)
    let buttonDisabled=false
    if(!this.state.unsavedChanges&&!this.state.unsavedProfileChanges) buttonDisabled=true
    if(this.state.unsavedProfileChanges&&!this.validateProfileForm()) buttonDisabled=true
    
    

    let addClass=''
if(this.state.unsavedChanges||this.state.unsavedProfileChanges) addClass="fks-color"

const popoverNewCustomer = (
  <Popover id="popover-new-customer">
   Create New Customer.
  </Popover>
) 

const popoverRetrieveCustomer = (
  <Popover id="popover-new-customer">
   Retrieve Customer.
  </Popover>
) 

   return (
      <div className="globalCore">
    <img alt="" hidden={true} ref="logoImage" src={this.state.logoUrl} />
    <img alt="" hidden={true} ref="fkslogoImage" src={fksLogo} />
    <Panel defaultExpanded>

      <Panel.Heading>
      <Row>
      <Col xs={12} sm={2}>
      <Panel.Toggle className="qf-title">Quick Fit</Panel.Toggle>
      </Col>
      <Col xs={12} sm={8}>
      <div className="pull-right" >{'Cyclist: '+this.state.originalCyclistProfile.firstName+' '+this.state.originalCyclistProfile.lastName
      +' (Last updated: '+(new Date(this.state.updated)).toDateString()+')'}
      </div>
      </Col>
      <Col xs={12} sm={2}>
      <div className="pull-right">
      <ButtonGroup className="qf-button-group">
      <OverlayTrigger trigger={['hover','focus']}
      placement="bottom"
      overlay={popoverNewCustomer}>
       <LinkContainer to ={{pathname: "/quickfit/"+this.match.params.userId+"/new", state:{from: this.props.location.pathname}}}>
       <Button  bsStyle="link" bsSize="xsmall" onClick={this.clickButton}><Glyphicon className="qf-glyph" glyph="plus"/></Button>
       </LinkContainer>
       </OverlayTrigger>
       <OverlayTrigger trigger={['hover','focus']}
      placement="bottom"
      overlay={popoverRetrieveCustomer}>
       <LinkContainer to ={{pathname: "/quickfit/"+this.match.params.userId+"/load", state:{from: this.props.location.pathname}}}>
       <Button  bsStyle="link" bsSize="xsmall" onClick={this.clickButton}><Glyphicon className="qf-glyph" glyph="search"/></Button>
       </LinkContainer> 
       </OverlayTrigger>
       </ButtonGroup>
       </div>
       </Col>
       </Row>
      </Panel.Heading>
      
      <Panel.Collapse>
      <Panel.Body>
      <Tabs className="fks-tabs" defaultActiveKey={1} activeKey={this.state.key} onSelect={this.handleSelectTab} id="controlled-tabs">
      <Tab eventKey={1} title="Cyclist Profile">
<CyclistProfile handleChange={this.handleChange} editProfile={this.state.editProfile} cyclistProfile={this.state.cyclistProfile}/>
      </Tab>
      <Tab eventKey={2} title="Body Measurements">
      <BodyMeasurements bodyMeasurements={this.state.bodyMeasurements} changeInseam={this.changeInseam} changeFootLength={this.changeFootLength}
       changeTorso={this.changeTorso} changeArm={this.changeArm} updateHeight={this.updateHeight} updateWeight={this.updateWeight} 
       changeShoulders={this.changeShoulders} changeSitBones={this.changeSitBones} imperialHeight={this.state.imperialHeight}
        imperialWeight={this.state.imperialWeight} preferences={auth.isAuthenticated().user.preferences}/>
     </Tab>

     <Tab eventKey={3} title="Soft Scores">
    <SoftScores cyclistAge={this.state.cyclistAge} softScores={this.state.softScores} changeFlexibility={this.changeFlexibility}
    changeRidingStyle={this.changeRidingStyle} changeConditions={this.changeConditions}/>
     </Tab>
     <Tab eventKey={4} title="Intake Notes">
     <CyclistNotes notes={this.state.notes} changeNotes={this.changeNotes}/>
      </Tab>
     {this.state.prefitInterviews.length>0&& 
     <Tab eventKey={5} title="Pre-Fit Interviews">
      
     <PreFitInterviewTabs userId={this.match.params.userId} shop={this.state.shop}
      prefitInterviews={this.state.prefitInterviews} reloadInterviews={this.reloadInterviews}
      logoUrl={this.state.logoUrl} logoImage={this.refs.logoImage}
      fkslogoImage={this.refs.fkslogoImage}/>
     </Tab>
     }
      </Tabs>
      {
/*       <ButtonToolbar className="pull-left">
      <LinkContainer to ={{pathname: "/quickfit/"+this.match.params.userId+"/new", state:{from: this.props.location.pathname}}}>
      <Button>Create Customer</Button>
      </LinkContainer>
      <LinkContainer to={{pathname: "/quickfit/"+this.match.params.userId+"/load", state:{from: this.props.location.pathname}}}>
      <Button>Retrieve Customer</Button>
      </LinkContainer>
      </ButtonToolbar>
      */
      }
      <ButtonToolbar className="pull-right"> 
      {this.state.key!==5&&<Button onClick={this.clickSaveChanges} disabled={buttonDisabled} className={addClass}>Save Changes</Button>}
      {(this.state.key===1&&!this.state.editProfile&&<Button onClick={this.clickEditProfile}>Edit</Button>)}
      {(this.state.unsavedChanges&&<Button onClick={this.clickCancelEditProfile}>Cancel</Button>)}

      </ButtonToolbar>
      </Panel.Body>
</Panel.Collapse>
    </Panel>
    <BikeSizing updated={this.state.updated} user={this.state.user} cyclistAge={this.state.cyclistAge} 
    cyclistProfile={this.state.cyclistProfile} notes={this.state.notes} softScores={this.state.softScores}
    bodyMeasurements={this.state.bodyMeasurements} shop={this.state.shop} logoUrl={this.state.logoUrl}
    bikes={this.state.bikes} cyclistId={this.match.params.cyclistId}
    logoImage={this.refs.logoImage}
    fkslogoImage={this.refs.fkslogoImage}/> 
    </div>
    )
  }
}

export default EditCyclist;  