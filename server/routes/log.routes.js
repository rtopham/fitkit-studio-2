import express from 'express'
import logCtrl from '../controllers/log.controller'

const router = express.Router()

router.route('/api/log/record-action')
  .post(logCtrl.create)

router.route('/api/log/list-all')
  .get(logCtrl.listAllLogs)

router.route('/api/log/calculate-stats')
  .get(logCtrl.calculateStats)


export default router
