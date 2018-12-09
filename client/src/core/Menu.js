import React from 'react'
import {Image, Navbar, Nav, NavItem, NavDropdown, MenuItem} from "react-bootstrap"
import {LinkContainer} from "react-router-bootstrap"
import auth from './../auth/auth-helper'
import {withRouter} from 'react-router-dom'
import fksIcon from './../assets/fksicon.jpg'
import './Core.css'

const Menu = withRouter(({history}) => (
<Navbar fixedTop>
<div className="menuContainer">
<Navbar.Header>

<Image src={fksIcon} responsive className="logoImage pull-left" />
  <Navbar.Brand>
  
      <a href="/">Fit Kit Studio</a>
    </Navbar.Brand>
  </Navbar.Header>
{/*
<Nav activeHref={history.location.pathname}>
  <NavItem href="/users">Users</NavItem>

</Nav>*/}
<Nav activeHref={history.location.pathname} pullRight>
  {
        !auth.isAuthenticated() && (
          <NavItem href="/signup">Sign Up</NavItem>
        )
  }
    {     
        !auth.isAuthenticated() && (
          <NavItem href="/signin">Sign In</NavItem>
          
        )
    }
      
      {
        auth.isAuthenticated() && (
          <NavDropdown title = "Sizing" id="sizingDropDown">
          <LinkContainer to="/quicksize">
          <MenuItem>Quick Size</MenuItem>
          </LinkContainer>
          <MenuItem href={"/quicksizeplus"}>Quick Size Plus</MenuItem>
          </NavDropdown>
        ) 
        }




       {
        auth.isAuthenticated() && (
          <NavItem href={"/user/account/" + auth.isAuthenticated().user._id}>My Account</NavItem>

        ) 
        }





        {auth.isAuthenticated() && (<NavItem eventKey={6} onClick={() => {
              auth.signout(() => history.push('/'))
            }}>Sign out</NavItem>)
        }
</Nav>
</div>
</Navbar>


))

export default Menu
