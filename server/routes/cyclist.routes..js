import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'
import cyclistCtrl from '../controllers/cyclist.controller'

const router = express.Router()

router.route('/api/cyclists/new/:userId')
  .post(authCtrl.requireSignin, cyclistCtrl.create)

router.route('/api/cyclists/by/:userId')
  .get(authCtrl.requireSignin, cyclistCtrl.listByUser)

router.route('/api/cyclists/:userId/:cyclistId')
  .get(authCtrl.requireSignin, cyclistCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorizationToModifyCyclist, cyclistCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorizationToModifyCyclist, cyclistCtrl.remove)

router.param('cyclistId', cyclistCtrl.cyclistByID)
router.param('userId', userCtrl.userByID) 

export default router 
