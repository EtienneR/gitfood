const request = require('supertest')
const server = require('../index')
const url = '/api/v1/likes/'
const message = require('../helpers/messages')

describe('Likes', () => {
    test('GET / - Likes - Empty array', async () => {
        const response = await request(server).get(url)
        expect(response).toBeDefined()
        expect(response.statusCode).toBe(202)
        expect(response.body).toEqual({ message: message.likes.nothing })
    })

    test('GET /1 - Likes - Empty object', async () => {
        const response = await request(server).get(url + '1')
        expect(response).toBeDefined()
        expect(response.statusCode).toBe(404)
        expect(response.body).toEqual({ message: message.likes.notFound })
    })
})