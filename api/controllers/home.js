const express = require('express')
const message = require('../helpers/messages')
const router = express.Router()

/* Page d'accueil */
router.get('/', (req, res) => {
    res.json({ message: message.home.welcome })
})

module.exports = router