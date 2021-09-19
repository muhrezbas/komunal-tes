const db = require("../configs/mysql");
const { validationResult } = require('express-validator');
const query = require("../usecase/borrower");
const encrypt = require("../helpers/encrypt")
const bcrypt = require("bcryptjs")
const { v4: uuidv4 } = require('uuid');
const secret = process.env.SECRET
const jwt = require("jsonwebtoken")
const today = new Date()
function isNumeric(str) {
  if (typeof str != "string") {
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  } // we only process strings!  
  else {

    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }
}
checkValidation = (req) => {
  console.log(req.body, "now")
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
  static registerUser(req, res, next) {
    checkValidation(req);
    let body = req.body
    const data = [[
      uuidv4(),
      body.email,
      encrypt(body.password),
      new Date(),
      new Date(),
    ]]
    // console.log(data)
    db.query(query.create_user(), [data], async (err, result) => {
      // console.log(borrower)
      if (err) {
        res.status(500).json(err)
      } else {
        const token = jwt.sign({ username: body.Email }, secret, { expiresIn: "6h" })
        console.log(token, "woyy disini")
        res.status(201).json({ access_token: token})
        // res.status(201).json(result)

      }
    });
  }
  static loginUser(req, res, next) {
    checkValidation(req);
    let body = req.body
    var userData = null
    db.query(query.read_user_email(body.email), async (err, result) => {
      console.log(result)
      if (result.length <= 0) {
        res.status(400).json({
          message: "Invalid email/password"
        })
      }else {
        console.log(result)
      userData = result[0]
      let valid = await bcrypt.compare(body.password, result[0].Password)

      if (valid) {
        console.log(userData, "akudisini")

        // .catch(next);
        // console.log(secret)
        const token = jwt.sign({ username: userData.Email }, secret, { expiresIn: "6h" })
        console.log(token, "woyy disini")
        res.status(200).json({ access_token: token, username: userData.Email })
      } else {
        res.status(400).json({
          message: "Invalid email/password"
        })
      }
      }
      

    })


  }

  static getBorrowerById(req, res, next) {
    db.query(query.read_reg_borrower_id(req.params.id), async (err, result) => {
      // console.log(result);
      res.status(200).json(result);
    });
  }
  static deleteBorrowerById(req, res, next) {
    db.query(query.delete_reg_borrowers(req.params.id), async (err, result) => {
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
  static postBorrower(req, res, next) {
    checkValidation(req);
    let body = req.body
    // console.log(uuidv4())
    const data = [[
      uuidv4(),
      body.CustomerName,
      body.DatePurchase,
      body.Amount_due__c,
      body.Discount__c,
      body.GST__c,
      new Date(),
      new Date(),
    ]]
    // let borrower = {
    //   "CustomerName": body.CustomerName,
    //   "DatePurchase": body.DatePurchase,
    //   "Amount_due__c": body.Amount_due__c,
    //   "Discount__c": body.Discount__c,
    //   "GST__c": body.GST__c,
    //   "CreatedDate": new Date(),
    //   "LastModifiedDate": new Date(),
    //   "Id": uuidv4()
    // }
    db.query(query.create_reg_borrower(), [data], async (err, result) => {
      // console.log(borrower)
      if (err) {
        res.status(500).json(err)
      } else {
        res.status(201).json(result)

      }
    });

  }
  static updateRegBorrower(req, res, next) {

    db.query(query.read_reg_borrower_id(req.params.id), (err, result) => {
      // console.log(result)y
      if (err) {

      } else {

        let body = req.body
        let before = result[0]
        if (body.CustomerName !== undefined) {
          before.CustomerName = body.CustomerName
        }
        if (body.DatePurchase !== undefined) {
          before.DatePurchase = body.DatePurchase
        }
        if (body.GST__c !== undefined) {
          before.GST__c = body.GST__c
        }
        if (body.Amount_due__c !== undefined) {
          before.Amount_due__c = body.Amount_due__c
        }
        if (body.Discount__c !== undefined) {
          before.Discount__c = body.Discount__c
        }
        delete before.id
        delete before.CreatedDate
        delete before.LastModifiedDate
        delete before.deleted_at
        // req.body = before
        // return before
        // resolve(before);
        let error = {
          errors: [

          ]
        }
        console.log(isNumeric(before.Discount__c))
        if (!isNumeric(before.Amount_due__c)) {
          error.errors.push({
            msg: 'Must be at number',
            param: 'Amount_due_c'
          }
          )
        }
        if (!isNumeric(before.Discount__c)) {
          error.errors.push({
            msg: 'Must be at number',
            param: 'Discount__c'
          }
          )
        }
        if (!isNumeric(before.GST__c)) {
          error.errors.push({
            msg: 'Must be at number',
            param: 'GST__c'
          }
          )
        }
        // let key = Object.keys(error.errors)[0]
        if (error.errors.length > 0) {
          res.status(400).json(error)
        }
        const data = {
          "CustomerName": before.CustomerName,
          "DatePurchase": before.DatePurchase,
          "Amount_due__c": before.Amount_due__c,
          "Discount__c": before.Discount__c,
          "GST__c": before.GST__c,
          "LastModifiedDate": new Date()
        }

        db.query(query.update_reg_borrower(req.params.id, data), async (err, result) => {
          // console.log(result)
          if (err) {
            res.status(500).json(err)
          } else {
            res.status(200).json(result)

          }
        });

      }
    });



    // req.body = data
    // let post = {
    //   body: data
    // }
    // res.status(200).json(error);



  }


}

module.exports = BorrowerController;
