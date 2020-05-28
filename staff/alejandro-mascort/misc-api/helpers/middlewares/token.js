const jwt = require('jsonwebtoken')
const { handleError } = require('../errors')
require('dotenv').config()

const { SECRET } = process.env

module.exports = (req, res, next) => {
    
    try {
        const [, token] = req.header('authorization').split(' ')

        const { sub: userId } = jwt.verify(token, SECRET)

        req.token = token
        req.sub = userId
    } catch(error) {
        handleError(error, res)
    }
    
    next()
}