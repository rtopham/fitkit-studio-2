
import React from 'react'
import HomeSignin from './../auth/HomeSignin'
import auth from './../auth/auth-helper'
import HomeBannerImage from './HomeBannerImage'
import HomeLinks from './HomeLinks'
import './Core.css';

const Home=()=>{

return (
<React.Fragment>
{!auth.isAuthenticated()&&<HomeSignin/>}
{auth.isAuthenticated()&&<div className="homeSigninContainer2"></div>}
<HomeBannerImage/>
        <div className="homeCore">
  
        <p>Fit Kit Studio, brought to you by <a href="https://fitkitsystems.com">Fit Kit Systems</a>, is a web application for:</p>
              
        <ul>
          <li>Bike Sizing using the Fit Kit System; and/or</li>
          <li>Bike Fit documentation that can be used with any fitting system or method.</li>
        </ul>
          <p>The Fit Kit Studio Quick Size service is free of charge to all registered users. The Quick Fit service, available for an affordable annual fee, 
              provides a full suite of customer-focused features, including additional sizing calculations, cloud storage of pre-fit customer interviews, cyclist data, bike equipment, fit position and fit history data, summary PDF reports for printing 
              or emailing to customers, automated customer intake processes, and customized bike shop or fitting studio branding. All registerd users get full access to Quick Size and are eligible for a free 60-day trial of Quick Fit.
          </p>
        </div>
        <HomeLinks/>
</React.Fragment>
    )
  }

export default Home
