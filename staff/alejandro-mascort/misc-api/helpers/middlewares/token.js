const jwt = require('jsonwebtoken')

require('dotenv').config()

const { SECRET } = process.env

module.exports = (req, res, next) => {
    const [, token] = req.header('authorization').split(' ')

    const { sub: userId } = jwt.verify(token, SECRET)

    req.token = token
    req.sub = userId
    
    next()
}