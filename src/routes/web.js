const express = require('express')

const {getHomepage} = require('../controllers/HomeController')
const router = express.Router()

router.get('/', getHomepage)

module.exports = router