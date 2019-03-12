
import Log from '../models/log.model'
import _ from 'lodash'
import errorHandler from '../helpers/dbErrorHandler'
import config from './../../config/config'
import nodemailer from 'nodemailer'


const create = (req, res, next) => {
//  console.log(req.body)
  const log = new Log()
  log.user=req.body.userId
  log.action=req.body.action
  log.description=req.body.description
  if(req.body.documentId)log.documentId=req.body.documentId
  log.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
//    Log.countDocuments({"login.user":"5c4b8cce45a78d2e4c97b63d"},function(err,count){
//      console.log(count)
//    })

    res.status(200).json({
      message: "Action successfully logged."
 
    })
  })
}

const listAllLogs = (req, res) => {
  Log.find((err, logs) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(logs)
  }).select('date user description')
  .sort({date: -1})
}

const oldcalculateStats = (req, res) => {
  let stats={}
  Log.countDocuments({action:"created cyclist"}, (err, cyclistsCreated) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
//    res.json({cyclistsCreated})
Log.countDocuments({action:"deleted cyclist"}, (err, cyclistsDeleted) => {
  if (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }

  stats.cyclistsDeleted=cyclistsDeleted
  res.json(stats)
})

    stats.cyclistsCreated=cyclistsCreated

    
  })
}

//this works
const workingcalculateStats = (req, res) => {
  let stats={}
  Log.countDocuments({action:"created cyclist"}).exec()
    .then((cyclistsCreated)=>{
      stats.cyclistsCreated=cyclistsCreated
    })
    .then(()=>{
      Log.countDocuments({action:"deleted cyclist"}).exec()
      .then((cyclistsDeleted)=>{
        stats.cyclistsDeleted=cyclistsDeleted
      })
    .then(()=>{

      res.json(stats)
    })

    })
}

//this works and is shorter
const working2calculateStats = (req, res) => {
  let stats={}
  Log.countDocuments({action:"created cyclist"}).exec()
    .then((cyclistsCreated)=>{
      stats.cyclistsCreated=cyclistsCreated
    })
    .then(()=>{
      Log.countDocuments({action:"deleted cyclist"}).exec()
      .then((cyclistsDeleted)=>{
        stats.cyclistsDeleted=cyclistsDeleted
        res.json(stats)
      })
    })
}

const failureCallBack=(error)=>{
console.log(error)
}

const newcalculateStats=(req,res)=>{
  let lastSevenDays={}
  let lastThirtyDays={}
  let yearToDate={}
  let today={}
  let sevenDaysAgo = new Date()
  let thirtyDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate()-7)
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate()-30)
  let beginningOfYear = new Date(new Date().getFullYear(),0,1)

  Log.countDocuments({action:"created cyclist", date:{$gt: sevenDaysAgo}}).exec()
  .then((cyclistsCreated)=>{
    lastSevenDays.cyclistsCreated=cyclistsCreated
  })
  .then(()=>{
    Log.countDocuments({action:"deleted cyclist", date:{$gt: sevenDaysAgo}}).exec()
    lastSevenDays.cyclistsDeleted=cyclistsDeleted
    res.json(lastSevenDays)
   })

}


const works2calculateStats = (req, res) => {
  let stats={}
  Log.countDocuments({action:"created cyclist"}).exec()
    .then((cyclistsCreated)=>{
      stats.cyclistsCreated=cyclistsCreated
    })
    .then(()=>{
      Log.countDocuments({action:"deleted cyclist"}).exec()
      .then((cyclistsDeleted)=>{
        stats.cyclistsDeleted=cyclistsDeleted
        res.json(stats)
      })
    })
}


