const express = require('express')
const router = express.Router()
const controller = require('../controllers/controller')
const { createBorrower, createUser } = require("../middlewares/validator/userValidator")
const awaitHandlerFactory = require('../middlewares/awaitHandlerFactory');

router.post('/register', createUser, awaitHandlerFactory(controller.registerUser))
router.get('/data', controller.getBorrower)
router.get('/data/:id', controller.getBorrowerById)
router.post('/create', createBorrower, awaitHandlerFactory(controller.postBorrower))
router.patch('/data/:id', controller.updateRegBorrower)
router.delete('/data/:id', controller.deleteBorrowerById)


module.exports = router