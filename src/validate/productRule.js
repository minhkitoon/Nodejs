const { body } = require('express-validator');

const productValidationRules = [
  body('name')
    .notEmpty()
    .withMessage('Không được để trống tên sản phẩm'),
  body('price')
    .notEmpty()
    .withMessage('Không được để trống giá sản phẩm'),
  body('status')
    .notEmpty()
    .withMessage('Không được để trống status'),
];

module.exports = {
  productValidationRules
};