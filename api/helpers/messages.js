module.exports = {
    home: {
        welcome: 'Welcome to the GitFood API',
        notFound: 'this page doesn\'t exists'
    },
    recipes: {
        nothing: 'no recipes available',
        notFound: 'recipe not found',
        created: (id => `recipe ${id} created`),
        updated: (id => `recipe ${id} updated`),
        deleted: (id => `recipe ${id} deleted`),
        noRecipes: 'no recipes for this user'
    },
    users: {
        notFound: 'user not found',
        created: (id => `User ${id} created`),
        deleted: (id => `User ${id} deleted`)
    },
    comments: {
        nothing: 'no comment available',
        notFound: 'comment not found',
        created: (id => `comment ${id} created`),
        deleted: (id => `comment ${id} deleted`),
        noCommentsForThisRecipe: 'no comments for this recipe',
        noCommentsForThisUser: 'no comments for this user'
    },
    likes: {
        nothing: 'no likes available',
        notFound: 'Like not found',
        created: (id => `like ${id} created`),
        deleted: (id => `like ${id} deleted`),
    },
    idNotInteger: 'Id must be an integer',
    emptyFields: 'Empty fields'
}