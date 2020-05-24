const fs = require('fs')
const path = require('path')
const {find} = require('../data/findData');
require('../utils/string')
require('../utils/function')

module.exports = (userId, callback) => {

    String.validate.notVoid(userId)
    Function.validate(callback)

    find({id:userId},'users',(error, [user]) => {
        if (error) return callback(error)

        if (!user) return callback(new Error(`user with ${userId} does not exist`))

        
        fs.readdir(path.join(__dirname, '..', 'data','stickies'), (error, files) => {
            if (error) return callback(error)

            let wasError = false
            let count=0;
            const stickies = []

            if (!files.length) callback(null, stickies)
    
            files.forEach(file => {
                fs.readFile(path.join(__dirname, '..', 'data', 'stickies', file), 'utf8', (error, json) => {
                    if (error) {
                        if (!wasError) {
                            callback(error)

                            wasError = true
                        }
                        return
                    }
    
                    if (!wasError) {
                        const stickie = JSON.parse(json)
                        
                        if(stickie.user === userId){
                            stickie.id = file.substring(0, file.indexOf('.json'))
    
                            stickies.push(stickie)
                        }
                        count++
                        if (count === files.length) callback(null, stickies)
                    }
                })
            })
        })

    })
        
}