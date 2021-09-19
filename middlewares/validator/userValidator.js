const { body } = require('express-validator');

// console.log('halo')
exports.createBorrower = [
    body('CustomerName')
        .exists()
        .withMessage('Customer Name is required')
        .isLength({ min: 1 })
        .withMessage('Must be at least 1 chars long'),
    body('DatePurchase')
        .exists()
        .withMessage('Date Purchase is required')
        .isLength({ min: 1 })
        .withMessage('Must be at least 1 chars long'),
    body('Amount_due__c')
        .exists()
        .withMessage('Amount due c is required')
        .isNumeric()
        .withMessage('Must be a number'),
    body('Discount__c')
        .exists()
        .withMessage('Discount c is required')
        .isNumeric()
        .withMessage('Must be a number'),
    body('GST__c')
        .exists()
        .withMessage('GST c is required')
        .isNumeric()
        .withMessage('Must be a number')

];

exports.validateLogin = [
    body('email')
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail(),
    body('password')
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .withMessage('Password must be filled')
];