const request = require('supertest')
const server = require('../index')
const url = '/api/v1/users/'
const message = require('../helpers/messages')
const knex = require('../models').database

const user = {
    firstname: 'Alexa',
    email: "alexa@amazon.com",
    password: "Password@123"
}

const newUser = {
    firstname: 'Cortana',
    email: "cortana@microsoft.com",
    password: "Password@123"
}

beforeAll(async () => {
    await knex.migrate.rollback()
    await knex.migrate.latest()
})

describe('Users', () => {
    test('POST - a user with empty fields', async () => {
        const response = await request(server).post(url)
        expect(response).toBeDefined()
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({ message: message.emptyFields })
    })

    test('POST - a user with data', async () => {
        const response = await request(server).post(url).send(user)
        expect(response).toBeDefined()
        expect(response.statusCode).toBe(201)
        expect(response.body).toEqual({ message: message.users.created(1), id: 1 })
    })

    test('GET /1 - Return an object', async () => {
        const response = await request(server).get(url + '1')
        expect(response).toBeDefined()
        expect(response.statusCode).toBe(200)
        expect(response.body.id).toEqual(1)
        expect(response.body.firstname).toEqual(user.firstname)
        expect(response.body.email).toEqual(user.email)
        expect(response.body.active).toEqual(false)
    })
    
    test('DELETE /a - Delete a string id', async () => {
        const response = await request(server).get(url + 'a')
        expect(response).toBeDefined()
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({ message: message.idNotInteger })
    })

    test('DELETE /666- Delete a 404 user', async () => {
        const response = await request(server).get(url + '666')
        expect(response).toBeDefined()
        expect(response.statusCode).toBe(404)
        expect(response.body).toEqual({ message: message.users.notFound })
    })

    test('DELETE /1 - Delete a user', async () => {
        const response = await request(server).delete(url + '1')
        expect(response).toBeDefined()
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({ message: message.users.deleted('1') })
    })

    test('GET /1 - Users - Empty object', async () => {
        const response = await request(server).get(url + '1')
        expect(response).toBeDefined()
        expect(response.statusCode).toBe(404)
        expect(response.body).toEqual({ message: message.users.notFound })
    })
})