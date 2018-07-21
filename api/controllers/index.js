const express = require('express')
const router = express.Router()

router.use('/', require('./home'))
router.use('/api/v1/recipes', require('./recipes'))
router.use('/api/v1/users', require('./users'))
router.use('/api/v1/comments', require('./comments'))

module.exports = router