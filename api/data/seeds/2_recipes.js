const recipesData = require('../recipes.js')

/* Création d'une recetteZ avec son user_id associé */
const createRecipe = (knex, recipe) => {
	//console.log('createRecipe', recipe.user_id, recipe.name)
	return knex('recipes').insert({
		id: recipe.id,
		name: recipe.name,
		image: recipe.image ? 'seeds/' + recipe.image : 'food.jpg',
		introduction: recipe.introduction,
		ingredients: JSON.stringify(recipe.ingredients),
		instructions: JSON.stringify(recipe.instructions),
		conclusion: recipe.conclusion,
		published: recipe.published,
		user_id: recipe.user_id
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