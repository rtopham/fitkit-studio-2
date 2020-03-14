import React, { Component } from 'react'
import {FormControl} from 'react-bootstrap'


class FitHistoryDate extends Component {


handleChange=(e)=>{
    this.props.triggerUnsavedDateChanges()
    const newDateString=new Date(e.currentTarget.value+this.props.originalDate.substring(10,24)).toISOString()
    
    this.props.onChange(this.props.bikeIndex, this.props.historyIndex, newDateString)

}

    render(){


        return(
            <FormControl type="date" bsSize="sm" onChange={this.handleChange} data-history={this.props.historyIndex} value= {this.props.dateString}/>
        )
    }
}

export default FitHistoryDate