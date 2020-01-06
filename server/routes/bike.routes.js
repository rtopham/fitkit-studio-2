import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'
import cyclistCtrl from '../controllers/cyclist.controller'
import bikeCtrl from '../controllers/bike.controller'

const router = express.Router()

router.route('/api/bikes/new/:userId/:cyclistId')
  .post(authCtrl.requireSignin, bikeCtrl.create) 

router.route('/api/bikes/by/:cyclistId')
  .get(authCtrl.requireSignin, bikeCtrl.listByCyclist)

router.route('/api/bikes')
  .get(authCtrl.requireSignin, bikeCtrl.list)

router.route('/api/bikes/delete/:userId/:cyclistId')
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorizationToModifyCyclist, bikeCtrl.removeCyclistBikes)

router.route('/api/bikes/:userId/:cyclistId/:bikeId')
  .get(authCtrl.requireSignin, bikeCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorizationToModifyCyclist, bikeCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorizationToModifyCyclist, bikeCtrl.remove)

router.param('bikeId', bikeCtrl.bikeByID)
router.param('cyclistId', cyclistCtrl.cyclistByID)
router.param('userId', userCtrl.userByID) 

export default router 
