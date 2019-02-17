
import User from '../models/user.model'
import _ from 'lodash'
import config from './../../config/config'
import stripelib from 'stripe' 
const stripe = stripelib(config.stripeSecretKey)
import errorHandler from './../helpers/dbErrorHandler'

const create = (req, res, next) => {
  const user = new User(req.body)
  user.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.status(200).json({
      message: "Successfully signed up!",
      userId:result._id
    })
  })
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

const listAllUsers = (req, res) => {
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

const charge =  async (req, res, next) => {
let user = req.profile
console.log(req.profile)

  try{
    let {status} = await stripe.charges.create({
      amount: 2000,
      currency: "usd",
      description: "Fit Kit Studio Quick Size Plus Subscription",
      
      source: req.body
    })

   res.json({status})

  } catch (err) {
    res.status(500).end()

  }

}

const createStripeCustomer =  async (req, res, next) => {
  let user = req.profile
  
    try{
      let customer = await stripe.customers.create({
        email: user.email,    
        source: req.body
      })

      res.json(customer)
  
    } catch (err) {
      res.status(500).end()
    }
  }

  const createStripeSubscription =  async (req, res, next) => {
    let user = req.profile
    let plan=''
    if(req.body==="Quick Size Plus (Monthly)")plan=config.stripeMonthlyPlan
    else if(req.body==="Quick Size Plus (Yearly)") plan = config.stripeYearlyPlan
    
      try{
        let subscription = await stripe.subscriptions.create({
          customer: req.profile.stripe_customer_id,    
          items: [{plan: plan}]
        })
        res.json(subscription)
      } catch (err) {
        res.status(500).end()
      }
    }  

const readStripeSubscription =  async (req, res, next) => {
   
    try{
      let subscription = await stripe.subscriptions.retrieve(req.profile.stripe_subscription_id)

      res.json(subscription)
    } catch (err) {
      res.status(500).end()
    }
  }  
  
  const updateStripeSubscription =  async (req, res, next) => {
   
    let plan=''
    if(req.body==="Quick Size Plus (Monthly)")plan=config.stripeMonthlyPlan
    else if(req.body==="Quick Size Plus (Yearly)") plan = config.stripeYearlyPlan

    try{
      let subscription = await stripe.subscriptions.update(
        req.profile.stripe_subscription_id,
        {plan:plan}
        )

      res.json(subscription)
    } catch (err) {
      res.status(500).end()
    }
  }    

export default {
  create,
  userByID,
  isShopOwner,
  read,
  list,
  listAllUsers,
  remove,
  update,
  readUserName,
  charge,
  createStripeCustomer,
  createStripeSubscription,
  readStripeSubscription,
  updateStripeSubscription
}
