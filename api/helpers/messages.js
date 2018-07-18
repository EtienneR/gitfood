module.exports = {
    recipes: {
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
    idNotInteger: 'Id must be an integer',
    emptyFields: 'Empty fields'
}