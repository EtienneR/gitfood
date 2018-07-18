const environment = process.env.NODE_ENV
const configuration = require('./../knexfile')[environment]
const database = require('knex')(configuration)

module.exports = {
    database
}