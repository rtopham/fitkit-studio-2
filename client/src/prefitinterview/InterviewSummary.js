import React, { Component } from 'react'
import {Panel, ListGroup, ListGroupItem} from "react-bootstrap"
import './PreFit.css'
import DeletePreFitInterview from './DeletePreFitInterview'

class InterviewSummary extends Component {

handleRequestClose=()=>{
 this.setState({showDuplicateWarning:false})
}

handleCheckChange = name => event => {
    this.setState({[name]:event.target.checked})
  }

handleChange = name => event => {
    this.setState({[name]:event.target.value})
  }


render() {
  let objectives=''
    
  if(this.props.interview.objectiveMeasureAndAdvise)objectives=objectives+'Measure and Advise for New Bike Purchase | '
  if(this.props.interview.objectiveSetup           )objectives=objectives+'Set Up New Bike | '
  if(this.props.interview.objectiveGeneral         )objectives=objectives+'General Check Up and Refinement | '
  if(this.props.interview.objectiveRelieve         )objectives=objectives+'Relieve Pain or Discomfort | '
  if(this.props.interview.objectiveImprove         )objectives=objectives+'Improve Performance | '
  if(this.props.interview.objectiveReplicate       )objectives=objectives+'Replicate Fit from Another Bike | '
  if(this.props.interview.objectiveShoe            )objectives=objectives+'Shoe or Cleat Fit | '
  if(this.props.interview.objectiveSaddle          )objectives=objectives+'Saddle Fit | '
  if(this.props.interview.objectiveAero            )objectives=objectives+'Aero Fit | '
  if(objectives.length>3) objectives=objectives.substring(0,objectives.length-3)

  let ageDifMs = Date.now() - new Date(this.props.interview.birthDate).getTime()
  let ageDate = new Date(ageDifMs)
  let age = Math.abs(ageDate.getUTCFullYear() - 1970)

  let existingBike=this.props.interview.bikeMake+' '+this.props.interview.bikeModel
  if(!this.props.bikeMake&&!this.props.bikeModel) existingBike="Bike Make/Model not Specified"
  
return(

    <Panel >
      <Panel.Heading>
        <Panel.Title>Pre-Fit Interview Summary ({this.props.interview.objectiveMeasureAndAdvise&&<span>New Bike</span>}{!this.props.interview.objectiveMeasureAndAdvise&&existingBike})<DeletePreFitInterview interview={this.props.interview} changeTabAfterDelete={this.props.changeTabAfterDelete} reloadInterviews={this.props.reloadInterviews} /></Panel.Title>
      </Panel.Heading>
      <Panel.Body>
      <ListGroup>
      <ListGroupItem><b>Date Completed:                      </b> {this.props.interview.created.substring(0,10)}</ListGroupItem>
      <ListGroupItem><b>Contact Details:                     </b> {this.props.interview.firstName+' '+this.props.interview.lastName+' | '+this.props.interview.email+' | '+this.props.interview.phone+' | '+this.props.interview.zipCode}</ListGroupItem>
      <ListGroupItem><b>Referral Source:                     </b> {this.props.interview.referralSource}</ListGroupItem>
      <ListGroupItem><b>Prior Bike Fit:                      </b> {this.props.interview.priorBikeFit&&<span>Yes</span>}{!this.props.interview.priorBikeFit&&<span>No</span>}</ListGroupItem>
      <ListGroupItem><b>Bike Fit Objectives:                 </b> {objectives}</ListGroupItem>
      <ListGroupItem><b>Additional Comments:                 </b> {this.props.interview.objectiveComments}</ListGroupItem>
      <ListGroupItem><b>Riding Profile:                      </b> {this.props.interview.ridingStyle+' | Years of Experience: '+this.props.interview.yearsCycling+' | Average Hours Per Week: '+this.props.interview.hoursPerWeek}</ListGroupItem>
      <ListGroupItem><b>Cycling Goals:                       </b> {this.props.interview.cyclingGoals}</ListGroupItem>
      <ListGroupItem><b>Physical Profile:                    </b> {'Age: '+age+' | Gender: '+this.props.interview.gender+' | Height: '+this.props.interview.height+' cm. | Weight: '+this.props.interview.weight+' kg.'}</ListGroupItem>
      <ListGroupItem><b>Physical Considerations              </b> {this.props.interview.physicalComments}</ListGroupItem>
      <ListGroupItem><b>Areas of Discomfort:                 </b> {this.props.interview.discomfortAreas}</ListGroupItem>
      <ListGroupItem><b>Other Physical Activities:           </b> {this.props.interview.otherPhysicalActivities}</ListGroupItem>
      {this.props.interview.objectiveMeasureAndAdvise&&
      <div>
      <ListGroupItem><b>New Bike Details:                    </b> {this.props.interview.bikeType+' | New Style: '}{this.props.interview.bikeNewStyle&&<span>Yes</span>}{!this.props.interview.bikeNewStyle&&<span>No</span>}{' | Budget: '+this.props.interview.bikeBudget}</ListGroupItem>
      <ListGroupItem><b>Reasons for Purchase:                </b> {this.props.interview.bikeReasons}</ListGroupItem>
      <ListGroupItem><b>Type of Purchase:                    </b> {this.props.interview.bikeChannels}</ListGroupItem>
      <ListGroupItem><b>Brands or Models Under Consideration:</b> {this.props.interview.bikeBrandsModels}</ListGroupItem>
      <ListGroupItem><b>Primary Decision Factors:            </b> {this.props.interview.bikeDecisionFactors}</ListGroupItem>
      </div>
      }
      {!this.props.interview.objectiveMeasureAndAdvise&&
      <div>
      <ListGroupItem><b>Current Bike Details:                </b> {this.props.interview.bikeType+' | Make: '+this.props.interview.bikeMake+' | Model: '+this.props.interview.bikeModel+' | Frame Size: '+this.props.interview.bikeFrameSize}</ListGroupItem>
      <ListGroupItem><b>Additional Comments:                 </b> {this.props.interview.bikeComments}</ListGroupItem>
      </div>
      }

      <ListGroupItem><b>Media Permission:                    </b> {this.props.interview.mediaPermission&&<span>Yes</span>}{!this.props.interview.mediaPermission&&<span>No</span>}</ListGroupItem>
      
      </ListGroup>
     </Panel.Body>
    </Panel>

)
    
  }
}

export default InterviewSummary;  