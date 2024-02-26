const path = require('path')
const express = require('express')
//config template egin
const configViewEngine = (app)=> {
    app.set('views','./src/views')
    app.set('views engine','ejs')
    //public thư mục 
    app.use(express.static('public'))
}
//export hàm 
module.exports = configViewEngine;