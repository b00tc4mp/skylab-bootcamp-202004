const fs = require('fs')
const path = require('path')
require('../utils/polyfills/string')

module.exports = (userId, callback) => {

    String.validate.notVoid(userId)

    Function.validate(callback)

    const stickiesPath = path.join(__dirname, '..', 'data', 'stickies')

    fs.readdir(stickiesPath, (error, files) => {
        if (error) return callback(error)

        let wasError = false

        const stickies = []
        let count = 0

        files.forEach(file => {
            fs.readFile(path.join(stickiesPath, file), 'utf8', (error, json) => {
                if (error) {
                    if (!wasError) {
                        callback(error)

                        wasError = true
                    }
                    return
                }

                if (!wasError) {
                    const sticky = JSON.parse(json)
                    
                    if (sticky.userId === userId) stickies.push(sticky)
                    
                    if (++count === files.length) callback(null, stickies)
                }
            })
        })
    })
}