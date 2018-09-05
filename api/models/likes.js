const database = require('./index.js').database
const table = 'likes'

/* Tous les likes */
function getLikes() {
    return database(table)
    .select('*')
    .orderBy(`${table}.id`, 'DESC')
}

/* Tous les likes par recette */
function getLikesByRecipe(recipe_id) {
    return database(table)
    .select('*')
    .where(`${table}.recipe_id`, recipe_id)
    .orderBy(`${table}.id`, 'DESC')
}

/* Tous les likes par auteur */
function getLikesByAuthor(user_id) {
    return database(table)
    .select('*')
    .where(`${table}.user_id`, user_id)
    .orderBy(`${table}.id`, 'DESC')
}

/* Un seul like */
function getLike(id) {
    return database(table)
    .select('*')
    .where(`${table}.id`, id)
    .first()
}

/* Ajouter un like */
function postLike({ user_id, recipe_id }) {
    return database(table).insert({
        user_id: user_id,
        recipe_id: recipe_id
    }).returning('id')
}

function existingLike({ user_id, recipe_id }) {
    return database(table)
    .select('*')
    .where(`${table}.user_id`, user_id)
    .where(`${table}.recipe_id`, recipe_id)
    .first()
}

function existingLikeArray(ids) {
    return database(table)
    .select('*')
    .whereIn(`${table}.recipe_id`, ids)
}

/* Supprimer un like */
function deleteLike(id) {
    return database(table)
    .where('id', id)
    .del()
}

module.exports = {
    getLikes,
    getLikesByRecipe,
    getLikesByAuthor,
    getLike,
    postLike,
    existingLike,
    existingLikeArray,
    deleteLike
}