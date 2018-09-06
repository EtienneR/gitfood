const request = require('supertest')
const server = require('../index')
const url = '/api/v1/recipes/'
const message = require('../helpers/messages')
const knex = require('../models').database

const recipe = {
    name: 'Quatres quarts',
    image: 'quatre-quarts-de-bretagne.png',
    user_id: 1,
    introduction: 'Lorem Ipsum',
    ingredients: [
        {
            quantity: 3,
            mesure: '',
            name: 'oeufs'
        },
        {
            quantity: 0,
            mesure: '',
            name: 'beurre demi-salé'
        },
        {
            quantity: 0,
            mesure: '',
            name: 'sucre'
        },
        {
            quantity: 0,
            mesure: '',
            name: 'farine'
        },
        {
            quantity: 1,
            mesure: 'sachet',
            name: 'levure'
        },
        {
            quantity: 1,
            mesure: 'CàS',
            name: 'vanille'
        }
    ],
    instructions: [
        { name: 'Pesez​ ​l’ensemble​​ des​ oeufs​ (environ 180​ grammes​ pour​ des oeufs​ moyens).​ Enlevez​ 30 grammes​​ pour​ ​le​ beurre​ ​et​​ le​​ sucre.' },
        { name: 'Dans​ un​ ​saladier,​ ​mélangez​ ​farine,​ poudres​ ​et​ ​l’oeuf.' },
        { name: 'Versez​ ​le​​ mélange​ ​dans​ ​un​ ​moule​ ​à ​cake.' },
        { name: '​Préchauffez​ ​le​ ​four​ ​à ​150°C.'},
        { name: 'Enfournez​ ​le​ moule​ ​pour​ 45​ ​minutes.' }
    ],
    conclusion: 'Vous pouvez changer la vanille par de la fleur d\'oranger, des zestes de citron, d\'orange, etc...',
    published: true
}

const newRecipe = {
    name: 'Quatres quarts',
    image: 'quatre-quarts-de-bretagne.png',
    user_id: 1,
    introduction: 'Blabla',
    ingredients: [
        {
            quantity: 3,
            mesure: '',
            name: 'oeufs'
        },
        {
            quantity: 0,
            mesure: '',
            name: 'beurre demi-salé'
        },
        {
            quantity: 0,
            mesure: '',
            name: 'sucre'
        },
        {
            quantity: 0,
            mesure: '',
            name: 'farine'
        },
        {
            quantity: 1,
            mesure: 'sachet',
            name: 'levure'
        },
        {
            quantity: 1,
            mesure: 'CàS',
            name: 'vanille'
        }
    ],
    instructions: [
        { name: 'Pesez​ ​l’ensemble​​ des​ oeufs​ (environ 180​ grammes​ pour​ des oeufs​ moyens).​ Enlevez​ 30 grammes​​ pour​ ​le​ beurre​ ​et​​ le​​ sucre.' },
        { name: 'Dans​ un​ ​saladier,​ ​mélangez​ ​farine,​ poudres​ ​et​ ​l’oeuf.' },
        { name: 'Versez​ ​le​​ mélange​ ​dans​ ​un​ ​moule​ ​à ​cake.' },
        { name: '​Préchauffez​ ​le​ ​four​ ​à ​150°C.'},
        { name: 'Enfournez​ ​le​ moule​ ​pour​ 45​ ​minutes.' }
    ],
    conclusion: 'Vous pouvez changer la vanille par de la fleur d\'oranger, des zestes de citron, d\'orange, etc...',
    published: true
}

beforeAll(async () => {
    await knex.migrate.rollback()
    await knex.migrate.latest()
    await knex.seed.run(['1_user.js'])
})

describe('Recipes', () => {
    test('POST - Create a recipe with no data', async () => {
        const response = await request(server).post(url)
        expect(response).toBeDefined()
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({ message: message.emptyFields })
    })

    test('POST - Create a recipe', async () => {
        const response = await request(server).post(url).send(recipe)
        expect(response).toBeDefined()
        expect(response.statusCode).toBe(201)
        expect(response.body).toEqual({ message: message.recipes.created(11), id: 11 })
    })

    test('GET /11 - Return an object', async () => {
        const response = await request(server).get(url + '11')
        expect(response).toBeDefined()
        expect(response.statusCode).toBe(200)
        expect(response.body.id).toEqual(11)
        expect(response.body.name).toEqual(recipe.name)
        expect(response.body.user_id).toEqual(recipe.user_id)
        expect(response.body.introduction).toEqual(recipe.introduction)
        expect(response.body.ingredients).toEqual(recipe.ingredients)
        expect(response.body.instructions).toEqual(recipe.instructions)
        expect(response.body.conclusion).toEqual(recipe.conclusion)
        expect(response.body.pusblished).toEqual(recipe.pusblished)
    })

    test('PUT - Update a recipe with no data', async () => {
        const response = await request(server).put(url + '11').send()
        expect(response).toBeDefined()
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({ message: message.emptyFields })
    })

    test('PUT /a - Update a recipe with a string id ', async () => {
        const response = await request(server).put(url + 'a').send()
        expect(response).toBeDefined()
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({ message: message.idNotInteger })
    })

    test('PUT /666 - Update a 404 recipe ', async () => {
        const response = await request(server).put(url + '666').send(newRecipe)
        expect(response).toBeDefined()
        expect(response.statusCode).toBe(404)
        expect(response.body).toEqual({ message: message.recipes.notFound })
    })

    test('PUT /11 - Update a recipe', async () => {
        const response = await request(server).put(url + '11').send(newRecipe)
        expect(response).toBeDefined()
        expect(response.statusCode).toBe(200)
    })

    test('GET /11 - Return an object updated', async () => {
        const response = await request(server).get(url + '11')
        expect(response).toBeDefined()
        expect(response.statusCode).toBe(200)
        expect(response.body.id).toEqual(11)
        expect(response.body.name).toEqual(newRecipe.name)
        expect(response.body.user_id).toEqual(newRecipe.user_id)
        expect(response.body.introduction).toEqual(newRecipe.introduction)
        expect(response.body.ingredients).toEqual(newRecipe.ingredients)
        expect(response.body.instructions).toEqual(newRecipe.instructions)
        expect(response.body.conclusion).toEqual(newRecipe.conclusion)
        expect(response.body.pusblished).toEqual(newRecipe.pusblished)
    })

    test('DELETE /a - Delete a string id', async () => {
        const response = await request(server).get(url + 'a')
        expect(response).toBeDefined()
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({ message: message.idNotInteger })
    })

    test('DELETE /666- Delete a 404 recipe', async () => {
        const response = await request(server).delete(url + '666')
        expect(response).toBeDefined()
        expect(response.statusCode).toBe(404)
        expect(response.body).toEqual({ message: message.recipes.notFound })
    })

    test('DELETE /11 - Delete a recipe', async () => {
        const response = await request(server).delete(url + '11')
        expect(response).toBeDefined()
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({ message: message.recipes.deleted('11') })
    })

    // test('GET / - Recipes - Empty array', async () => {
    //     const response = await request(server).get(url)
    //     expect(response).toBeDefined()
    //     expect(response.statusCode).toBe(202)
    //     expect(response.body).toEqual({ message: message.recipes.nothing })
    // })

    test('GET /11 - Recipes - Empty object', async () => {
        const response = await request(server).get(url + '11')
        expect(response).toBeDefined()
        expect(response.statusCode).toBe(404)
        expect(response.body).toEqual({ message: message.recipes.notFound })
    })

})