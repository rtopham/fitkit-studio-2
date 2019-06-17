
import _ from 'lodash'
import config from './../../config/config'
import stripelib from 'stripe' 
const stripe = stripelib(config.stripeSecretKey)

const charge =  async (req, res, next) => {
let user = req.profile

  try{
    let {status} = await stripe.charges.create({
      amount: 2000,
      currency: "usd",
      description: "Fit Kit Studio Quick Size Plus Subscription",
      
      source: req.body
    })

   res.json({status})

  } catch (err) {
    res.status(500).json({error:err})

  }

}

const createStripeCustomer =  async (req, res, next) => {
  let user = req.profile
  
    try{
      let customer = await stripe.customers.create({
        email: user.email,
        name: user.name,    
        source: req.body
      })

      res.json(customer)
  
    } catch (err) {
      res.status(500).json({error:err.message})
    }
  }

const updateStripeCustomer =  async (req, res, next) => {
    let user = req.profile
    
      try{
        let customer = await stripe.customers.update(
          user.stripe_customer_id,
          {
          email: user.email,
          name: user.name,    
          source: req.body
        })
  
        res.json(customer)
    
      } catch (err) {
        res.status(500).json({error:err.message})
      }
    }

const readStripeCustomer =  async (req, res, next) => {
   
    try{
      let customer = await stripe.customers.retrieve(req.profile.stripe_customer_id)

      res.json(customer)
    } catch (err) {
      res.status(500).json({error:err})
    }
  }  

const deleteStripeCustomer =  async (req, res, next) => {
   
    try{
      let customer = await stripe.customers.del(req.profile.stripe_customer_id)

      res.json(customer)
    } catch (err) {
      res.status(500).json({error:err})
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
          items: [{plan: plan}],
          trial_from_plan: true
        })
        res.json(subscription)
      } catch (err) {
        res.status(500).json({error:err})
      }
    }  

const readStripeSubscription =  async (req, res, next) => {
   
    try{
      let subscription = await stripe.subscriptions.retrieve(req.profile.stripe_subscription_id)

      res.json(subscription)
    } catch (err) {
      res.status(500).json({error:err})
    }
  }  
  
  const updateStripeSubscription =  async (req, res, next) => {
    let cancelObject={cancel_at_period_end: true}
    if (req.body==="reactivate") cancelObject.cancel_at_period_end=false

    let plan='Quick Size'
    if(req.body==="Quick Size Plus (Monthly)")plan=config.stripeMonthlyPlan
    else if(req.body==="Quick Size Plus (Yearly)") plan = config.stripeYearlyPlan
    if(plan!='Quick Size')
    {
    try{
      let subscription = await stripe.subscriptions.update(
        req.profile.stripe_subscription_id,
        {plan:plan}
        )

      res.json(subscription)
    } catch (err) {
      res.status(500).json({error:err})
    }
  }
  else try{
    let canceledSubscription = await stripe.subscriptions.update(
      req.profile.stripe_subscription_id,
      cancelObject
      )

    res.json(canceledSubscription)
  } catch (err) {
    res.status(500).json({error:err})
  }
  }    


const oldreadStripeCard = async (req, res, next) =>{
console.log(req.params)
}


  const readStripeCard =  async (req, res, next) => {
//   console.log(req.profile)
    try{
      let card = await stripe.customers.retrieveCard(req.profile.stripe_customer_id, req.params.sourceId)

      res.json(card)
    } catch (err) {
      res.status(500).json({error:err})
    }
  }  


export default {
  charge,
  createStripeCustomer,
  updateStripeCustomer,
  readStripeCustomer,
  deleteStripeCustomer,
  createStripeSubscription,
  readStripeSubscription,
  updateStripeSubscription,
  readStripeCard
}
