import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/users')
  .get(userCtrl.list)
  .post(userCtrl.create)

router.route('/api/users/list')
  .get(authCtrl.requireSignin, authCtrl.isAdmin, userCtrl.listAllUsers)
  .post(userCtrl.create)


router.route('/api/users/:userId')
  .get(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)

router.route('/api/username/:userId')
  .get(authCtrl.requireSignin, userCtrl.readUserName) 

router.route('/api/stripe/charge/:userId')
  .post(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.charge)

router.route('/api/stripe/create-customer/:userId')
  .post(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.createStripeCustomer)

router.route('/api/stripe/create-subscription/:userId')
  .post(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.createStripeSubscription)

router.route('/api/stripe/subscriptions/:userId')
  .get(authCtrl.requireSignin, userCtrl.readStripeSubscription)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.updateStripeSubscription)


router.param('userId', userCtrl.userByID)

export default router
