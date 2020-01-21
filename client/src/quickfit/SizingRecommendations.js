import React, { Component } from 'react'
import {OverlayTrigger, Image, Popover, Radio, Button, Glyphicon, Table, Panel} from "react-bootstrap"
import './QuickFit.css'
import {calculateFrameSize, calculateMinimumSaddleHeight, calculateMaximumSaddleHeight, calculateMaximumStandoverHeight, calculateHandlebarWidth,
calculateMinimumSaddleWidth, calculateMaximumSaddleWidth, calculateTopTubeStemCombination, calculateUpperBody, calculateSoftScore} from './../lib/fitkit-js-functions'
//import SizingRecommendationsSVG from '../bike/SizingRecommendationsSVG'
//import MTBSizingSVG from '../bike/MTBSizingSVG'
//import TTSizingSVG from '../bike/TTSizingSVG'
import {sizingPDF} from '../pdf/SizingPdf'
import bikeImage from './../assets/Bikes/roadsizingannotated64'
import ttBikeImage from './../assets/Bikes/ttsizingannotated64'
import mtbBikeImage from './../assets/Bikes/mtbsizingannotated64'


class SizingRecommendations extends Component{
state={
  activeMetric:'none',
  activeBike:'Road Bike'
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

  onMouseDownTown =(e) =>{
//    let rect = e.currentTarget.getBoundingClientRect()
//    let x= e.clientX - rect.left
//    let y= e.clientY - rect.top
//    console.log(x)
//    console.log(y)
  
  }

  handleRadio=(e)=>{
    this.setState({activeBike:e.target.value})
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
  type:this.state.activeBike,
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

    const popoverPrinterIcon = (
      <Popover id="popover-printer-icon">
       PDF Report.
      </Popover>
    );

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

      <Radio name="bikeGroup" defaultChecked={this.state.activeBike==="Road Bike"} onClick={this.handleRadio} value="Road Bike" inline>
        Road
      </Radio>{' '}
      <Radio name="bikeGroup" defaultChecked={this.state.activeBike==="TT/Tri Bike"} onClick={this.handleRadio} inline value= "TT/Tri Bike">
        TT/Tri 
      </Radio>{' '}
      <Radio name="bikeGroup" defaultChecked={this.state.activeBike==="Mountain Bike"}onClick={this.handleRadio} inline value= "Mountain Bike">
        MTB
      </Radio>

      <OverlayTrigger trigger={['hover','focus']}
            placement="bottom"
            overlay={popoverPrinterIcon}>
            {!this.props.quickSize&&printerIcon}
</OverlayTrigger>
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body>

{/*<BikeImageCanvas godMode={false} bikeType={"Road Bike"} onMouseMove={this.canvasMouse} activeMetric={this.state.activeMetric}/>*/}
{/* {this.state.activeBike==="Road Bike"&&<SizingRecommendationsSVG markerId="sizingarrows" onMouseDown={this.onMouseDownTown}/>} */}
{/* {this.state.activeBike==="Mountain Bike"&&<MTBSizingSVG markerId="sizingarrows" onMouseDown={this.onMouseDownTown}/>} */}
{/* {this.state.activeBike==="TT/Tri Bike"&&<TTSizingSVG markerId="sizingarrows" onMouseDown={this.onMouseDownTown}/>} */}

{this.state.activeBike==="Road Bike"&&<Image className="bikeImage" responsive src={bikeImage.src}/>}
{this.state.activeBike==="Mountain Bike"&&<Image className="bikeImage" responsive src={mtbBikeImage.src}/>}
{this.state.activeBike==="TT/Tri Bike"&&<Image className="bikeImage" responsive src={ttBikeImage.src}/>}



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


        </Panel.Body>
      </Panel>

        );
  }
  
}

export default SizingRecommendations
