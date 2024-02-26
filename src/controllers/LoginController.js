const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const secret = process.env.SECRET_API;

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Tìm user bằng email
        const user = await User.findOne({ where: { username } });
        // Kiểm tra user tồn tại và mật khẩu đúng
        if (user && bcrypt.compareSync(password, user.password)) {
          // Tạo JWT token
          const token = jwt.sign(
            { id: user.id, username: user.username },
            secret,
            { expiresIn: '1h' } // Token hết hạn sau 1 giờ
          );
          // Trả về token và thông tin user
          res.json({
            success: true,
            message: 'Đăng nhập thành công',
            token,
            user: {
              id: user.id,
              username: user.username,
              // Các thuộc tính khác của user mà bạn muốn trả về
            },
          });
        } else {
          // Thông báo lỗi nếu không xác thực được
          res.status(401).json({ 
            success: false,
            message: 'Email hoặc mật khẩu không đúng',
         });
        }
      } catch (error) {
        // Xử lý lỗi server
        res.status(500).json({ 
            success: false,
            message: 'Lỗi khi đăng nhập', error: error.message 
        });
      }
};

module.exports = {
    login
}