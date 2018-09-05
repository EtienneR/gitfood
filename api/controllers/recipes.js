const express = require('express')
const router = express.Router()
const recipes = require('../models/recipes')
const comments = require('../models/comments')
const likes = require('../models/likes')
const m = require('../helpers/middlewares')
const message = require('../helpers/messages')

/* Toutes les recettes */
router.get('/', async (req, res) => {
    if (req.query.q) {
        await recipes.getRecipesSearch(req.query.q)
        .then(recipes => {
            if (recipes.length > 0) {
                res.json(recipes)
            } else {
                res.status(404).json({ message: 'no recipes found' })
            }
        })
        .catch(err => res.status(500).json(err))
    } else {
        await recipes.getRecipes()
        .then(recipes => {
            if (recipes.length > 0) {
                res.json(recipes)
            } else {
                res.status(202).json({ message: message.recipes.nothing })
            }
        })
        .catch(err => res.status(500).json(err))
    }
})

/* Obtenir une recette via son id */
router.get('/:id', m.checkIntegerId, async (req, res) => {
    const { id } = req.params

    try {
        // Récupération de la recette
        const recipe = await recipes.getRecipe(id)
        if (!recipe) {
            res.status(404).json({ message: message.recipes.notFound })
        }

        // Récupération du nombre de likes
        const l = await likes.getLikesByRecipe(id)
        const nbLikes = { nbLikes: l.length }

        // Récupération des commentaires 
        const c = await comments.getCommentsByRecipe(id)
        const nbComments = { nbComments : c.length }
        // Récupération de la recette

        // Récupération autre recettes du même auteur
        const s = await recipes.getOthersRecipes(recipe.user_id, id)
        const nbSameAuthor = { nbSameAuthor: s.length }

        // Ajout du nombre de likes dans la recette
        const result = { ...recipe, ...nbLikes, ...nbComments, ...nbSameAuthor }
        res.json(result)

    } catch(err) {
        res.status(500).json(err)
    }
})

/* Obtenir une recette via id_user */
router.get('/user/:id_user', m.checkIntegerId, async (req, res) => {
    const { id_user } = req.params

    try {
        // Récupération des recettes par utilisateur
        const r = await recipes.getRecipesByAuthor(id_user)
        if (r.length > 0) {
            // Récupération du nombre de forks obtenus
            const forks = await recipes.getForks(id_user)
            const nbForks = { nbForks: forks.length }

            // Récupération du nombre de likes obtenus
            let ids = []
            r.forEach(recipe => {
                ids.push(recipe.id)
            })
            const like = await likes.existingLikeArray(ids)
            const nbLikes = { nbLikes: like.length }

            const array = { recipes: r }
            const result = { ...array, ...nbForks, ...nbLikes }
            res.json(result)
        } else {
            res.status(404).json({ message: message.recipes.noRecipes })
        }

    } catch(err) {
        res.status(500).json(err)
    }
})

/* Obtenir les autres recettes du même utilisateur */
router.get('/user/:id_user/others/:id', m.checkIntegerId, async (req, res) => {
    const { id, id_user } = req.params

    await recipes.getOthersRecipes(id_user, id)
    .then(recipes => {
        if (recipes.length > 0) {
            res.json(recipes)
        } else {
            res.status(404).json({ message: message.users.notFound })
        }
    })
    .catch(err => res.status(500).json(err))
})

router.get('/forks/:id_user', m.checkIntegerId, async (req, res) => {
    const { id_user } = req.params

    await recipes.getForks(id_user)
    .then(recipes => {
        if (recipes && recipes.length > 0) {
            res.json(recipes)
        } else {
            res.status(404).json({ message: message.recipes.notFound })
        }
    })
    .catch(err => res.status(500).json(err))
})

/* Ajouter une recette */
router.post('/', m.checkFields, async (req, res) => {
    await recipes.postRecipe(req.body)
    .then(id => res.status(201).json({ message: message.recipes.created, id: id[0] }))
    .catch(err => res.status(500).json(err))
})

/* Modifier une recette */
router.put('/:id', m.checkIntegerId, m.checkFields, async (req, res) => {
    const { id } = req.params

    await recipes.updateRecipe(id, req.body)
    .then(id => res.json({ message: message.recipes.updated, id: id[0] }) )
    .catch(err => res.status(500).json(err))
})
 
/* Supprimer une recette */
router.delete('/:id', m.checkIntegerId, async (req, res) => {
    const { id } = req.params

    await recipes.deleteRecipe(id)
    .then(id => res.json({ message: message.recipes.deleted(id) }))
    .catch(err => res.status(500).json(err))
})

module.exports = router