const recipesData = require('../recipes.js')

/* Création d'une recette avec son user_id associé */
const createRecipe = (knex, recipe) => {
	return knex('recipes').insert({
		name: recipe.name,
		image: recipe.image ? 'seeds/' + recipe.image : 'food.jpg',
		user_id: recipe.user_id,
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
			recipePromises.push(createRecipe(knex, recipe))
		})

		return Promise.all(recipePromises)
	})
}