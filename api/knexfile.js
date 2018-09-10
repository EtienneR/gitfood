module.exports = {
	docker: {
		client: 'postgresql',
		connection: {
			host: process.env.POSTGRES_HOST || '0.0.0.0',
			port: process.env.POSTGRES_PORT || 5432,
			user: process.env.POSTGRES_USER || 'root',
			password: process.env.POSTGRES_PASSWORD || 'root',
			database: process.env.POSTGRES_DB || 'gitfood',
			charset: 'utf8'
		},
		pool: {
			min: 5,
			max: 10
		},
		migrations: {
			tableName: 'knex_migrations'
		},
		seeds: {
			directory: __dirname + '/data/seeds'
		}
	},
	test: {
		client: 'postgresql',
		connection: {
			host: process.env.POSTGRES_HOST,
			port: process.env.POSTGRES_PORT,
			user: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DB,
			charset: 'utf8'
		},
		pool: {
			min: 5,
			max: 10
		},
		migrations: {
			tableName: 'knex_migrations'
		},
		seeds: {
			directory: __dirname + '/data/seeds'
		}
	}
}