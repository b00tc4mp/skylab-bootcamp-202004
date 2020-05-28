const jwt = require('jsonwebtoken')
const { handleError } = require('../errors')
require('dotenv').config()
const { verify } = require('../../utils/jwt-promised')

const { SECRET } = process.env

module.exports = (req, res, next) => {    
        const [, token] = req.header('authorization').split(' ')

        verify(token, SECRET)
            .then(payload => {
                const { sub: userId } = payload
                req.token = token
                req.sub = userId
                next()
            })
            .catch(error => {
                handleError(error, res)
                next()
            })
}