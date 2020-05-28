const fs = require('fs')
const path = require('path')

module.exports = (query, callback) => {

    String.validate.notVoid(query)
    
    Function.validate(callback)


    fs.readdir(path.join(__dirname, '..', 'data', 'stickies'), (error, files) => {
        if (error) return callback(error)

        let wasError = false

        const stickies = []
        let count = 0

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
                    const sticky = JSON.parse(json)

                    const values = Object.values(sticky)

                    const matches = values.some(value => value.includes(query))

                    if (matches) {
                        sticky.id = file.substring(0, file.indexOf('.json'))
    
                        stickies.push(sticky)
                    }

                    if (++count === files.length) callback(null, stickies)
                }
            })
        })
    })
}