import React from 'react'
import {Route, Switch} from 'react-router-dom'
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
import Footer from './core/Footer'
import PreFitFooter from './core/PreFitFooter'
import QuickSize from './quicksize/QuickSize'
import QuickFit from './quickfit/QuickFit'
import CreateNewCyclist from './cyclist/CreateNewCyclist'
import CreateNewCyclistFromInterview from './cyclist/CreateNewCyclistFromInterview'
import AddInterviewToExistingCyclist from './cyclist/AddInterviewToExistingCyclist'
import EditCyclist from './cyclist/EditCyclist'
import ListCyclists from './cyclist/ListCyclists'
import PreFitInterview from './prefitinterview/PreFitInterview'
import PreFitConfirmation from './prefitinterview/PreFitConfirmation'
import AdminDashboard from './admin/AdminDashBoard'
import Unauthorized from './admin/Unauthorized'
import Error from './admin/Error'
import Contact from './admin/Contact' 
import QuickSizeOverview from './product/QuickSizeOverview'
import QuickFitOverview from './product/QuickFitOverview'
import Pricing from './product/Pricing'
import UserData from './user/UserData'


const MainRouter=()=> { 

    return (<div>
     <Switch>
{/*     <Menu/>*/}
         <Route path="/pre-fit-interview/:userId" component={null}/>
         <Route path="/" component={Menu}/>
     </Switch>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/error" component={Error}/>
{/*        <Route path="/users" component={Users}/>*/}
        <Route path="/privacy-policy" component={PrivacyPolicy}/>
        <Route path="/terms-of-use" component={TermsOfUse}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/signin" component={Signin}/>
        <Route path="/contact" component={Contact}/>
        <Route exact path="/pre-fit-interview/confirmation" component={PreFitConfirmation}/>
        <Route path="/pre-fit-interview/:userId" component={PreFitInterview}/>
        <Route path="/password-reset-request" component={PasswordResetRequest}/>
        <Route path="/reset-password/:token" component={ResetPassword}/>
        <Route path="/product/quick-size" component={QuickSizeOverview}/>
        <Route path="/product/quick-fit" component={QuickFitOverview}/>
        <Route path="/product/pricing" component={Pricing}/>
        <PrivateRoute path="/quicksize" component={QuickSize}/>   
        <PrivateRoute path="/user/account/upgradenotice/:userId" component={UpgradeNotice}/>
        <PrivateRoute path="/user/account/cancelationnotice/:userId" component={CancelationNotice}/>
        <PrivateRoute path="/user/account/:userId" component={EditAccount}/>
        <PaidRoute path="/user/data/:userId" component={UserData}/>
        <PaidRoute path="/quickfit/from-interview/:userId/:interviewId" component={CreateNewCyclistFromInterview}/> 
        <PaidRoute path="/quickfit/add-interview/:userId/:interviewId" component={AddInterviewToExistingCyclist}/> 
        <PaidRoute path="/quickfit/:userId/new" component={CreateNewCyclist}/>
        <PaidRoute path="/quickfit/:userId/load" component={ListCyclists}/>
        <PaidRoute path="/quickfit/:userId/:cyclistId" component={EditCyclist}/>   
        <PaidRoute path="/quickfit/:userId" component={QuickFit}/> 
        <Route path ="/admin/error" component={Unauthorized}/>
        <AdminRoute path="/admin/:userId" component={AdminDashboard}/>
        <Route path="/user/:userId" component={Profile}/>
        <Route component={Error}/>

      </Switch>
      <Switch>
      <Route path="/pre-fit-interview/" component={PreFitFooter}/>
      <Route path="/" component={Footer}/>
      </Switch>

    </div>)
  }

export default MainRouter
