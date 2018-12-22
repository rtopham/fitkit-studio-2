import React, { Component } from 'react'
import {Tabs, Tab, Panel, Button, ButtonToolbar} from "react-bootstrap"
import auth from './../auth/auth-helper'
import {read, update} from './api-cyclist.js'
import CyclistProfile from './CyclistProfile'
import CyclistNotes from './CyclistNotes'
import './Cyclist.css'
import BodyMeasurements from './../quicksize/BodyMeasurements'
import SizingRecommendations from '../quicksize/SizingRecommendations';
import SoftScores from './../quicksize/SoftScores'

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
      updated:'',
      notes:'',
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
    this.match = match


  }


componentDidMount = () => {

  const jwt = auth.isAuthenticated()
  read({
    userId:this.match.params.userId, cyclistId: this.match.params.cyclistId
  }, {t: jwt.token}).then((data) => {
    if (data.error) {
      this.setState({error: data.error})
    } else {
///      console.log(data)
      let ageDifMs = Date.now() - new Date(data.cyclistProfile.birthDate).getTime()
      let ageDate = new Date(ageDifMs)
      let age = Math.abs(ageDate.getUTCFullYear() - 1970)
      this.setState({originalCyclistProfile: data.cyclistProfile, cyclistProfile: data.cyclistProfile, updated:data.updated, cyclistAge:age, bodyMeasurements: data.bodyMeasurements, softScores:data.softScores,
      notes:data.notes})
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

  update({userId:this.match.params.userId,cyclistId:this.match.params.cyclistId},{t:jwt.token},cyclist).then((data) => {
    if (data.error) {
      this.setState({error: data.error})
    } else {
      this.setState({error: '',updated: Date.now(), editProfile:false, originalCyclistProfile, unsavedChanges:false, unsavedProfileChanges:false})
//      console.log(data)
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
  this.setState({cyclistProfile, unsavedProfileChanges:false, editProfile:false})
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

changeHeight = (e) => {
  let value=parseFloat(e.target.value)
  let bodyMeasurements = Object.assign({},this.state.bodyMeasurements)
  bodyMeasurements.height=value
  this.setState({bodyMeasurements,unsavedChanges:true})
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

  render() {
    let addClass=''
if(this.state.unsavedChanges||this.state.unsavedProfileChanges) addClass="fks-color"

   return (
      <div className="globalCore">
    <Panel defaultExpanded>
      <Panel.Heading>
        <Panel.Title toggle>Quick Size Plus<span className="pull-right">{'Cyclist: '+this.state.originalCyclistProfile.firstName+' '+this.state.originalCyclistProfile.lastName
      +' (Last updated: '+(new Date(this.state.updated)).toDateString()+')'}</span></Panel.Title>

      </Panel.Heading>
      <Panel.Collapse>
      <Panel.Body>
      <Tabs defaultActiveKey={1} activeKey={this.state.key} onSelect={this.handleSelectTab} id="controlled-tabs">
      <Tab eventKey={1} title="Body Measurements">
      <BodyMeasurements bodyMeasurements={this.state.bodyMeasurements} changeInseam={this.changeInseam} changeFootLength={this.changeFootLength} changeTorso={this.changeTorso}
      changeArm={this.changeArm} changeHeight={this.changeHeight} changeShoulders={this.changeShoulders} changeSitBones={this.changeSitBones}/>
     </Tab>
     <Tab eventKey={2} title="Soft Scores">
    <SoftScores cyclistAge={this.state.cyclistAge} bodyMeasurements={this.state.bodyMeasurements} changeFlexibility={this.changeFlexibility}
    changeRidingStyle={this.changeRidingStyle} changeConditions={this.changeConditions}/>
     </Tab>
     <Tab eventKey={3} title="Notes">
     <CyclistNotes notes={this.state.notes} changeNotes={this.changeNotes}/>
      </Tab>
      <Tab eventKey={4} title="Cyclist Profile">
<CyclistProfile handleChange={this.handleChange} editProfile={this.state.editProfile} cyclistProfile={this.state.cyclistProfile}/>
      </Tab>
      </Tabs>
      <ButtonToolbar className="pull-right">
      <Button onClick={this.clickSaveChanges} disabled={!this.state.unsavedChanges&&!this.state.unsavedProfileChanges} className={addClass}>Save Changes</Button>
      {(this.state.key===4&&!this.state.editProfile&&<Button onClick={this.clickEditProfile}>Edit</Button>)}
      {(this.state.key===4&&this.state.editProfile&&<Button onClick={this.clickCancelEditProfile}>Cancel</Button>)}
      </ButtonToolbar>
      </Panel.Body>
</Panel.Collapse>
    </Panel>
    <SizingRecommendations cyclistAge={this.state.cyclistAge} softScores={this.state.softScores} bodyMeasurements={this.state.bodyMeasurements}/>
      </div>
      
    )
  }
}

export default EditCyclist;  