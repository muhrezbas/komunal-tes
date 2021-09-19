const db = require("../configs/mysql");
const { validationResult } = require('express-validator');
const query = require("../usecase/borrower");
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

  static getBorrowerById(req, res, next) {
    db.query(query.read_reg_borrower_id(req.params.id), async (err, result) => {
      // console.log(result);
      res.status(200).json(result);
    });
  }
  static getBorrower(req, res, next) {
    console.log(query.read_reg_borrower(req.query.page, req.query.limit), "test")
    db.query(query.read_reg_borrower(req.query.page, req.query.limit), async (err, result) => {
      // console.log(result);
      res.status(200).json(result);
    });
  }


}

module.exports = BorrowerController;
