const request = require('supertest')
const server = require('../index')
const url = '/api/v1/users/'
const message = require('../helpers/messages')

describe('Users', () => {
    test('GET /1 - Users - Empty object', async () => {
        const response = await request(server).get(url + '1')
        expect(response).toBeDefined()
        expect(response.statusCode).toBe(404)
        expect(response.body).toEqual({ message: message.users.notFound })
    })
})