const fs = require('fs')
const path = require('path')
const uid = require('../utils/uid')
require('../utils/polyfills/string')
require('../utils/polyfills/json')
require('../utils/polyfills/function')
const { find } = require('../data/users')

module.exports = (userId, sticky, callback) => {
    String.validate.notVoid(userId)
    if(typeof sticky !== 'object') throw new TypeError(`${sticky} is not an object`)

    const { note } = sticky

    String.validate.notVoid(note)

    Function.validate(callback)

    find({ id: userId }, (error, [user]) =>{
        if (error) return callback(error)

        if (!user) return callback(new Error(`user id ${userId} does not exist`))

        const id = uid()
        
        sticky.id = id
        sticky.user = userId

        fs.writeFile(path.join(__dirname, '..', 'data', 'stickies', `${id}.json`), JSON.prettify(sticky), error => {
            if (error) return callback(error)
    
            callback(null, id)
        })
    })
}