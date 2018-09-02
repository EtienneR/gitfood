const database = require('./index.js').database
const table = 'likes'

/* Toutes les likes */
function getLikes() {
    return database(table)
    .select('*')
    .orderBy(`${table}.id`, 'DESC')
}

/* Touts les likes par recette */
function getLikesByRecipe(recipe_id) {
    return database(table)
    .select('*')
    .where(`${table}.recipe_id`, recipe_id)
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

/* Supprimer un like */
function deleteLike(id) {
    return database(table)
    .where('id', id)
    .del()
}

/* Supprimer un tableau de likes */
function deleteLikes(ids) {
    return database(table)
    .whereIn('id', ids)
    .del()
}

module.exports = {
    getLikes,
    getLikesByRecipe,
    getLike,
    postLike,
    existingLike,
    deleteLike,
    deleteLikes
}