const User = require('../models/user');

const getListUser = async (req, res) => {
    User.findAll()
    .then(users => {
        // users sẽ là một mảng chứa tất cả records người dùng từ database
        res.json({
            success: true,
            message: 'Danh sách user',
            user: users,
        });
    })
    .catch(error => {
        // Xử lý lỗi nếu có
        res.status(500).json({ 
            success: false,
            message: 'Có lỗi khi lấy danh sách người dùng.',
         });
        console.error('Có lỗi khi lấy danh sách người dùng:', error);
    });
}

module.exports = {
    getListUser
}