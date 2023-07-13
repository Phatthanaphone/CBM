const express = require('express')
const app = express();

var path = require('path')
const multer = require('multer')

const cors = require('cors')
const authentication = require('./authentication')

app.use(cors())

var indexRouter = require('./routes/manual')
var registerRouter = require('./routes/register')

app.use(logger('dev'))


app.use(express.json())

app.use(express.urlencoded({extended: false}))


app.use('/loginRouter', logi)