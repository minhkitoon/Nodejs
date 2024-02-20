const express = require('express')
require('dotenv').config();

const app = express()
const port = process.env.PORT || 8888;
const hostname = process.env.HOSTNAME

//config template egin
app.set('views','./src/views')
app.set('views engine','ejs')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('home.ejs')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})