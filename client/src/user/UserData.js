import React, {Component} from 'react'
import {Label, Tabs, Tab, Table, Panel, Button, ListGroup, Glyphicon, ListGroupItem} from "react-bootstrap"
import auth from '../auth/auth-helper'
import {read} from '../user/api-user.js'
import {listByUser} from '../cyclist/api-cyclist'
import {listByUser as listBikesByUser}  from '../bike/api-bike'
import {Redirect} from 'react-router-dom'
import CyclistRow from './CyclistRow'
import BikeRow from './BikeRow'


class UserData extends Component {
  constructor({match}) {
    super()

    this.state = {
      user: {name: '', email: '', service_level:'Quick Size',
             preferences:{height_units:'Metric',weight_units:'Metric'},
             shop_owner: false
            },           
      redirectToSignin: false,
      bikes: [],
      cyclists:[],
      loadingUsers:true,
      loadingBikes:true,
      loadingCyclists:true,
      lastSevenDays: {customers:0,newCustomers:0,male:0,female:0,nonBinary:0,bikes:0,newBikes:0,roadBikes:0,mountainBikes:0,ttBikes:0,gravelBikes:0,cycloCrossBikes:0,touringBikes:0,tandemBikes:0},
      lastThirtyDays:{customers:0,newCustomers:0,male:0,female:0,nonBinary:0,bikes:0,newBikes:0,roadBikes:0,mountainBikes:0,ttBikes:0,gravelBikes:0,cycloCrossBikes:0,touringBikes:0,tandemBikes:0},
      yearToDate:    {customers:0,newCustomers:0,male:0,female:0,nonBinary:0,bikes:0,newBikes:0,roadBikes:0,mountainBikes:0,ttBikes:0,gravelBikes:0,cycloCrossBikes:0,touringBikes:0,tandemBikes:0},
      today:         {customers:0,newCustomers:0,male:0,female:0,nonBinary:0,bikes:0,newBikes:0,roadBikes:0,mountainBikes:0,ttBikes:0,gravelBikes:0,cycloCrossBikes:0,touringBikes:0,tandemBikes:0},
      allTime:       {customers:0,newCustomers:0,male:0,female:0,nonBinary:0,bikes:0,newBikes:0,roadBikes:0,mountainBikes:0,ttBikes:0,gravelBikes:0,cycloCrossBikes:0,touringBikes:0,tandemBikes:0}
        }
    this.match = match 
    
  }

