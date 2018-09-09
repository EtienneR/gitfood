const usersData = require('../users.js')
const bcrypt = require('bcrypt')
const saltRounds = 10

/* Création d'un utilisateur avec le mot de passe chiffré */
const createUser = (knex, user) => {
	return bcrypt.hash(user.password, saltRounds).then(hash => {
		return knex('users').insert({
			id: user.id,
			firstname: user.firstname,
			email: user.email,
			password: hash,
			active: user.active
		})
	})
}

exports.seed = (knex, Promise) => {
    return knex('users')
    .del()
    .then(() => {
		let userPromises = []
		usersData.forEach(user => {
			// Ajout de chaque user dans le tableau des users
			userPromises.push(createUser(knex, user))
		})

		return Promise.all(userPromises)
    })
}
