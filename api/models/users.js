const database = require('./index.js').database
const table = 'users'
const bcrypt = require('bcrypt')
const saltRounds = 10

function getUser(id) {
    return database(table)
    .where('id', parseInt(id))
    .first()
}

function createUser({ firstname, email, password }) {
    return bcrypt.hash(password, saltRounds).then(hash => {
        return database(table).insert({
            firstname: firstname,
            email: email,
            password: hash,
            active: false
        }).returning('id')
    })
}

function deleteUser(id) {
    return database(table)
    .where('id', id)
    .del()
}

module.exports = {
    getUser,
    createUser,
    deleteUser
}