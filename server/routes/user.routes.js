import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/users')
  .get(userCtrl.list)
  .post(userCtrl.create)

router.route('/api/deleted-users')
  .get(userCtrl.listDeletedUsers)

router.route('/api/users/list')
  .get(authCtrl.requireSignin, authCtrl.isAdmin, userCtrl.listAllUsers)
  .post(userCtrl.create)

router.route('/api/users/:userId')
  .get(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)

router.route('/api/username/:userId')
  .get(authCtrl.requireSignin, userCtrl.readUserName) 


router.param('userId', userCtrl.userByID)

export default router
