import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import {Image} from 'react-bootstrap'
import Home from './core/Home'
import PrivacyPolicy from './core/PrivacyPolicy'
//import Users from './user/Users'
import Signup from './user/Signup'
import Signin from './auth/Signin'
import EditAccount from './user/EditAccount'
import Profile from './user/Profile'
import PrivateRoute from './auth/PrivateRoute'
import Menu from './core/Menu'
import QuickSize from './quicksize/QuickSize'
import QuickSizePlus from './quicksize/QuickSizePlus'
import CreateNewCyclist from './cyclist/CreateNewCyclist'
import EditCyclist from './cyclist/EditCyclist'
import LoadCyclist from './cyclist/LoadCyclist'
import fksIcon from './assets/fksicon.jpg'

class MainRouter extends Component {

  render() {
    return (<div>
     <Menu/>
      <Switch>
        <Route exact path="/" component={Home}/>
{/*        <Route path="/users" component={Users}/>*/}
        <Route path="/privacy-policy" component={PrivacyPolicy}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/signin" component={Signin}/>
        <PrivateRoute path="/quicksize" component={QuickSize}/>   
        <PrivateRoute path="/user/account/:userId" component={EditAccount}/>
        <PrivateRoute path="/quicksize-plus/:userId/new" component={CreateNewCyclist}/>
        <PrivateRoute path="/quicksize-plus/:userId/load" component={LoadCyclist}/>
        <PrivateRoute path="/quicksize-plus/:userId/:cyclistId" component={EditCyclist}/>   
        <PrivateRoute path="/quicksize-plus/:userId" component={QuickSizePlus}/> 
        <Route path="/user/:userId" component={Profile}/>

      </Switch>
      <hr></hr>
      <div className="centerthis"><Image src={fksIcon} className="footerLogoImage" />&copy; {(new Date()).getFullYear()} 
      <a href="https://fitkitsystems.com"> Fit Kit Systems</a>  · All Rights Reserved · <a href="/privacy-policy">Privacy Policy</a>  </div>
      <hr></hr>
    </div>)
  }
}

export default MainRouter
