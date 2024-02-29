const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const secret = process.env.SECRET_API;

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        if (user && bcrypt.compareSync(password, user.password)) {
          // Tạo JWT token
          const token = jwt.sign(
            { id: user.id, username: user.username },
            secret,
            { expiresIn: '1h' } // Token hết hạn sau 1 giờ
          );
          res.json({
            success: true,
            message: 'Đăng nhập thành công',
            token,
            user: {
              id: user.id,
              username: user.username,
            },
          });
        } else {
          res.status(401).json({ 
            success: false,
            message: 'Email hoặc mật khẩu không đúng',
         });
        }
      } catch (error) {
        res.status(500).json({ 
            success: false,
            message: 'Lỗi khi đăng nhập', error: error.message 
        });
      }
};

module.exports = {
    login
}