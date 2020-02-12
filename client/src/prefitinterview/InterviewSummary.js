import React from 'react'
import {Panel, ListGroup, Popover, OverlayTrigger, Button, Glyphicon, ListGroupItem} from "react-bootstrap"
import {interviewPDF} from './../pdf/InterviewPdf'
import './PreFit.css'
import DeletePreFitInterview from './DeletePreFitInterview'

const InterviewSummary=(props)=> {

  let objectives=''
    
  if(props.interview.objectiveMeasureAndAdvise)objectives=objectives+'Measure and Advise for New Bike Purchase | '
  if(props.interview.objectiveSetUp           )objectives=objectives+'Set Up New Bike | '
  if(props.interview.objectiveGeneral         )objectives=objectives+'General Check Up and Refinement | '
  if(props.interview.objectiveRelieve         )objectives=objectives+'Relieve Pain or Discomfort | '
  if(props.interview.objectiveImprove         )objectives=objectives+'Improve Performance | '
  if(props.interview.objectiveReplicate       )objectives=objectives+'Replicate Fit from Another Bike | '
  if(props.interview.objectiveShoe            )objectives=objectives+'Shoe or Cleat Fit | '
  if(props.interview.objectiveSaddle          )objectives=objectives+'Saddle Fit | '
  if(props.interview.objectiveAero            )objectives=objectives+'Aero Fit | '
  if(objectives.length>3) objectives=objectives.substring(0,objectives.length-3)

  let ageDifMs = Date.now() - new Date(props.interview.birthDate).getTime()
  let ageDate = new Date(ageDifMs)
  let age = Math.abs(ageDate.getUTCFullYear() - 1970)

  let existingBike=props.interview.bikeMake+' '+props.interview.bikeModel
  if(!props.interview.bikeMake&&!props.interview.bikeModel) existingBike="Bike Make/Model not Specified"

  const popoverPrinterIcon = (
    <Popover id="popover-printer-icon">
     PDF Report.
    </Popover>
  )

  const clickPDFButton=()=>{

      interviewPDF(props.interview, props.shop, props.logoImage, objectives, existingBike, age)
  }

  const printerIcon = (
    <OverlayTrigger trigger={['hover','focus']}
    placement="bottom"
    overlay={popoverPrinterIcon}>
    <Button className="pull-right" bsStyle="link" bsSize="xsmall" onClick={clickPDFButton}>
      <Glyphicon glyph="print"/>
    </Button>
    </OverlayTrigger>
  )   
  
return(

    <Panel >
      <Panel.Heading>
        <Panel.Title>Pre-Fit Interview Summary ({props.interview.objectiveMeasureAndAdvise&&<span>New Bike</span>}{!props.interview.objectiveMeasureAndAdvise&&existingBike})<DeletePreFitInterview interview={props.interview} changeTabAfterDelete={props.changeTabAfterDelete} reloadInterviews={props.reloadInterviews} />
        {printerIcon}
        </Panel.Title>
      </Panel.Heading>
      <Panel.Body>
      <ListGroup>
      <ListGroupItem><b>Date Completed:                      </b> {props.interview.created.substring(0,10)}</ListGroupItem>
      <ListGroupItem><b>Contact Details:                     </b> {props.interview.firstName+' '+props.interview.lastName+' | '+props.interview.email+' | '+props.interview.phone+' | '+props.interview.zipCode}</ListGroupItem>
      <ListGroupItem><b>Referral Source:                     </b> {props.interview.referralSource}</ListGroupItem>
      <ListGroupItem><b>Referral Source Details:             </b> {props.interview.referralSourceDetails}</ListGroupItem>
      <ListGroupItem><b>Prior Bike Fit:                      </b> {props.interview.priorBikeFit&&<span>Yes</span>}{!props.interview.priorBikeFit&&<span>No</span>}</ListGroupItem>
      <ListGroupItem><b>Bike Fit Objectives:                 </b> {objectives}</ListGroupItem>
      <ListGroupItem><b>Additional Comments:                 </b> {props.interview.objectiveComments}</ListGroupItem>
      <ListGroupItem><b>Riding Profile:                      </b> {props.interview.ridingStyle+' | Years of Experience: '+props.interview.yearsCycling+' | Average Hours Per Week: '+props.interview.hoursPerWeek}</ListGroupItem>
      <ListGroupItem><b>Skills and Confidence:               </b> {props.interview.skillsAndConfidence}</ListGroupItem>
      <ListGroupItem><b>Cycling Goals:                       </b> {props.interview.cyclingGoals}</ListGroupItem>
      <ListGroupItem><b>Physical Profile:                    </b> {'Age: '+age+' | Gender: '+props.interview.gender+' | Height: '+props.interview.height+' cm. | Weight: '+props.interview.weight+' kg.'}</ListGroupItem>
      <ListGroupItem><b>Physical Considerations:             </b> {props.interview.physicalComments}</ListGroupItem>
      <ListGroupItem><b>Areas of Discomfort:                 </b> {props.interview.discomfortAreas}</ListGroupItem>
      <ListGroupItem><b>Other Physical Activities:           </b> {props.interview.otherPhysicalActivities}</ListGroupItem>
      {props.interview.objectiveMeasureAndAdvise&&
      <div>
      <ListGroupItem><b>New Bike Details:                    </b> {props.interview.bikeType+' | New Style: '}{props.interview.bikeNewStyle&&<span>Yes</span>}{!props.interview.bikeNewStyle&&<span>No</span>}{' | Budget: '+props.interview.bikeBudget}</ListGroupItem>
      <ListGroupItem><b>Reasons for Purchase:                </b> {props.interview.bikeReasons}</ListGroupItem>
      <ListGroupItem><b>Type of Purchase:                    </b> {props.interview.bikeChannels}</ListGroupItem>
      <ListGroupItem><b>Brands or Models Under Consideration:</b> {props.interview.bikeBrandsModels}</ListGroupItem>
      <ListGroupItem><b>Primary Decision Factors:            </b> {props.interview.bikeDecisionFactors}</ListGroupItem>
      </div>
      }
      {!props.interview.objectiveMeasureAndAdvise&&
      <div>
      <ListGroupItem><b>Current Bike Details:                </b> {props.interview.bikeType+' | Make: '+props.interview.bikeMake+' | Model: '+props.interview.bikeModel+' | Frame Size: '+props.interview.bikeFrameSize}</ListGroupItem>
      <ListGroupItem><b>Additional Comments:                 </b> {props.interview.bikeComments}</ListGroupItem>
      </div>
      }

      <ListGroupItem><b>Media Permission:                    </b> {props.interview.mediaConsent}</ListGroupItem>
      
      </ListGroup>
      
     </Panel.Body>
    </Panel>

)
    
  }

export default InterviewSummary