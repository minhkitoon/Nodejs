const { body } = require('express-validator');

const userValidationRules = [
  body('username')
    .notEmpty()
    .withMessage('Không được để trống username'),
  body('password')
    .notEmpty()
    .withMessage('Không được để trống password'),
  body('status')
    .notEmpty()
    .withMessage('Không được để trống status'),
];

module.exports = {
  userValidationRules
};