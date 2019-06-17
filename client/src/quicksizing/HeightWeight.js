import React, { Component } from 'react'
import './QuickSize.css'
import QuickSizeSlider from './QuickSizeSlider'
import QuickSizeInput from './QuickSizeInput'
import {heightHelp, weightHelp} from './HelpOverlays'

class HeightWeight extends Component {
state={
  heightUnits: "cm.", 
  weightUnits: "kgs.",
  heightMin:122,
  heightMax:215,
  weightMin: 36,
  weightMax: 120
  
}

componentDidMount=()=>{
  if(this.props.preferences.height_units==='Metric') this.setState({heightUnits: "cm.", heightMin: 122, heightMax: 215})
  else this.setState({heightUnits: "in.", heightMin: 48, heightMax: 84.6}) 

  if(this.props.preferences.weight_units==='Metric') this.setState({weightUnits: "kgs.", weightMin: 36, weightMax: 120})
  else this.setState({weightUnits: "lbs.", weightMin: 79, weightMax: 265})
}

toggleHeightUnits=()=>{
if(this.state.heightUnits==="cm."){
  this.setState({heightUnits: "in.", heightMin: 48, heightMax: 84.6})
} else{
  this.setState({heightUnits: "cm.", heightMin: 122, heightMax: 215})
}
}

toggleWeightUnits=()=>{
  if(this.state.weightUnits==="kgs."){
    this.setState({weightUnits: "lbs.", weightMin: 79, weightMax: 265})
  }else
  this.setState({weightUnits: "kgs.", weightMin: 36, weightMax: 120})
  }

changeHeight = (e) => {
    let value=parseFloat(e.target.value)
    let metricHeight, imperialHeight
    if(this.state.heightUnits==="cm."){
      metricHeight=value
      imperialHeight=(value/2.54).toFixed(1)
    }
    if(this.state.heightUnits==="in."){
      metricHeight=(value*2.54).toFixed(1)
      imperialHeight=value
    }
    this.props.updateHeight(metricHeight,imperialHeight)

  }

changeWeight=(e)=>{

  let value=parseFloat(e.target.value)
  let metricWeight, imperialWeight
  if(this.state.weightUnits==="kgs."){
    metricWeight=value
    imperialWeight=(value*2.205).toFixed(1)
  }
  if(this.state.weightUnits==="lbs."){
    metricWeight=(value/2.205).toFixed(1)
    imperialWeight=value
  }
  this.props.updateWeight(metricWeight,imperialWeight)

  }

convertedHeight=()=>{
if(this.state.heightUnits==="cm.")return this.props.bodyMeasurements.height
else return this.props.imperialHeight
}

convertedWeight=()=>{
  if(this.state.weightUnits==="kgs.")return this.props.bodyMeasurements.weight
  else return this.props.imperialWeight
  }

  render() {
 
    return (
      <div>
      <div className="row">
      <QuickSizeInput label="Height" units={this.state.heightUnits} value={this.convertedHeight()} overlay={heightHelp} min={this.state.heightMin} max={this.state.heightMax} step={.1} onChange={this.changeHeight} toggleUnits={this.toggleHeightUnits} />
      <QuickSizeInput label="Weight" units={this.state.weightUnits} value={this.convertedWeight()} overlay={weightHelp} min={this.state.weightMin} max={this.state.weightMax} step={.1} onChange={this.changeWeight} toggleUnits={this.toggleWeightUnits} />
      </div>
      <div className="row">
      <QuickSizeSlider label="Height" units="cm." value={this.convertedHeight()} overlay={heightHelp} min={this.state.heightMin} max={this.state.heightMax} step={.1} onChange={this.changeHeight} />
      <QuickSizeSlider label="Weight" units="kgs." value={this.convertedWeight()} overlay={weightHelp} min={this.state.weightMin} max={this.state.weightMax} step={.1} onChange={this.changeWeight} />
      </div>
      </div>
      
    )
  }
}

export default HeightWeight;  