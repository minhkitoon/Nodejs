const express = require('express')
const {login} = require('../controllers/LoginController')
const {
  getListUser,
  getDetailUser,
  editUser,
  createUser,
  deleteUser
} = require('../controllers/UserController')
const {
  createProduct,
  listProduct,
} = require('../controllers/ProductController')
const { userValidationRules } = require('../validate/validateRule')
const { productValidationRules } = require('../validate/productRule')
const routerAPI = express.Router()
const authenticateToken = require('../middleware/verifyToken')
const upload = require('../middleware/upload');

routerAPI.post('/login', login)
//User
  routerAPI.get('/list-user', authenticateToken , getListUser);
  routerAPI.get('/detail-user/:id', authenticateToken , getDetailUser);

  routerAPI.post('/edit-user/:id', authenticateToken , editUser);
  routerAPI.post('/create-user', authenticateToken , userValidationRules , createUser);

  routerAPI.delete('/delete-user/:id', authenticateToken , deleteUser);

//Product
routerAPI.get('/list-product', authenticateToken , listProduct);

routerAPI.post('/create-product', authenticateToken , upload.single('image') , productValidationRules , createProduct);
module.exports = routerAPI;
