const { find } = require('../data/users')
const { findStickies } = require('../data/stickies')
require('../utils/polyfills/function')
require('../utils/polyfills/string')

module.exports = (userId, query, callback) =>{
    String.validate.notVoid(userId)
    String.validate.notVoid(query)

    Function.validate(callback)

    find({id: userId}, (error, [user])=>{
        if (error) return callback(error)
        if(!user) return callback(new Error(`user with id ${userId} does not exist`))

        findStickies({user: userId}, (error, stickies) =>{
            if(error) return callback(error)
            if(!stickies.length) return callback(new Error('stickies is empty'))

            let results = []

            count = 0

            for (let i in stickies){
                //TODO have to normalize the results, case insensitive for query
                const values = Object.values(stickies[i])
                const matches = values.some(value => value.includes(query))

                if(matches) results.push(stickies[i])

                count++

                if(count === stickies.length) {
                    if(!results.length) return callback(new Error('no stickies'))
                    callback(null, results)
                }
            }
        })
    })
}