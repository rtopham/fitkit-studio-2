import React, {Component} from 'react'
import {Route, Link, Switch} from 'react-router-dom'
import {Image} from 'react-bootstrap'
import Home from './core/Home'
import PrivacyPolicy from './core/PrivacyPolicy'
import TermsOfUse from './core/TermsOfUse'
import UpgradeNotice from './user/UpgradeNotice'
import CancelationNotice from './user/CancelationNotice'
import Signup from './user/Signup'
import Signin from './auth/Signin'
import PasswordResetRequest from './auth/PasswordResetRequest'
import ResetPassword from './auth/ResetPassword'
import EditAccount from './user/EditAccount'
import Profile from './user/Profile'
import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute'
import PaidRoute from './auth/PaidRoute'
import Menu from './core/Menu'
import QuickSize from './quicksize/QuickSize'
import QuickSizePlus from './quicksize/QuickSizePlus'
import CreateNewCyclist from './cyclist/CreateNewCyclist'
import EditCyclist from './cyclist/EditCyclist'
import ListCyclists from './cyclist/ListCyclists'
import fksIcon from './assets/fksicon.jpg'
import AdminDashboard from './admin/AdminDashBoard'
import Unauthorized from './admin/Unauthorized'
import Error from './admin/Error'
import Contact from './admin/Contact' 


class MainRouter extends Component { 

  render() {
    return (<div>
     <Menu/>
      <Switch>
        <Route exact path="/" component={Home}/>
{/*        <Route path="/users" component={Users}/>*/}
        <Route path="/privacy-policy" component={PrivacyPolicy}/>
        <Route path="/terms-of-use" component={TermsOfUse}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/signin" component={Signin}/>
        <Route path="/contact" component={Contact}/>
        <Route path="/password-reset-request" component={PasswordResetRequest}/>
        <Route path="/reset-password/:token" component={ResetPassword}/>
        <PrivateRoute path="/quicksize" component={QuickSize}/>   
        <PrivateRoute path="/user/account/upgradenotice/:userId" component={UpgradeNotice}/>
        <PrivateRoute path="/user/account/cancelationnotice/:userId" component={CancelationNotice}/>
        <PrivateRoute path="/user/account/:userId" component={EditAccount}/>
        <PaidRoute path="/quicksize-plus/:userId/new" component={CreateNewCyclist}/>
        <PaidRoute path="/quicksize-plus/:userId/load" component={ListCyclists}/>
        <PaidRoute path="/quicksize-plus/:userId/:cyclistId" component={EditCyclist}/>   
        <PaidRoute path="/quicksize-plus/:userId" component={QuickSizePlus}/> 
        <Route path ="/admin/error" component={Unauthorized}/>
        <AdminRoute path="/admin/:userId" component={AdminDashboard}/>
        <Route path="/user/:userId" component={Profile}/>
        <Route component={Error}/>

      </Switch>
      <hr></hr>
      <div className="centerthis"><Image src={fksIcon} className="footerLogoImage" />&copy; {(new Date()).getFullYear()} 
      <a href ="https://fitkitsystems.com"> Fit Kit Systems</a>  · All Rights Reserved · <Link to= "privacy-policy"> Privacy Policy</Link> ·
      <Link to="/terms-of-use"> Terms of Use</Link>
        </div>
      <hr></hr>
    </div>)
  }
}

export default MainRouter
