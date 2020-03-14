import React, { Component } from 'react'
import {FormControl} from 'react-bootstrap'


class FitHistoryDateLastUpdated extends Component {

handleChange=(e)=>{

    this.props.onChange(e.currentTarget.value)

}

    render(){

        let dateValue= new Date(this.props.dateString)
        const months=["01","02","03","04","05","06","07","08","09","10","11","12"]
        let dayValue=dateValue.getDate()
        let dayString=(dayValue<10? '0':'')+dayValue 
        
        let theString=dateValue.getFullYear()+'-'+months[dateValue.getMonth()]+'-'+dayString

        if(!this.props.editFields) return (theString)
        return(
            <FormControl type="date" bsSize="sm" onChange={this.handleChange} data-history={this.props.historyIndex} value= {theString}/>
        )
    }
}

export default FitHistoryDateLastUpdated