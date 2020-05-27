const fs = require('fs')
const path = require('path')
require('../utils/polyfills/string')
const uid = require('../utils/uid')
require('../utils/json')
const {find} = require('../data')

module.exports = (userId, stickie, callback) => {
    if (typeof stickie !== 'object') throw new TypeError(`${stickie} is not an object`)

    const { tag, message } = stickie

    String.validate.notVoid(userId)
    String.validate.notVoid(tag)
    String.validate.notVoid(message)

    find({id:userId}, 'users', (error, [user]) => {
        if (error) return callback(error)

        if (!user) return callback(new Error(`user with ${userId} does not exist`))
    
        stickie.user = userId
        stickie.stickieId = uid()

        const file = `${stickie.stickieId }.json`
    debugger
        fs.writeFile(path.join(__dirname, '..', 'data', 'stickies', file), JSON.prettify(stickie), error => {
            if (error) return callback(error)
    
            callback(null, stickie.stickieId)
        })
    
    })
}
           
