import React, { Component } from 'react'
import {Panel, Button, Table, Glyphicon} from "react-bootstrap"
import {LinkContainer} from 'react-router-bootstrap'
import './Cyclist.css'
import {create, listByUserSearch} from './api-cyclist.js'
import {update} from '../prefitinterview/api-prefitinterview'
import {Redirect} from 'react-router-dom'
import auth from './../auth/auth-helper'
import {recordLogAction} from '../admin/api-admin'
import MatchingCyclistRow from './MatchingCyclistRow'


class AddInterviewToExistingCyclist extends Component {
  constructor({match}) {
    super()
this.state={
error:'',
show:false,
showDuplicateWarning:false,
redirectToQuickSizePlus:false,
redirectToQuickFit:false,
redirectToCyclist:false,
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

componentDidMount=()=>{
 this.checkCyclist()
}

checkCyclist= async ()=>{

  await this.checkForExistingCustomer()
  .then((data)=>{
    if (data!==false){
       this.setState({duplicateCustomers:data, showDuplicateWarning:true})
      } else this.setState({showDuplicateWarning:false})
 
  })
}

checkForExistingCustomer=()=>{
  
  return new Promise(resolve=>{
    const jwt = auth.isAuthenticated()  
    listByUserSearch({
          userId: jwt.user._id,
//          search: `?lastName=${this.props.location.state.interview.lastName}&birthDate=${this.props.location.state.interview.birthDate}`
          search: `?birthDate=${this.props.location.state.interview.birthDate}`
        }, {t: jwt.token}).then((data) => {
          if (data.error) {
            console.log(data.error)
          } else {

            if(data.length>0) resolve(data); else resolve(false)

          }
        })
  })
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
 this.setState({showDuplicateWarning:false,redirectToQuickFit:true})
}

handleMatch=(CyclistId)=>{
  this.setState({showDuplicateWarning:false,redirectToCyclist:true,cyclistId:CyclistId})
  const jwt = auth.isAuthenticated()
  this.addCyclistIdToPreFitInterview(jwt,CyclistId)
}

reloadCyclists=()=>{
  this.setState({showDuplicateWarning:false})
}

createCustomer = () =>{
const jwt = auth.isAuthenticated()
let prefitInterviews=[]
prefitInterviews[0]=this.props.location.state.interview._id

const cyclist={
  cyclistProfile: Object.assign({},this.state.cyclistProfile),
  bodyMeasurements: Object.assign({},this.state.bodyMeasurements),
  softScores: Object.assign({},this.state.softScores),
  prefitInterviews
}

  create({userId:jwt.user._id},{t:jwt.token},cyclist).then((data) => {
    if (data.error) {
      this.setState({error: data.error})
    } else {
      this.setState({error: '', show: true, redirectToQuickSizePlus:true,cyclistId:data.newCyclistId})
      const logData={userId:jwt.user._id,action: "created cyclist", description: "User "+jwt.user.name+" created cyclist "+this.state.cyclistProfile.firstName+' '+this.state.cyclistProfile.lastName+".", documentId:data.newCyclistId}
      recordLogAction(logData)
      this.addCyclistIdToPreFitInterview(jwt,data.newCyclistId)
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
      
//      console.log(data)
    }
  })
}

    handleChange = name => event => {
      let cyclistProfile = Object.assign({},this.state.cyclistProfile)
      cyclistProfile[name]=event.target.value
      this.setState({cyclistProfile})
    }

render() {
  if(this.state.redirectToQuickFit) return <Redirect to={'/quickfit/'+this.match.params.userId}/>
  if(this.state.redirectToCyclist) return <Redirect to={'/quickfit/'+this.match.params.userId+'/'+this.state.cyclistId}/>

    return (
      <div className="globalCore">
      <div className="modal-container">
        </div>


    <Panel  >
      <Panel.Heading>
        <Panel.Title>Add Pre-Fit Interview to Existing Customer<LinkContainer to={"/quickfit/"+this.match.params.userId}><Button className="pull-right" bsStyle="link"><Glyphicon glyph="arrow-left"></Glyphicon></Button></LinkContainer></Panel.Title>
      </Panel.Heading>
      
{this.state.showDuplicateWarning&&
  <div >
    
  <Panel.Body >  
     The following customers have the same birth date specified in the pre-fit interview.<br></br>
     Do you want to add the pre-fit interview of <b>{this.props.location.state.interview.firstName+' '+this.props.location.state.interview.lastName+' ('+this.props.location.state.interview.email+')'}</b> to one of these existing customers?
     <br></br>
     <br></br>

    <Table striped bordered>
        <thead>
        <tr>
          <th>
            Last Name
          </th>
          <th>
            First Name
          </th>
          <th >
            Email
          </th>
          <th>
            Last Updated
          </th>
          <th>
            Add Interview
          </th>
        </tr>
        </thead>
        <tbody>
        {this.state.duplicateCustomers.map((item, i) => {
          
          return <MatchingCyclistRow userId={this.props.userId} cyclist={item} key={i} container={this} handleMatch={this.handleMatch} reloadCyclists={this.props.reloadCyclists}/>
                                 
              })
    
            } 
        </tbody>
        </Table>
    




      </Panel.Body>
            <Panel.Footer>

          </Panel.Footer>
          </div>
}
{!this.state.showDuplicateWarning&&
<div>
<Panel.Body>
  No Matching Customers Found.
</Panel.Body>
      <Panel.Footer>
     
    </Panel.Footer>
    </div>
}


    </Panel>
      </div>
      
    )
  }
}

export default AddInterviewToExistingCyclist;  