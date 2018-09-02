const database = require('./index.js').database
const table = 'comments'

/* Toutes les commentaires */
function getComments() {
    return database(table)
    .select('*')
    .orderBy(`${table}.id`, 'DESC')
}

/* Un seul commentaire */
function getComment(id) {
    return database(table)
    .select('*')
    .where(`${table}.id`, id)
    .first()
}

/* Commentaires par recette */
function getCommentsByRecipe(recipe_id) {
    return database(table)
    .select(`${table}.id`,
            `${table}.content`,
            `${table}.user_id`,
            'users.firstname')
    .where(`${table}.recipe_id`, recipe_id)
    .leftJoin('users', `${table}.user_id`, 'users.id')
    .orderBy(`${table}.id`, 'DESC')
}

/* Commentaires par utilisateur */
function getCommentsByUser(user_id) {
    return database(table)
    .select(`${table}.id`,
            `${table}.content`,
            'recipes.name')
    .where(`${table}.user_id`, user_id)
    .leftJoin('users', `${table}.user_id`, 'users.id')
    .leftJoin('recipes', `${table}.recipe_id`, 'recipes.id')
    .orderBy(`${table}.id`, 'DESC')
}

/* Ajouter un commentaire */
function postComment({ content, user_id, recipe_id }) {
    return database(table).insert({
        content: content,
        user_id: user_id,
        recipe_id: recipe_id
    }).returning('id')
}

/* Supprimer un commentaire */
function deleteComment(id) {
    return database(table)
    .where('id', id)
    .del()
}

/* Supprimer un tableau de commentaires */
function deleteComments(ids) {
    return database(table)
    .whereIn('id', ids)
    .del()
}

module.exports = {
    getComments,
    getComment,
    getCommentsByRecipe,
    getCommentsByUser,
    postComment,
    deleteComment,
    deleteComments
}