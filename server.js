require('dotenv').config();
const express = require('express')
const configViewEngine = require('./src/config/viewEngine')
const cors = require('cors');
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

app.use('/', WebRouter)
app.use('/api', APIRouter)

app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`)
})