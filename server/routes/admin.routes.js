import express from 'express'
import authCtrl from '../controllers/auth.controller'
import userCtrl from '../controllers/user.controller'
import adminCtrl from './../controllers/admin.controller'

const router = express.Router()

router.route('/api/log/record-action')
  .post(adminCtrl.create)

router.route('/api/log/list-all/:userId')
  .get(authCtrl.requireSignin, authCtrl.isAdmin, adminCtrl.listAllLogs)

router.route('/api/log/calculate-stats/:userId')
  .get(authCtrl.requireSignin, authCtrl.isAdmin, adminCtrl.calculateStats)

router.route('/api/admin/send-contact-message')
  .post(adminCtrl.sendContactMessage)

router.param('userId', userCtrl.userByID)

export default router
