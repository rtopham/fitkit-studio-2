import React, { Component } from 'react'
import {Table} from 'react-bootstrap'
import FitHistoryDate from './FitHistoryDate'
import FitHistoryDateLastUpdated from './FitHistoryDateLastUpdated'
import FitHistoryRow from './FitHistoryRow'
import DeleteFitHistory from './DeleteFitHistory'

class FitHistory extends Component {
    state = {
        fitHistory:[],
        bikeType: "Road Bike",
        originalDates:[]
      }

componentDidMount=()=>{

    let bikeType=this.props.bike.type
    if(this.props.bike.type!=="Mountain Bike"&&this.props.bike.type!=="TT/Tri Bike") bikeType="Road Bike"
    this.setState({bikeType})
}

      /* oldcomponentDidMount=()=>{
//    console.log(this.props.bike)
    let bikeType=this.props.bike.type
    if(this.props.bike.type!=="Mountain Bike"&&this.props.bike.type!=="TT/Tri Bike") bikeType="Road Bike"
    this.setState({bikeType})

  
if(this.props.bike._id!==null){

    let fitHistory=this.props.bike.fitHistory.slice(0)

    fitHistory.push({
                  date:                             this.props.bike.updated,  
                  saddleHeight:                     this.props.bike.saddleHeight,
                  saddleHeightBB:                   this.props.bike.saddleHeightBB,                                                                       
                  saddleSetBack:                    this.props.bike.saddleSetBack,                                                                        
                  saddleAngle:                      this.props.bike.saddleAngle,                                                                          
                  saddleNoseToBar:                  this.props.bike.saddleNoseToBar,                                                                      
                  saddleNoseToHood:                 this.props.bike.saddleNoseToHood,                                                                     
                  saddleToBarDrop:                  this.props.bike.saddleToBarDrop,                                                                      
                  handlebarReachHX:                 this.props.bike.handlebarReachHX,                                                                     
                  handlebarStackHY:                 this.props.bike.handlebarStackHY,
                  handlebarAngle:                   this.props.bike.handlebarAngle,
                  hoodAngle:                        this.props.bike.hoodAngle,                                                                     
                  seatPostOffset:                   this.props.bike.seatPostOffset,                                                                       
                  saddleMake:                       this.props.bike.saddleMake,                                                                           
                  saddleModel:                      this.props.bike.saddleModel,                                                                          
                  saddleWidth:                      this.props.bike.saddleWidth,                                                                          
                  crankLength:                      this.props.bike.crankLength,                                                                          
                  pedalType:                        this.props.bike.pedalType,                                                                            
                  pedalMakeModel:                   this.props.bike.pedalMakeModel,
                  stemLength:                       this.props.bike.stemLength,                                                                           
                  stemType:                         this.props.bike.stemType,                                                                            
                  stemAngle:                        this.props.bike.stemAngle,                                                                            
                  spacersBelow:                     this.props.bike.spacersBelow,                                                                         
                  spacersAbove:                     this.props.bike.spacersAbove,                                                                         
                  handlebarWidth:                   this.props.bike.handlebarWidth,                                                                       
                  handlebarReach:                   this.props.bike.handlebarReach,                                                                         
                  ttBasebarWidth:                   this.props.bike.ttBasebarWidth,                                                                         
                  ttAerobarType:                    this.props.bike.ttAerobarType,                                                                         
                  ttAerobarMakeModel:               this.props.bike.ttAerobarMakeModel,                                                                     
                  ttExtensionsShape:                this.props.bike.ttExtensionsShape,                                                                     
                  ttRisers:                         this.props.bike.ttRisers,                                                                      
                  ttPadsMakeModel:                  this.props.bike.ttPadsMakeModel,                                                                        
                  ttSaddleToPadCenterDrop:          this.props.bike.ttSaddleToPadCenterDrop,
                  ttSaddleNoseToPadRear:            this.props.bike.ttSaddleNoseToPadRear,                                                                 
                  ttSaddleNoseToEndOfExtensions:    this.props.bike.ttSaddleNoseToEndOfExtensions,
                  ttExtensionWidthAtClamps:         this.props.bike.ttExtensionWidthAtClamps,                                                            
                  ttExtensionWidthAtEnd:            this.props.bike.ttExtensionWidthAtEnd,                                                                     
                  ttExtensionAngle:                 this.props.bike.ttExtensionAngle,                                                                           
                  ttPadWidth:                       this.props.bike.ttPadWidth,                                                                                         
                  ttPadXReachRearOfPad:             this.props.bike.ttPadXReachRearOfPad,
                  ttPadXReachCenterOfPad:           this.props.bike.ttPadXReachCenterOfPad,                                                                                 
                  ttPadYStackRearOfPad:             this.props.bike.ttPadYStackRearOfPad,                                                                               
                  ttBasebarReachX:                  this.props.bike.ttBasebarReachX,                                                                                      
                  ttBasebarStackY:                  this.props.bike.ttBasebarStackY,   
                  ttBasebarAngle:                   this.props.bike.ttBasebarAngle,                                                                                          
                  mtbSaddleNoseToGripEnd:           this.props.bike.mtbSaddleNoseToGripEnd,                                                                                       
                  mtbSaddleToGripCenterDropRise:    this.props.bike.mtbSaddleToGripCenterDropRise,                                                                          
                })
/*                 let originalDates=[]
                for (let i=0 ;i<fitHistory.length;i++){
                    originalDates[i]=fitHistory[i].date
                } */
/* this.setState({fitHistory})
console.log(fitHistory)
            }

} */ 

deleteFitHistory=(id)=>{
    this.props.deleteFitHistory(this.props.bike, id)

}



