import React from 'react'
import {FormControl} from 'react-bootstrap'


const CyclistDateLastUpdated=(props)=> {

        let dateValue= new Date(props.dateString)
        const months=["01","02","03","04","05","06","07","08","09","10","11","12"]
        let dayValue=dateValue.getDate()
        let dayString=(dayValue<10? '0':'')+dayValue 
        
        let theString=dateValue.getFullYear()+'-'+months[dateValue.getMonth()]+'-'+dayString

        return(
            <FormControl className="cyclist-date-updated" type="date" bsSize="sm" onChange={props.onChange} value= {theString}/>
        )
    }

export default CyclistDateLastUpdated