const calculateStats = (req, res) => {
  let lastSevenDays={}
  let lastThirtyDays={}
  let yearToDate={}
  let today={}
  let allTime={}
  let sevenDaysAgo = new Date()
  let thirtyDaysAgo = new Date()
  let todaysDate = new Date()
  todaysDate.setDate(todaysDate.getDate()-1)
  sevenDaysAgo.setDate(sevenDaysAgo.getDate()-7)
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate()-30)
  let beginningOfYear = new Date(new Date().getFullYear(),0,1)
  //let beginningOfYear = new Date()

  Log.countDocuments({action:"created cyclist", date:{$gt: sevenDaysAgo}}).exec()
    .then((cyclistsCreated)=>{lastSevenDays.cyclistsCreated=cyclistsCreated})
    .then(()=>{
      return Log.countDocuments({action:"deleted cyclist", date:{$gt: sevenDaysAgo}}).exec()
      .then((cyclistsDeleted)=>{lastSevenDays.cyclistsDeleted=cyclistsDeleted})
    })
    .then(()=>{
      return Log.countDocuments({action:"signed up", date:{$gt: sevenDaysAgo}}).exec()
      .then((usersCreated)=>{lastSevenDays.usersCreated=usersCreated})
    })
    .then(()=>{
      return Log.countDocuments({action:"deleted account", date:{$gt: sevenDaysAgo}}).exec()
      .then((usersDeleted)=>{lastSevenDays.usersDeleted=usersDeleted})
    })
    .then(()=>{
      return Log.countDocuments({action:"signed in", date:{$gt: sevenDaysAgo}}).exec()
      .then((usersSignedIn)=>{lastSevenDays.usersSignedIn=usersSignedIn})
    })
    .then(()=>{
      return Log.distinct('user',{action:"signed in", date:{$gt: sevenDaysAgo}}).exec()
      .then((uniqueUsersSignedIn)=>{lastSevenDays.uniqueUsersSignedIn=uniqueUsersSignedIn.length})
    })
    .then(()=>{
      return Log.countDocuments({action:"signed out", date:{$gt: sevenDaysAgo}}).exec()
      .then((usersSignedOut)=>{lastSevenDays.usersSignedOut=usersSignedOut})
    })
    .then(()=>{
      return Log.countDocuments({action:"created cyclist", date:{$gt: thirtyDaysAgo}}).exec()
      .then((thirtycyclistsCreated)=>{lastThirtyDays.cyclistsCreated=thirtycyclistsCreated})
    })
    .then(()=>{
      return Log.countDocuments({action:"deleted cyclist", date:{$gt: thirtyDaysAgo}}).exec()
      .then((cyclistsDeleted)=>{lastThirtyDays.cyclistsDeleted=cyclistsDeleted})
    })
    .then(()=>{
      return Log.countDocuments({action:"signed up", date:{$gt: thirtyDaysAgo}}).exec()
      .then((usersCreated)=>{lastThirtyDays.usersCreated=usersCreated})
    })
    .then(()=>{
      return Log.countDocuments({action:"deleted account", date:{$gt: thirtyDaysAgo}}).exec()
      .then((usersDeleted)=>{lastThirtyDays.usersDeleted=usersDeleted})
    })
    .then(()=>{
      return Log.countDocuments({action:"signed in", date:{$gt: thirtyDaysAgo}}).exec()
      .then((usersSignedIn)=>{lastThirtyDays.usersSignedIn=usersSignedIn})
    })
    .then(()=>{
      return Log.distinct('user',{action:"signed in", date:{$gt: thirtyDaysAgo}}).exec()
      .then((uniqueUsersSignedIn)=>{lastThirtyDays.uniqueUsersSignedIn=uniqueUsersSignedIn.length})
    })
    .then(()=>{
      return Log.countDocuments({action:"signed out", date:{$gt: thirtyDaysAgo}}).exec()
      .then((usersSignedOut)=>{lastThirtyDays.usersSignedOut=usersSignedOut})
    })
    .then(()=>{
      return Log.countDocuments({action:"created cyclist", date:{$gt: beginningOfYear}}).exec()
      .then((cyclistsCreated)=>{yearToDate.cyclistsCreated=cyclistsCreated})
    })
    .then(()=>{
      return Log.countDocuments({action:"deleted cyclist", date:{$gt: beginningOfYear}}).exec()
      .then((cyclistsDeleted)=>{yearToDate.cyclistsDeleted=cyclistsDeleted})
    })
    .then(()=>{
      return Log.countDocuments({action:"signed up", date:{$gt: beginningOfYear}}).exec()
      .then((usersCreated)=>{yearToDate.usersCreated=usersCreated})
    })
    .then(()=>{
      return Log.countDocuments({action:"deleted account", date:{$gt: beginningOfYear}}).exec()
      .then((usersDeleted)=>{yearToDate.usersDeleted=usersDeleted})
    })
    .then(()=>{
      return Log.countDocuments({action:"signed in", date:{$gt: beginningOfYear}}).exec()
      .then((usersSignedIn)=>{yearToDate.usersSignedIn=usersSignedIn})
    })
    .then(()=>{
      return Log.distinct('user',{action:"signed in", date:{$gt: beginningOfYear}}).exec()
      .then((uniqueUsersSignedIn)=>{yearToDate.uniqueUsersSignedIn=uniqueUsersSignedIn.length})
    })
    .then(()=>{
      return Log.countDocuments({action:"signed out", date:{$gt: beginningOfYear}}).exec()
      .then((usersSignedOut)=>{yearToDate.usersSignedOut=usersSignedOut})
    })
    .then(()=>{
      return Log.countDocuments({action:"created cyclist"}).exec()
      .then((cyclistsCreated)=>{allTime.cyclistsCreated=cyclistsCreated})
    })
    .then(()=>{
      return Log.countDocuments({action:"deleted cyclist"}).exec()
      .then((cyclistsDeleted)=>{allTime.cyclistsDeleted=cyclistsDeleted})
    })
    .then(()=>{
      return Log.countDocuments({action:"signed up"}).exec()
      .then((usersCreated)=>{allTime.usersCreated=usersCreated})
    })
    .then(()=>{
      return Log.countDocuments({action:"deleted account"}).exec()
      .then((usersDeleted)=>{allTime.usersDeleted=usersDeleted})
    })
    .then(()=>{
      return Log.countDocuments({action:"signed in"}).exec()
      .then((usersSignedIn)=>{allTime.usersSignedIn=usersSignedIn})
    })
    .then(()=>{
      return Log.distinct('user',{action:"signed in"}).exec()
      .then((uniqueUsersSignedIn)=>{allTime.uniqueUsersSignedIn=uniqueUsersSignedIn.length})
    })
    .then(()=>{
      return Log.countDocuments({action:"signed out"}).exec()
      .then((usersSignedOut)=>{allTime.usersSignedOut=usersSignedOut})
    })
    .then(()=>{
      return Log.countDocuments({action:"created cyclist", date:{$gt: todaysDate}}).exec()
      .then((cyclistsCreated)=>{today.cyclistsCreated=cyclistsCreated})
    })
    .then(()=>{
      return Log.countDocuments({action:"deleted cyclist", date:{$gt: todaysDate}}).exec()
      .then((cyclistsDeleted)=>{today.cyclistsDeleted=cyclistsDeleted})
    })
    .then(()=>{
      return Log.countDocuments({action:"signed up", date:{$gt: todaysDate}}).exec()
      .then((usersCreated)=>{today.usersCreated=usersCreated})
    })
    .then(()=>{
      return Log.countDocuments({action:"deleted account", date:{$gt: todaysDate}}).exec()
      .then((usersDeleted)=>{today.usersDeleted=usersDeleted})
    })
    .then(()=>{
      return Log.countDocuments({action:"signed in", date:{$gt: todaysDate}}).exec()
      .then((usersSignedIn)=>{today.usersSignedIn=usersSignedIn})
    })
    .then(()=>{
      return Log.distinct('user',{action:"signed in", date:{$gt: todaysDate}}).exec()
      .then((uniqueUsersSignedIn)=>{today.uniqueUsersSignedIn=uniqueUsersSignedIn.length})
    })
    .then(()=>{
      return Log.countDocuments({action:"signed out", date:{$gt: todaysDate}}).exec()
      .then((usersSignedOut)=>{
        today.usersSignedOut=usersSignedOut
        return res.json({today,lastSevenDays, lastThirtyDays, yearToDate, allTime})
      })
    }). catch(this.failureCallBack)


}



