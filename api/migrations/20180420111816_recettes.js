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

        knex.schema.withSchema('public').createTable('recettes', table => {
            table.increments('id').primary()
            table.string('name')
            table.text('introduction')
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
            table.integer('recette_id').unsigned().references('recettes.id')
        })
    ])
}

/* Suppression de la table */
exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.withSchema('public').dropTable('users'),
        knex.schema.withSchema('public').dropTable('comments'),
        knex.schema.withSchema('public').dropTable('recettes')
    ])
}