import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'
import stripeCtrl from '../controllers/stripe.controller'

const router = express.Router()

router.route('/api/stripe/charge/:userId')
  .post(authCtrl.requireSignin, authCtrl.hasAuthorization, stripeCtrl.charge)

//router.route('/api/stripe/create-customer/:userId')
//  .post(authCtrl.requireSignin, authCtrl.hasAuthorization, stripeCtrl.createStripeCustomer)

router.route('/api/stripe/customers/:userId')
  .get(authCtrl.requireSignin, stripeCtrl.readStripeCustomer)
  .post(authCtrl.requireSignin, authCtrl.hasAuthorization, stripeCtrl.createStripeCustomer)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, stripeCtrl.updateStripeCustomer)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, stripeCtrl.deleteStripeCustomer)

//  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.updateStripeCustomer)

router.route('/api/stripe/create-subscription/:userId')
  .post(authCtrl.requireSignin, authCtrl.hasAuthorization, stripeCtrl.createStripeSubscription)

router.route('/api/stripe/subscriptions/:userId')
  .get(authCtrl.requireSignin, stripeCtrl.readStripeSubscription)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, stripeCtrl.updateStripeSubscription)

router.route('/api/stripe/card/:userId/:sourceId')
  .get(authCtrl.requireSignin, stripeCtrl.readStripeCard)


router.param('userId', userCtrl.userByID)
//router.param('sourceId', sourceId)

export default router
