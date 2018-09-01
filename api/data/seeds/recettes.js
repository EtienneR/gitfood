const recettesData = require('../recettes.js')
const usersData = require('../users.js')
const commentsData = require('../comments.js')

/* Création d'une recette avec son user_id associé */
const createRecette = (knex, recette, user) => {
	return knex('recettes').insert({
		name: recette.name,
		user_id: user,
		image: 'food.jpg',
		introduction: recette.introduction,
		ingredients: JSON.stringify(recette.ingredients),
		instructions: JSON.stringify(recette.instructions),
		conclusion: recette.conclusion,
		published: recette.published
	})
}

exports.seed = function(knex, Promise) {
	// Suppression des données
	return knex('recettes').del()
	.then(() => knex('comments').del())
	.then(() => knex('users').del())
	// Insertion des données dans la table "users"
	.then(() => knex('users').insert(usersData))
	.then(() => {
		// Création d'un tableau pour les recettes
		let recettePromises = []
		recettesData.forEach(recette => {
			// Ajout de chaque recette dans le tableau des recettes
			recettePromises.push(createRecette(knex, recette, recette.user_id))
		})
		
		return Promise.all(recettePromises)
	})
	// Insertion des données dans la table "comments"
	.then(() => knex('comments').insert(commentsData))
}