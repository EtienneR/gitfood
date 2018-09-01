const recipesData = require('../recipes.js')
const usersData = require('../users.js')
const commentsData = require('../comments.js')

/* Création d'une recette avec son user_id associé */
const createRecette = (knex, recipe, user) => {
	return knex('recipes').insert({
		name: recipe.name,
		user_id: user,
		image: 'food.jpg',
		introduction: recipe.introduction,
		ingredients: JSON.stringify(recipe.ingredients),
		instructions: JSON.stringify(recipe.instructions),
		conclusion: recipe.conclusion,
		published: recipe.published
	})
}

exports.seed = function(knex, Promise) {
	// Suppression des données
	return knex('recipes').del()
	.then(() => knex('comments').del())
	.then(() => knex('users').del())
	// Insertion des données dans la table "users"
	.then(() => knex('users').insert(usersData))
	.then(() => {
		// Création d'un tableau pour les recettes
		let recettePromises = []
		recipesData.forEach(recipe => {
			// Ajout de chaque recette dans le tableau des recettes
			recettePromises.push(createRecette(knex, recipe, recipe.user_id))
		})
		
		return Promise.all(recettePromises)
	})
	// Insertion des données dans la table "comments"
	.then(() => knex('comments').insert(commentsData))
}