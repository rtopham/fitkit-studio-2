import React, { Component } from 'react'
import {Panel, Button, ButtonToolbar} from "react-bootstrap"
import {LinkContainer} from "react-router-bootstrap"
import {Redirect} from "react-router-dom"
import {readStripeSubscription} from './../subscription/api-stripe'
import auth from './../auth/auth-helper'
import './QuickSize.css'

class QuickSizePlus extends Component {
  constructor({match}) {
    super()
this.state={
  loading:true,
  stripeSubscription:{},
  redirectToCancelationNotice:false
}

this.match = match
  }

componentDidMount=()=>{

  let jwt = auth.isAuthenticated()
  readStripeSubscription({
    userId: jwt.user._id
  }, {t: jwt.token}).then((data) => {
    if (data.error) {
      this.setState({error:data.error})

    } else {
      this.setState({stripeSubscription: data,loading:false})
      if(data.status==="canceled") this.setState({loading: false, stripeSubscription:data, redirectToCancelationNotice:true})
      else 
      this.setState({stripeSubscription: data, loading:false})
//      console.log(data)
    }
  })
}

  render() {
//if(this.state.loading) return null
if(this.state.redirectToCancelationNotice) return(<Redirect to={{pathname: `/user/account/cancelationnotice/${auth.isAuthenticated().user._id}`}}/>)
    return (
      <div className="globalCore">
    <Panel>
      <Panel.Heading>
        <Panel.Title>Quick Fit</Panel.Title>
      </Panel.Heading>
      <Panel.Body className="qs-toolbar" >
 <ButtonToolbar>
      <LinkContainer to={"/quicksize-plus/"+this.match.params.userId+"/load"}>
      <Button>Retrieve Cyclist</Button>
      </LinkContainer>
      {' '}
      <LinkContainer to ={"/quicksize-plus/"+this.match.params.userId+"/new"}>
      <Button onClick={this.clickNewCyclist}>New Cyclist</Button>
      </LinkContainer>
</ButtonToolbar>
      </Panel.Body>
    </Panel>
      </div>
      
    )
  }
}

export default QuickSizePlus;  