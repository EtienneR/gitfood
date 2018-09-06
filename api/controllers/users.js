const express = require('express')
const router = express.Router()
const users = require('../models/users')
const m = require('../helpers/middlewares')
const message = require('../helpers/messages')

/* Obtenir un user via son id */
router.get('/:id', m.checkIntegerId, async (req, res) => {
    const { id } = req.params

    await users.getUser(id)
    .then(user => {
        if (user) {
            res.json(user)
        } else {
            res.status(404).json({ message: message.users.notFound })
        }
    })
    .catch(err => res.status(500).json(err))
})

/* Ajouter un utilisateur */
router.post('/', m.checkFields, async (req, res) => {
    await users.createUser(req.body)
    .then(id => res.status(201).json({ message: message.users.created, id: id[0] }))
    .catch(err => res.status(500).json(err))
})

/* Supprimer un utilisateur */
router.delete('/:id', m.checkIntegerId, async (req, res) => {
    const { id } = req.params

    await users.deleteUser(id)
    .then(user => {
        if (user) {
            res.json({ message: message.users.deleted(id) })
        } else {
            res.status(404).json({ message: message.users.notFound })
        }
    })
    .catch(err => res.status(500).json(err))
})

module.exports = router