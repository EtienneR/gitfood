const express = require('express')

module.exports = express.Router()

/* Page d'accueil */
.get('/', (req, res) => {
    res.json({ message: 'Welcome to the GitFood API' })
})