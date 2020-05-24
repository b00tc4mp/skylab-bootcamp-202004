const fs = require('fs')
const path = require('path')
const { find } = require('../data/users')
const { findStickies } = require('../data/stickies')
require('../utils/function')
require('../utils/string')

module.exports = (userId, callback) => {
    String.validate.notVoid(userId)

    Function.validate(callback)

    find({ id: userId }, (error, [user]) => {
        if (error) return callback(error)
        if (!user) return callback(new Error(`user with id ${userId} does not exist`))

        findStickies({ user: userId }, (error, stickies) => {
            if (error) return callback(error)
            if (!stickies.length) return callback(new Error('stickies is empty'))

            callback(null, stickies)
        })
    })
}