const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('tiny'))

app.use('/', require('./controllers/home'))
app.use('/api/v1/recipes', require('./controllers/recipes'))
app.use('/api/v1/users', require('./controllers/users'))
app.use('/api/v1/comments', require('./controllers/comments'))

// Routes non définies = 404
app.all('/*', (req, res) => {
    return res.status(404).json({ 'error': 'this page doesn\'t exists' })
})

module.exports = app