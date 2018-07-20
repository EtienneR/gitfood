const express = require('express')
const comments = require('../models/comments')
const checkIntegerId = require('../helpers/middlewares')
const message = require('../helpers/messages')

module.exports = express.Router()

/* Toutes les commentaires */
.get('/', (req, res) => {
    comments.getComments()
    .then(comments => res.status(200).json(comments))
    .catch(err => res.status(500).json(err))
})

/* Un seul commentaire */
.get('/:id', checkIntegerId, (req, res) => {
    const { id } = req.params

    comments.getComment(id)
    .then(comment => {
        if (comment) {
            res.status(200).json(comment)
        } else {
            res.status(400).json({ message: 'oups' })
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
            res.status(200).json(comments)
        } else {
            res.status(400).json({ message: 'Aucun commentaire pour cette recette' })
        }
    })
    .catch(err => res.status(500).json(err))
})

/* Ajouter un commentaire */
.post('/', (req, res) => {
    console.log('req.body', req.body)
    if (Object.keys(req.body).length > 0) {
        comments.postComment(req.body)
        .then(id => res.status(201).json({ message: 'Commentaire créé', id: id[0] }))
        .catch(err => res.status(500).json(err))
    } else {
        return res.status(400).json({ message: message.emptyFields })
    }
})