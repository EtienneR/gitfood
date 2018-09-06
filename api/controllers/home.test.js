const request = require('supertest')
const server = require('../index')
const message = require('../helpers/messages')

describe('Route Home', () => {
    test('GET / - Home', async () => {
        const response = await request(server).get('/')
        expect(response).toBeDefined()
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({ message: message.home.welcome })
    })
})

describe('Route 404', () => {
    test('GET / - 404', async () => {
        const response = await request(server).get('/404')
        expect(response).toBeDefined()
        expect(response.statusCode).toBe(404)
        expect(response.body).toEqual({ message: message.home.notFound })
    })
})