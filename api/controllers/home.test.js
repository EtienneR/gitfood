const request = require('supertest')
const server = require('../index')

describe('Route Home', () => {	
    test('GET - Home', async () => {
        const response = await request(server).get('/')
        expect(response).toBeDefined()
        expect(response.statusCode).toBe(200)
        expect(response.body.message).toBe('Welcome to the GitFood API')
    })
})