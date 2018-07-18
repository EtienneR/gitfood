const express = require('express')

module.exports = express.Router()

/* Page d'accueil */
.get('/', (req, res) => {
    res.send('Welcome to the GitFood API :)<br /> - Recipes : /api/v1/recipes <br />- Users : /api/v1/users')
})