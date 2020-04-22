import React, {Component} from 'react'
import {Label, Tabs, Tab, Table, Panel, Button, ListGroup, Glyphicon, ListGroupItem} from "react-bootstrap"
import auth from '../auth/auth-helper'
import {read} from '../user/api-user.js'
import {listByUser,countCustomersByUser,downloadCustomersCSV} from '../cyclist/api-cyclist'
import {listByUser as listBikesByUser, countBikesByUser}  from '../bike/api-bike'
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
      customerData:{},
      bikeData:{},
      loadingUsers:true,
      loadingUserStats:true,
      loadingBikes:true,
      loadingCyclists:true,
      customerLimit:100,
      customerOffset:0,
      bikeLimit:100,
      bikeOffset:0,
      customersCSV:[],
      bikesCSV:[],
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
        this.loadUserStats(userId,jwt)
        this.loadCyclistData(userId,jwt)
        this.loadBikeData(userId, jwt)
      }
    })
  }

loadUserStats=(userId,jwt)=>{
  countCustomersByUser(
    {userId:userId},
    {t:jwt.token}
    ).then((data)=>{
      if(data.error) console.log(data.error)
      else{

      this.setState({customerData:data})
      }
  })
  countBikesByUser(
    {userId:userId},
    {t:jwt.token}
    ).then((data)=>{
    if(data.error)console.log(data.error)
    else{

      this.setState({bikeData:data,loadingUserStats:false})
    }
  })  
}

loadCyclistData=(userId, jwt)=>{
 
    listByUser({
      userId: userId,
      search: `?limit=${this.state.customerLimit}&offset=${this.state.customerOffset}`
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
       this.setState({cyclists:data, loadingCyclists:false})
        }
    })
  }



