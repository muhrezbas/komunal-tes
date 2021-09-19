const express = require("express")
const router = express.Router()
const webRouter = require("./route")

router.use("/", webRouter)



module.exports = router
