const express = require('express')
const recipes = require('../models/recipes')
const checkIntegerId = require('../helpers/middlewares')
const message = require('../helpers/messages')

module.exports = express.Router()

/* Toutes les recettes */
.get('/', (req, res) => {
    recipes.getRecipes()
    .then(recettes => res.json(recettes))
    .catch(err => res.status(500).json(err))
})

/* Obtenir une recette via id_user */
.get('/user/:id_user', checkIntegerId, (req, res) => {
    const { id_user } = req.params

    recipes.getRecipesByAuthor(id_user)
    .then(recette => {
        if (recette.length > 0) {
            res.json(recette)
        } else {
            res.status(404).json({ message: message.recipes.noRecipes })
        }
    })
    .catch(err => res.status(500).json(err))
})

/* Obtenir une recette via son id */
.get('/:id', checkIntegerId, (req, res) => {
    const { id } = req.params

    recipes.getRecipe(id)
    .then(recette => {
        if (recette) {
            res.json(recette)
        } else {
            res.status(404).json({ message: message.recipes.notFound })
        }
    })
    .catch(err => res.status(500).json(err))
})

/* Obtenir les autres recettes du même utilisateur */
.get('/user/:id_user/others/:id', checkIntegerId, (req, res) => {
    const { id, id_user } = req.params

    recipes.getOthersRecipes(id_user, id)
    .then(recettes => {
        if (recettes && recettes.length > 0) {
            res.json(recettes)
        } else {
            res.status(400).json({ message: message.users.notFound })
        }
    })
    .catch(err => res.status(500).json(err))
})

/* Ajouter une recette */
.post('/', (req, res) => {
    if (Object.keys(req.body).length > 0) {
        recipes.postRecipe(req.body)
        .then(id => res.status(201).json({ message: message.recipes.created, id: id[0] }))
        .catch(err => res.status(500).json(err))
    } else {
        return res.status(400).json({ message: message.emptyFields })
    }
})

/* Modifier une recette */
.put('/:id', checkIntegerId, (req, res) => {
    const { id } = req.params

    if (id) {
        if (Object.keys(req.body).length > 0) {
            recipes.updateRecipe(id, req.body)
            .then(id => res.json({ message: message.recipes.updated, id: id[0] }) )
            .catch(err => res.status(500).json(err))
        } else {
            return res.status(400).json({ message: message.emptyFields })
        }
    } else {
        return res.status(400).json({ message: message.recipes.missingId })
    }
})
 
/* Supprimer une recette */
.delete('/:id', checkIntegerId, (req, res) => {
    const { id } = req.params

    if (id) {
        recipes.deleteRecipe(id)
        .then(() => res.json({ message: message.recipes.deleted(id) }) )
        .catch(err => res.status(500).json(err))
    } else {
        return res.status(400).json({ message: message.recipes.missingId })
    }
})