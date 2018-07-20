const express = require('express')
const users = require('../models/users')
const checkIntegerId = require('../helpers/middlewares')
const message = require('../helpers/messages')

module.exports = express.Router()

/* Obtenir un user via son id */
.get('/:id', checkIntegerId, (req, res) => {
    const { id } = req.params

    users.getUser(id)
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
.post('/', (req, res) => {
    if (Object.keys(req.body).length > 0) {
        users.createUser(req.body)
        .then(id =>  res.status(201).json({ message: message.users.created, id: id[0] }))
        .catch(err => res.status(500).json(err))
    } else {
        return res.status(400).json({ message: message.emptyFields })
    }
})

/* Supprimer un utilisateur */
.delete('/:id', checkIntegerId, (req, res) => {
    const { id } = req.params

    if (id) {
        users.deleteUser(id)
        .then(user => {
            if (user) {
                res.json({ message: message.users.deleted(id) })
            } else {
                res.status(404).json({ message: message.users.notFound, })
            }
        })
        .catch(err => res.status(500).json(err))
    } else {
        return res.status(400).json({ message: message.users.missingId })
    }
})