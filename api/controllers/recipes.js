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
        // Récupération du nombre de likes
        const l = await likes.getLikesByRecipe(id)
        const nbLikes = { nbLikes : l.length }
        // Récupération des commentaires 
        const c = await comments.getCommentsByRecipe(id)
        const nbComments = { nbComments : c.length }
        // Récupération de la recette
        const recipe = await recipes.getRecipe(id)
        // Récupération autre recettes du même auteur
        const s = await recipes.getOthersRecipes(recipe.user_id, id)
        const nbSameAuthor = { nbSameAuthor: s.length }
        // Ajout du nombre de likes dans la recette
        const result = {...recipe, ...nbLikes, ...nbComments, ...nbSameAuthor}

        res.json(result)
    } catch(err) {
        res.status(500).json(err)
    }
})

/* Obtenir une recette via id_user */
router.get('/user/:id_user', m.checkIntegerId, async (req, res) => {
    const { id_user } = req.params

    try {
        const r = await recipes.getRecipesByAuthor(id_user)
        if (r.length > 0) {
            const forks = await recipes.getForks(id_user)
            const nbForks = { nbForks: forks.length }
            const array = {recipes: r}
            const result = {...array, ...nbForks}
            res.json(result)
        } else {
            res.status(404).json({ message: message.recipes.noRecipes })
        }
    } catch(err) {
        res.status(500).json(err)
    }

    // await recipes.getRecipesByAuthor(id_user)
    // .then(recipe => {
    //     if (recipe.length > 0) {
    //         res.json(recipe)
    //     } else {
    //         res.status(404).json({ message: message.recipes.noRecipes })
    //     }
    // })
    // .catch(err => res.status(500).json(err))
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
router.put('/:id', m.checkIntegerId, async (req, res) => {
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
router.delete('/:id', m.checkIntegerId, async (req, res) => {
    const { id } = req.params

    if (id) {
        // Vérification des commentaires associés
        await comments.getCommentsByRecipe(id)
        .then(c => {
            if (c.length > 0) {
                // Récupération des id dans un tableau
                let ids = []
                c.forEach(comment => {
                    ids.push(comment.id)
                })
                // Suppression des commentaires associés
                comments.deleteComments(ids)
                .then(() => {
                    likes.getLikesByRecipe(id)
                    .then(l => {
                        if (l.length > 0) {
                            let ids = []
                            l.forEach(like => {
                                ids.push(likes.id)
                            })
                            // Suppression des likes associés
                            likes.deleteLikes(ids)
                            .then(() => {
                                // Suppression de la recette
                                recipes.deleteRecipe(id)
                                .then(() => res.json({ message: message.recipes.deleted(id) }))
                                .catch(err => res.status(500).json(err))
                            })
                        } else {
                            // Suppression de la recette
                            recipes.deleteRecipe(id)
                            .then(() => res.json({ message: message.recipes.deleted(id) }))
                            .catch(err => res.status(500).json(err))
                        }
                    })
                })
            } else {
                likes.getLikesByRecipe(id)
                .then(l => {
                    if (l.length > 0) {
                        let ids = []
                        l.forEach(like => {
                            ids.push(like.id)
                        })
                        // Suppression des likes associés
                        likes.deleteLikes(ids)
                        .then(() => {
                            // Suppression de la recette
                            recipes.deleteRecipe(id)
                            .then(() => res.json({ message: message.recipes.deleted(id) }))
                            .catch(err => res.status(500).json(err))
                        })
                    } else {
                        // Suppression de la recette
                        recipes.deleteRecipe(id)
                        .then(() => res.json({ message: message.recipes.deleted(id) }))
                        .catch(err => res.status(500).json(err))
                    }
                })
            }
        }) 
    } else {
        return res.status(400).json({ message: message.recipes.missingId })
    }
})

module.exports = router