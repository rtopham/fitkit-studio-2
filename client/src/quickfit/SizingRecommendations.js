import React, { Component } from 'react'
import {OverlayTrigger, Well, Popover, Button, Glyphicon, Table, Panel} from "react-bootstrap"
import './QuickFit.css'
import {calculateFrameSize, calculateMinimumSaddleHeight, calculateMaximumSaddleHeight, calculateMaximumStandoverHeight, calculateHandlebarWidth,
calculateMinimumSaddleWidth, calculateMaximumSaddleWidth, calculateTopTubeStemCombination, calculateUpperBody, calculateSoftScore} from './../lib/fitkit-js-functions'
import BikeImageCanvas from '../quicksize/BikeImageCanvas'
import {sizingPDF} from '../pdf/SizingPdf'


class SizingRecommendations extends Component{
state={
  activeMetric:'none',
}


rowMouseEnter = (e) =>{
     let value = e.currentTarget.id
    this.setState({activeMetric:value})

  }

  tableMouseLeave =(e) =>{
    this.setState({activeMetric:'none'})
  }


canvasMouse =(canvas, e) =>{
/*    var rect = canvas.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    console.log("x: " + x + " y: " + y);
    */
  }

clickPDFButton=()=>{
  let frameSize=calculateFrameSize(this.props.bodyMeasurements.inseam)
  let minSaddle=calculateMinimumSaddleHeight(frameSize,this.props.bodyMeasurements.footLength)
  let maxSaddle=calculateMaximumSaddleHeight(frameSize,this.props.bodyMeasurements.footLength)
  let maxStandoverHeight=calculateMaximumStandoverHeight(this.props.bodyMeasurements.inseam)
  let handlebarWidth=calculateHandlebarWidth(this.props.bodyMeasurements.shoulders)
  let minSaddleWidth=calculateMinimumSaddleWidth(this.props.bodyMeasurements.sitBones)
  let maxSaddleWidth=calculateMaximumSaddleWidth(this.props.bodyMeasurements.sitBones)
  const upperBody=calculateUpperBody(this.props.bodyMeasurements.torso, this.props.bodyMeasurements.arm)
  const softScore=calculateSoftScore(this.props.cyclistAge,this.props.softScores.ridingStyle,this.props.softScores.flexibility,this.props.softScores.preconditions)
  let adjustedDropTopTubeAndStem=calculateTopTubeStemCombination(upperBody, softScore,'Drop')
  let adjustedFlatTopTubeAndStem=calculateTopTubeStemCombination(upperBody, softScore,'Flat')
  let dropTopTubeAndStem=calculateTopTubeStemCombination(upperBody, 0,'Drop')
  let flatTopTubeAndStem=calculateTopTubeStemCombination(upperBody, 0,'Flat')
  let bike={
  frameSize: frameSize,                
  minSaddle: minSaddle,      
  maxSaddle: maxSaddle,      
  maxStandoverHeight:  maxStandoverHeight,      
  handlebarWidth: handlebarWidth,
  minSaddleWidth: minSaddleWidth,
  upperBody: upperBody,
  maxSaddleWidth: maxSaddleWidth,      
  softScore: softScore,
  adjustedDropTopTubeAndStem: adjustedDropTopTubeAndStem,
  adjustedFlatTopTubeAndStem: adjustedFlatTopTubeAndStem,
  dropTopTubeAndStem: dropTopTubeAndStem,
  flatTopTubeAndStem: flatTopTubeAndStem
  }

    sizingPDF(this.props.bodyMeasurements,this.props.softScores, this.props.cyclistAge, bike, 
    this.props.user, this.props.shop, this.props.cyclistProfile, this.props.updated, this.props.notes, this.props.logoImage)

}

