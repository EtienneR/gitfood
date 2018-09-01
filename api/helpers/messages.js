module.exports = {
    home: {
        welcome: 'Welcome to the GitFood API',
        notFound: 'this page doesn\'t exists'
    },
    recipes: {
        nothing: 'no recipes available',
        notFound: 'Recipe not found',
        missingId: 'Missing recipe id',
        created: 'Recipe created',
        updated: 'Recipe updated',
        deleted: (id => `Recipe ${id} deleted`),
        noRecipes: 'No recipes for this user'
    },
    users: {
        notFound: 'User not found',
        missingId: 'Missing user id',
        created: 'User created',
        updated: 'User updated',
        deleted: (id => `User ${id} deleted`)
    },
    comments: {
        notFound: 'Comment not found',
        noCommentsForThisRecipe: 'No comments for this recipe',
        noCommentsForThisUser: 'No comments for this user',
        created: 'Comment created'
    },
    idNotInteger: 'Id must be an integer',
    emptyFields: 'Empty fields'
}