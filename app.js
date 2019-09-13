const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')
const path = require('path')

const app = express();
const sequelize = require('./util/DBconnection')

const port = 3001

require('./models')

const rotas = require('./routes')

//app.use(bodyParser.urlencoded()) //x-www-form-urlencoded <form>
app.use(bodyParser.json()) //application/json

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use(cors())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(rotas)

sequelize
  .sync()

app.listen(port, () => console.log(`Servidor ON:${port}`))