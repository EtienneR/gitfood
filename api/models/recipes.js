const database = require('./index.js').database
const table = 'recipes'

function getRecipes() {
    return database(table)
    .select(`${table}.id`,
            `${table}.name`,
            `${table}.image`,
            `${table}.introduction`,
            `${table}.ingredients`,
            `${table}.instructions`,
            `${table}.conclusion`,
            `${table}.published`,
            `${table}.created_at`,
            `${table}.updated_at`,
            `${table}.user_id`,
            `${table}.id_parent`,
            'users.firstname')
    .leftJoin('users', `${table}.user_id`, 'users.id')
    .where(`${table}.published`, true)
    .orderBy(`${table}.id`, 'DESC')
}

function getRecipesSearch(q) {
    return database(table)
    .select(`${table}.id`,
            `${table}.name`,
            `${table}.image`,
            `${table}.introduction`,
            `${table}.ingredients`,
            `${table}.instructions`,
            `${table}.conclusion`,
            `${table}.published`,
            `${table}.created_at`,
            `${table}.updated_at`,
            `${table}.user_id`,
            `${table}.id_parent`,
            'users.firstname')
    .leftJoin('users', `${table}.user_id`, 'users.id')
    .where(`${table}.published`, true)
    .where(`${table}.name`, 'ilike', `%${q}%`)
    .orderBy(`${table}.id`, 'DESC')
}

function getRecipe(id) {
    return database(table)
    .select(`${table}.id`,
            `${table}.name`,
            `${table}.image`,
            `${table}.introduction`,
            `${table}.ingredients`,
            `${table}.instructions`,
            `${table}.conclusion`,
            `${table}.published`,
            `${table}.created_at`,
            `${table}.updated_at`,
            `${table}.user_id`,
            'users.firstname')
    .leftJoin('users', `${table}.user_id`, 'users.id')
    .where(`${table}.id`, parseInt(id))
    .first()
}

function getOthersRecipes(user_id, id) {
    return database(table)
    .select(`${table}.id`,
            `${table}.name`,
            `${table}.introduction`,
            `${table}.ingredients`,
            `${table}.instructions`,
            `${table}.conclusion`,
            `${table}.published`,
            `${table}.created_at`,
            `${table}.updated_at`,
            `${table}.user_id`)
    .leftJoin('users', `${table}.user_id`, 'users.id')
    .where(`${table}.user_id`, user_id)
    .whereNot(`${table}.id`, id )
    .orderBy(`${table}.id`, 'DESC')
}

function getRecipesByAuthor(user_id) {
    return database(table)
    .select(`${table}.id`,
            `${table}.name`,
            `${table}.image`,
            `${table}.introduction`,
            `${table}.ingredients`,
            `${table}.instructions`,
            `${table}.conclusion`,
            `${table}.published`,
            `${table}.created_at`,
            `${table}.updated_at`,
            `${table}.user_id`,
            'users.firstname')
    .leftJoin('users', `${table}.user_id`, 'users.id')
    .where(`${table}.user_id`, user_id)
    .orderBy(`${table}.id`, 'DESC')
}

function getForks(user_id) {
    return database(table)
    .select(`${table}.id`,
            `${table}.name`,
            `${table}.introduction`,
            `${table}.ingredients`,
            `${table}.instructions`,
            `${table}.conclusion`,
            `${table}.published`,
            `${table}.created_at`,
            `${table}.updated_at`,
            `${table}.user_id`,
            'users.firstname')
    .innerJoin('users', `${table}.user_id`, 'users.id')
    .where(`${table}.id_parent`, user_id)
    .where(`${table}.published`, true)
    .orderBy(`${table}.id`, 'DESC')
}

function postRecipe({ name, introduction, ingredients, instructions, image, conclusion, published, user_id }) {
    return database(table).insert({
        name: name,
        introduction: introduction,
        ingredients: JSON.stringify(ingredients),
        instructions: JSON.stringify(instructions),
        image: image,
        conclusion: conclusion,
        published: published,
        user_id: user_id
    }).returning('id')
}

function updateRecipe(id, { name, introduction, ingredients, instructions, image, conclusion, published }) {
    return database(table)
    .where('id', id)
    .update({
        name: name,
        introduction: introduction,
        ingredients: JSON.stringify(ingredients),
        instructions: JSON.stringify(instructions),
        image: image,
        conclusion: conclusion,
        published: published,
        updated_at: new Date(),
    })
}

function deleteRecipe(id) {
    return database(table)
    .where('id', id)
    .del()
}

module.exports = {
    getRecipes,
    getRecipesSearch,
    getRecipe,
    getOthersRecipes,
    getRecipesByAuthor,
    postRecipe,
    updateRecipe,
    deleteRecipe,
    getForks
}
  