  init = (userId) => {
    const jwt = auth.isAuthenticated()
    read({
      userId: userId
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        this.setState({redirectToSignin: true})
      } else {
        this.setState({user: data})
        //if(data.admin) this.loadAdminData(userId,jwt); else this.setState({unauthorizedUser:true})
        this.loadCyclistData(userId,jwt)
        this.loadBikeData(userId, jwt)
      }
    })
  }



  loadCyclistData=(userId, jwt)=>{
 
    listByUser({
      userId: userId,
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        let lastSevenDays= {}
        let lastThirtyDays={}
        let yearToDate=    {}
        let today=         {}
        let allTime=       {}
        Object.assign(allTime,this.state.allTime)
        Object.assign(lastSevenDays,this.state.lastSevenDays)
        Object.assign(lastThirtyDays,this.state.lastThirtyDays)
        Object.assign(yearToDate,this.state.yearToDate)
        Object.assign(today,this.state.today)
        let sevenDaysAgo = new Date()
        let thirtyDaysAgo = new Date()
        let todaysDate = new Date()
        todaysDate.setDate(todaysDate.getDate())
        sevenDaysAgo.setDate(sevenDaysAgo.getDate()-7)
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate()-30)
        let beginningOfYear = new Date(new Date().getFullYear(),0,1)

        for(let i=0;i<data.length;i++){

          const customer=data[i]
          switch (customer.cyclistProfile.gender){
            case "Male":          allTime.male++; break;
            case "Female":        allTime.female++; break;
            case "Non-Binary":    allTime.nonBinary++; break;
            // no default
          }

          if(new Date(customer.created)>=beginningOfYear&&new Date(customer.created)<=todaysDate) yearToDate.newCustomers++
          if(new Date(customer.created)>=sevenDaysAgo&&new Date(customer.created)<=todaysDate) lastSevenDays.newCustomers++
          if(new Date(customer.created)>=thirtyDaysAgo&&new Date(customer.created)<=todaysDate) lastThirtyDays.newCustomers++
          if(new Date(customer.created)===todaysDate) today.newCustomers++

        }
 
        this.setState({cyclists:data, allTime, lastSevenDays, lastThirtyDays, yearToDate, today, loadingCyclists:false})
        }
    })
  }

  loadBikeData=(UserId, jwt)=>{


    listBikesByUser({
      userId:UserId
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
        
      } else {
        let lastSevenDays= {}
        let lastThirtyDays={}
        let yearToDate=    {}
        let today=         {}
        let allTime=       {}
        Object.assign(allTime,this.state.allTime)
        Object.assign(lastSevenDays,this.state.lastSevenDays)
        Object.assign(lastThirtyDays,this.state.lastThirtyDays)
        Object.assign(yearToDate,this.state.yearToDate)
        Object.assign(today,this.state.today)
        let sevenDaysAgo = new Date()
        let thirtyDaysAgo = new Date()
        let todaysDate = new Date()
        todaysDate.setDate(todaysDate.getDate())
        sevenDaysAgo.setDate(sevenDaysAgo.getDate()-7)
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate()-30)
        let beginningOfYear = new Date(new Date().getFullYear(),0,1)

        allTime.bikes=data.length

        for(let i=0;i<data.length;i++){
          const bike=data[i]
          switch (bike.type){
            case "Road Bike":     allTime.roadBikes++; break;
            case "Mountain Bike": allTime.mountainBikes++; break;
            case "TT/Tri Bike":   allTime.ttBikes++; break;
            case "Gravel":        allTime.gravelBikes++; break;
            case "Cyclocross":    allTime.cycloCrossBikes++; break;
            case "Touring":       allTime.touringBikes++; break;
            case "Tandem":        allTime.tandemBikes++; break;  
            // no default
          }

          if(new Date(bike.created)>=beginningOfYear&&new Date(bike.created)<=todaysDate) yearToDate.newBikes++
          if(new Date(bike.created)>=sevenDaysAgo&&new Date(bike.created)<=todaysDate) lastSevenDays.newBikes++
          if(new Date(bike.created)>=thirtyDaysAgo&&new Date(bike.created)<=todaysDate) lastThirtyDays.newBikes++
          if(new Date(bike.created)===todaysDate) today.newBikes++


            if(new Date(bike.updated)>=beginningOfYear&&new Date(bike.updated)<=todaysDate){
              yearToDate.bikes++
              switch (bike.type){
                case "Road Bike":     yearToDate.roadBikes++; break;
                case "Mountain Bike": yearToDate.mountainBikes++; break;
                case "TT/Tri Bike":   yearToDate.ttBikes++; break;
                case "Gravel":        yearToDate.gravelBikes++; break;
                case "Cyclocross":    yearToDate.cycloCrossBikes++; break;
                case "Touring":       yearToDate.touringBikes++; break;
                case "Tandem":        yearToDate.tandemBikes++; break;
                // no default  
              }
            }

            if(new Date(bike.updated)===todaysDate){
              today.bikes++
              switch (bike.type){
                case "Road Bike":     today.roadBikes++; break;
                case "Mountain Bike": today.mountainBikes++; break;
                case "TT/Tri Bike":   today.ttBikes++; break;
                case "Gravel":        today.gravelBikes++; break;
                case "Cyclocross":    today.cycloCrossBikes++; break;
                case "Touring":       today.touringBikes++; break;
                case "Tandem":        today.tandemBikes++; break;  
                // no default
              }
            }

            if(new Date(bike.updated)>=sevenDaysAgo&&new Date(bike.updated)<=todaysDate){
              lastSevenDays.bikes++
              switch (bike.type){
                case "Road Bike":     lastSevenDays.roadBikes++; break;
                case "Mountain Bike": lastSevenDays.mountainBikes++; break;
                case "TT/Tri Bike":   lastSevenDays.ttBikes++; break;
                case "Gravel":        lastSevenDays.gravelBikes++; break;
                case "Cyclocross":    lastSevenDays.cycloCrossBikes++; break;
                case "Touring":       lastSevenDays.touringBikes++; break;
                case "Tandem":        lastSevenDays.tandemBikes++; break;  
                // no default
              }
            }

            if(new Date(bike.updated)>=thirtyDaysAgo&&new Date(bike.updated)<=todaysDate){
              lastThirtyDays.bikes++
              switch (bike.type){
                case "Road Bike":     lastThirtyDays.roadBikes++; break;
                case "Mountain Bike": lastThirtyDays.mountainBikes++; break;
                case "TT/Tri Bike":   lastThirtyDays.ttBikes++; break;
                case "Gravel":        lastThirtyDays.gravelBikes++; break;
                case "Cyclocross":    lastThirtyDays.cycloCrossBikes++; break;
                case "Touring":       lastThirtyDays.touringBikes++; break;
                case "Tandem":        lastThirtyDays.tandemBikes++; break;
                // no default  
              }
            }


        }
 
        this.setState({bikes:data, loadingBikes:false, allTime, yearToDate, lastSevenDays, lastThirtyDays, today})
      }
    })
    
    }

 
  componentDidMount = () => {
    this.init(this.match.params.userId)
  }

  clickDownloadCustomersButton=(e)=>{
      let csv='Customers Created By '+this.state.cyclists[0].createdBy.name+' as of '+new Date().toISOString().substring(0,10)+'\n'
      csv+='Created By User ID,Customer ID,First Name,Last Name,Email,Phone,Zip Code,Birth Date,Gender,Inseam,Foot Length,Torso,Arm,Height,Weight,Shoulders,Sit Bones,Flexibility,Riding Style,Preconditions,Created,Last Updated,Notes,\n'
      this.state.cyclists.forEach((cyclist)=>{
        const profile=cyclist.cyclistProfile
        const bm=cyclist.bodyMeasurements
        const ss=cyclist.softScores
      csv+=cyclist.createdBy._id+','+cyclist._id+','+
      profile.firstName+','+profile.lastName+','+profile.email+','+profile.phone+','+profile.zipCode+','+new Date(profile.birthDate).toISOString().substring(0,10)+','+profile.gender+','+
      bm.inseam+','+bm.footLength+','+bm.torso+','+bm.arm+','+bm.height+','+bm.weight+','+bm.shoulders+','+bm.sitBones+','+
      ss.flexibility+','+ss.ridingStyle+','+ss.preconditions+','+
      new Date(cyclist.created).toISOString().substring(0,10)+','+new Date(cyclist.updated).toISOString().substring(0,10)+',"'+cyclist.notes+'",\n'

        
      })
      console.log(csv)
      let hiddenElement = document.createElement('a');
      hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
      hiddenElement.target = '_blank';
      hiddenElement.download = 'customers.csv';
      hiddenElement.click();
    
  }

