const request = require('supertest')
const server = require('../index')
const url = '/api/v1/comments/'
const message = require('../helpers/messages')

describe('Comments', () => {
    test('GET / - Comments - Empty array', async () => {
        const response = await request(server).get(url)
        expect(response).toBeDefined()
        expect(response.statusCode).toBe(202)
        expect(response.body.message).toBe('no comment available')
    })

    test('GET /1 - Comments - Empty object', async () => {
        const response = await request(server).get(url + '1')
        expect(response).toBeDefined()
        expect(response.statusCode).toBe(404)
        expect(response.body).toEqual({ message: message.comments.notFound })
    })
})