loadBikeData=(UserId, jwt)=>{


    listBikesByUser({
      userId:UserId,
      search: `?limit=${this.state.bikeLimit}&offset=${this.state.bikeOffset}`
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({bikes:data, loadingBikes:false})
      }
    })
    
 }

    oldloadBikeData=(UserId, jwt)=>{


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


clickDownloadCustomersButton=()=>{
  const jwt=auth.isAuthenticated()
  downloadCustomersCSV({
    userId: this.match.params.userId
//    search: `?limit=${this.state.customerLimit}&offset=${this.state.customerOffset}`
  }, {t: jwt.token}).then((data) => {
    if (data.error) {
      console.log(data)
      this.setState({error: data.error})
    } else {
//      console.log(data)
      let cyclists=data
      let csv='Customers Created By '+this.state.cyclists[0].createdBy.name+' as of '+new Date().toISOString().substring(0,10)+'\n'
      csv+='Created By User ID,Customer ID,First Name,Last Name,Email,Phone,Zip Code,Birth Date,Gender,Inseam,Foot Length,Torso,Arm,Height,Weight,Shoulders,Sit Bones,Flexibility,Riding Style,Preconditions,Created,Last Updated,Notes,Confidential Notes\n'
      cyclists.forEach((cyclist)=>{
        const profile=cyclist.cyclistProfile
        const bm=cyclist.bodyMeasurements
        const ss=cyclist.softScores
      csv+=cyclist.createdBy+','+cyclist._id+','+
      profile.firstName+','+profile.lastName+','+profile.email+','+profile.phone+','+profile.zipCode+','+new Date(profile.birthDate).toISOString().substring(0,10)+','+profile.gender+','+
      bm.inseam+','+bm.footLength+','+bm.torso+','+bm.arm+','+bm.height+','+bm.weight+','+bm.shoulders+','+bm.sitBones+','+
      ss.flexibility+','+ss.ridingStyle+','+ss.preconditions+','+
      new Date(cyclist.created).toISOString().substring(0,10)+','+new Date(cyclist.updated).toISOString().substring(0,10)+',"'+cyclist.notes+'","'+cyclist.confidentialNotes+'",\n'

    })//end forEach

      let hiddenElement = document.createElement('a')
      hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
      hiddenElement.target = '_blank';
      hiddenElement.download = 'customers-'+new Date().toISOString().substring(0,10)+'.csv'
      hiddenElement.click();

  }//end else
  })//end then
  }//end function

clickDownloadBikesButton=()=>{
  const jwt=auth.isAuthenticated()
  listBikesByUser({
    userId:this.match.params.userId,
    search: ''
  }, {t: jwt.token}).then((data) => {
    if (data.error) {
      this.setState({error: data.error})
    } else {
      let bikes=data

    let csv='Bikes Created By '+this.state.cyclists[0].createdBy.name+' as of '+new Date().toISOString().substring(0,10)+'\n'
    csv+='Created By User ID,Owned By Customer ID,Bike ID,Make,Model,Type,Frame Size,FrameReach,FrameStack,Effective Top Tube,Seat Post Offset,Saddle Make,Saddle Model,Saddle With,Crank Length,Pedal Type,Pedal Make/Model,Stem Length,Stem Type,Stem Angle,Spacers Below,Spacers Above,Handlebar Width,Handlebar Reach,Shifter Type,Brake Type,Saddle Height, Saddle Height (Bottom Bracket),Saddle Setback,Saddle Angle,Saddle Nose To Bar Center,Saddle Nose To Hood Trough,Saddle To Bar Drop,Handlebar Reach (HX),Handlebar Stack (HY),Handlebar Angle,Hood Angle,Cleat Model,Shoe Brand,Shoe Model,Shoe Size,Insoles,Cleat Adjustments,Foot/Pedal Notes,Bike Length,MTB Wheel Size,MTB Seat Post Type,MTB Saddle Nose To Grip End,MTB Saddle To Grip Center Drop/Rise,TT Basebar Width,TT Aerobar Type,TT Aerobar Make/Model,TT Extensions--Shape,TT Risers,TT Pads Make/Model,TT Saddle To Pad (center) Drop,TT Saddle Nose To Pad Rear,TT Saddle Nose To End of Extensions,TT Extensions Width At Clamps,TT Extensions Width At End,TT Extensions Angle,TT Pad Width,TT Pad X Reach (rear of pad),TT Pad X Reach (center of pad),TT Pad Y Stack (rear of pad),TT Basebar Reach (X),TT Basebar Stack (Y),TT Basebar Angle,Created,Last Updated,Notes,Confidential Notes\n'

    bikes.forEach((bike)=>{


    csv+=bike.createdBy._id+','+bike.ownedBy+','+bike._id+','+
    bike.make+','+bike.model+','+bike.type+','+bike.frameSize+','+bike.frameReach+','+bike.frameStack+','+bike.effectiveTopTube+','+bike.seatPostOffset+','+
    bike.saddleMake+','+bike.saddleModel+','+bike.saddleWidth+','+bike.crankLength+','+bike.pedalType+','+bike.pedalMakeModel+','+bike.stemLength+','+
    bike.stemType+','+bike.stemAngle+','+bike.spacersBelow+','+bike.spacersAbove+','+bike.handlebarWidth+','+bike.handlebarReach+','+bike.shifterType+','+
    bike.brakeType+','+bike.saddleHeight+','+bike.saddleHeightBB+','+bike.saddleSetBack+','+bike.saddleAngle+','+bike.saddleNoseToBar+','+bike.saddleNoseToHood+','+
    bike.saddleToBarDrop+','+bike.handlebarReachHX+','+bike.handlebarStackHY+','+bike.handlebarAngle+','+bike.hoodAngle+','+bike.cleatModel+','+bike.shoeBrand+','+bike.shoeModel+','+bike.shoeSize+','+
    bike.insoles+',"'+bike.cleatAdjustments+'","'+bike.cleatModifications+'",'+bike.bikeLength+','+bike.mtbWheelSize+','+bike.mtbSeatPostType+','+bike.mtbSaddleNoseToGripEnd+','+
    bike.mtbSaddleToGripCenterDropRise+','+bike.ttBasebarWidth+','+bike.ttAerobarType+','+bike.ttAerobarMakeModel+','+bike.ttExtensionsShape+','+bike.ttRisers+','+bike.ttPadsMakeModel+','+
    bike.ttSaddleToPadCenterDrop+','+bike.ttSaddleNoseToPadRear+','+bike.ttSaddleNoseToEndOfExtensions+','+bike.ttExtensionWidthAtClamps+','+bike.ttExtensionWidthAtEnd+','+bike.ttExtensionAngle+','+
    bike.ttPadWidth+','+bike.ttPadXReachRearOfPad+','+bike.ttPadXReachCenterOfPad+','+bike.ttPadYStackRearOfPad+','+bike.ttBasebarReachX+','+bike.ttBasebarStackY+','+
    bike.ttBasebarAngle+','+new Date(bike.created).toISOString().substring(0,10)+','+new Date(bike.updated).toISOString().substring(0,10)+',"'+bike.notes+'","'+bike.confidentialNotes+'",\n'

      
    })


    let hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'bikes-'+new Date().toISOString().substring(0,10)+'.csv';
    hiddenElement.click();
  }//end else
})//end then
}//end function



customerNextPage=()=>{
const jwt=auth.isAuthenticated()
  listByUser({
    userId: this.match.params.userId,
    search: `?limit=${this.state.customerLimit}&offset=${this.state.customerOffset+this.state.customerLimit}`
  }, {t: jwt.token}).then((data) => {
    if (data.error) {
      this.setState({error: data.error})
    } else {
     this.setState({cyclists:data, loadingCyclists:false})
      }
  })
  this.setState({customerOffset:this.state.customerOffset+this.state.customerLimit})
}

customerPreviousPage=()=>{

  const jwt=auth.isAuthenticated()
    listByUser({
      userId: this.match.params.userId,
      search: `?limit=${this.state.customerLimit}&offset=${this.state.customerOffset-this.state.customerLimit}`
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
       this.setState({cyclists:data, loadingCyclists:false})
        }
    })
    this.setState({customerOffset:this.state.customerOffset-this.state.customerLimit})
  }

  bikeNextPage=()=>{
    const jwt=auth.isAuthenticated()
      listBikesByUser({
        userId: this.match.params.userId,
        search: `?limit=${this.state.bikeLimit}&offset=${this.state.bikeOffset+this.state.bikeLimit}`
      }, {t: jwt.token}).then((data) => {
        if (data.error) {
          this.setState({error: data.error})
        } else {
         this.setState({bikes:data, loadingBikes:false})
          }
      })
      this.setState({bikeOffset:this.state.bikeOffset+this.state.bikeLimit})
    }

    bikePreviousPage=()=>{
      const jwt=auth.isAuthenticated()
        listBikesByUser({
          userId: this.match.params.userId,
          search: `?limit=${this.state.bikeLimit}&offset=${this.state.bikeOffset-this.state.bikeLimit}`
        }, {t: jwt.token}).then((data) => {
          if (data.error) {
            this.setState({error: data.error})
          } else {
           this.setState({bikes:data, loadingBikes:false})
            }
        })
        this.setState({bikeOffset:this.state.bikeOffset-this.state.bikeLimit})
      }

 render() {
 if(this.state.loadingBikes||this.state.loadingCyclists||this.state.loadingUserStats) return null
 
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
           <ListGroupItem><strong>Total Customers:             {this.state.customerData.totalCustomers}</strong></ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Male Customers:          {this.state.customerData.maleCustomers}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Female Customers:        {this.state.customerData.femaleCustomers}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Non-Binary Customers:    {this.state.customerData.nonBinaryCustomers}</ListGroupItem>
           <ListGroupItem><strong>Total Bikes:                 {this.state.bikeData.totalBikes}</strong></ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Road Bikes:              {this.state.bikeData.roadBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Mountain Bikes:          {this.state.bikeData.mountainBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;TT/Tri Bikes:            {this.state.bikeData.ttBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Gravel Bikes:            {this.state.bikeData.gravelBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Cyclocross Bikes:        {this.state.bikeData.cycloCrossBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Touring/Commuting Bikes: {this.state.bikeData.touringBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Tandem Bikes:            {this.state.bikeData.tandemBikes}</ListGroupItem>
         </ListGroup>
         <Label>Today</Label>
         <ListGroup>
           <ListGroupItem>New Customers:                       {this.state.customerData.newCustomers.today}</ListGroupItem>
           <ListGroupItem>Bikes created:                       {this.state.bikeData.bikesCreated.today.total}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Road Bikes:              {this.state.bikeData.bikesCreated.today.roadBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Mountain Bikes:          {this.state.bikeData.bikesCreated.today.mountainBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;TT/Tri Bikes:            {this.state.bikeData.bikesCreated.today.ttBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Gravel Bikes:            {this.state.bikeData.bikesCreated.today.gravelBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Cyclocross Bikes:        {this.state.bikeData.bikesCreated.today.cycloCrossBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Touring/Commuting Bikes: {this.state.bikeData.bikesCreated.today.touringBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Tandem Bikes:            {this.state.bikeData.bikesCreated.today.tandemBikes}</ListGroupItem>
           <ListGroupItem>Bikes updated:                       {this.state.bikeData.bikesUpdated.today.total}</ListGroupItem>           
           <ListGroupItem>&nbsp;&nbsp;Road Bikes:              {this.state.bikeData.bikesUpdated.today.roadBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Mountain Bikes:          {this.state.bikeData.bikesUpdated.today.mountainBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;TT/Tri Bikes:            {this.state.bikeData.bikesUpdated.today.ttBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Gravel Bikes:            {this.state.bikeData.bikesUpdated.today.gravelBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Cyclocross Bikes:        {this.state.bikeData.bikesUpdated.today.cycloCrossBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Touring/Commuting Bikes: {this.state.bikeData.bikesUpdated.today.touringBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Tandem Bikes:            {this.state.bikeData.bikesUpdated.today.tandemBikes}</ListGroupItem>
         </ListGroup>
         <Label>Last Seven Days</Label>
         <ListGroup>
           <ListGroupItem>New Customers:                       {this.state.customerData.newCustomers.lastSevenDays}</ListGroupItem>
           <ListGroupItem>Bikes created:                       {this.state.bikeData.bikesCreated.lastSevenDays.total}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Road Bikes:              {this.state.bikeData.bikesCreated.lastSevenDays.roadBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Mountain Bikes:          {this.state.bikeData.bikesCreated.lastSevenDays.mountainBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;TT/Tri Bikes:            {this.state.bikeData.bikesCreated.lastSevenDays.ttBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Gravel Bikes:            {this.state.bikeData.bikesCreated.lastSevenDays.gravelBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Cyclocross Bikes:        {this.state.bikeData.bikesCreated.lastSevenDays.cycloCrossBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Touring/Commuting Bikes: {this.state.bikeData.bikesCreated.lastSevenDays.touringBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Tandem Bikes:            {this.state.bikeData.bikesCreated.lastSevenDays.tandemBikes}</ListGroupItem>
           <ListGroupItem>Bikes updated:                       {this.state.bikeData.bikesUpdated.lastSevenDays.total}</ListGroupItem>           
           <ListGroupItem>&nbsp;&nbsp;Road Bikes:              {this.state.bikeData.bikesUpdated.lastSevenDays.roadBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Mountain Bikes:          {this.state.bikeData.bikesUpdated.lastSevenDays.mountainBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;TT/Tri Bikes:            {this.state.bikeData.bikesUpdated.lastSevenDays.ttBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Gravel Bikes:            {this.state.bikeData.bikesUpdated.lastSevenDays.gravelBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Cyclocross Bikes:        {this.state.bikeData.bikesUpdated.lastSevenDays.cycloCrossBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Touring/Commuting Bikes: {this.state.bikeData.bikesUpdated.lastSevenDays.touringBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Tandem Bikes:            {this.state.bikeData.bikesUpdated.lastSevenDays.tandemBikes}</ListGroupItem>
         </ListGroup>
         <Label>Last Thirty Days</Label>
         <ListGroup>
           <ListGroupItem>New Customers:                       {this.state.customerData.newCustomers.lastThirtyDays}</ListGroupItem>
           <ListGroupItem>Bikes created:                       {this.state.bikeData.bikesCreated.lastThirtyDays.total}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Road Bikes:              {this.state.bikeData.bikesCreated.lastThirtyDays.roadBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Mountain Bikes:          {this.state.bikeData.bikesCreated.lastThirtyDays.mountainBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;TT/Tri Bikes:            {this.state.bikeData.bikesCreated.lastThirtyDays.ttBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Gravel Bikes:            {this.state.bikeData.bikesCreated.lastThirtyDays.gravelBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Cyclocross Bikes:        {this.state.bikeData.bikesCreated.lastThirtyDays.cycloCrossBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Touring/Commuting Bikes: {this.state.bikeData.bikesCreated.lastThirtyDays.touringBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Tandem Bikes:            {this.state.bikeData.bikesCreated.lastThirtyDays.tandemBikes}</ListGroupItem>
           <ListGroupItem>Bikes updated:                       {this.state.bikeData.bikesUpdated.lastThirtyDays.total}</ListGroupItem>           
           <ListGroupItem>&nbsp;&nbsp;Road Bikes:              {this.state.bikeData.bikesUpdated.lastThirtyDays.roadBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Mountain Bikes:          {this.state.bikeData.bikesUpdated.lastThirtyDays.mountainBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;TT/Tri Bikes:            {this.state.bikeData.bikesUpdated.lastThirtyDays.ttBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Gravel Bikes:            {this.state.bikeData.bikesUpdated.lastThirtyDays.gravelBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Cyclocross Bikes:        {this.state.bikeData.bikesUpdated.lastThirtyDays.cycloCrossBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Touring/Commuting Bikes: {this.state.bikeData.bikesUpdated.lastThirtyDays.touringBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Tandem Bikes:            {this.state.bikeData.bikesUpdated.lastThirtyDays.tandemBikes}</ListGroupItem>
         </ListGroup>
         <Label>Year To Date</Label>
         <ListGroup>
           <ListGroupItem>New Customers:                       {this.state.customerData.newCustomers.yearToDate}</ListGroupItem>
           <ListGroupItem>Bikes created:                       {this.state.bikeData.bikesCreated.yearToDate.total}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Road Bikes:              {this.state.bikeData.bikesCreated.yearToDate.roadBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Mountain Bikes:          {this.state.bikeData.bikesCreated.yearToDate.mountainBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;TT/Tri Bikes:            {this.state.bikeData.bikesCreated.yearToDate.ttBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Gravel Bikes:            {this.state.bikeData.bikesCreated.yearToDate.gravelBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Cyclocross Bikes:        {this.state.bikeData.bikesCreated.yearToDate.cycloCrossBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Touring/Commuting Bikes: {this.state.bikeData.bikesCreated.yearToDate.touringBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Tandem Bikes:            {this.state.bikeData.bikesCreated.yearToDate.tandemBikes}</ListGroupItem>
           <ListGroupItem>Bikes updated:                       {this.state.bikeData.bikesUpdated.yearToDate.total}</ListGroupItem>           
           <ListGroupItem>&nbsp;&nbsp;Road Bikes:              {this.state.bikeData.bikesUpdated.yearToDate.roadBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Mountain Bikes:          {this.state.bikeData.bikesUpdated.yearToDate.mountainBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;TT/Tri Bikes:            {this.state.bikeData.bikesUpdated.yearToDate.ttBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Gravel Bikes:            {this.state.bikeData.bikesUpdated.yearToDate.gravelBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Cyclocross Bikes:        {this.state.bikeData.bikesUpdated.yearToDate.cycloCrossBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Touring/Commuting Bikes: {this.state.bikeData.bikesUpdated.yearToDate.touringBikes}</ListGroupItem>
           <ListGroupItem>&nbsp;&nbsp;Tandem Bikes:            {this.state.bikeData.bikesUpdated.yearToDate.tandemBikes}</ListGroupItem>
         </ListGroup>
         </Panel.Body>
         </Panel>
     </Tab>
     <Tab eventKey={2} title={"Customers ("+this.state.customerData.totalCustomers+")"}>
     <div style={{clear: 'both'}}>
     <div style={{marginTop:'5px'}} className="pull-left">Customers {this.state.customerOffset+1}-{this.state.customerOffset+this.state.cyclists.length} of {this.state.customerData.totalCustomers}</div>
    
    <div className="pull-right">
     {this.state.customerOffset!==0&&<Button bsStyle="link" onClick={this.customerPreviousPage}>Previous {this.state.customerLimit}</Button>}
     {this.state.customerOffset+this.state.customerLimit<this.state.customerData.totalCustomers&&<Button bsStyle="link" onClick={this.customerNextPage}>Next {this.state.customerLimit}</Button>}
     </div>
     </div>
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
     <Tab eventKey={3} title={"Bikes ("+this.state.bikeData.totalBikes+")"}>
     <div style={{clear: 'both'}}>
     <div style={{marginTop:'5px'}} className="pull-left">Bikes {this.state.bikeOffset+1}-{this.state.bikeOffset+this.state.bikes.length} of {this.state.bikeData.totalBikes}</div>
    
    <div className="pull-right">
     {this.state.bikeOffset!==0&&<Button bsStyle="link" onClick={this.bikePreviousPage}>Previous {this.state.bikeLimit}</Button>}
     {this.state.bikeOffset+this.state.bikeLimit<this.state.bikeData.totalBikes&&<Button bsStyle="link" onClick={this.bikeNextPage}>Next {this.state.bikeLimit}</Button>}
     </div>
     </div>
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
          Download Customer Data as CSV file:&nbsp;&nbsp;<Button name="customerData" onClick={this.clickDownloadCustomersButton} bsStyle="link"><Glyphicon glyph="download-alt"/></Button>
         </ListGroupItem>
         <ListGroupItem>
          Download Bike Data as CSV file:&nbsp;&nbsp;<Button name="bikeData" onClick={this.clickDownloadBikesButton} bsStyle="link"><Glyphicon glyph="download-alt"/></Button>
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