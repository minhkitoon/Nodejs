const User = require('../models/user');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const getListUser = async (req, res) => {
    await User.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(users => {
        res.json({
            success: true,
            message: 'Danh sách user',
            user: users,
        });
    })
    .catch(error => {
        res.status(500).json({ 
            success: false,
            message: 'Có lỗi khi lấy danh sách người dùng.',
         });
        console.error('Có lỗi khi lấy danh sách người dùng:', error);
    });
}

const getDetailUser = async (req, res) => {
    const id = req.params.id;
    await User.findOne({
        where: { id: id },
        attributes: { exclude: ['password'] }
    })
    .then(users => {
        message = 'Chi tiết user !';
        if(users == null)
             message = 'không tìm thấy user !';
        res.json({
            success: true,
            message: message,
            user: users,
        });
    })
    .catch(error => {
        res.status(500).json({ 
            success: false,
            message: 'Có lỗi khi lấy chi tiết người dùng.',
         });
        console.error('Có lỗi khi lấy chi tiết người dùng:', error);
    });
}

const editUser = async (req, res) => {
    const id = req.params.id;
    const updateData = req.body;

    await User.update(updateData, {
        where: { id: id }
    }).then(users => {
        message = 'Sửa user thành công';
        res.json({
            success: true,
            message: message,
        });
    })
    .catch(error => {
        res.status(500).json({ 
            success: false,
            message: 'Có lỗi khi sửa người dùng.',
         });
        console.error('Có lỗi khi sửa người dùng:', error);
    });
}

const createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const id = req.params.id;
    const hashedPassword = await bcrypt.hash(req.body.password, 8);
    const createData = {
        username: req.body.username,
        password: hashedPassword,
        status: req.body.status,
    };

    await User.create(createData).then(users => {
        message = 'Thêm user thành công';
        res.json({
            success: true,
            message: message,
        });
    })
    .catch(error => {
        res.status(500).json({ 
            success: false,
            message: 'Có lỗi khi thêm người dùng.',
         });
        console.error('Có lỗi khi thêm người dùng:', error);
    });
}
const deleteUser = async (req, res) => {
    const id = req.params.id;
    await User.destroy({
        where: { id: id }
    }).then(users => {
        message = 'Xóa user thành công';
        res.json({
            success: true,
            message: message,
        });
    }).catch(error => {
        res.status(500).json({ 
            success: false,
            message: 'Có lỗi khi xóa người dùng.',
         });
        console.error('Có lỗi khi xóa người dùng:', error);
    });;
}
module.exports = {
    getListUser,
    getDetailUser,
    editUser,
    createUser,
    deleteUser
}