const commentsData = require('../comments.js')

exports.seed = (knex, Promise) => {
    return knex('comments')
    .del()
    .then(() => {
		return knex('comments').insert(commentsData)
	})
}