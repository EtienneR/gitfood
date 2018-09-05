
exports.up = (knex, Promise) => {
    return knex.schema.createTable('recipes', table => {
        table.increments()
        table.timestamps(true, true)
        table.string('name')
        table.string('image')
        table.text('introduction')
        table.jsonb('ingredients')
        table.jsonb('instructions')
        table.text('conclusion')
        table.boolean('published')
        table
        .integer('id_parent')
        .unsigned()
        table
        .integer('user_id')
        .unsigned()
        table
        .foreign('user_id')
        .references('users.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
}

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('recipes')
}