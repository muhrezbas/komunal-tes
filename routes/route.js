const express = require('express')
const router = express.Router()
const controller = require('../controllers/controller')
const authenticate = require('../middlewares/authenticate')
const { createBorrower, createUser, validateLogin } = require("../middlewares/validator/userValidator")
const awaitHandlerFactory = require('../middlewares/awaitHandlerFactory');

router.post('/register', createUser, awaitHandlerFactory(controller.registerUser))
router.post('/login', validateLogin, awaitHandlerFactory(controller.loginUser))
router.use(authenticate)
router.get('/data', controller.getBorrower)
router.get('/data/:id', controller.getBorrowerById)
router.post('/create', createBorrower, awaitHandlerFactory(controller.postBorrower))
router.patch('/data/:id', controller.updateRegBorrower)
router.delete('/data/:id', controller.deleteBorrowerById)


module.exports = router