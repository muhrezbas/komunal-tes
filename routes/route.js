const express = require('express')
const router = express.Router()
const controller = require('../controllers/controller')

router.get('/data',controller.getBorrower)
router.get('/data/:id',controller.getBorrowerById)


module.exports = router