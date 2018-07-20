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
function getCommentsByRecipe(recette_id) {
    return database(table)
    .select(table + '.id',
            table + '.content',
            table + '.user_id',
            'users.firstname')
    .where(`${table}.recette_id`, recette_id)
    .leftJoin('users', `${table}.user_id`, 'users.id')
    .orderBy(`${table}.id`, 'DESC')
}

module.exports = {
    getComments,
    getComment,
    getCommentsByRecipe
}