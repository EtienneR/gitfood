const recipesData = require('../recipes.js')

exports.seed = (knex, Promise) => {
	return knex('recipes')
	.del()
	.then(() => {
		return createRecipes(knex, recipesData)
	})
}

/* Insertion des recettes */
const createRecipes = (knex, recipes) => {
	return Promise.all(
		recipes.map(recipe => {
			return {
				name: recipe.name,
				image: recipe.image ? 'seeds/' + recipe.image : 'food.jpg',
				introduction: recipe.introduction,
				ingredients: JSON.stringify(recipe.ingredients),
				instructions: JSON.stringify(recipe.instructions),
				conclusion: recipe.conclusion,
				published: recipe.published,
				user_id: recipe.user_id
			}
		})
	)
	.then(recipes => {
		return knex('recipes').insert(recipes)
	})
}