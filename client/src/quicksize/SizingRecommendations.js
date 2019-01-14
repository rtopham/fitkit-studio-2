import React, { Component } from 'react'
import {OverlayTrigger, Well, Popover, Button, Glyphicon, Table, Panel} from "react-bootstrap"
import './QuickSize.css'
import {calculateFrameSize, calculateMinimumSaddleHeight, calculateMaximumSaddleHeight, calculateMaximumStandoverHeight, calculateHandlebarWidth,
calculateMinimumSaddleWidth, calculateMaximumSaddleWidth, calculateTopTubeStemCombination, calculateUpperBody, calculateSoftScore} from './../lib/fitkit-js-functions'
import BikeImageCanvas from './BikeImageCanvas'
import jsPDF from 'jspdf'
import shopImage from './../assets/BikeFitr_Logo.jpg'
import fksLogo from './../assets/fksicon.jpg'
import fksImage from './../assets/FitKit2.png'
import fksAnnotated from './../assets/fitkitannotated.png'

class SizingRecommendations extends Component{
state={

  activeMetric:'none',
  logo:{},
  fksLogo:{},
  bikeImage:{}
  
  
}

componentDidMount=()=>{
  let img = new Image()
  let img2 = new Image()
  let img3 = new Image()
  img.src=shopImage
  img2.src=fksLogo
  img3.src=fksAnnotated
  img.onload=()=>{
  this.setState({logo:img})
  }
  img2.onload=()=>{
    this.setState({fksLogo:img2})
  }
  img3.onload=()=>{
    this.setState({bikeImage:img3})
  }

}

  rowMouseEnter = (e) =>{
//    console.log("Entering")
     let value = e.currentTarget.id
    this.setState({activeMetric:value})

  }

