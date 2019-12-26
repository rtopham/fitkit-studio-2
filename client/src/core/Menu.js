import React from 'react'
import {Link} from 'react-router-dom'
import {Image, Navbar, Nav, NavItem} from "react-bootstrap"
import {LinkContainer} from "react-router-bootstrap"
import auth from './../auth/auth-helper'
import {withRouter} from 'react-router-dom'
import fksIcon from './../assets/fksicon.jpg'
import UserName from './UserName'
import {recordLogAction} from '../admin/api-admin'
import './Core.css'

const Menu = withRouter(({history}) => (

<Navbar fixedTop>
<div className="menuContainer">
<Navbar.Header>

<Image src={fksIcon} responsive className="logoImage pull-left" />
  <Navbar.Brand>
  
      <Link to="/">Fit Kit Studio</Link>
    </Navbar.Brand>
  </Navbar.Header>
 <Navbar.Text><UserName user={auth.isAuthenticated().user}/></Navbar.Text>


{/*
<Nav activeHref={history.location.pathname}>
  <NavItem href="/users">Users</NavItem>

</Nav>*/}
<Nav activeHref={history.location.pathname} pullRight>
  {
        !auth.isAuthenticated() && (
          <LinkContainer to={"/signup"}>
          <NavItem >Sign Up</NavItem>
          </LinkContainer>
        )
  }
    {     
        !auth.isAuthenticated() && (
          <LinkContainer to={"/signin"}>
          <NavItem>Sign In</NavItem>
          </LinkContainer>
          
          
        )
    }

{
        auth.isAuthenticated() && (
          <LinkContainer to="/quicksize">
          <NavItem>Quick Size</NavItem>
          </LinkContainer>
        )}
    {
        auth.isAuthenticated() && (
          <LinkContainer to={"/quickfit/"+auth.isAuthenticated().user._id}>
          <NavItem>Quick Fit</NavItem>
          </LinkContainer>
        ) 
        }
      
      {
/*         auth.isAuthenticated() && (
          <NavDropdown title = "Services" id="servicesDropDown">
          <LinkContainer to="/quicksize">
          <MenuItem>Quick Size</MenuItem>
          </LinkContainer>
          <LinkContainer to={"/quickfit/"+auth.isAuthenticated().user._id}>
          <MenuItem>Quick Fit</MenuItem>
          </LinkContainer>
          </NavDropdown>
        )  */
        }




       {
        auth.isAuthenticated() && (
          <LinkContainer to={"/user/account/" + auth.isAuthenticated().user._id}>
          <NavItem>My Account</NavItem>
          </LinkContainer>
        ) 
        }





        {auth.isAuthenticated() && (<NavItem eventKey={6} onClick={() => {
              const logData={userId:auth.isAuthenticated().user._id,action: "signed out", description: "User "+auth.isAuthenticated().user.name+" signed out."}
              recordLogAction(logData)
              auth.signout(() => history.push('/'))
            }}>Sign out</NavItem>)
        }
</Nav>
</div>
</Navbar>


))

export default Menu
