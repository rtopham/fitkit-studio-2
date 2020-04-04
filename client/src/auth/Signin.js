import React, {Component} from 'react'
import {Panel, Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap"
import {validatePassword, validateEmail} from '../lib/form-validation'
import auth from './auth-helper'
import {Redirect, Link} from 'react-router-dom'
import {signin} from './api-auth.js'
import {readStripeSubscription} from './../subscription/api-stripe'
import {recordLogAction} from '../admin/api-admin'
import "./Signin.css";

class Signin extends Component {
  state = {
      email: '',
      password: '',
      error: '',
      redirectToReferrer: false
  }

validateForm=()=> {
    return (
      validateEmail(this.state.email)==='success'&&
      validatePassword(this.state.password)==='success'
    );
  }  

  clickSubmit = (e) => {
   e.preventDefault()
    const user = {
      email: this.state.email || undefined,
      password: this.state.password || undefined
    }
    let admin=false
    
    signin(user).then((data) => {
      if (data.error) {
        this.setState({error: data.error})

      } else {
//        console.log(data)
        if(data.user.admin) admin=true
        auth.authenticate(data, () => {
          this.setState({redirectToReferrer: true})
          const logData={userId:data.user._id,action: "signed in", description: "User "+data.user.name+" signed in."}
          recordLogAction(logData)
          
        })
     
      }
      return data
    })
    .then((userData)=>{
if(!userData.error){
      if(userData.user.stripe_subscription_id){
      readStripeSubscription({userId: userData.user._id}, {t: userData.token})
      .then((data) => {
          if (data.error) {
          this.setState({error:data.error})
           } else {
//             console.log(data)
             if(data.status==="active"||data.status==="trialing") auth.storeFKSObject({qsp:{status:"valid"}},admin)

        }
      })
    }else{ 

      auth.storeFKSObject({qsp:{status:"invalid"}},admin)
    }
  }
      })
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  render() {

    const {from} = this.props.location.state || {
      from: {
        pathname: '/'
      }
    }
    const {redirectToReferrer} = this.state
    if (redirectToReferrer) {
      return (<Redirect to={from}/>)
    }

    let ErrorPanel=''
    if (this.state.error) ErrorPanel = (<Panel.Footer className="centerthis"><span className="glyphicon glyphicon-exclamation-sign"></span> <span>{this.state.error}</span></Panel.Footer>); else ErrorPanel=null

  return (

      <div className="Signin">
      <Panel>
        <Panel.Heading>Sign In</Panel.Heading>
      <form onSubmit={this.clickSubmit}>
        <FormGroup controlId="email" bsSize="large" validationState={validateEmail(this.state.email)}>
          <ControlLabel>Email</ControlLabel>
          <FormControl
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large" validationState={validatePassword(this.state.password)}>
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
         
          
        <Button
          block
          type="submit"
          bsSize="large"
          disabled={!this.validateForm()}>
          Sign In
          </Button>
      </form>
      <div className="centerthis">
      <Link to="/password-reset-request">Lost your password?</Link>
      <p></p>
      </div>
      {ErrorPanel}

      </Panel>



                                  
      
</div>
    )
  }
}

export default Signin
