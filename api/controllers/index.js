const express = require('express')
const message = require('../helpers/messages')
const router = express.Router()

router.use('/', require('./home'))
router.use('/api/v1/recipes', require('./recipes'))
router.use('/api/v1/users', require('./users'))
router.use('/api/v1/comments', require('./comments'))

// Routes non définies = 404
router.all('/*', (req, res) => {
    res.status(404).json({ 'message': message.home.notFound })
})

module.exports = router