const request = require('supertest')
const server = require('../index')
const url = '/api/v1/recipes/'
const message = require('../helpers/messages')

describe('Recipes', () => {
    test('GET / - Recipes - Empty array', async () => {
        const response = await request(server).get(url)
        expect(response).toBeDefined()
        expect(response.statusCode).toBe(202)
        expect(response.body.message).toBe('no recipes available')
    })

    test('GET /1 - Recipes - Empty object', async () => {
        const response = await request(server).get(url + '1')
        expect(response).toBeDefined()
        expect(response.statusCode).toBe(404)
        expect(response.body).toEqual({ message: message.recipes.notFound })
    })
})