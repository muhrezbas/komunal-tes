const express = require('express')
const router = express.Router()
const controller = require('../controllers/controller')
const {createBorrower} = require("../middlewares/validator/userValidator")
const awaitHandlerFactory = require('../middlewares/awaitHandlerFactory');

router.get('/data',controller.getBorrower)
router.get('/data/:id',controller.getBorrowerById)
router.post('/create', createBorrower, controller.postBorrower )

module.exports = router