import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'
import shopCtrl from '../controllers/shop.controller'
import prefitinterviewCtrl from '../controllers/prefitinterview.controller'

const router = express.Router()

router.route('/api/prefitinterview/new/:userId')
  .post(prefitinterviewCtrl.create) 


router.route('/api/prefitinterviews/by/:userId')
  .get(authCtrl.requireSignin, prefitinterviewCtrl.listByUser)

router.route('/api/prefitinterviews/by/cyclist/:cyclistId')
  .get(authCtrl.requireSignin, prefitinterviewCtrl.listByCyclist)

router.route('/api/prefitinterviews/:userId/:interviewId')
  .get(authCtrl.requireSignin, prefitinterviewCtrl.read)
  .put(authCtrl.requireSignin, prefitinterviewCtrl.update)
  .delete(authCtrl.requireSignin, prefitinterviewCtrl.remove)

/*

  router.route('/api/cyclists/search/:userId')
  .get(authCtrl.requireSignin, cyclistCtrl.listByUserSearch)

router.route('/api/cyclists')
  .get(authCtrl.requireSignin, cyclistCtrl.list)

router.route('/api/cyclists/:userId/:cyclistId')
  .get(authCtrl.requireSignin, cyclistCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorizationToModifyCyclist, cyclistCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorizationToModifyCyclist, cyclistCtrl.remove)

*/

//router.param('shopId', shopCtrl.shopByID)
router.param('interviewId', prefitinterviewCtrl.interviewByID)
router.param('userId', userCtrl.userByID) 



export default router 
