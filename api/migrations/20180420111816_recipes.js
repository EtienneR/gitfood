/* Création des tables */
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.withSchema('public').createTable('users', table => {
            table.increments('id').primary()
            table.string('firstname')
            table.string('email')
            table.string('password')
            table.boolean('active')
        }),

        knex.schema.withSchema('public').createTable('recipes', table => {
            table.increments('id').primary()
            table.string('name')
            table.text('introduction')
            table.text('image')
            table.jsonb('ingredients')
            table.jsonb('instructions')
            table.text('conclusion')
            table.boolean('published')
            table.timestamps(true, true)
            table.integer('id_parent').unsigned()
            table.integer('user_id').unsigned().references('users.id')
        }),

        knex.schema.withSchema('public').createTable('comments', table => {
            table.increments('id').primary()
            table.text('content')
            table.timestamps(true, true)
            table.integer('user_id').unsigned().references('users.id')
            table.integer('recipe_id').unsigned().references('recipes.id')
        }),

        knex.schema.withSchema('public').createTable('likes', table => {
            table.increments('id').primary()
            table.integer('user_id').unsigned().references('users.id')
            table.integer('recipe_id').unsigned().references('recipes.id')
        })
    ])
}

/* Suppression des tables */
exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.withSchema('public').dropTable('users'),
        knex.schema.withSchema('public').dropTable('comments'),
        knex.schema.withSchema('public').dropTable('recipes'),
        knex.schema.withSchema('public').dropTable('likes')
    ])
}