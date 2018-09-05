
exports.up = (knex, Promise) => {
    return knex.schema.createTable('comments', table => {
        table.increments()
        table.timestamps(true, true)
        table.text('content')
        table
        .integer('user_id')
        .unsigned()
        table
        .foreign('user_id')
        .references('users.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        table
        .integer('recipe_id')
        .unsigned()
        table
        .foreign('recipe_id')
        .references('recipes.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
}

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('comments')
}