const fs = require('fs')
const path = require('path')
require('../utils/string')
const uid = require('../utils/uid')
require('../utils/json')
require('../utils/function')
const { find } = require('../data/users')

module.exports = (userId, sticky, callback) => {
    if (typeof sticky !== 'object') throw new TypeError(`${sticky} is not an object`)

    const { title, comment } = sticky

    String.validate.notVoid(userId)

    Function.validate(callback)

    if (title) String.validate.notVoid(title)

    if (comment) String.validate.notVoid(comment)



    find({userId}, (error, [user])=> {
        
        if(error) return callback (error)
        if(!user) return callback(new Error('something wrong happen'))

        const idSticky = uid()
    
        const file = `${idSticky}.json`
    
        sticky.idSticky = idSticky
    
        sticky.userId = userId
       
        fs.writeFile(path.join(__dirname, '..', 'data', 'stickies', file), JSON.prettify(sticky), error => {
            if (error) return callback(error)
    
            callback(null, idSticky)
        })
    })
}