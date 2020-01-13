import React, {Component} from 'react'
import {Tabs, Tab} from "react-bootstrap"
import InterviewSummary from './InterviewSummary'
import "./PreFit.css"

class PreFitInterviewTabs extends Component {
state={
    key:1
  }


  handleSelectTab=(key)=>{
    this.setState({key})
  }

  changeTabAfterDelete=()=>{
    let key=this.state.key-1
    this.setState({key})
  }

render() {

let logoImage=this.props.fksLogoImage
if(this.props.logoUrl&&this.props.logoUrl!=='')logoImage=this.props.logoImage  

return (
  <div className="modal-container">
  <br></br>
    
<Tabs id="interviewTabs" defaultActiveKey={1} activeKey={this.state.key} onSelect={this.handleSelectTab}>
{this.props.prefitInterviews.map((item, i) => {
          if(this.props.prefitInterviews[i].created===undefined)return null
          return (<Tab eventKey={i+1} key={i} title={this.props.prefitInterviews[i].created.substring(0,10)}>
          <InterviewSummary interview={this.props.prefitInterviews[i]} shop={this.props.shop} 
          logoImage={logoImage} changeTabAfterDelete={this.changeTabAfterDelete} reloadInterviews={this.props.reloadInterviews}/>
          </Tab>
          )
                         
              })
    
           }

</Tabs>
</div>
    )
  }


}

export default PreFitInterviewTabs