  render(){
  
    const printerIcon = (
      <Button className="pull-right" bsStyle="link" bsSize="xsmall" onClick={this.clickPDFButton}>
        <Glyphicon glyph="print"/>
      </Button>
    )   

    const popoverFrameSize = (
      <Popover id="popover-framesize" title="Frame Size">
       Virtual seat tube length from center to center. (Based solely on inseam and may not reflect optimal size. For more detailed frame size information 
       refer to the Fit Kit instructional materials available from fitkitsystems.com)
      </Popover>
    );    

    const popoverSaddleHeight = (
      <Popover id="popover-saddleheight" title="Saddle Height">
       Distance from pedal spindle center to saddle top with crank in line with seat tube.
      </Popover>
    );
    
    const popoverStandoverHeight = (
      <Popover id="popover-standoverheight" title="Maximum Standover Height">
       The maximum distance from the ground to the top of the top tube that will be safe and comfortable for a cyclist based on their inseam.
      </Popover>
    );

    const popoverHandlebarWidth = (
      <Popover id="popover-handlebarwidth" title="Handlebar Width">
      Recommended handlebar size measured from the center of the hoods.
      </Popover>
    );

    const popoverSaddleWidth = (
      <Popover id="popover-saddlewidth" title="Saddle Width">
      Recommended saddle width at the saddle's widest point based on sit bone measurement. 
      </Popover>
    );

    const popoverBikeLength = (
      <Popover id="popover-bikelength" title="Bike Length">
      Effective (horizontal) top tube length plus stem length.  
      To arrive at the starting stem to be used, subtract the bicylce top tube measurement from this value. 
      </Popover>
    );

    const popoverAdjustedBikeLength = (
      <Popover id="popover-adjusted-bikelength" title="Adjusted Bike Length">
      Effective (horizontal) top tube length plus stem length (as adusted for soft scores). 
      To arrive at the starting stem to be used, subtract the bicylce top tube measurement from this value. 
      </Popover>
    );

    let frameSize=calculateFrameSize(this.props.bodyMeasurements.inseam)
    let minSaddle=calculateMinimumSaddleHeight(frameSize,this.props.bodyMeasurements.footLength)
    let maxSaddle=calculateMaximumSaddleHeight(frameSize,this.props.bodyMeasurements.footLength)
    let maxStandoverHeight=calculateMaximumStandoverHeight(this.props.bodyMeasurements.inseam)
    let handlebarWidth=calculateHandlebarWidth(this.props.bodyMeasurements.shoulders)
    let minSaddleWidth=calculateMinimumSaddleWidth(this.props.bodyMeasurements.sitBones)
    let maxSaddleWidth=calculateMaximumSaddleWidth(this.props.bodyMeasurements.sitBones)
    const upperBody=calculateUpperBody(this.props.bodyMeasurements.torso, this.props.bodyMeasurements.arm)
    const softScore=calculateSoftScore(this.props.cyclistAge,this.props.softScores.ridingStyle,this.props.softScores.flexibility,this.props.softScores.preconditions)
    let adjustedDropTopTubeAndStem=calculateTopTubeStemCombination(upperBody, softScore,'Drop')
    let adjustedFlatTopTubeAndStem=calculateTopTubeStemCombination(upperBody, softScore,'Flat')
    let dropTopTubeAndStem=calculateTopTubeStemCombination(upperBody, 0,'Drop')
    let flatTopTubeAndStem=calculateTopTubeStemCombination(upperBody, 0,'Flat')



    return(
      <Panel>
        <Panel.Heading>
          <Panel.Title>
            QF&nbsp; {!this.props.quickSize&&printerIcon}
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body>

<BikeImageCanvas godMode={false} bikeType={"Road Bike"} onMouseMove={this.canvasMouse} activeMetric={this.state.activeMetric}/>

<Well>
<Table bordered striped hover responsive onMouseLeave={this.tableMouseLeave}>
  <tbody>
    <OverlayTrigger trigger={['hover','focus']}
    placement="bottom"
    overlay={popoverFrameSize}>
    <tr name="fSize" id="frameSize" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td>Frame Size (virtual seat tube):</td>
      <td>{frameSize} cm.</td>
      <td></td>
      <td></td>
    </tr>
    </OverlayTrigger>
    <OverlayTrigger trigger={['hover','focus']}
    placement="bottom"
    overlay={popoverSaddleHeight}>
    <tr id="saddleHeight" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td>Saddle Height (saddle to pedal spindle):</td>
      <td>{minSaddle+" - "+maxSaddle} cm.</td>
      <td></td>
      <td></td>
    </tr>
    </OverlayTrigger>
    <OverlayTrigger trigger={['hover','focus']}
    placement="bottom"
    overlay={popoverStandoverHeight}>
    <tr id="standoverHeight" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td>Maximum Standover Height:</td>
      <td>{maxStandoverHeight} cm.</td>
      <td></td>
      <td></td>
    </tr>
    </OverlayTrigger>
    {!this.props.quickSize&&
    <OverlayTrigger trigger={['hover','focus']}
    placement="bottom"
    overlay={popoverHandlebarWidth}>
    <tr id="handlebarWidth" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td>Handlebar Width (drop bar):</td>
      <td>{handlebarWidth} cm.</td>
      <td></td>
      <td></td>
    </tr>
    </OverlayTrigger>
    }
    {!this.props.quickSize&&
    <OverlayTrigger trigger={['hover','focus']}
    placement="top"
    overlay={popoverSaddleWidth}>
    <tr id="saddleWidth" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td>Saddle Width:</td>
      <td>{minSaddleWidth+" - "+maxSaddleWidth} mm.</td>
      <td></td>
      <td></td>
    </tr>
    </OverlayTrigger>
    }
    <OverlayTrigger trigger={['hover','focus']}
    placement="top"
    overlay={popoverBikeLength}>
    <tr id="bikeLength" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td>Bike Length (top tube + stem):</td>
      <td>{dropTopTubeAndStem} cm. (drop bar)</td>
      <td>{flatTopTubeAndStem} cm. (flat bar)</td>
      <td>{dropTopTubeAndStem-2} cm. (aero bar)</td>
    </tr>
    </OverlayTrigger>
    <OverlayTrigger trigger={['hover','focus']}
    placement="top"
    overlay={popoverAdjustedBikeLength}>
    <tr id="adjustedBikeLength" onMouseOver={this.rowMouseOver} onMouseEnter={this.rowMouseEnter} onMouseLeave={this.rowMouseLeave}>
      <td>Adjusted Bike Length (top tube + stem):</td>
      <td>{adjustedDropTopTubeAndStem} cm. (drop bar)</td>
      <td>{adjustedFlatTopTubeAndStem} cm. (flat bar)</td>
      <td>{adjustedDropTopTubeAndStem-2} cm. (aero bar)</td>
    </tr>
    </OverlayTrigger>
  </tbody>
</Table>
</Well>

        </Panel.Body>
      </Panel>

        );
  }
  
}

export default SizingRecommendations