clickDownloadBikesButton=(e)=>{
    let csv='Bikes Created By '+this.state.cyclists[0].createdBy.name+' as of '+new Date().toISOString().substring(0,10)+'\n'
    csv+='Created By User ID,Owned By Customer ID,Bike ID,Make,Model,Type,Frame Size,FrameReach,FrameStack,Effective Top Tube,Seat Post Offset,Saddle Make,Saddle Model,Saddle With,Crank Length,Pedal Type,Pedal Make/Model,Stem Length,Stem Type,Stem Angle,Spacers Below,Spacers Above,Handlebar Width,Handlebar Reach,Shifter Type,Brake Type,Saddle Height, Saddle Height (Bottom Bracket),Saddle Setback,Saddle Angle,Saddle Nose To Bar Center,Saddle Nose To Hood Trough,Saddle To Bar Drop,Handlebar Reach (HX),Handlebar Stack (HY),Cleat Model,Shoe Brand,Shoe Model,Shoe Size,Insoles,Cleat Adjustments,Cleat Modifications,Bike Length,MTB Wheel Size,MTB Seat Post Type,MTB Saddle Nose To Grip End,MTB Saddle To Grip Center Drop/Rise,TT Basebar Width,TT Aerobar Type,TT Aerobar Make/Model,TT Extensions--Shape,TT Risers,TT Pads Make/Model,TT Saddle To Pad (center) Drop,TT Saddle Nose To Pad Rear,TT Saddle Nose To End of Extensions,TT Extensions Width At Clamps,TT Extensions Width At End,TT Extensions Angle,TT Pad Width,TT Pad X Reach (rear of pad),TT Pad X Reach (center of pad),TT Pad Y Stack (rear of pad),TT Basebar Reach (X),TT Basebar Stack (Y),Created,Last Updated,Notes,\n'

    this.state.bikes.forEach((bike)=>{
    console.log(bike.mtbSaddleNoseToGripEnd)

    csv+=bike.createdBy._id+','+bike.ownedBy+','+bike._id+','+
    bike.make+','+bike.model+','+bike.type+','+bike.frameSize+','+bike.frameReach+','+bike.frameStack+','+bike.effectiveTopTube+','+bike.seatPostOffset+','+
    bike.saddleMake+','+bike.saddleModel+','+bike.saddleWidth+','+bike.crankLength+','+bike.pedalType+','+bike.pedalMakeModel+','+bike.stemLength+','+
    bike.stemType+','+bike.stemAngle+','+bike.spacersBelow+','+bike.spacersAbove+','+bike.handlebarWidth+','+bike.handlebarReach+','+bike.shifterType+','+
    bike.brakeType+','+bike.saddleHeight+','+bike.saddleHeightBB+','+bike.saddleSetBack+','+bike.saddleAngle+','+bike.saddleNoseToBar+','+bike.saddleNoseToHood+','+
    bike.saddleToBarDrop+','+bike.handlebarReachHX+','+bike.handlebarStackHY+','+bike.cleatModel+','+bike.shoeBrand+','+bike.shoeModel+','+bike.shoeSize+','+
    bike.insoles+','+bike.cleatAdjustments+','+bike.cleatModifications+','+bike.bikeLength+','+bike.mtbWheelSize+','+bike.mtbSeatPostType+','+bike.mtbSaddleNoseToGripEnd+','+
    bike.mtbSaddleToGripCenterDropRise+','+bike.ttBasebarWidth+','+bike.ttAerobarType+','+bike.ttAerobarMakeModel+','+bike.ttExtensionsShape+','+bike.ttRisers+','+bike.ttPadsMakeModel+','+
    bike.ttSaddleToPadCenterDrop+','+bike.ttSaddleNoseToPadRear+','+bike.ttSaddleNoseToEndOfExtensions+','+bike.ttExtensionWidthAtClamps+','+bike.ttExtensionWidthAtEnd+','+bike.ttExtensionAngle+','+
    bike.ttPadWidth+','+bike.ttPadXReachRearOfPad+','+bike.ttPadXReachCenterOfPad+','+bike.ttPadYStackRearOfPad+','+bike.ttBasebarReachX+','+bike.ttBasebarStackY+','+
    new Date(bike.created).toISOString().substring(0,10)+','+new Date(bike.updated).toISOString().substring(0,10)+',"'+bike.notes+'",\n'

      
    })

    console.log(csv)
    let hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'bikes.csv';
    hiddenElement.click();
  
}

 render() {
 if(this.state.loadingBikes||this.state.loadingCyclists) return null
 
     const redirectToSignin = this.state.redirectToSignin
    if (redirectToSignin) {
      return <Redirect to='/signin'/>
    }
    return (
      <div className="globalCore">
       <div>
        <ListGroup>
          <ListGroupItem header={this.state.user.name}>{this.state.user.email}</ListGroupItem>
            <ListGroupItem>{"Joined: " + (new Date(this.state.user.created)).toDateString()}</ListGroupItem>
            <ListGroupItem>{"Current Service Level: " + this.state.user.service_level} </ListGroupItem>
         </ListGroup>

      </div>
      <Tabs defaultActiveKey={1}  id="controlled-tabs">
     <Tab eventKey={1} title="Stats">
     <Panel>
        <Panel.Body>
          <Label>Totals</Label>
         <ListGroup>
           <ListGroupItem><strong>Total Customers:             {this.state.cyclists.length}</strong></ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Male Customers:          {this.state.allTime.male}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Female Customers:        {this.state.allTime.female}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Non-Binary Customers:    {this.state.allTime.nonBinary}</ListGroupItem>
           <ListGroupItem><strong>Total Bikes:                 {this.state.allTime.bikes}</strong></ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Road Bikes:              {this.state.allTime.roadBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Mountain Bikes:          {this.state.allTime.mountainBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;TT/Tri Bikes:            {this.state.allTime.ttBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Gravel Bikes:            {this.state.allTime.gravelBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Cyclocross Bikes:        {this.state.allTime.cycloCrossBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Touring/Commuting Bikes: {this.state.allTime.touringBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Tandem Bikes:            {this.state.allTime.tandemBikes}</ListGroupItem>
         </ListGroup>
         <Label>Today</Label>
         <ListGroup>
           <ListGroupItem>New Customers:                       {this.state.today.newCustomers}</ListGroupItem>
           <ListGroupItem>Bikes created:                       {this.state.today.newBikes}</ListGroupItem>
           <ListGroupItem>Bikes updated:                       {this.state.today.bikes}</ListGroupItem>           
           <ListGroupItem>&nbsp;&nbsp;Road Bikes:              {this.state.today.roadBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Mountain Bikes:          {this.state.today.mountainBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;TT/Tri Bikes:            {this.state.today.ttBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Gravel Bikes:            {this.state.today.gravelBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Cyclocross Bikes:        {this.state.today.cycloCrossBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Touring/Commuting Bikes: {this.state.today.touringBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Tandem Bikes:            {this.state.today.tandemBikes}</ListGroupItem>
         </ListGroup>
         <Label>Last Seven Days</Label>
         <ListGroup>
           <ListGroupItem>New Customers:                       {this.state.lastSevenDays.newCustomers}</ListGroupItem>
           <ListGroupItem>Bikes created:                       {this.state.lastSevenDays.newBikes}</ListGroupItem>
           <ListGroupItem>Bikes updated:                       {this.state.lastSevenDays.bikes}</ListGroupItem>           
           <ListGroupItem>&nbsp;&nbsp;Road Bikes:              {this.state.lastSevenDays.roadBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Mountain Bikes:          {this.state.lastSevenDays.mountainBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;TT/Tri Bikes:            {this.state.lastSevenDays.ttBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Gravel Bikes:            {this.state.lastSevenDays.gravelBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Cyclocross Bikes:        {this.state.lastSevenDays.cycloCrossBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Touring/Commuting Bikes: {this.state.lastSevenDays.touringBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Tandem Bikes:            {this.state.lastSevenDays.tandemBikes}</ListGroupItem>
         </ListGroup>
         <Label>Last Thirty Days</Label>
         <ListGroup>
           <ListGroupItem>New Customers:                       {this.state.lastThirtyDays.newCustomers}</ListGroupItem>
           <ListGroupItem>Bikes created:                       {this.state.lastThirtyDays.newBikes}</ListGroupItem>
           <ListGroupItem>Bikes updated:                       {this.state.lastThirtyDays.bikes}</ListGroupItem>           
           <ListGroupItem>&nbsp;&nbsp;Road Bikes:              {this.state.lastThirtyDays.roadBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Mountain Bikes:          {this.state.lastThirtyDays.mountainBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;TT/Tri Bikes:            {this.state.lastThirtyDays.ttBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Gravel Bikes:            {this.state.lastThirtyDays.gravelBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Cyclocross Bikes:        {this.state.lastThirtyDays.cycloCrossBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Touring/Commuting Bikes: {this.state.lastThirtyDays.touringBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Tandem Bikes:            {this.state.lastThirtyDays.tandemBikes}</ListGroupItem>
         </ListGroup>
         <Label>Year To Date</Label>
         <ListGroup>
           <ListGroupItem>New Customers:                       {this.state.yearToDate.newCustomers}</ListGroupItem>
           <ListGroupItem>Bikes created:                       {this.state.yearToDate.newBikes}</ListGroupItem>
           <ListGroupItem>Bikes updated:                       {this.state.yearToDate.bikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Road Bikes:              {this.state.yearToDate.roadBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Mountain Bikes:          {this.state.yearToDate.mountainBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;TT/Tri Bikes:            {this.state.yearToDate.ttBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Gravel Bikes:            {this.state.yearToDate.gravelBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Cyclocross Bikes:        {this.state.yearToDate.cycloCrossBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Touring/Commuting Bikes: {this.state.yearToDate.touringBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Tandem Bikes:            {this.state.yearToDate.tandemBikes}</ListGroupItem>
         </ListGroup>
         </Panel.Body>
         </Panel>
     </Tab>
     <Tab eventKey={2} title={"Customers ("+this.state.cyclists.length+")"}>
     <Table striped bordered>
       <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Gender</th>
          <th>Age</th>
          <th>Bikes</th>
          <th>Created By</th>
          <th>Created</th>         
          <th>Last Updated</th>
        </tr>
        </thead>
        <tbody>
      {this.state.cyclists.map((item, i) => {return <CyclistRow userId={this.match.params.userId} bikes={this.state.bikes} cyclist={item} key={i} container={this} />})}
        </tbody>
        </Table>
     </Tab>
     <Tab eventKey={3} title={"Bikes ("+this.state.bikes.length+")"}>
     <Table striped bordered>
        <thead>
        <tr>
          <th>Cyclist</th>
          <th>Make</th>
          <th>Model</th>
          <th>Size</th>
          <th>Fits</th>
          <th>Created By</th>
          <th>Created</th>         
          <th>Last Updated</th>
        </tr>
        </thead>
        <tbody>
      {this.state.bikes.map((item, i) => {return <BikeRow cyclists={this.state.cyclists} bike={item} key={i} container={this} />})}
        </tbody>
        </Table>
     </Tab>
     <Tab eventKey={4} title="Export">
       <Panel>
         <Panel.Body>
       <ListGroup>
         <ListGroupItem>
          Download Customer Data as CSV file:<Button name="customerData" onClick={this.clickDownloadCustomersButton} bsStyle="link"><Glyphicon glyph="download-alt"/></Button>
         </ListGroupItem>
         <ListGroupItem>
          Download Bike Data as CSV file:<Button name="bikeData" onClick={this.clickDownloadBikesButton} bsStyle="link"><Glyphicon glyph="download-alt"/></Button>
         </ListGroupItem>
       </ListGroup>
       </Panel.Body>
       </Panel>
     </Tab>



     </Tabs>
      </div>
    )
  }
}


export default UserData