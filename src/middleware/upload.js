const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');  // Thư mục lưu trữ hình ảnh
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));  // Tạo tên file duy nhất
    }
});

const upload = multer({ storage: storage });
module.exports = upload;