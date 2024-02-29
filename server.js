require('dotenv').config();
const express = require('express')
const configViewEngine = require('./src/config/viewEngine')
const cors = require('cors');
const path = require('path');
const app = express()
const port = process.env.PORT || 8888;
const hostname = process.env.HOSTNAME;
const APIRouter = require('./src/routes/api');
const WebRouter = require('./src/routes/web');
//const connection = require('./src/config/database');

//config view engine
configViewEngine(app)

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cấu hình thư mục uploads là public
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/', WebRouter)
app.use('/api', APIRouter)

app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`)
})