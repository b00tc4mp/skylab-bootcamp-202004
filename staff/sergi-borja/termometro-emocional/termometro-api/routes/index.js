const { env: { SECRET } } = process

const { Router } = require('express')
const { registerUser } = ('./handlers')
const api = new Router()
const parseBody = require('body-parser')

api.post('/users', parseBody, registerUser)

module.exports = {
    api
}
