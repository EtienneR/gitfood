const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const app = express()

app.use(cors())
app.use('/img', express.static('./public/img'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('tiny'))
app.use(helmet())
app.use(require('./controllers'))

module.exports = app