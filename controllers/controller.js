const db = require("../configs/mysql");
const { validationResult } = require('express-validator');
const today = new Date()
checkValidation = (req) => {
  console.log(req)
  const errors = validationResult(req)
  console.log(errors, "errorss")
  if (!errors.isEmpty()) {
    throw ({
      code: 400,
      errors: errors,
      name: "ValidationError"
    })
  }
}
class BorrowerController {



}

module.exports = BorrowerController;
