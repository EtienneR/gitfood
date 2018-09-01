const express = require('express')
const recipes = require('../models/recipes')
const checkIntegerId = require('../helpers/middlewares')
const message = require('../helpers/messages')
const router = express.Router()

/* Toutes les recettes */
router.get('/', async (req, res) => {
    if (req.query.q) {
        await recipes.getRecipesSearch(req.query.q)
        .then(recettes => {
            if (recettes.length > 0) {
                res.json(recettes)
            } else {
                res.status(404).json({ message: 'no recipes found' })
            }
        })
        .catch(err => res.status(500).json(err))
    } else {
        await recipes.getRecipes()
        .then(recettes => {
            if (recettes.length > 0) {
                res.json(recettes)
            } else {
                res.status(202).json({ message: 'no recipes available' })
            }
        })
        .catch(err => res.status(500).json(err))

    }
})

/* Obtenir une recette via id_user */
router.get('/user/:id_user', checkIntegerId, async (req, res) => {
    const { id_user } = req.params

    await recipes.getRecipesByAuthor(id_user)
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
router.get('/:id', checkIntegerId, async (req, res) => {
    const { id } = req.params

    await recipes.getRecipe(id)
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
router.get('/user/:id_user/others/:id', checkIntegerId, async (req, res) => {
    const { id, id_user } = req.params

    await recipes.getOthersRecipes(id_user, id)
    .then(recettes => {
        if (recettes && recettes.length > 0) {
            res.json(recettes)
        } else {
            res.status(400).json({ message: message.users.notFound })
        }
    })
    .catch(err => res.status(500).json(err))
})

router.get('/forks/:id_user', checkIntegerId, async (req, res) => {
    const { id_user } = req.params

    await recipes.getForks(id_user)
    .then(recettes => {
        if (recettes && recettes.length > 0) {
            res.json(recettes)
        } else {
            res.status(404).json({message: message.recipes.notFound})
        }
    })
    .catch(err => res.status(500).json(err))
})

/* Ajouter une recette */
router.post('/', async (req, res) => {
    if (Object.keys(req.body).length > 0) {
        await recipes.postRecipe(req.body)
        .then(id => res.status(201).json({ message: message.recipes.created, id: id[0] }))
        .catch(err => res.status(500).json(err))
    } else {
        return res.status(400).json({ message: message.emptyFields })
    }
})

/* Modifier une recette */
router.put('/:id', checkIntegerId, async (req, res) => {
    const { id } = req.params

    if (id) {
        if (Object.keys(req.body).length > 0) {
            await recipes.updateRecipe(id, req.body)
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
router.delete('/:id', checkIntegerId, async (req, res) => {
    const { id } = req.params

    if (id) {
        await recipes.deleteRecipe(id)
        .then(() => res.json({ message: message.recipes.deleted(id) }) )
        .catch(err => res.status(500).json(err))
    } else {
        return res.status(400).json({ message: message.recipes.missingId })
    }
})

module.exports = router