/**
 * Load user and append to req.
 */
const userByID = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user)
      return res.status('400').json({
        error: "User not found"
      })
    req.profile = user
    next()
  })
}


const read = (req, res) => {
  req.profile.hashed_password = undefined
  req.profile.salt = undefined
  return res.json(req.profile)
}


const list = (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(users)
  }).select('name email updated created shop_owner subscription_status')
}

const update = (req, res, next) => {
  let user = req.profile
  user = _.extend(user, req.body)
  user.updated = Date.now()
  user.save((err) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    user.hashed_password = undefined
    user.salt = undefined
    res.json(user)
  })
}

const remove = (req, res, next) => {
  let user = req.profile
  user.remove((err, deletedUser) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    deletedUser.hashed_password = undefined
    deletedUser.salt = undefined
    res.json(deletedUser)
  })
}

const oldreadUserName = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user)
      return res.status('400').json({
        error: "User not found"
      })
 //   req.profile = user
//    next()
      return(user.name)
  })
}

const readUserName = (req, res) => {
  req.profile.hashed_password = undefined
  req.profile.salt = undefined
  return res.json(req.profile)
}


const isShopOwner = (req, res, next) => {
  const isShopOwner = req.profile && req.profile.shop_owner
  if (!isShopOwner) {
    return res.status('403').json({
      error: "User is not a Shop Owner"
    })
  }
  next()
}


const sendContactMessage = (req, res) => {
  console.log(req.body)

  const message = {
    from: config.smtpUser,
    replyTo: req.body.email,
    to: "reed@tophamonline.com",
    subject: req.body.subject,
    text: `Fit Kit Studio contact form message from: ${req.body.name}, ${req.body.email} re: ${req.body.subject}. \n \n ${req.body.message}`,
    html: `Fit Kit Studio contact form message from: ${req.body.name}, ${req.body.email} re: ${req.body.subject}. <br/><br/> ${req.body.message}`
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
      console.log(success) 
//      console.log("Server is ready to take our messages");
  
    transporter.sendMail(message)

    }
  })
  
  return res.status('200').json({
    message: "Sent email",
    email:req.body.email
  })
}

export default {
  create,
  userByID,
  isShopOwner,
  read,
  list,
  listAllLogs,
  remove,
  update,
  readUserName,
  calculateStats,
  sendContactMessage
}
