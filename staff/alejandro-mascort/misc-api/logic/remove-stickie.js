require('../utils/polyfills/string')
require('../utils/polyfills/function')
const fs = require('fs')
const path = require('path')
const {find} =require('../data')

const { UnexistenceError} = require('../errors')

module.exports = (userId, stickieId) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(stickieId)

    return new Promise((resolve, reject) => {
        find({ id:userId }, 'users',(error, users) => {
            if (error) return reject(error)
            
            const [user] = users

            if (!user) return reject(new UnexistenceError(`user with id: ${userId}, does not exist`))
    
            find({stickieId}, 'stickies', (error, stickies) => {
                
                if (error) return reject(error)

                const [stickie] = stickies
    
                if (!stickie) return reject(new UnexistenceError(`this ${stickieId} does not exist`))
    
                fs.unlink(path.join(__dirname, "..", "data", "stickies", `${stickieId}.json`), (error) => {
                    if (error) return reject(error)
    
                    resolve()
                })
            })
        })
    })
}