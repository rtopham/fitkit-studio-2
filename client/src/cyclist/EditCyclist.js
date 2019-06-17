import React, { Component } from 'react'
import {Tabs, Tab, Panel, Button, ButtonToolbar} from "react-bootstrap"
import auth from './../auth/auth-helper'
import {read, update} from './api-cyclist.js'
import CyclistProfile from './CyclistProfile'
import CyclistNotes from './CyclistNotes'
import './Cyclist.css'
import BodyMeasurements from './../quicksize/BodyMeasurements'
import BikeSizing from '../quicksizing/BikeSizing'
import SoftScores from './../quicksize/SoftScores'
import {listByOwner} from './../shop/api-shop'
import {validateInputLength, validateBirthDate, validateEmail, validatePhone, validateZipCode} from '../lib/form-validation'

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
        shop: {_id:'', active: false, name:'Fit Kit Systems',address:'1549 S. 1100 East, Suite D', address2:'Salt Lake City, UT', phone:'1-800-434-8548',website:'www.fitkitsystems.com',logo: {},owner:''},
        imperialHeight: 72,
        imperialWeight: 149.9

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
      this.setState({originalCyclistProfile: data.cyclistProfile, cyclistProfile: data.cyclistProfile, updated:data.updated, cyclistAge:age, bodyMeasurements: data.bodyMeasurements, softScores:data.softScores,
      notes:data.notes, imperialHeight, imperialWeight, user:jwt.user})

      if(jwt.user.shop_owner) this.loadShopData(jwt); else this.setState({logoUrl:'none',loading:false})
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
//    console.log("hellos")
      const logoUrl = `/api/shops/logo/${data._id}?${new Date().getTime()}`
//      console.log(logoUrl)
      this.setState({shop:data, logoUrl,loading:false})



//      console.log(data)
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

/*
changeHeight = (e) => {
  let value=parseFloat(e.target.value)
  let bodyMeasurements = Object.assign({},this.state.bodyMeasurements)
  let imperialHeight = (value/2.54).toFixed(1)
  bodyMeasurements.height=value
  this.setState({bodyMeasurements, imperialHeight, unsavedChanges:true})
}
*/

updateHeight = (metricHeight, imperialHeight) => {
  let bodyMeasurements = Object.assign({},this.state.bodyMeasurements)
//  let imperialHeight = (metricHeight/2.54).toFixed(1)
  bodyMeasurements.height=metricHeight
  this.setState({bodyMeasurements, imperialHeight, unsavedChanges:true})
  
}

/*
changeWeight = (e) => {
  let value=parseFloat(e.target.value)
  let bodyMeasurements = Object.assign({},this.state.bodyMeasurements)
  let imperialWeight = (value*2.205).toFixed(1)
  bodyMeasurements.weight=value
  this.setState({bodyMeasurements, imperialWeight, unsavedChanges:true})
}
*/
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
//    if(this.state.loading) return ( <div className="globalCore"> <Panel defaultExpanded> <Panel.Heading></Panel.Heading></Panel></div>)
    let buttonDisabled=false
    if(!this.state.unsavedChanges&&!this.state.unsavedProfileChanges) buttonDisabled=true
    if(this.state.unsavedProfileChanges&&!this.validateProfileForm()) buttonDisabled=true
    
    

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
      <BodyMeasurements bodyMeasurements={this.state.bodyMeasurements} changeInseam={this.changeInseam} changeFootLength={this.changeFootLength}
       changeTorso={this.changeTorso} changeArm={this.changeArm} updateHeight={this.updateHeight} updateWeight={this.updateWeight} 
       changeShoulders={this.changeShoulders} changeSitBones={this.changeSitBones} imperialHeight={this.state.imperialHeight}
        imperialWeight={this.state.imperialWeight} preferences={auth.isAuthenticated().user.preferences}/>
     </Tab>
     <Tab eventKey={2} title="Soft Scores">
    <SoftScores cyclistAge={this.state.cyclistAge} softScores={this.state.softScores} changeFlexibility={this.changeFlexibility}
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
      <Button onClick={this.clickSaveChanges} disabled={buttonDisabled} className={addClass}>Save Changes</Button>
      {(this.state.key===4&&!this.state.editProfile&&<Button onClick={this.clickEditProfile}>Edit</Button>)}
      {(this.state.key===4&&this.state.editProfile&&<Button onClick={this.clickCancelEditProfile}>Cancel</Button>)}
      </ButtonToolbar>
      </Panel.Body>
</Panel.Collapse>
    </Panel>
    <BikeSizing updated={this.state.updated} user={this.state.user} cyclistAge={this.state.cyclistAge} 
    cyclistProfile={this.state.cyclistProfile} notes={this.state.notes} softScores={this.state.softScores}
    bodyMeasurements={this.state.bodyMeasurements} shop={this.state.shop} logoUrl={this.state.logoUrl}
    bikes={this.state.bikes} cyclistId={this.match.params.cyclistId}/> 
    {/*
    <SizingRecommendations updated={this.state.updated} user={this.state.user} cyclistAge={this.state.cyclistAge} 
    cyclistProfile={this.state.cyclistProfile} notes={this.state.notes} softScores={this.state.softScores}
    bodyMeasurements={this.state.bodyMeasurements} shop={this.state.shop} logoUrl={this.state.logoUrl}/>*/}
      </div>
      
    )
  }
}

export default EditCyclist;  