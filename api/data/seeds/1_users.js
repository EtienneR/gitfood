const usersData = require('../users.js')
const bcrypt = require('bcrypt')
const saltRounds = 10

/* Création des utilisateurs avec le mot de passe chiffré */
const createUsers = (knex, users) => {
	return Promise.all(
		users.map(user => {
			return bcrypt.hash(user.password, saltRounds)
			.then(hash => {
				user.password = hash
				return user
			})
		})
	)
	.then(users => {
		return knex('users').insert(users)
	})
}

exports.seed = (knex, Promise) => {
    return knex('users')
    .del()
    .then(() => {
		return createUsers(knex, usersData)
    })
}