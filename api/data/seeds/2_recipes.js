const recipesData = require('../recipes.js')

/* Création d'une recette avec son user_id associé */
const createRecipe = (knex, recipe, user) => {
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

exports.seed = (knex, Promise) => {
	return knex('recipes')
	.del()
	.then(() => {
		let recipePromises = []
		recipesData.forEach(recipe => {
			// Ajout de chaque recette dans le tableau des recettes
			recipePromises.push(createRecipe(knex, recipe, recipe.user_id))
		})

		return Promise.all(recipePromises)
	})
}