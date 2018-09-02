const express = require('express')
const router = express.Router()
const comments = require('../models/comments')
const m = require('../helpers/middlewares')
const message = require('../helpers/messages')

/* Tous les commentaires */
router.get('/', async (req, res) => {
    await comments.getComments()
    .then(comments => {
        if (comments.length > 0) {
            res.json(comments)
        } else {
            res.status(202).json({ message: 'no comment available' })
        }
    })
    .catch(err => res.status(500).json(err))
})

/* Un seul commentaire */
router.get('/:id', m.checkIntegerId, async (req, res) => {
    const { id } = req.params

    await comments.getComment(id)
    .then(comment => {
        if (comment) {
            res.json(comment)
        } else {
            res.status(404).json({ message: message.comments.notFound })
        }
    })
    .catch(err => res.status(500).json(err))
})

/* Commentaires par recette */
router.get('/recipe/:recipe_id', m.checkIntegerId, async (req, res) => {
    const { recipe_id } = req.params

    await comments.getCommentsByRecipe(recipe_id)
    .then(comments => {
        if (comments.length > 0) {
            res.json(comments)
        } else {
            res.status(404).json({ message: message.comments.noCommentsForThisRecipe })
        }
    })
    .catch(err => res.status(500).json(err))
})

/* Commentaires par utilisateur */
router.get('/user/:user_id', m.checkIntegerId, async (req, res) => {
    const { user_id } = req.params

    await comments.getCommentsByUser(user_id)
    .then(comments => {
        if (comments.length > 0) {
            res.json(comments)
        } else {
            res.status(404).json({ message: message.comments.noCommentsForThisUser })
        }
    })
    .catch(err => res.status(500).json(err))
})

/* Ajouter un commentaire */
router.post('/', m.checkFields, async (req, res) => {
    await comments.postComment(req.body)
    .then(id => res.status(201).json({ message: message.comments.created, id: id[0] }))
    .catch(err => res.status(500).json(err))
})

/* Supprimer un commentaire */
router.delete('/:id', m.checkIntegerId, async (req, res) => {
    const { id } = req.params

    if (id) {
        await comments.deleteComment(id)
        .then(() => res.json({ message: message.comments.deleted(id) }) )
        .catch(err => res.status(500).json(err))
    } else {
        return res.status(400).json({ message: message.noCommentsForThisRecipe.missingId })
    }
})

module.exports = router