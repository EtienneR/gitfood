const environment = process.env.NODE_ENV
const configuration = require('./../knexfile')[environment]
//console.log(configuration)
const database = require('knex')(configuration)

module.exports = {
    database
}