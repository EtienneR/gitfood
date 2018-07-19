module.exports = {
  docker: {
    client: 'postgresql',
    connection: {
		host: 'db',
		user: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
		database: process.env.POSTGRES_DB,
		charset: 'utf8'
    },
    pool: {
		min: 2,
		max: 10,
    },
    migrations: {
		tableName: 'knex_migrations'
    },
    seeds: {
      	directory: __dirname + '/data/seeds'
    }
  }
};
