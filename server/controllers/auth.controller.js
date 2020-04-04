import User from '../models/user.model'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import config from './../../config/config'
import nodemailer from 'nodemailer'

const signin = (req, res) => {
 
  User.findOne({
    "email": req.body.email
  }, (err, user) => {

    if (err || !user)
      return res.status('401').json({
        error: "Email and password combination is invalid."
      })

    if (!user.authenticate(req.body.password)) {
      return res.status('401').send({
        error: "Email and password combination is invalid."
      })
    }
//    if(user.stripe_subscription_id) console.log("We should retrieve the stripe data")

    const token = jwt.sign({
      _id: user._id,

    }, config.jwtSecret)

    res.cookie("t", token, {
      expire: new Date() + 9999
    })
//    console.log(user)
    return res.json({
      token,
      user: {_id: user._id, admin: user.admin, stripe_subscription_id: user.stripe_subscription_id, name: user.name, email: user.email, shop_owner:user.shop_owner, preferences: user.preferences}
    })

  })
}

/*
const refreshToken = (req, res) => {
 
const user=req.body

    const token = jwt.sign({
      _id: user._id,
      admin: user.admin,
      subscription_status: user.subscription_status
    }, config.jwtSecret)

    res.cookie("t", token, {
      expire: new Date() + 9999
    })

    return res.json({
      token,
      user: {_id: user._id, name: user.name, email: user.email, shop_owner:user.shop_owner, preferences: user.preferences}
    })
}
*/

const signout = (req, res) => {
  res.clearCookie("t")
  return res.status('200').json({
    message: "signed out"
  })
}

const requireSignin = expressJwt({
  secret: config.jwtSecret,
  userProperty: 'auth'
})

const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id
  if (!(authorized)) {
    return res.status('403').json({
      error: "User is not authorized"  
    })
  }
  next()
}

const hasAuthorizationToModifyCyclist = (req, res, next) => {
//  console.log(req)

  const authorized = req.profile && req.auth && req.profile.createdBy == req.auth._id
  if (!(authorized)) {
    return res.status('403').json({
      error: "User is not authorized"  
    })
  }
  next()
}

const isAdmin = (req, res, next) => {
  const authorized = req.profile&&req.auth&&req.profile.admin===true
  if (!(authorized)) {
    return res.status('403').json({
      error: "User is not authorized admin"  
    })
  }
  next()
}


const passwordResetRequest = (req, res) => {
  const email=req.body.email
  let message
  let resetToken

  User.findOne({
    "email": email
  }, (err, user) => {

    if (err || !user)
    message = {
      from: config.smtpUser,
      to: email,
      subject: "Fit Kit Studio Account Access Attempted",
      text: "You (or someone else) entered this email address when trying to change the password of a Fit Kit Studio account. \
      However, this email address is not in our database of registered users and therefore the attempted password change has failed.\
      If you are a Fit Kit Studio user and your were expecting this email, please try again using the email address you gave when you signed up.\
      If you are not a Fit Kit Studio user, please ignore this email.\
      Fit Kit Studio Support",
      html: "<p>You (or someone else) entered this email address when trying to change the password of a Fit Kit Studio account.\
      </p>However, this email address is not in our database of registered users and therefore the attempted password change has failed.</p>\
      <p>If you are a Fit Kit Studio user and your were expecting this email, please try again using the email address you gave when you signed up.</p>\
      <p>If you are not a Fit Kit Studio user, please ignore this email.</p>\
      <p>Kind regards</p>\
      <p>Fit Kit Studio Support</p>"
    };else
    {
      const randomString=(length)=>{
        let text=""
        const possible = "abcdefghijklmnopqrstuvwxyz0123456789_-."
        for (let i=0; i<length;i++){
          text += possible.charAt(Math.floor(Math.random()*possible.length))
        }
        return text
      }
      resetToken=randomString(40)


      message = {
        from: config.smtpUser,
        to: email,
        subject: "Please Reset your Fit Kit Sudio Password",
        text: `We sent this message because you requested that your Fit Kit Studio password be reset. 
        To Get back into your Fit Kit Studio account you will need to create a new password.
        Please follow these instructions:
        1. Click the link below to open a new and secure browser window
        2. Enter the requested information and follow the instructions to reset your password.
        Reset your password now: 
        ${config.appUrlBase}/reset-password/${resetToken}`,
        html: `<p> We sent this message because you requested that your Fit Kit Studio password be reset.</p> 
        <p>To Get back into your Fit Kit Studio account you will need to create a new password.</p>
        <p>Please follow these instructions:</p>
        <p>1. Click the link below to open a new and secure browser window</p>
        <p>2. Enter the requested information and follow the instructions to reset your password.</p>
        <p>Reset your password now:</p>
        <p><a href="${config.appUrlBase}/reset-password/${resetToken}">${config.appUrlBase}/reset-password/${resetToken}</a></p>`
      }


    }


  let transporter=nodemailer.createTransport({
//    service: 'exchange',
    host: config.smtpUrl,
    port: 465,
    secure: true,
    auth: {
      user: config.smtpUser,
      pass: config.smtpPassword  
    }
  })

  transporter.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {
//      console.log(success)
//      console.log("Server is ready to take our messages");
 
    transporter.sendMail(message)

    }
  });

if(resetToken){

user.password_reset.token=resetToken
user.password_reset.time_stamp = new Date().getTime()

User.updateOne({_id:user._id},{ $set: {password_reset: user.password_reset}}, (err)=>{
if(err){
  return res.status(400).json({error: errorHandler.getErrorMessage(err)
  })
}
})

} //end if resetToken 


  return res.status('200').json({
    message: "Sent email",
    email:email,
    user:user    
  })


})
  

}


const validateToken = (req, res) => { 
  const token=req.body.token

  User.findOne({
    "password_reset.token": token
  }, (err, user) => {

    if (err || !user)
    return res.status('401').json({
      error: "Invalid password-reset token. Please submit a new request."
    })

    else
    {
      return res.status('200').json({
        message: "Found Valid Token",
        userId: user._id,
        email:user.email,
        tokenTimeStamp: user.password_reset.time_stamp
        
      })
    }

})

}

const changePassword = (req, res) => { 

  const token=req.body.token
  const password=req.body.password

  User.findOne({
    "password_reset.token": token
  }, (err, user) => {

    if (err || !user)
    return res.status('401').json({
      error: "Invalid password-reset token. Please submit a new request."
    })

    else
    {
      user.password_reset.token=null
      user.password_reset.time_stamp=null
      user.password=password

      user.save()

      return res.status('200').json({
        message: "Successfully changed Password"        
      })
    }

})

}

export default {
  signin,
  signout,
  //refreshToken,
  requireSignin,
  isAdmin,
  hasAuthorization,
  hasAuthorizationToModifyCyclist,
  passwordResetRequest,
  validateToken,
  changePassword
}