  tableMouseLeave =(e) =>{
//    console.log('left table')
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

  let pdf = new jsPDF({
    orientation: 'p',
    unit: 'mm',
    format: 'letter'
     })

pdf.setFontSize(10);


//variables
const gridLines=false
const leftMargin=5.95
const topMargin=3.7
const gridSize=17
const pageLength=272
const pageWidth=204
const lineHeight=3
const lineMargin=1.3
const textMidPoint=(.5*gridSize)+(.5*lineHeight)
const thisYear=(new Date()).getFullYear()
let i


//GridLines
let col=[], row=[]
for (i=0; i<13; i++){col[i]=i*gridSize+leftMargin}
for (i=0; i<17; i++){row[i]=i*gridSize+topMargin}

if(gridLines){
 pdf.setFillColor(200, 200, 200);
 pdf.setLineWidth(0);
 for (i = 0; i < gridSize*12; i=i+gridSize) {
  pdf.rect(leftMargin+i,topMargin,gridSize,pageLength)  
  }
 for (i = 0; i < gridSize*16; i=i+gridSize) {
    pdf.rect(leftMargin,topMargin+i,pageWidth,gridSize)  
    }
  }

//Lines
pdf.line(col[0],row[1]+8,col[12],row[1]+8)
pdf.line(col[0],row[11]+8,col[12],row[11]+8)
pdf.line(col[0],row[15],col[12],row[15])

//Header Logo
  const aspectRatio=this.state.logo.width/this.state.logo.height
  const maxHeight=15
  const adjustedWidth=maxHeight*aspectRatio
  pdf.addImage(this.state.logo, 'JPG', col[0]+1, topMargin+1, adjustedWidth, maxHeight);



//Header Cyclist Text
/*
const CTCol=9  
pdf.text('Cyclist: '+ this.props.cyclistProfile.firstName+' '+this.props.cyclistProfile.lastName,col[CTCol],row[0]+lineHeight)
pdf.text('Email: ',col[CTCol],row[0]+lineHeight*2+lineMargin)
pdf.setTextColor(11, 0, 128)
pdf.textWithLink(this.props.cyclistProfile.email,col[CTCol]+11,row[0]+lineHeight*2+lineMargin,{url:'mailto:'+this.props.cyclistProfile.email})
pdf.setTextColor(0,0,0)
pdf.text('Gender: '+ this.props.cyclistProfile.gender,col[CTCol],row[0]+lineHeight*3+lineMargin*2)
pdf.text('Age: '+ this.props.cyclistAge,col[CTCol],row[0]+lineHeight*4+lineMargin*3)
*/

//Body Measurements
const BMCol=0
const BMRow=7
const labelColumn=col[BMCol]+1
const dataColumn=col[BMCol+2]
const unitsColumn=col[BMCol+3]
const firstLine=row[BMRow]+lineHeight
let line=[]
line[0]=firstLine
for (i = 1; i < 20; i++) {
    line[i]=line[i-1]+lineHeight+lineMargin
  }

pdf.setTextColor(233, 114, 46);
pdf.text(labelColumn, line[0], 'Body Measurements')
pdf.setTextColor(0,0,0)
pdf.text(labelColumn,line[2], 'Height: ')
pdf.text(dataColumn, line[2], String(this.props.bodyMeasurements.height));
pdf.text(unitsColumn,line[2], "cm.")
pdf.text(labelColumn,line[3], 'Weight: ')
pdf.text(dataColumn, line[3], String(this.props.bodyMeasurements.weight));
pdf.text(unitsColumn,line[3], "kgs.")
pdf.text(labelColumn,line[4], 'Foot Length: ')
pdf.text(dataColumn, line[4], String(this.props.bodyMeasurements.footLength));
pdf.text(unitsColumn,line[4], "cm.")
pdf.text(labelColumn,line[5], 'Inseam: ')
pdf.text(dataColumn, line[5], String(this.props.bodyMeasurements.inseam));
pdf.text(unitsColumn,line[5], "cm.")
pdf.text(labelColumn,line[6], 'Torso: ')
pdf.text(dataColumn, line[6], String(this.props.bodyMeasurements.torso));
pdf.text(unitsColumn,line[6], "cm.")
pdf.text(labelColumn,line[7], 'Arm: ')
pdf.text(dataColumn, line[7], String(this.props.bodyMeasurements.arm));
pdf.text(unitsColumn,line[7], "cm.")
pdf.text(labelColumn,line[8], 'Shoulders: ')
pdf.text(dataColumn, line[8], String(this.props.bodyMeasurements.shoulders));
pdf.text(unitsColumn,line[8], "cm.")
pdf.text(labelColumn,line[9], 'Sit Bones: ')
pdf.text(dataColumn, line[9], String(this.props.bodyMeasurements.sitBones));
pdf.text(unitsColumn,line[9], "cm.")

//Soft Scores
pdf.setTextColor(233, 114, 46);
pdf.text(labelColumn,line[11], 'Soft Scores')
pdf.setTextColor(0,0,0)
pdf.text(labelColumn,line[13], 'Age: ')
pdf.text(dataColumn, line[13], String(this.props.cyclistAge))
pdf.text(labelColumn,line[14], 'Flexibility: ')
pdf.text(dataColumn, line[14], String(this.props.softScores.flexibility))
pdf.text(labelColumn,line[15], 'Riding Style: ')
pdf.text(dataColumn, line[15], String(this.props.softScores.ridingStyle))
pdf.text(labelColumn,line[16], 'Conditions: ')
pdf.text(dataColumn, line[16], String(this.props.softScores.preconditions))

//Bike Image
const bikeAspectRatio=this.state.bikeImage.height/this.state.bikeImage.width
const bikeWidth=(8*17)-2
const bikeHeight=Math.round(bikeWidth*bikeAspectRatio)
pdf.addImage(this.state.bikeImage, 'JPG', col[4]+1,row[2]+1,bikeWidth, bikeHeight);

//Header Fitter Text
const FTCol=6  
const FTRow=0
const FTlabelColumn=col[FTCol]+1
const FTfirstLine=row[FTRow]+lineHeight
line[0]=FTfirstLine
for (i = 1; i < 20; i++) {
  line[i]=line[i-1]+lineHeight+lineMargin
}
pdf.setTextColor(233, 114, 46)
pdf.text(FTlabelColumn,line[0],'Fit Kit Systems Sizing Recommendations')
pdf.setTextColor(0,0,0)
pdf.text(FTlabelColumn,line[2],'Evaluated by: '+ this.props.user.name)
pdf.text(FTlabelColumn,line[3],'Email: ')
pdf.setTextColor(11, 0, 128)
pdf.textWithLink(this.props.user.email,FTlabelColumn+11, line[3],{url:'mailto:'+this.props.user.email})
pdf.setTextColor(0,0,0)
//  pdf.text('Date: '+new Date(Date.now()).toDateString(),col[FTCol],row[0]+lineHeight*4+lineMargin*3)


//Cyclist Profile
const CPCol=0
const CPRow=2
const CPlabelColumn=col[CPCol]+1
const CPdataColumn=col[CPCol+1]
const CPfirstLine=row[CPRow]+lineHeight
line[0]=CPfirstLine
for (i = 1; i < 20; i++) {
  line[i]=line[i-1]+lineHeight+lineMargin
}
pdf.setTextColor(233, 114, 46)
pdf.text(CPlabelColumn,line[0],'Cyclist')
pdf.setTextColor(0,0,0)
pdf.text(CPlabelColumn,line[2],'Name: ')
pdf.text(CPdataColumn,line[2],this.props.cyclistProfile.firstName+' '+this.props.cyclistProfile.lastName)
pdf.text(CPlabelColumn,line[3],'Email: ')
pdf.setTextColor(11, 0, 128)
pdf.textWithLink(this.props.cyclistProfile.email,CPdataColumn,line[3],{url:'mailto:'+this.props.cyclistProfile.email})
pdf.setTextColor(0,0,0)
pdf.text(CPlabelColumn,line[4],'Gender: ')
pdf.text(CPdataColumn,line[4],this.props.cyclistProfile.gender)
pdf.text(CPlabelColumn,line[5],'DOB: ')
pdf.text(CPdataColumn,line[5],this.props.cyclistProfile.birthDate.substring(0,10))
pdf.text(CPlabelColumn,line[6],'Updated:')
pdf.text(CPdataColumn,line[6],new Date(this.props.updated).toDateString().substring(0,10))

//Sizing Recommendations
const SRCol=4
const SRRow=7
const SRlabelColumn=col[SRCol]+1
const SRdataColumn=col[SRCol+4]
const SRunitsColumn=col[SRCol+5]+5
const SRfirstLine=row[SRRow]+lineHeight
line[0]=SRfirstLine
for (i = 1; i < 20; i++) {
  line[i]=line[i-1]+lineHeight+lineMargin
}
pdf.setTextColor(233, 114, 46)
pdf.text(SRlabelColumn,line[0],'Sizing Recommendations')
pdf.setTextColor(0,0,0)
pdf.text(SRlabelColumn,line[2],'Frame Size (virtual seat tube):')
pdf.text(SRdataColumn, line[2],frameSize.toString())
pdf.text(SRunitsColumn,line[2],'cm.')
pdf.text(SRlabelColumn,line[3],'Saddle Height (saddle to pedal spindle):')
pdf.text(SRdataColumn, line[3],minSaddle.toString()+' - '+maxSaddle.toString())
pdf.text(SRunitsColumn,line[3],'cm.')
pdf.text(SRlabelColumn,line[4],'Maximum Standover Height:')
pdf.text(SRdataColumn, line[4],maxStandoverHeight.toString())
pdf.text(SRunitsColumn,line[4],'cm.')
pdf.text(SRlabelColumn,line[6],'Handlebar Width (drop bar):')
pdf.text(SRdataColumn, line[6],handlebarWidth.toString())
pdf.text(SRunitsColumn,line[6],'cm.')
pdf.text(SRlabelColumn,line[7],'Saddle Width:')
pdf.text(SRdataColumn, line[7],minSaddleWidth.toString()+' - '+maxSaddleWidth.toString())
pdf.text(SRunitsColumn,line[7],'mm.')
pdf.text(SRlabelColumn,line[9],'Bike Length (top tube + stem):')
pdf.text(SRdataColumn, line[9],dropTopTubeAndStem.toString())
pdf.text(SRunitsColumn,line[9],'cm. (drop bar)')
pdf.text(SRdataColumn, line[10],flatTopTubeAndStem.toString())
pdf.text(SRunitsColumn,line[10],'cm. (flat bar)')
pdf.text(SRdataColumn, line[11],(dropTopTubeAndStem-2).toString())
pdf.text(SRunitsColumn,line[11],'cm. (aero bar)')
pdf.text(SRlabelColumn,line[13],'Adjusted Bike Length (top tube + stem):')
pdf.text(SRdataColumn, line[13],adjustedDropTopTubeAndStem.toString())
pdf.text(SRunitsColumn,line[13],'cm. (drop bar)')
pdf.text(SRdataColumn, line[14],adjustedFlatTopTubeAndStem.toString())
pdf.text(SRunitsColumn,line[14],'cm. (flat bar)')
pdf.text(SRdataColumn, line[15],(adjustedDropTopTubeAndStem-2).toString())
pdf.text(SRunitsColumn,line[15],'cm. (aero bar)')


//Notes
const NCol=0
const NRow=12
const NlabelColumn=col[NCol]+1
const NfirstLine=row[NRow]+lineHeight
line[0]=NfirstLine
for (i = 1; i < 20; i++) {
  line[i]=line[i-1]+lineHeight+lineMargin
}
pdf.setTextColor(233, 114, 46)
pdf.text(NlabelColumn,line[0],'Notes')
pdf.setTextColor(0,0,0)
if (this.props.notes) {
  let splitNotes = pdf.splitTextToSize(this.props.notes, gridSize*11);
  pdf.text(NlabelColumn,line[2], splitNotes);
}

//footer
pdf.addImage(this.state.fksLogo, 'JPG', col[0]+4,row[15]+4, 9,9);
const copyrightstring = "Copyright © "+thisYear+" Fit Kit Systems"
pdf.text(copyrightstring,col[1],row[15]+textMidPoint)
pdf.text('Proper use of recommendations is the sole responsibility of the user.',col[5],row[15]+textMidPoint)


pdf.save('FKS_Report_'+this.props.cyclistProfile.firstName+'_'+this.props.cyclistProfile.lastName+'_'+new Date(this.props.updated).toISOString().substring(0,10)+'_.pdf')

//  let img = new Image()
//  img.src=shopImage

/*
  img.onload=()=>{
    console.log(img.width)
    console.log(img.height)
    let aspectRatio=img.width/img.height
    let maxHeight=15
    let adjustedWidth=maxHeight*aspectRatio
    this.addLogo(img,adjustedWidth,maxHeight)

  }
*/

  
    

// pdf.text('Cyclist: '+ this.props.cyclistProfile.firstName+' '+this.props.cyclistProfile.lastName,10,10)
// pdf.text('Frame Size (virtual seat tube): '+frameSize,10,30)

 //pdf.save(this.props.cyclistAge+'.pdf')
 


}

  render(){
 // console.log(this.state.activeMetric)

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
            Sizing Recommendations {!this.props.quickSize&&printerIcon}
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body>

<BikeImageCanvas godMode={false} onMouseMove={this.canvasMouse} activeMetric={this.state.activeMetric}/>

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
