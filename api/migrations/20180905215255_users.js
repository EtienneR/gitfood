exports.up = (knex, Promise) => {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.string('firstname')
        table.string('email')
        table.string('password')
        table.boolean('active')
    })
}

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('users')
}