import React, {Component} from 'react'
import {Form, Grid, Col, Row, Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap"
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
      redirect: false,
      redirectPath:'',
      signedIn: false,
      active: false,
      userId: null
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
          this.setState({redirect: true, signedIn:true, userId: data.user._id})
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
             if(data.status==="active"||data.status==="trialing") {
                auth.storeFKSObject({qsp:{status:"valid"}},admin)
                this.setState({active:true, redirectPath:"/quickfit/"+userData.user._id})
             } else this.setState({redirectPath:"/quicksize"})
        }
      })
    }else{ 

      this.setState({redirectPath:"/quicksize"})
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

/*     const {from} = this.props.location.state || {
      from: {
        pathname: '/'
      }
    } */



if (this.state.redirect&&this.state.redirectPath!=="") {
      
      return (<Redirect to={this.state.redirectPath}/>)
    }

    let SignInError=(<div>&nbsp;</div>)
    if (this.state.error) SignInError = (<div><span className="glyphicon glyphicon-exclamation-sign"></span> <span>{this.state.error}</span></div>)

  return (

      <div className="homeSigninContainer">
        <Grid>
 <div className="homeSigninComponentContainer">
<Row>
      <Form onSubmit={this.clickSubmit}>
        <Col xs={12} sm={4}>
      <div className="homeSigninColumn">
        <FormGroup controlId="email" validationState={validateEmail(this.state.email)}>
          <ControlLabel>Email</ControlLabel>
          <FormControl
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </FormGroup>
        </div>
        </Col>
        <Col xs={12} sm={4}>
        <div className="homeSigninColumn">
        <FormGroup controlId="password" validationState={validatePassword(this.state.password)}>
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
          />

        </FormGroup>
         </div>
         </Col>
         <Col xs={12} sm={4}>
         <div className="homeSigninColumn"> 
        <FormGroup >
        <Button
          className="homeSigninButton"
          block
          type="submit"
          bsSize="small"
          disabled={!this.validateForm()}>
          Sign In
          </Button>
          

          </FormGroup>
          </div>
          </Col>
      </Form>
      </Row>
            

 
      <div className=" centerthis homeSigninPasswordLink">{SignInError}<Link to="/password-reset-request">Lost your password?</Link></div>        

</div>

</Grid>
</div>
    )
  }
}

export default Signin
