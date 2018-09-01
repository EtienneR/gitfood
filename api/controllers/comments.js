const express = require('express')
const comments = require('../models/comments')
const checkIntegerId = require('../helpers/middlewares')
const message = require('../helpers/messages')

module.exports = express.Router()

/* Toutes les commentaires */
.get('/', (req, res) => {
    comments.getComments()
    .then(comments => res.json(comments))
    .catch(err => res.status(500).json(err))
})

/* Un seul commentaire */
.get('/:id', checkIntegerId, (req, res) => {
    const { id } = req.params

    comments.getComment(id)
    .then(comment => {
        if (comment) {
            res.json(comment)
        } else {
            res.status(400).json({ message: message.comments.notFound })
        }
    })
    .catch(err => res.status(500).json(err))
})

/* Commentaires par recette */
.get('/recipe/:recette_id', checkIntegerId, (req, res) => {
    const { recette_id } = req.params

    comments.getCommentsByRecipe(recette_id)
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
.get('/user/:user_id', checkIntegerId, (req, res) => {
    const { user_id } = req.params

    comments.getCommentsByUser(user_id)
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
.post('/', (req, res) => {
    if (Object.keys(req.body).length > 0) {
        comments.postComment(req.body)
        .then(id => res.status(201).json({ message: message.comments.created, id: id[0] }))
        .catch(err => res.status(500).json(err))
    } else {
        return res.status(400).json({ message: message.emptyFields })
    }
})