    render() {
        if(!this.props.bike.fitHistory) return null


        return (
            <React.Fragment>
            <Table className="modal-container" striped bordered responsive>
            <thead>
               
            <tr>
            <th></th>
            {this.props.fitHistory.map((item, i) => {
                return(                  
                        
                 <th className="centerthis" key={i}>
                     {this.props.editFields&&i<this.props.fitHistory.length-1&&
                     <FitHistoryDate 
                        bike={this.props.bike} 
                        historyLength={this.props.fitHistory.length} 
                        originalBike={this.props.originalBike} 
                        originalDate={this.props.fitHistory[i].date} 
                        onChange={this.props.onChange} 
                        triggerUnsavedDateChanges={this.props.triggerUnsavedDateChanges}
                        bikeIndex= {this.props.bikeIndex} 
                        historyIndex={i} 
                        dateString = {item.date.substring(0,10)}/>}

                    {i===this.props.fitHistory.length-1&&
                     <FitHistoryDateLastUpdated
                        editFields={this.props.editFields}
                        bike={this.props.bike} 
                        historyLength={this.props.fitHistory.length} 
                        originalBike={this.props.originalBike} 
                        originalDate={this.props.fitHistory[i].date} 
                        onChange={this.props.handleDateLastUpdated} 
                        triggerUnsavedDateChanges={this.props.triggerUnsavedDateChanges}
                        bikeIndex= {this.props.bikeIndex} 
                        historyIndex={i} 
                        dateString = {item.date}/>}                        
                     
                     {!this.props.editFields&&i<this.props.fitHistory.length-1&&<span>{item.date.substring(0,10)} <DeleteFitHistory id={i} date={new Date(item.date).toDateString().substring(0,10)} bsStyle="link" bsSize="xsmall" deleteFitHistory={this.deleteFitHistory}/></span>}

                     {/* {!this.props.editFields&&i===this.props.fitHistory.length-1&&item.date.substring(0,10)} */}

                 </th>
                    
                )

            })
            }
            </tr>
            </thead>
            <tbody>
<FitHistoryRow show={this.state.bikeType}                         title="Saddle Height (saddle to pedal spindle)"  rowKey={"saddleHeight"}                fitHistory={this.props.fitHistory}/>            
<FitHistoryRow show={this.state.bikeType}                         title="Saddle Height (saddle to bottom bracket)" rowKey={"saddleHeightBB"}              fitHistory={this.props.fitHistory}/>            
<FitHistoryRow show={this.state.bikeType}                         title="Saddle Setback (from bottom bracket):"    rowKey={"saddleSetBack"}               fitHistory={this.props.fitHistory}/>   
<FitHistoryRow show={this.state.bikeType}                         title="Saddle Angle:"                            rowKey="saddleAngle"                   fitHistory={this.props.fitHistory}/>
<FitHistoryRow show={this.state.bikeType!=="TT/Tri Bike"}         title="Saddle Nose To Bar Center:"               rowKey="saddleNoseToBar"               fitHistory={this.props.fitHistory}/>
<FitHistoryRow show={this.state.bikeType==="Road Bike"}           title="Saddle Nose To Hood Trough:"              rowKey="saddleNoseToHood"              fitHistory={this.props.fitHistory}/>
<FitHistoryRow show={this.state.bikeType==="Road Bike"}           title="Saddle To Bar Drop:"                      rowKey="saddleToBarDrop"               fitHistory={this.props.fitHistory}/>
<FitHistoryRow show={this.state.bikeType!=="TT/Tri Bike"}         title="Handlebar Reach (HX):"                    rowKey="handlebarReachHX"              fitHistory={this.props.fitHistory}/>
<FitHistoryRow show={this.state.bikeType!=="TT/Tri Bike"}         title="Handlebar Stack (HY):"                    rowKey="handlebarStackHY"              fitHistory={this.props.fitHistory}/>
<FitHistoryRow show={this.state.bikeType==="Road Bike"}           title="Handlebar Angle:"                         rowKey="handlebarAngle"                fitHistory={this.props.fitHistory}/>
<FitHistoryRow show={this.state.bikeType==="Road Bike"}           title="Hood Angle:"                              rowKey="hoodAngle"                     fitHistory={this.props.fitHistory}/>
<FitHistoryRow show={this.state.bikeType!=="TT/Tri Bike"}         title="Seat Post Offset:"                        rowKey="seatPostOffset"                fitHistory={this.props.fitHistory}/>
<FitHistoryRow show={this.state.bikeType}                         title="Saddle Make:"                             rowKey="saddleMake"                    fitHistory={this.props.fitHistory}/>
<FitHistoryRow show={this.state.bikeType}                         title="Saddle Model:"                            rowKey="saddleModel"                   fitHistory={this.props.fitHistory}/>
<FitHistoryRow show={this.state.bikeType}                         title="Saddle Width:"                            rowKey="saddleWidth"                   fitHistory={this.props.fitHistory}/>
<FitHistoryRow show={this.state.bikeType}                         title="Crank Length:"                            rowKey="crankLength"                   fitHistory={this.props.fitHistory}/>
<FitHistoryRow show={this.state.bikeType}                         title="Pedal Type:"                              rowKey="pedalType"                     fitHistory={this.props.fitHistory}/>
<FitHistoryRow show={this.state.bikeType}                         title="Pedal Make/Model:"                        rowKey="pedalMakeModel"                fitHistory={this.props.fitHistory}/>
<FitHistoryRow show={this.state.bikeType}                         title="Stem Length:"                             rowKey="stemLength"                    fitHistory={this.props.fitHistory}/>
<FitHistoryRow show={this.state.bikeType}                         title="Stem Type:"                               rowKey="stemType"                      fitHistory={this.props.fitHistory}/>
<FitHistoryRow show={this.state.bikeType}                         title="Stem Angle:"                              rowKey="stemAngle"                     fitHistory={this.props.fitHistory}/>
<FitHistoryRow show={this.state.bikeType}                         title="Spacers Below Stem:"                      rowKey="spacersBelow"                  fitHistory={this.props.fitHistory}/>
<FitHistoryRow show={this.state.bikeType}                         title="Sapacers Above Stem:"                     rowKey="spacersAbove"                  fitHistory={this.props.fitHistory}/>
<FitHistoryRow show={this.state.bikeType!=="TT/Tri Bike"}         title="Handlebar Width:"                         rowKey="handlebarWidth"                fitHistory={this.props.fitHistory}/>
<FitHistoryRow show={this.state.bikeType==="TT/Tri Bike"}         title="Handlebar Reach:"                         rowKey="handlebarReach"                fitHistory={this.props.fitHistory}/>
<FitHistoryRow show={this.state.bikeType==="TT/Tri Bike"}         title="Basebar Width:"                           rowKey="ttBasebarWidth"                fitHistory={this.props.fitHistory}/>
<FitHistoryRow show={this.state.bikeType==="TT/Tri Bike"}         title="Aerobar Type:"                            rowKey="ttAerobarType"                 fitHistory={this.props.fitHistory}/>
<FitHistoryRow show={this.state.bikeType==="TT/Tri Bike"}         title="Aerobar Make/Model:"                      rowKey="ttAerobarMakeModel"            fitHistory={this.props.fitHistory}/>
<FitHistoryRow show={this.state.bikeType==="TT/Tri Bike"}         title="Extensions--Shape:"                       rowKey="ttExtensionsShape"             fitHistory={this.props.fitHistory}/>
<FitHistoryRow show={this.state.bikeType==="TT/Tri Bike"}         title="Risers:"                                  rowKey="ttRisers"                      fitHistory={this.props.fitHistory}/>
<FitHistoryRow show={this.state.bikeType==="TT/Tri Bike"}         title="Pads Make/Model:"                         rowKey="ttPadsMakeModel"               fitHistory={this.props.fitHistory}/>
<FitHistoryRow show={this.state.bikeType==="TT/Tri Bike"}         title="Saddle To Pad (center) Drop:"             rowKey="ttSaddleToPadCenterDrop"       fitHistory={this.props.fitHistory}/>
<FitHistoryRow show={this.state.bikeType==="TT/Tri Bike"}         title="Saddle Nose to Pad Rear:"                 rowKey="ttSaddleNoseToPadRear"         fitHistory={this.props.fitHistory}/>
<FitHistoryRow show={this.state.bikeType==="TT/Tri Bike"}         title="Saddle Nose to End of Extensions:"        rowKey="ttSaddleNoseToEndOfExtensions" fitHistory={this.props.fitHistory}/>
<FitHistoryRow show={this.state.bikeType==="TT/Tri Bike"}         title="Extension Width at Clamps:"               rowKey="ttExtensionWidthAtClamps"      fitHistory={this.props.fitHistory}/>
<FitHistoryRow show={this.state.bikeType==="TT/Tri Bike"}         title="Extension Width at End:"                  rowKey="ttExtensionWidthAtEnd"         fitHistory={this.props.fitHistory}/>
<FitHistoryRow show={this.state.bikeType==="TT/Tri Bike"}         title="Extension Angle:"                         rowKey="ttExtensionAngle"              fitHistory={this.props.fitHistory}/>
<FitHistoryRow show={this.state.bikeType==="TT/Tri Bike"}         title="Pad Width:"                               rowKey="ttPadWidth"                    fitHistory={this.props.fitHistory}/>
<FitHistoryRow show={this.state.bikeType==="TT/Tri Bike"}         title="Pad X Reach (rear of pad):"               rowKey="ttPadXReachRearOfPad"          fitHistory={this.props.fitHistory}/>
<FitHistoryRow show={this.state.bikeType==="TT/Tri Bike"}         title="Pad X Reach (center of pad):"             rowKey="ttPadXReachCenterOfPad"        fitHistory={this.props.fitHistory}/>
<FitHistoryRow show={this.state.bikeType==="TT/Tri Bike"}         title="Pad Y Stack (rear of pad):"               rowKey="ttPadYStackRearOfPad"          fitHistory={this.props.fitHistory}/>
<FitHistoryRow show={this.state.bikeType==="TT/Tri Bike"}         title="Basebar Reach (X):"                       rowKey="ttBasebarReachX"               fitHistory={this.props.fitHistory}/>
<FitHistoryRow show={this.state.bikeType==="TT/Tri Bike"}         title="Basebar Stack (Y):"                       rowKey="ttBasebarStackY"               fitHistory={this.props.fitHistory}/>
<FitHistoryRow show={this.state.bikeType==="TT/Tri Bike"}         title="Basebar Angle:"                           rowKey="ttBasebarAngle"                fitHistory={this.props.fitHistory}/>
<FitHistoryRow show={this.state.bikeType==="Mountain Bike"}       title="Saddle Nose to Grip End:"                 rowKey="mtbSaddleNoseToGripEnd"        fitHistory={this.props.fitHistory}/>
<FitHistoryRow show={this.state.bikeType==="Mountain Bike"}       title="Saddle to Grip Center Drop/Rise:"         rowKey="mtbSaddleToGripCenterDropRise" fitHistory={this.props.fitHistory}/>         
            </tbody>
            </Table>
            </React.Fragment>
        )
    }
}

export default FitHistory