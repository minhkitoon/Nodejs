const express = require('express')
const {login} = require('../controllers/LoginController')
const {getListUser} = require('../controllers/UserController')
const routerAPI = express.Router()
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_API;

//middleware kiểm tra token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // Không có token

    jwt.verify(token, secret, (err, user) => {
      if (err) return res.sendStatus(403); // Token không hợp lệ hoặc đã hết hạn
      req.user = user;
      next(); // Chuyển tới xử lý tiếp theo
    });
  };

routerAPI.post('/login', login)

routerAPI.get('/list-user', authenticateToken , getListUser);

module.exports = routerAPI;
