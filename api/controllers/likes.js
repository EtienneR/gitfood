const express = require('express')
const router = express.Router()
const likes = require('../models/likes')
const m = require('../helpers/middlewares')
const message = require('../helpers/messages')

/* Tous les likes */
router.get('/', async (req, res) => {
    await likes.getLikes()
    .then(likes => {
        if (likes.length > 0) {
            res.json(likes)
        } else {
            res.status(202).json({ message: message.likes.nothing })
        }
    })
    .catch(err => res.status(500).json(err))
})

/* Un seul like */
router.get('/:id', m.checkIntegerId, async (req, res) => {
    const { id } = req.params

    await likes.getLike(id)
    .then(like => {
        if (like) {
            res.json(like)
        } else {
            res.status(404).json({ message: message.likes.notFound })
        }
    })
    .catch(err => res.status(500).json(err))
})

/* Ajouter un like */
router.post('/', m.checkFields, async (req, res) => {
    await likes.existingLike(req.body)
    .then(e => {
        if (!e) {
            likes.postLike(req.body)
            .then(id => res.status(201).json({ message: message.likes.created, id: id[0] }))
            .catch(err => res.status(500).json(err))
        } else {
            res.status(400).json({ message: 'existing', id: e.id })
        }
    })
    .catch(err => res.status(500).json(err))
})

/* Supprimer un commentaire */
router.delete('/:id', m.checkIntegerId, async (req, res) => {
    const { id } = req.params

    await likes.deleteLike(id)
    .then(() => res.json({ message: message.likes.deleted(id) }) )
    .catch(err => res.status(500).json(err))
})

module.exports = router