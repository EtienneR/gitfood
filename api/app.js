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

// Routes non définies = 404
app.all('/*', (req, res) => {
    return res.status(404).json({ 'error': 'this page doesn\'t exists' })
})

module.exports = app