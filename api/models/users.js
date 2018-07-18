const database = require('./index.js').database
const table = 'users'

function getUser(id) {
    return database(table).where('id', parseInt(id)).first()
}

function createUser({ email, password }) {
    return database(table).insert({
        email: email,
        password: password,
        active: false
    }).returning('id')
}

function deleteUser(id) {
    return database(table).where('id', id).del()
}

module.exports = {
    getUser,
    createUser,
    deleteUser
}
  