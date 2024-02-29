const Product = require('../models/product');
const Image = require('../models/image');
const { validationResult } = require('express-validator');

const createProduct = async (req , res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const createDataProduct = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        status: req.body.status,
    };

    await Product.create(createDataProduct).then(product => {
        const imagePath = req.file.path;
        const createDataImage = {
            table: 'product',
            table_id: product.id,
            path: imagePath,
            status: 1,
        };

        Image.create(createDataImage)
            .then(image => {
                res.json({ 
                    success : true,
                    message: "Thêm sản phẩm thành công!",
                    data : product,
                });
            })
            .catch(error => {
                res.status(500).json({ 
                    success : false,
                    message: "Có lỗi khi thêm hình sản phẩm!",
                    error: error,
                });
        });
    }).catch(error => {
        res.status(500).json({ 
            success : false,
            message: "Có lỗi khi thêm sản phẩm !",
            error: error,
        });
    });
}
const listProduct = async (req , res) => {
    const products = await Product.findAll().catch(error => {
        res.status(500).json({ 
            success: false,
            message: 'Có lỗi khi lấy danh sách sản phẩm.',
         });
        console.error('Có lỗi khi lấy danh sách sản phẩm:', error);
    });
     
    const imagePromises = products.map(product =>
        Image.findOne({
            where: {
                table: 'product',
                table_id: product.id
            },
        })
    );

    const images = await Promise.all(imagePromises);

    const productList = products.map((product, index) => {
        const imagePath = images[index] ? images[index].path.replace(/\\/g, '/') : null;
            return {
                ...product.dataValues,
                images: imagePath,
            };
        });

    res.json({ 
        success : true,
        message: "List sản phẩm !",
        data : productList,
    });
};

module.exports = {
    createProduct,
    listProduct
}